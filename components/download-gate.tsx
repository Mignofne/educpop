"use client"

import { useEffect, useState, useTransition } from "react"
import { registerDownload } from "@/app/actions/download"
import { getAnalyticsSessionId } from "@/lib/analytics/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Download, Printer } from "lucide-react"

function isMobileDevice(): boolean {
  if (typeof navigator === "undefined") return false
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
}

function unlockKey(slug: string) {
  return `educpop-unlock-${slug}`
}

export function DownloadGate({
  activitySlug,
  ageBand,
  ageLabel,
}: {
  activitySlug: string
  ageBand: string
  ageLabel: string
}) {
  const [formOpen, setFormOpen] = useState(false)
  const [thanksOpen, setThanksOpen] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const [email, setEmail] = useState("")
  const [newsletterOptIn, setNewsletterOptIn] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [printHint, setPrintHint] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  useEffect(() => {
    try {
      if (sessionStorage.getItem(unlockKey(activitySlug)) === "1") {
        setUnlocked(true)
      }
    } catch {
      /* ignore */
    }
  }, [activitySlug])

  const markUnlocked = () => {
    setUnlocked(true)
    try {
      sessionStorage.setItem(unlockKey(activitySlug), "1")
    } catch {
      /* ignore */
    }
  }

  const handlePrint = () => {
    setPrintHint(null)
    try {
      window.print()
      if (isMobileDevice()) {
        setPrintHint(
          "Choisissez « Enregistrer en PDF » ou « Imprimer » dans le menu qui s'ouvre.",
        )
      }
    } catch {
      setPrintHint(
        isMobileDevice()
          ? "Utilisez Partager → Imprimer, puis « Enregistrer en PDF »."
          : "Utilisez Ctrl+P (ou Cmd+P) pour imprimer ou enregistrer en PDF.",
      )
    }
  }

  const openForm = () => {
    setFormOpen(true)
    setError(null)
    setPrintHint(null)
  }

  const openThanks = () => {
    setThanksOpen(true)
    // Desktop : lancer l'impression juste après l'ouverture du popup (secours si l'utilisateur ne voit pas le CTA)
    if (!isMobileDevice()) {
      window.setTimeout(() => {
        try {
          window.print()
        } catch {
          /* le CTA reste visible */
        }
      }, 400)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const fd = new FormData()
    fd.set("email", email)
    fd.set("activitySlug", activitySlug)
    fd.set("ageBand", ageBand)
    fd.set("newsletterOptIn", newsletterOptIn ? "1" : "0")
    fd.set("sessionId", getAnalyticsSessionId())

    const safety = window.setTimeout(() => {
      setError("La connexion est lente. Réessayez, ou vérifiez votre réseau.")
    }, 12_000)

    startTransition(async () => {
      try {
        const res = await registerDownload(fd)
        if (!res.ok) {
          setError(res.error)
          return
        }
        markUnlocked()
        setFormOpen(false)
        openThanks()
      } catch {
        markUnlocked()
        setFormOpen(false)
        openThanks()
      } finally {
        window.clearTimeout(safety)
      }
    })
  }

  const printButtonClass =
    "rounded-full border-2 border-ink bg-berry font-bold text-primary-foreground shadow-[4px_4px_0_0_var(--ink)] hover:bg-berry/90"

  return (
    <>
      <div className="flex flex-col items-start gap-2">
        {unlocked ? (
          <Button onClick={handlePrint} size="lg" className={printButtonClass}>
            <Download className="mr-2 size-5" aria-hidden />
            Télécharger et imprimer
          </Button>
        ) : (
          <Button onClick={openForm} size="lg" className={printButtonClass}>
            Télécharger gratuitement
          </Button>
        )}
        {printHint && (
          <p className="max-w-md text-sm font-semibold text-foreground" role="status">
            {printHint}
          </p>
        )}
      </div>

      {/* Email — clarifie : pas d'envoi par mail */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="rounded-[1.5rem] border-4 border-ink shadow-[6px_6px_0_0_var(--ink)] sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">Accéder au pack</DialogTitle>
            <DialogDescription className="text-base leading-relaxed">
              Laissez votre email pour continuer.{" "}
              <strong className="font-semibold text-foreground">
                Le pack s&apos;affiche tout de suite ici — rien n&apos;est envoyé par email.
              </strong>
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="dl-email">Votre email</Label>
              <Input
                id="dl-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="parent@exemple.fr"
                className="rounded-xl border-2 border-ink"
              />
            </div>
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border-2 border-ink/20 bg-muted/40 px-3 py-3">
              <input
                type="checkbox"
                checked={newsletterOptIn}
                onChange={(e) => setNewsletterOptIn(e.target.checked)}
                className="mt-0.5 size-4 shrink-0 accent-berry"
              />
              <span className="text-sm leading-snug">
                Je souhaite recevoir les nouveaux livrets pour la tranche d&apos;âge{" "}
                <strong>{ageLabel}</strong>
              </span>
            </label>
            {error && (
              <p className="text-sm font-semibold text-destructive" role="alert">
                {error}
              </p>
            )}
            <Button
              type="submit"
              disabled={pending}
              className="rounded-full border-2 border-ink bg-berry font-bold text-primary-foreground shadow-[3px_3px_0_0_var(--ink)] hover:bg-berry/90"
            >
              {pending ? "Un instant…" : "Continuer"}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Pas de spam. Vous imprimez ou enregistrez le PDF directement depuis cette page.
            </p>
          </form>
        </DialogContent>
      </Dialog>

      {/* Merci — CTA principal visible */}
      <Dialog open={thanksOpen} onOpenChange={setThanksOpen}>
        <DialogContent
          className="rounded-[1.5rem] border-4 border-ink shadow-[6px_6px_0_0_var(--ink)] sm:max-w-md"
          showCloseButton
        >
          <DialogHeader className="items-center text-center">
            <div
              className="mx-auto flex size-16 items-center justify-center rounded-full border-[3px] border-ink bg-sun shadow-[3px_3px_0_0_var(--ink)]"
              aria-hidden
            >
              <Printer className="size-8 text-ink" />
            </div>
            <DialogTitle className="font-display text-2xl">Merci ! Votre pack est prêt</DialogTitle>
            <DialogDescription className="text-base leading-relaxed">
              <strong className="font-semibold text-foreground">Rien n&apos;est envoyé par email.</strong>{" "}
              Cliquez ci-dessous pour imprimer ou enregistrer le PDF sur votre appareil.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <Button
              type="button"
              size="lg"
              onClick={handlePrint}
              className="h-14 w-full rounded-full border-2 border-ink bg-berry text-base font-bold text-primary-foreground shadow-[4px_4px_0_0_var(--ink)] hover:bg-berry/90"
            >
              <Download className="mr-2 size-5" aria-hidden />
              Télécharger et imprimer
            </Button>
            <p className="text-center text-xs leading-relaxed text-muted-foreground">
              {isMobileDevice()
                ? "Sur iPhone : choisissez « Enregistrer en PDF » dans le menu d'impression."
                : "Astuce : dans la fenêtre d'impression, choisissez « Enregistrer au format PDF »."}
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => setThanksOpen(false)}
              className="rounded-full border-2 border-ink font-semibold shadow-[2px_2px_0_0_var(--ink)]"
            >
              Fermer — le bouton reste en haut de page
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Barre fixe — visible en scrollant dans le livret */}
      {unlocked ? (
        <>
          <div className="fixed inset-x-0 bottom-0 z-40 border-t-4 border-ink bg-background/95 p-4 shadow-[0_-4px_0_0_var(--ink)] backdrop-blur-sm print:hidden md:hidden">
            <Button onClick={handlePrint} size="lg" className={`h-12 w-full ${printButtonClass}`}>
              <Download className="mr-2 size-5" aria-hidden />
              Télécharger et imprimer
            </Button>
          </div>
          <div className="h-20 md:hidden print:hidden" aria-hidden />
        </>
      ) : null}
    </>
  )
}

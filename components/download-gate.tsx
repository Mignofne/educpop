"use client"

import { useState, useTransition } from "react"
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

export function DownloadGate({
  activitySlug,
  ageBand,
  ageLabel,
}: {
  activitySlug: string
  ageBand: string
  ageLabel: string
}) {
  const [open, setOpen] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const [email, setEmail] = useState("")
  const [newsletterOptIn, setNewsletterOptIn] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  const handlePrimary = () => {
    if (unlocked) {
      window.print()
    } else {
      setOpen(true)
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
    startTransition(async () => {
      const res = await registerDownload(fd)
      if (!res.ok) {
        setError(res.error)
        return
      }
      setUnlocked(true)
      setOpen(false)
      // small delay so the dialog closes before the print dialog opens
      setTimeout(() => window.print(), 250)
    })
  }

  return (
    <>
      <Button
        onClick={handlePrimary}
        size="lg"
        className="rounded-full border-2 border-ink bg-berry font-bold text-primary-foreground shadow-[4px_4px_0_0_var(--ink)] hover:bg-berry/90"
      >
        {unlocked ? "Imprimer / Enregistrer en PDF" : "Télécharger gratuitement"}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-[1.5rem] border-4 border-ink shadow-[6px_6px_0_0_var(--ink)]">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">Une dernière étape !</DialogTitle>
            <DialogDescription className="text-base">
              Laissez votre email pour débloquer le téléchargement et imprimer le pack.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="dl-email">Votre email</Label>
              <Input
                id="dl-email"
                type="email"
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
              {pending ? "Un instant…" : "Débloquer & imprimer"}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Pas de spam. Désabonnement en un clic si vous cochez la newsletter.
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

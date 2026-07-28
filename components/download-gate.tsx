"use client"

import { useState, useTransition } from "react"
import { registerDownload } from "@/app/actions/download"
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

export function DownloadGate({ activitySlug }: { activitySlug: string }) {
  const [open, setOpen] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const [email, setEmail] = useState("")
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
              Laissez votre email pour débloquer le téléchargement. Vous recevrez aussi nos nouvelles fiches gratuites.
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
              Pas de spam. Désabonnement en un clic.
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

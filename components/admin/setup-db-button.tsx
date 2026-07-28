"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { setupDatabaseFromAdmin } from "@/app/admin/setup-db-action"
import { Button } from "@/components/ui/button"

export function SetupDbButton() {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  return (
    <div className="mt-3 flex flex-col gap-2">
      <Button
        type="button"
        disabled={pending}
        onClick={() => {
          setError(null)
          startTransition(async () => {
            const res = await setupDatabaseFromAdmin()
            if (!res.ok) {
              setError(res.error)
              return
            }
            router.refresh()
          })
        }}
        className="w-fit rounded-full border-2 border-ink bg-berry font-bold text-primary-foreground shadow-[3px_3px_0_0_var(--ink)] hover:bg-berry/90"
      >
        {pending ? "Création en cours…" : "Créer les tables maintenant"}
      </Button>
      {error && (
        <p className="text-sm font-semibold text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

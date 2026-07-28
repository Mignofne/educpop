"use client"

import { useFormState } from "react-dom"
import Link from "next/link"
import { adminLoginAction } from "./actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AdminLoginForm() {
  const [state, formAction, pending] = useFormState(adminLoginAction, null)

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="secret">Secret admin</Label>
        <Input
          id="secret"
          name="secret"
          type="password"
          required
          autoComplete="current-password"
          className="rounded-xl border-2 border-ink"
          placeholder="ADMIN_SECRET"
        />
      </div>
      {state?.error && (
        <p className="text-sm font-semibold text-destructive" role="alert">{state.error}</p>
      )}
      <Button
        type="submit"
        disabled={pending}
        className="rounded-full border-2 border-ink bg-berry font-bold text-primary-foreground shadow-[3px_3px_0_0_var(--ink)]"
      >
        {pending ? "Connexion…" : "Accéder au tableau de bord"}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        <Link href="/" className="text-berry hover:underline">← Retour au site</Link>
      </p>
    </form>
  )
}

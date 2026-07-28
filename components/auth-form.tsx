"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Blob } from "@/components/decor"

export function AuthForm({ mode }: { mode: "sign-in" | "sign-up" }) {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const isSignUp = mode === "sign-up"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = isSignUp
      ? await authClient.signUp.email({ email, password, name })
      : await authClient.signIn.email({ email, password })

    setLoading(false)

    if (error) {
      setError(error.message ?? "Une erreur est survenue")
      return
    }

    router.push("/")
    router.refresh()
  }

  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden px-4 py-12">
      <Blob color="sun" className="pointer-events-none absolute -left-20 top-10 h-72 w-72 opacity-40" />
      <Blob color="sky" className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 opacity-40" />

      <div className="relative w-full max-w-sm rounded-[2rem] border-4 border-ink bg-card p-8 shadow-[6px_6px_0_0_var(--ink)]">
        <Link href="/" className="mb-6 flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-sun font-display text-lg font-bold text-ink">
            e
          </span>
          <span className="font-display font-bold text-foreground">educpop</span>
        </Link>

        <h1 className="font-display text-2xl font-bold text-foreground">
          {isSignUp ? "Créer un compte" : "Content de vous revoir !"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {isSignUp
            ? "Un compte gratuit pour télécharger vos fiches préférées."
            : "Connectez-vous pour retrouver vos fiches."}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          {isSignUp && (
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Prénom</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                className="rounded-xl border-2 border-ink"
              />
            </div>
          )}
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="rounded-xl border-2 border-ink"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              autoComplete={isSignUp ? "new-password" : "current-password"}
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
            disabled={loading}
            className="w-full rounded-full border-2 border-ink bg-berry font-bold text-primary-foreground shadow-[3px_3px_0_0_var(--ink)] hover:bg-berry/90"
          >
            {loading ? "Un instant…" : isSignUp ? "Créer mon compte" : "Se connecter"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {isSignUp ? "Vous avez déjà un compte ? " : "Pas encore de compte ? "}
          <Link
            href={isSignUp ? "/sign-in" : "/sign-up"}
            className="font-bold text-berry underline-offset-4 hover:underline"
          >
            {isSignUp ? "Connexion" : "Créer un compte"}
          </Link>
        </p>
      </div>
    </main>
  )
}

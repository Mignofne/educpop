"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"

export function UserMenu({ name, isSubscribed }: { name: string; isSubscribed?: boolean }) {
  const router = useRouter()

  const handleSignOut = async () => {
    await authClient.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/generer"
        className="hidden items-center gap-1 rounded-full border-2 border-ink bg-sun px-3 py-1.5 text-sm font-bold text-ink sm:flex"
      >
        {isSubscribed ? "Premium" : "Découverte"}
      </Link>
      <span className="hidden max-w-24 truncate text-sm font-semibold text-foreground md:inline">
        {name}
      </span>
      <Button
        variant="outline"
        onClick={handleSignOut}
        className="rounded-full border-2 border-ink font-semibold"
      >
        Déconnexion
      </Button>
    </div>
  )
}

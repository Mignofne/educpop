import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Caveat, Fredoka, Nunito } from 'next/font/google'
import { AnalyticsPageView } from '@/components/analytics-page-view'
import './globals.css'

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fredoka',
})

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-nunito',
})

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-caveat',
})

export const metadata: Metadata = {
  title: {
    default: 'educpop — activités pédagogiques joyeuses à imprimer',
    template: '%s | educpop',
  },
  description:
    "educpop : activités pédagogiques à imprimer pour apprendre ensemble. Observer, nommer, manipuler — par âge et par thème. Saisons, animaux, botanique, continents, Asie, histoire, lecture et animés.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://educpop.fr'),
  openGraph: {
    siteName: 'educpop',
    locale: 'fr_FR',
    type: 'website',
  },
  keywords: [
    'activités pédagogiques',
    'fiches à imprimer',
    'apprendre en famille',
    'activités par âge',
  ],
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f7b32b',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr"
      className={`bg-background ${fredoka.variable} ${nunito.variable} ${caveat.variable}`}
    >
      <body className="antialiased">
        {children}
        <AnalyticsPageView />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

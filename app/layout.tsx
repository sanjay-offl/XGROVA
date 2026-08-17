import type { Metadata, Viewport } from 'next'
import { Inter, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
})
const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  // Replace with the production origin once deployed (drives OG/Twitter URLs)
  metadataBase: new URL('http://localhost:3000'),
  title: 'XGROVA — Circular Computing',
  description:
    'XGROVA transforms discarded computing hardware into affordable devices through system-level upcycling and circular engineering.',
  keywords: ['XGROVA', 'upcycled laptop', 'e-waste', 'circular tech', 'affordable computing', 'circular computing'],
  authors: [{ name: 'XGROVA' }],
  icons: {
    icon: '/xgrova.png',
    shortcut: '/xgrova.png',
    apple: '/xgrova.png',
  },
  openGraph: {
    title: 'XGROVA — Circular Computing',
    description:
      'XGROVA transforms discarded computing hardware into affordable devices through system-level upcycling and circular engineering.',
    siteName: 'XGROVA',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/xgrova.png', width: 1024, height: 1024, alt: 'XGROVA' }],
  },
  twitter: {
    card: 'summary',
    title: 'XGROVA — Circular Computing',
    description:
      'XGROVA transforms discarded computing hardware into affordable devices through system-level upcycling and circular engineering.',
    images: ['/xgrova.png'],
  },
}

export const viewport: Viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  )
}

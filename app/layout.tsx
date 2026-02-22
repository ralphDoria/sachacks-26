import type { Metadata, Viewport } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'DartDavis',
  description: 'A community-first delivery platform for downtown Davis restaurants. Lower fees, local drivers, fresh food delivered fast.',
  generator: 'v0.app',
  icons: {
    icon: '/DartDavis-logo.png',
    apple: '/DartDavis-logo.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#4a7c59',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${playfair.variable} font-sans antialiased`} suppressHydrationWarning>
        {children}
        <Toaster position="bottom-right" />
        <Analytics />
      </body>
    </html>
  )
}

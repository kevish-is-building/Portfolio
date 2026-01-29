import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kevish Sewliya | Full Stack Engineer',
  description: 'Portfolio of Kevish Sewliya - Full Stack Engineer with experience in Frontend, Backend development, DevOps, Cloud Computing and more.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/Favicon.png" type="image/x-icon" />
      </head>
      <body>{children}</body>
    </html>
  )
}

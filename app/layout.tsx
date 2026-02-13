import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LinkHub - Your links, one place',
  description: 'Stop paying $5/mo for a simple link page. Free forever, premium features at $4/mo.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

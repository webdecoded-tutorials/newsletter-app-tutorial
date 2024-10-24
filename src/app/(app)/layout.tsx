import type { Metadata } from 'next'

import { Inter } from 'next/font/google'
import React from 'react'

import './globals.css'

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  description: 'A Payload starter project with Next.js, Vercel Postgres, and Vercel Blob Storage.',
  title: 'Payload Vercel Starter',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={inter.className}>
          <header className="px-4 lg:px-6 h-14 flex items-center">
            <Link href="#" className="flex items-center justify-center">
              <span>Web Weekly</span>
            </Link>
            <nav className="ml-auto flex gap-4 sm:gap-6">
              <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">Features</Link>
              <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">Pricing</Link>
              <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">About</Link>
              <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">Contact</Link>
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </nav>
          </header>
          {children}</body>
      </ClerkProvider>
    </html>
  )
}

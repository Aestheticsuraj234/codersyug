import './globals.css'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from "@/components/ui/toaster"

const fonts = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={fonts.className}>
        <ThemeProvider 
            attribute="class" 
            defaultTheme="system" 
            enableSystem
          >
            {children}
            <Toaster />
          </ThemeProvider>
          </body>
      </html>
    </ClerkProvider>
  )
}

import './globals.css'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from "@/components/ui/toaster"
import { AppProvider } from '@/context/GlobalContext'
import QueryProvider from '@/components/providers/query-provider'
import { ModalProvider } from '@/components/providers/modal-provider'



const fonts = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'JS Mastery',
  description: 'JS Mastery Resources',
  other: {
    'theme-color': '#3f3d56 || #f3f4f6',
    "color-scheme": "dark | light",
    "twitter:image": '/home-thumbnail.jpg',
    "twitter:card": "summary_large_image",
    "og:url": "codersyug.vercel.app",
    "og:image": '/home-thumbnail.jpg',
    "og:type": "website",
  }
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppProvider>
      <ClerkProvider>
        <QueryProvider>
          <html lang="en">
    
            <body className={fonts.className}>

              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
              >
                <Toaster />
                {children}
                <ModalProvider/>
              
              </ThemeProvider>
            </body>
          </html>
        </QueryProvider>
      </ClerkProvider>
    </AppProvider>
  )
}

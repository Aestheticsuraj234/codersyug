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
  title: 'Codersyug - A community for developers by developers',
  description: 'Codersyug is a community for developers by developers. We are a community of like-minded developers who share their knowledge with each other. CodersYug is an all-in-one platform designed to empower computer science students throughout their academic journey and beyond. It offers a wide range of services and resources to enhance their learning experience and career prospects',
  other: {
    'theme-color': '#3f3d56 || #f3f4f6',
    "color-scheme": "dark | light",
    "twitter:image": 'https://cloud.appwrite.io/v1/storage/buckets/64e6ef5650a3bc944e6f/files/6519c5866045cbbc241f/view?project=64d3707fc8db92bf44ff&mode=admin',
    "twitter:card": "summary_large_image",
    "og:url": "codersyug.vercel.app",
    "og:image": 'https://cloud.appwrite.io/v1/storage/buckets/64e6ef5650a3bc944e6f/files/6519c5866045cbbc241f/view?project=64d3707fc8db92bf44ff&mode=admin',
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

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

export const metadata:Metadata = {
  title: 'CodersYug - All in one platform for Coders🚀',
  description:
    " CodersYug is a platform for all the coders out there to get the best resources for coding and also to get the best products for their coding journey. We also provide the best blogs and tutorials for the coders to learn and grow",
  openGraph: {
    title: "CodersYug - All in one platform for Coders🚀",
    description:
      "CodersYug is a platform for all the coders out there to get the best resources for coding and also to get the best products for their coding journey. We also provide the best blogs and tutorials for the coders to learn and grow",
    type: "article",
    url: "/social-preview.png",
    images: [
      {
        url: "/api/og?title=CodersYug CodersYug - All in one platform for Coders🚀",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodersYug - All in one platform for Coders🚀",
    description:
    " CodersYug is a platform for all the coders out there to get the best resources for coding and also to get the best products for their coding journey. We also provide the best blogs and tutorials for the coders to learn and grow",
    images: [
      "/api/og?title=CodersYug All in one platform for Coders🚀",
    ],
  },
  icons:{
    icon:"/favicon.ico",
  },
  other:{
    "theme-color":`#3f3d56 || #ffffff`,
    "msapplication-TileColor":`#3f3d56 || #ffffff`,
    "msapplication-config":"/favicon/browserconfig.xml",
    "apple-mobile-web-app-title":"CodersYug",
    "application-name":"CodersYug",
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

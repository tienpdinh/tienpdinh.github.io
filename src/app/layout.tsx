import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Tien Dinh',
  description: 'A Personal Portfolio.',
  authors: [{ name: 'Tien Dinh' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-158610104-1"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'UA-158610104-1');
            `,
          }}
        />
        
        {/* Typed.js */}
        <script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.11" async></script>
      </head>
      <body className="markdown-body">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
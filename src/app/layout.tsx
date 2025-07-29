
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
  title: 'BizTrack Suite - Custom Web App Development India',
  description: 'Launch your MVP faster with BizTrack Suite. We offer full stack development, product engineering, mobile apps, and UI/UX design to help you build and scale.',
  openGraph: {
    title: 'BizTrack Suite - Custom Web App Development India',
    description: 'Launch your MVP faster with BizTrack Suite. We offer full stack development, product engineering, mobile apps, and UI/UX design to help you build and scale.',
    url: 'https://biztrack.codecafelab.in',
    siteName: 'BizTrack Suite',
    images: [
      {
        url: 'https://placehold.co/1200x630.png', 
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BizTrack Suite - Custom Web App Development India',
    description: 'Launch your MVP faster with BizTrack Suite. We offer full stack development, product engineering, mobile apps, and UI/UX design to help you build and scale.',
    images: ['https://placehold.co/1200x630.png'], 
  },
  keywords: ['hire full stack development team', 'custom web app development India', 'best MVP development agency', 'product engineering services', 'mobile app development company'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground flex flex-col min-h-dvh overflow-x-hidden">
        <Header />
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}

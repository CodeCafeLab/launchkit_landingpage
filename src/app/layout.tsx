
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'CodeCafe Labs - Custom Web App Development India',
  description: 'Launch your MVP faster with CodeCafe Labs. We offer full stack development, product engineering, mobile apps, and UI/UX design to help you build and scale.',
  openGraph: {
    title: 'CodeCafe Labs - Custom Web App Development India',
    description: 'Launch your MVP faster with CodeCafe Labs. We offer full stack development, product engineering, mobile apps, and UI/UX design to help you build and scale.',
    url: 'https://codecafelabs.com',
    siteName: 'CodeCafe Labs',
    images: [
      {
        url: 'https://placehold.co/1200x630.png', // Replace with your actual OG image
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CodeCafe Labs - Custom Web App Development India',
    description: 'Launch your MVP faster with CodeCafe Labs. We offer full stack development, product engineering, mobile apps, and UI/UX design to help you build and scale.',
    // creator: '@yourtwitterhandle', // Replace with your Twitter handle
    images: ['https://placehold.co/1200x630.png'], // Replace with your actual OG image
  },
  keywords: ['hire full stack development team', 'custom web app development India', 'best MVP development agency', 'product engineering services', 'mobile app development company'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background">
        {children}
        <Toaster />
      </body>
    </html>
  );
}

    

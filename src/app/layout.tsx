// src/app/layout.tsx
import { Inter } from 'next/font/google';
import './globals.css';
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CalMate - Calories, Macros and Mates',
  description: 'Track your nutrition, connect with friends, and achieve your health goals together. CalMate makes healthy living social and fun.',
  keywords: ['nutrition tracking', 'calorie counter', 'social fitness', 'health app', 'food logging'],
  authors: [{ name: 'Mohammed Huzaifa' }],
  openGraph: {
    title: 'CalMate - Calories, Macros and Mates',
    description: 'Track your nutrition, connect with friends, and achieve your health goals together.',
    type: 'website',
    locale: 'en_US',
    url: 'https://calmate.vercel.app', // Update with your domain
    siteName: 'CalMate',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CalMate - Calories, Macros and Mates',
    description: 'Track your nutrition, connect with friends, and achieve your health goals together.',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
      <script defer data-domain="calmate-app.vercel.app" src="https://plausible.io/js/script.js"></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
import type { Metadata } from 'next';
import {
  Bricolage_Grotesque,
  Cormorant_Garamond,
  Manrope,
} from 'next/font/google';
import SmoothScroll from '@/components/SmoothScroll';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
});
const manrope = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500'],
  variable: '--font-sans',
});
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-countdown',
});

export const metadata: Metadata = {
  title: 'Pritam Gayen',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`theme-light ${cormorant.variable} ${manrope.variable} ${bricolage.variable}`}
        suppressHydrationWarning
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

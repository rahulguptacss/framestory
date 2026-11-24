import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { pages } from '../components/types';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: pages.home.metadata.title,
  description: pages.home.metadata.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${plusJakarta.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#fffdfa] font-sans text-[#141b2b]">
        {children}
      </body>
    </html>
  );
}

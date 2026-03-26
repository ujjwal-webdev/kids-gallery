import type { Metadata } from 'next';
import { Nunito, Fredoka } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { GlobalDecorations } from '@/components/layout/GlobalDecorations';
import { getCategories } from '@/lib/services';

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
});

const fredoka = Fredoka({
  subsets: ['latin'],
  variable: '--font-fredoka',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Kid's Gallery",
    template: "%s | Kid's Gallery",
  },
  description:
    "Kid's Gallery — Your one-stop shop for stationery, gifts, party supplies, and more!",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const categories = await getCategories();

  return (
    <html lang="en" suppressHydrationWarning className={`${nunito.variable} ${fredoka.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Londrina+Solid:wght@400;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans">
        <GlobalDecorations />
        <Header categories={categories} />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

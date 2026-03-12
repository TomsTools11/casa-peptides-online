import type { Metadata } from 'next';
import { Red_Hat_Display, Inter } from 'next/font/google';
import ThemeProvider from '@/components/providers/ThemeProvider';
import CompareProvider from '@/components/providers/CompareProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CompareBar from '@/components/compare/CompareBar';
import HashRedirect from '@/components/HashRedirect';
import './globals.css';

const redHatDisplay = Red_Hat_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Casa Peptides — Product Catalog',
  description: 'Browse the complete Casa Peptides product catalog with 127 products across 22 categories.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${redHatDisplay.variable} ${inter.variable}`}>
      <body>
        <ThemeProvider>
          <CompareProvider>
            <HashRedirect />
            <Header />
            {children}
            <Footer />
            <CompareBar />
          </CompareProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

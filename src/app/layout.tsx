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
  description: 'Browse the complete Casa Peptides product catalog — research-grade peptides, compounds, and supplies across 8 categories.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${redHatDisplay.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t){document.documentElement.setAttribute('data-theme',t)}else if(window.matchMedia('(prefers-color-scheme:dark)').matches){document.documentElement.setAttribute('data-theme','dark')}}catch(e){}})()`,
          }}
        />
      </head>
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

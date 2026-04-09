import type { Metadata } from 'next';
import { Epilogue, Inter } from 'next/font/google';
import Script from 'next/script';
import CompareProvider from '@/components/providers/CompareProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CompareBar from '@/components/compare/CompareBar';
import HashRedirect from '@/components/HashRedirect';
import PlausibleAnalytics from '@/components/PlausibleAnalytics';
import './globals.css';

const epilogue = Epilogue({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
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
  title: 'Casa Peptides — Advanced Research Compounds',
  description: 'Precision peptides and research compounds for scientific study. Browse the complete Casa Peptides catalog.',
  icons: {
    icon: '/images/logos/favicon.png',
    apple: '/images/logos/favicon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${epilogue.variable} ${inter.variable}`}>
      <body>
        <PlausibleAnalytics />
        <Script
          src="https://t.contentsquare.net/uxa/8eb8f888fba1e.js"
          strategy="afterInteractive"
        />
        <CompareProvider>
          <HashRedirect />
          <Header />
          {children}
          <Footer />
          <CompareBar />
        </CompareProvider>
      </body>
    </html>
  );
}

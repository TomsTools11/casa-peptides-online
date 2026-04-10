import type { Metadata } from 'next';
import { Epilogue, Inter } from 'next/font/google';
import Script from 'next/script';
import CartProvider from '@/components/providers/CartProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
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
  description: 'Precision peptides and research compounds for scientific study. Browse the Casa Peptides store.',
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
        <CartProvider>
          <HashRedirect />
          <Header />
          {children}
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}

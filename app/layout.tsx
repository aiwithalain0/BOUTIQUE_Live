import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/sonner';
import { ShopProvider } from '@/context/ShopContext';
import { ProductDetailModal } from '@/components/ProductDetailModal';
import { ShopTheLookModal } from '@/components/ShopTheLookModal';
import { CartDrawer } from '@/components/CartDrawer';
import { WishlistDrawer } from '@/components/WishlistDrawer';
import { CheckoutModal } from '@/components/CheckoutModal';
import AuthModal from '@/components/AuthModal';
import SettingsModal from '@/components/SettingsModal';
import { CustomerServiceModal } from '@/components/CustomerServiceModal';
import { FloatingStylistButton } from '@/components/FloatingStylistButton';
import { SplashCursor } from '@/components/SplashCursor';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'L’AVENIR — Luxury Boutique & Digital Atelier',
  description:
    'Timeless couture and modern digital experiences. Sustainable, elegant, crafted with rich boutique precision.',
  openGraph: {
    title: 'L’AVENIR — Luxury Boutique & Digital Atelier',
    description: 'Timeless couture and modern digital experiences.',
    images: [{ url: 'https://images.pexels.com/photos/2703202/pexels-photo-2703202.jpeg?auto=compress&cs=tinysrgb&w=1200' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'L’AVENIR — Luxury Boutique & Digital Atelier',
    description: 'Timeless couture and modern digital experiences.',
    images: ['https://images.pexels.com/photos/2703202/pexels-photo-2703202.jpeg?auto=compress&cs=tinysrgb&w=1200'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ShopProvider>
          <Navbar />
          <main className="pt-0">{children}</main>
          <Footer />
          <ProductDetailModal />
          <ShopTheLookModal />
          <CartDrawer />
          <WishlistDrawer />
          <CheckoutModal />
          <AuthModal />
          <SettingsModal />
          <CustomerServiceModal />
          <FloatingStylistButton />
          <SplashCursor />
          <Toaster position="bottom-right" />
        </ShopProvider>
      </body>
    </html>
  );
}

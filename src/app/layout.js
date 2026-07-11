import { Poppins } from 'next/font/google';
import './globals.css';
import LedCursor from '@/components/LedCursor';
import ParticleBackground from '@/components/ParticleBackground';

const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata = {
  title: "Aimy India | Nextgen Luminaries",
  description: "Premium LED lighting solutions for indoor, outdoor, and decorative applications.",
};

import AdminLoginOverlay from '@/components/AdminLoginOverlay';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <ParticleBackground />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <LedCursor />
          {children}
          <AdminLoginOverlay />
        </div>
      </body>
    </html>
  );
}

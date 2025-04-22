import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1F2937',
};

export const metadata: Metadata = {
  title: 'Objection.ai - AI-Powered Legal Case Study Assistant',
  description: 'Your AI assistant for analyzing legal cases and forming compelling arguments for both plaintiff and defense perspectives.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} antialiased min-h-full`}>
        <div className="flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
} 
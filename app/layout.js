import './globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import ClientRoot from '../components/ClientRoot';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'AEC',
  description: 'AEC Admin',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  );
}

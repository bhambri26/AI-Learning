import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DataLingo AI - Master Python, SQL, Big Data, and AI Architecture',
  description: 'Gamified interactive learning for Python, SQL, PySpark, Databricks, Snowflake, Palantir, Machine Learning & Generative AI with High-Stakes Inquisitions.',
  applicationName: 'DataLingo',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
  }
};

export const viewport: Viewport = {
  themeColor: '#58CC02',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-white dark:bg-duo-dark-bg text-slate-800 dark:text-slate-100 transition-colors">
        {children}
      </body>
    </html>
  );
}


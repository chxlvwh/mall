import './globals.css';
import { Inter } from 'next/font/google';
import AppHeader from '@/components/AppHeader';
import React, { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Mall',
    description: 'Generated by create next app'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${inter.className}`}>
                <AppHeader />
                <Suspense fallback={'loading'}>{children}</Suspense>
                <footer>footer</footer>
            </body>
        </html>
    );
}

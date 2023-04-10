import { Poppins } from 'next/font/google';
import Nav from './components/NavBar/Nav';
import QueryWrapper from './components/QueryWrapper';
import type { Metadata } from 'next';
import './globals.css';

const poppins = Poppins({
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'DiscussIt',
    description: 'Discuss your topics',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <body
                className={`${poppins.className} mx-4 bg-gray-200 md:mx-48 xl:mx-96`}
            >
                <QueryWrapper>
                    {/* @ts-expect-error Server Component */}
                    <Nav />
                    {children}
                </QueryWrapper>
            </body>
        </html>
    );
}

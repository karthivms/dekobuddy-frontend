import CheckoutHeader from "@/app/components/header2";


import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Checkout',
    description: '',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <CheckoutHeader />
            {children}
        </div>

    );
}

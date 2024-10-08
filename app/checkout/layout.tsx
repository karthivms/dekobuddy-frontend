import BottomBar from "@/app/components/footer/bottombar";
import CheckoutHeader from "@/app/components/header2";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <CheckoutHeader />
            {children}
            <BottomBar />
        </div>

    );
}

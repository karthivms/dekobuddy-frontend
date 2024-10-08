import Header from "@/app//components/header";
import Footer from "@/app/components/footer";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>

    );
}

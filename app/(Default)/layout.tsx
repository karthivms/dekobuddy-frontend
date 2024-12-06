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
            <div style={{minHeight:`calc(100vh - 441.6px)`}}>{children}</div>
            <Footer />
        </div>

    );
}

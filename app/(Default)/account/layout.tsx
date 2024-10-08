import { SideBar } from "@/app/components/account/sideBar";
import { Col, Container, Row } from "react-bootstrap";
import "@/app/sass/components/account.scss"

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Container className="my-4">
                <div className="gap-10 d-flex align-items-start account_layout">
                    <div className="wc-28 bg-theme2 border-border2-solid br-5 p-3 h-485 account_sidebar"><SideBar /></div>
                    <div className="bg-white br-5 wc-72 p-4 account_page">{children}</div>
                </div>
            </Container>
        </div>

    );
}

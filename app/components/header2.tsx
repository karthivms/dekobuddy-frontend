
import { Container } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import logo from "@/public/images/logo.svg";


export default function CheckoutHeader() {

    return (
        <>
            <Container fluid className="bg-theme2 h-74 align-items-center d-flex">
                <Container>
                    <Link href="/">
                        <Image src={logo} alt="deko-buddy" width={267} height={39} className='wp-220 h-auto' />
                    </Link>
                </Container>
            </Container>
        </>
    )
}
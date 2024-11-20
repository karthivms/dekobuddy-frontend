
import Link from "next/link";
import { Container } from "react-bootstrap";

export interface banner {
    id: number,
    banner_image: string,
    banner_name: string,
    banner_button: string
}

export default function Banner({ data }: { data: banner }) {
    return (
        <Container fluid className="banner text-center pt-5" style={{ backgroundImage: `url(${data.banner_image})` }}>
            <h1 className="font-2 font-h1 text-white font-sm-h2">&quot;{data.banner_name}&quot;</h1>
            <div className="btn-banner mx-auto mt-5">
                <Link  className="font-large font-sm-primary fw-4 d-inline-block" href="/shop">{data.banner_button}</Link>
            </div>
        </Container>
    )
}
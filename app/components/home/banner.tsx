
import { Container } from "react-bootstrap";

export default function Banner() {
    return (
        <Container fluid className="banner text-center pt-5">
            <h1 className="font-2 font-h1 text-white font-sm-h2">&quot;ARTISTRY IN EVERY THREAD&quot;</h1>
            <div className="btn-banner mx-auto mt-5"><a className="font-large font-sm-primary fw-4 d-inline-block" href="/">Shop Now</a></div>
        </Container>
    )
}
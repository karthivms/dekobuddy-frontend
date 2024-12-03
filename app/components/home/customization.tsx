import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";

export default function Customization() {
    return (
        <Container className="my-5">
            <h2 className="text-uppercase font-h2 text-center text-theme1 fw-4">Customization</h2>
            <Row className="mt-4 row-gap-20">
                <Col lg={4} >
                    <div className="p-5 bg-white">
                        <h3 className="font-h3 text-theme1 fw-4 mb-3 line-relaxed">Design Your Dream Rug: Your Style, Your Space, Your Way!</h3>
                        <p className=" line-relaxed text-black text-justify m-0">Lorem ipsum dolor sit amet consectetur. Consequat feugiat lacus nisi malesuada aliquet Lorem ipsum dolor
                            sit amet consectetur. Consequat feugiat lacus nisi malesuada alique Lorem ipsum dolor sit amet
                            consectetur. Consequat feugiat lacus nisi malesuada aliquet Lorem ipsum dolor sit amet consectetur.
                            Consequat feugiat lacus nisi malesuada alique.
                        </p>
                        <Link className="btn1 px-3 py-1 mt-3 d-inline-block" href={'/contact-us'}>Enquire Now</Link>
                    </div>
                </Col>
                <Col lg={4} md={6}>
                    <Image src='/images/custom_1.webp' alt='custom_1' className="w-100 h-483" width='508' height='599' />
                </Col>
                <Col lg={4} md={6}>
                    <Image src='/images/custom_2.webp' alt='custom_1' className="w-100 h-483" width='508' height='599' />

                </Col>
            </Row>

        </Container>
    )
}
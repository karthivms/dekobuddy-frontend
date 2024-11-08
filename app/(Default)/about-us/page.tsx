import { Col, Container, Row } from "react-bootstrap";
import "@/app/sass/components/aboutus.scss"
import Image from "next/image";
import ScrollWrapper from "@/app/components/scrollanimation";
import Whychooseus from "@/app/components/home/whychooseus";

export default function Page() {
    return (
        <>
            <Container fluid className="banner3">
                <Container className="d-flex h-100 align-items-center">
                    <h1 className="font-hero font-sm-h1 text-white fw-6 mb-2">About Us</h1>
                </Container>
            </Container>

            <Container className="mt-5">
                <Row className="align-items-center">
                    <Col lg={5} className="about-image-div">
                        <Image src={'/images/about-us.png'} alt="about-us" className="w-100 h-auto" width={725} height={603} />
                        <Image src={'/images/Experience.png'} alt="about-us" className="wp-150 h-auto experience" width={207} height={207} />
                    </Col>
                    <Col className="ps-5">
                        <h2 className="text-uppercase font-h2 text-theme1 fw-4">About Us</h2>
                        <p className="text-justify line-relaxed text-black">Lorem ipsum dolor sit amet consectetur. Consequat feugiat lacus nisi malesuada aliquet Lorem ipsum dolor
                            sit amet consectetur. Consequat feugiat lacus nisi malesuada alique Lorem ipsum dolor sit amet
                            consectetur. Consequat feugiat lacus nisi malesuada aliquet Lorem ipsum dolor sit amet consectetur.
                            Consequat feugiat lacus nisi malesuada alique Lorem ipsum dolor sit amet consectetur. Consequat feugiat
                            lacus nisi malesuada aliquet Lorem ipsum dolor sit amet consectetur. Consequat feugiat lacus nisi
                            malesuada alique</p>
                        <p className="text-justify line-relaxed text-black">
                            Lorem ipsum dolor sit amet consectetur. Consequat feugiat lacus nisi malesuada aliquet Lorem ipsum
                            dolor sit amet consectetur. Consequat feugiat lacus nisi malesuada alique Lorem ipsum dolor sit amet
                            consectetur. Consequat feugiat lacus nisi malesuada aliquet Lorem ipsum dolor sit amet consectetur.
                            Consequat feugiat lacus nisi malesuada alique
                        </p>
                        <p className="text-justify line-relaxed text-black">Lorem ipsum dolor sit amet consectetur. Consequat feugiat lacus nisi malesuada aliquet Lorem ipsum dolor
                            sit amet consectetur.</p>
                    </Col>
                </Row>
            </Container>

            <Container className="mt-5">
                <Row className="align-items-center">
                    <Col>
                        <p className="text-center line-relaxed text-black">Lorem ipsum dolor sit amet consectetur. Consequat feugiat lacus nisi malesuada aliquet Lorem ipsum dolor
                            sit amet consectetur. Consequat feugiat lacus nisi malesuada alique Lorem ipsum dolor sit amet
                            consectetur. Consequat feugiat lacus nisi malesuada aliquet Lorem ipsum dolor sit amet consectetur.
                            Consequat feugiat lacus nisi malesuada alique Lorem ipsum dolor sit amet consectetur. Consequat feugiat
                            lacus nisi malesuada aliquet Lorem ipsum dolor sit amet consectetur. Consequat feugiat lacus nisi
                            malesuada alique</p>
                    </Col>
                    <Col lg={5}>
                        <Image src={'/images/About-us-2.png'} alt="about-us" className="w-100 h-auto" width={861} height={430} />
                    </Col>
                </Row>
            </Container>


            <Container className="mt-5">
                <Row className="align-items-center">
                    <Col lg={5}>
                        <Image src={'/images/About-us-3.png'} alt="about-us" className="w-100 h-auto" width={861} height={430} />
                    </Col>
                    <Col>
                        <p className="text-center line-relaxed text-black">Lorem ipsum dolor sit amet consectetur. Consequat feugiat lacus nisi malesuada aliquet Lorem ipsum dolor
                            sit amet consectetur. Consequat feugiat lacus nisi malesuada alique Lorem ipsum dolor sit amet
                            consectetur. Consequat feugiat lacus nisi malesuada aliquet Lorem ipsum dolor sit amet consectetur.
                            Consequat feugiat lacus nisi malesuada alique Lorem ipsum dolor sit amet consectetur. Consequat feugiat
                            lacus nisi malesuada aliquet Lorem ipsum dolor sit amet consectetur. Consequat feugiat lacus nisi
                            malesuada alique</p>
                    </Col>

                </Row>
            </Container>
            <div className="mt-5">
                {/* <ScrollWrapper direction={20}>
                    <Whychooseus />
                </ScrollWrapper> */}
            </div>
        </>
    )
}
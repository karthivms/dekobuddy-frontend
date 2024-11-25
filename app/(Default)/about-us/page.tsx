import { Col, Container, Row } from "react-bootstrap";
import "@/app/sass/components/aboutus.scss"
import Image from "next/image";


export default function Page() {
    return (
        <>
            <Container fluid className="banner3">
                <Container className="d-flex h-100 align-items-center">
                    <h1 className="font-hero font-sm-h1 text-white fw-6 mb-2">About Us</h1>
                </Container>
            </Container>

            <Container className="mt-5" >
                <Row className="align-items-center">
                    <Col lg={{ span: 5, order: 1 }} className="about-image-div" xs={{ order: 2 }} >
                        <Image src={'/images/About-us.png'} alt="about-us" className="w-100 h-auto" width={725} height={603} />
                        <Image src={'/images/Experience.png'} alt="about-us" className="wp-150 h-auto experience" width={207} height={207} />
                    </Col>
                    <Col className="ps-lg-5" xs={{ order: 1 }}>
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
                            Consequat feugiat lacus nisi malesuada alique.
                        </p>
                        <p className="text-justify line-relaxed text-black">Lorem ipsum dolor sit amet consectetur. Consequat feugiat lacus nisi malesuada aliquet Lorem ipsum dolor
                            sit amet consectetur.</p>
                    </Col>
                </Row>
            </Container>


            <Container className="mt-5">
                <h3 className="text-center font-h2 text-theme1 fw-4 text-uppercase">Our Story</h3>
                <p className="text-center line-relaxed text-black">Lorem ipsum dolor sit amet consectetur. Consequat feugiat lacus nisi malesuada aliquet Lorem ipsum dolor
                    sit amet consectetur. Consequat feugiat lacus nisi malesuada alique Lorem ipsum dolor sit amet
                    consectetur. Consequat feugiat lacus nisi malesuada aliquet Lorem ipsum dolor sit amet consectetur.
                    Consequat feugiat lacus nisi malesuada alique Lorem ipsum dolor sit amet consectetur. Consequat feugiat
                    lacus nisi malesuada aliquet Lorem ipsum dolor sit amet consectetur. Consequat feugiat lacus nisi
                    malesuada alique</p>
                <Row className="mt-4 align-items-center story-1">
                    <Col lg={6} className="story-1-image d-flex justify-content-center align-items-center">
                        <h6 className="text-warning font-2">1980</h6>
                    </Col>
                    <Col >
                        <div className="bg-white py-4 px-2 px-lg-5 br-10 story-1-content">
                            <h4 className="text-center font-h3  fw-4 ">The Beginning of Dekobuddy</h4>
                            <p className="text-center line-relaxed text-black px-3">Lorem ipsum dolor sit amet consectetur. Consequat feugiat lacus nisi malesuada aliquet Lorem ipsum dolor
                                sit amet consectetur. Consequat feugiat lacus nisi malesuada alique Lorem ipsum dolor sit amet
                                consectetur. Consequat feugiat lacus nisi malesuada aliquet Lorem ipsum dolor sit amet consectetur.
                                Consequat feugiat lacus nisi malesuada alique Lorem ipsum dolor sit amet consectetur. Consequat feugiat
                                lacus nisi malesuada aliquet Lorem ipsum dolor sit amet consectetur. Consequat feugiat lacus nisi
                                malesuada alique</p>
                        </div>
                    </Col>


                </Row>
            </Container>


            <Container className="mt-5">
                <Row className="align-items-center">
                    <Col lg={{ span: 5, order: 1 }} xs={{ order: 2 }}>
                        <Image src={'/images/our-values.webp'} alt="about-us" className="w-100 h-auto" width={861} height={430} />
                    </Col>
                    <Col lg={{ order: 2 }} xs={{ order: 1 }}>
                        <h3 className="text-center font-h2 text-theme1 fw-4 text-uppercase">Our Values</h3>

                        <p className="text-center line-relaxed text-black">
                            Lorem ipsum dolor sit amet consectetur. Consequat feugiat lacus nisi malesuada aliquet Lorem ipsum dolor
                            sit amet consectetur. Consequat feugiat lacus nisi malesuada alique Lorem ipsum dolor sit amet
                            consectetur. Consequat feugiat lacus nisi malesuada aliquet Lorem ipsum dolor sit amet consectetur.
                            Consequat feugiat lacus nisi malesuada alique Lorem ipsum dolor sit amet consectetur. Consequat feugiat
                            lacus nisi malesuada aliquet Lorem ipsum dolor sit amet consectetur. Consequat feugiat lacus nisi
                            malesuada alique</p>
                    </Col>

                </Row>
            </Container>

            <Container className="mt-5">
                <Row className="align-items-center">
                    <Col >
                    <h3 className="text-center font-h2 text-theme1 fw-4 text-uppercase">Our Mission</h3>

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
                    <Col lg={{ span: 5, order: 1 }} xs={{ order: 2 }}>
                        <Image src={'/images/About-us-3.png'} alt="about-us" className="w-100 h-auto" width={861} height={430} />
                    </Col>
                    <Col lg={{ order: 2 }} xs={{ order: 1 }}>
                    <h3 className="text-center font-h2 text-theme1 fw-4 text-uppercase">Our Vision</h3>

                        <p className="text-center line-relaxed text-black">
                            Lorem ipsum dolor sit amet consectetur. Consequat feugiat lacus nisi malesuada aliquet Lorem ipsum dolor
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

import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import '@/app/sass/components/dekobuddylux.scss';
import Link from "next/link";


import type { Metadata } from 'next'
import Faq from "@/app/components/dekobuddy-lux/Faq";

export const metadata: Metadata = {
    title: 'Dekobuddy Lux',
    description: '',
}

export default function Page() {
    return (
        <>

            <Container fluid className="banner3">
                <Container className="d-flex h-100 align-items-center">
                    <h1 className="font-hero font-sm-h1 text-white fw-6 mb-2">Dekobuddy Lux</h1>
                </Container>
            </Container>

            <Container className="" >
                <Row className="pt-5 pb-5">
                    <Col lg={{ span: 5, order: 1 }} className="dekolux-image-div mt-5" xs={{ order: 2 }} >
                        <Image src={'/images/Dekobuddy-lux.webp'} alt="dekobubby-lux" className="w-100 h-auto" width={600} height={796} />
                    </Col>
                    <Col lg={{ order: 2 }} xs={{ order: 1 }} className="ps-lg-5" >
                        <h2 className="text-uppercase font-2 font-h2 text-theme1 fw-4">Dekobuddy Lux</h2>
                        <h3 className="font-h3 text-theme1 fw-4 my-3">&quot;Where Elegance Meets Your Floors&quot;</h3>
                        <p className=" line-relaxed text-black text-justify my-4">Lorem ipsum dolor sit amet consectetur. Consequat feugiat lacus nisi malesuada aliquet Lorem ipsum dolor
                            sit amet consectetur. Consequat feugiat lacus nisi malesuada alique Lorem ipsum dolor sit amet
                            consectetur. Consequat feugiat lacus nisi malesuada aliquet Lorem ipsum dolor sit amet consectetur.
                            Consequat feugiat lacus nisi malesuada alique Lorem ipsum dolor sit amet consectetur. Consequat feugiat
                            lacus nisi malesuada aliquet Lorem ipsum dolor sit amet consectetur. Consequat feugiat lacus nisi
                            malesuada alique. Lorem ipsum dolor sit amet consectetur. Consequat feugiat lacus nisi malesuada aliquet Lorem ipsum
                            dolor sit amet consectetur. Consequat feugiat lacus nisi malesuada alique Lorem ipsum dolor sit amet
                            consectetur. Consequat feugiat lacus nisi malesuada aliquet Lorem ipsum dolor sit amet consectetur.
                            Consequat feugiat lacus nisi malesuada alique.
                        </p>
                        <Row className="py-4 ms-1 mt-4 px-3 gap-10 row-gap-20 bg-theme2 align-items-center">
                            <Col xl={5} lg={12} >
                                <Image src={'/images/dekolux-feature.webp'} alt="dekobuddy-lux" className="w-100 h-auto" width={360} height={312} />
                            </Col>
                            <Col>
                                <ul className="lux-features p-0 m-0 d-flex flex-column row-gap-10">
                                    {[...Array(5)].map((item, index) => (
                                        <li key={`deklux_feature_${index}`} className="font-primary fw-3 d-flex gap-10 align-items-start">
                                            <Image src={'/images/feature-icon.png'} width={36} height={36} className="wp-30 h-auto" alt="feature" />
                                            Lorem ipsum dolor sit amet consectetur. Consequat feugiat lacu
                                        </li>

                                    ))}

                                </ul>
                            </Col>

                        </Row>
                        <Link href={'/dekobuddy-lux-products'} className="btn1 py-1 px-3 br-0 font-primary mt-4 d-inline-block">Shop Now</Link>

                    </Col>
                </Row>
            </Container>

            <div className="bg-theme2 ">
                <Container  >
                    <Row className="align-items-center p-3 row-gap-20 p-lg-0">

                        <Col className="bg-white p-lg-5 p-4" xl={4} lg={6}>
                            <h3 className="font-h3 text-theme1 fw-4 my-3">Unique Artifacts Crafted with Love</h3>
                            <p className=" line-relaxed text-black text-justify">Lorem ipsum dolor sit amet consectetur. Consequat feugiat lacus nisi malesuada aliquet Lorem ipsum dolor
                                sit amet consectetur. Consequat feugiat lacus nisi malesuada alique Lorem ipsum dolor sit amet
                                consectetur. Consequat feugiat lacus nisi malesuada aliquet Lorem ipsum dolor sit amet consectetur.
                                Consequat feugiat lacus nisi malesuada alique Lorem ipsum dolor sit amet consectetur. Consequat feugiat
                                lacus nisi malesuada aliquet Lorem ipsum dolor sit amet consectetur. Consequat feugiat lacus nisi
                                malesuada alique</p>
                        </Col>
                        <Col className="p-0" xl={4} lg={6}>
                            <Image src={'/images/dekobuddy-lux-faq.webp'} alt="artisans_1" className="w-100 h-auto" width={526} height={466} />
                        </Col>
                        <Col className="p-0" xl={4}>

                            <Faq />


                        </Col>
                    </Row>
                </Container>
            </div>

            <Container className="my-5 ps-lg-0 deko-gallery ps-4">
                <Row className="gap-20 row-gap-20">
                    <Col xl={7}>
                        <Image src='/images/gal-1.webp' width={919} height={851} className="w-100 h-auto" alt="gallery_img_1" />
                    </Col>
                    <Col className="flex-column row-gap-30 d-flex">
                        <div>

                            <Image src='/images/gal-2.webp' width={725} height={410} className="w-100 h-auto" alt="gallery_img_1" />
                        </div>
                        <Row className="gap-20">
                            <Col>
                                <Image src='/images/gal-3.webp' width={347} height={410} className="w-100 h-auto" alt="gallery_img_1" />
                            </Col>
                            <Col>
                                <Image src='/images/gal-4.webp' width={347} height={410} className="w-100 h-auto" alt="gallery_img_1" />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>


        </>
    )
}
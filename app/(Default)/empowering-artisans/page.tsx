import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import '@/app/sass/components/artisans.scss';
import benefits from '@/app/datas/artisans/benefits.json';


import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Empowering Artisans',
    description: '',
}

export default function Page() {
    return (
        <>

            <Container fluid className="banner3">
                <Container className="d-flex h-100 align-items-center">
                    <h1 className="font-hero font-sm-h1 text-white fw-6 mb-2">Empowering Artisans</h1>
                </Container>
            </Container>

            <div className="artisans-div">
                <Container className="py-5 " >
                    <Row className="align-items-center py-5">
                        <Col lg={{ span: 5, order: 1 }} className="artisans-image-div" xs={{ order: 2 }} >
                            <Image src={'/images/Artisans_img.webp'} alt="artisan_1" className="w-100 h-auto" width={526} height={466} />
                        </Col>
                        <Col lg={{ order: 2 }} xs={{ order: 1 }} className="ps-lg-5 text-center" >
                            <h2 className="text-uppercase font-2 font-h2 text-theme1 fw-4">Supporting Artisans</h2>
                            <h3 className="font-h3 text-theme1 fw-4 my-3">&quot;A Journey Toward Empowerment&quot;</h3>
                            <p className=" line-relaxed text-black">Lorem ipsum dolor sit amet consectetur. Consequat feugiat lacus nisi malesuada aliquet Lorem ipsum dolor
                                sit amet consectetur. Consequat feugiat lacus nisi malesuada alique Lorem ipsum dolor sit amet
                                consectetur. Consequat feugiat lacus nisi malesuada aliquet Lorem ipsum dolor sit amet consectetur.
                                Consequat feugiat lacus nisi malesuada alique Lorem ipsum dolor sit amet consectetur. Consequat feugiat
                                lacus nisi malesuada aliquet Lorem ipsum dolor sit amet consectetur. Consequat feugiat lacus nisi
                                malesuada alique</p>
                            <p className="line-relaxed text-black">
                                Lorem ipsum dolor sit amet consectetur. Consequat feugiat lacus nisi malesuada aliquet Lorem ipsum
                                dolor sit amet consectetur. Consequat feugiat lacus nisi malesuada alique Lorem ipsum dolor sit amet
                                consectetur. Consequat feugiat lacus nisi malesuada aliquet Lorem ipsum dolor sit amet consectetur.
                                Consequat feugiat lacus nisi malesuada alique.
                            </p>

                        </Col>
                    </Row>
                </Container>
            </div>


            <div className="artisans-div right-div">
                <Container className="py-5 " >
                    <Row className="align-items-center py-5">

                        <Col className="pe-lg-5 text-center" >
                            <h2 className="text-uppercase font-2 font-h2 text-theme1 fw-4">Bridging Tradition and Modernity</h2>
                            <h3 className="font-h3 text-theme1 fw-4 my-3">&quot;Unique Artifacts Crafted with Love&quot;</h3>
                            <p className=" line-relaxed text-black">Lorem ipsum dolor sit amet consectetur. Consequat feugiat lacus nisi malesuada aliquet Lorem ipsum dolor
                                sit amet consectetur. Consequat feugiat lacus nisi malesuada alique Lorem ipsum dolor sit amet
                                consectetur. Consequat feugiat lacus nisi malesuada aliquet Lorem ipsum dolor sit amet consectetur.
                                Consequat feugiat lacus nisi malesuada alique Lorem ipsum dolor sit amet consectetur. Consequat feugiat
                                lacus nisi malesuada aliquet Lorem ipsum dolor sit amet consectetur. Consequat feugiat lacus nisi
                                malesuada alique</p>
                            <p className="line-relaxed text-black">
                                Lorem ipsum dolor sit amet consectetur. Consequat feugiat lacus nisi malesuada aliquet Lorem ipsum
                                dolor sit amet consectetur. Consequat feugiat lacus nisi malesuada alique Lorem ipsum dolor sit amet
                                consectetur. Consequat feugiat lacus nisi malesuada aliquet Lorem ipsum dolor sit amet consectetur.
                                Consequat feugiat lacus nisi malesuada alique.
                            </p>

                        </Col>
                        <Col lg={5} className="artisans-image-div" >
                            <Image src={'/images/artisans_img_2.webp'} alt="artisans_1" className="w-100 h-auto" width={526} height={466} />
                        </Col>
                    </Row>
                </Container>
            </div>


            <Container className="my-5 text-center" >

                <h2 className="text-uppercase font-2 font-h2 text-theme1 fw-4">Features of Our Products</h2>
                <h3 className="font-h3 text-theme1 fw-4 my-3">&quot;Masterpieces of Tradition and Talent&quot;</h3>
                <Row className="mt-4 py-3">
                    {benefits.map((item, index) => (
                        <Col key={`benefits_${index}`} className="py-0">
                            <div className="wp-130 h-130 d-flex justify-content-center align-items-center br-65 bg-theme1 m-auto">
                                <Image src={item.image} alt="benefits" className="wp-70 h-70" width={95} height={95} />
                            </div>
                            <h6 className="font-h3 font-2 my-3">{item.name}</h6>

                            <p className="line-relaxed text-black px-lg-4 mb-0">
                                {item.content}
                            </p>
                        </Col>

                    ))}
                </Row>



            </Container>
        </>
    )
}
import { Col, Container, Row } from "react-bootstrap";
import "@/app/sass/components/aboutus.scss"
import Image from "next/image";

import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About Company',
    description: '',
}

export default function Page() {
    return (
        <>
            <Container fluid className="banner3">
                <Container className="d-flex h-100 align-items-center">
                    <h1 className="font-hero font-sm-h1 text-white fw-6 mb-2">About Dekobuddy</h1>
                </Container>
            </Container>


            <Container className="mt-5">

                <Row className="mt-4 align-items-center story-1">
                    <Col lg={6} className="story-1-image d-flex justify-content-center align-items-center">
                        <h6 className="text-warning font-2">2020</h6>
                    </Col>
                    <Col >
                        <div className="bg-white py-4 px-2 px-lg-5 br-10 story-1-content">
                            <h4 className="text-center font-h3  fw-4 ">The Beginning of Dekobuddy</h4>
                            <p className="text-center line-relaxed text-black px-3">Founded in 2020 in Bhadohi, the City of Carpets, DEKOBUDDY Rugs is a brand dedicated to creating luxurious, handcrafted rugs that honor the rich traditions of carpet weaving while embracing modern design sensibilities. Bhadohi&apos;s legacy of craftsmanship inspires us to celebrate its artisans and bring their timeless artistry to the world.</p>
                        </div>
                    </Col>


                </Row>
                <h3 className=" font-h2 text-theme1 fw-4 mt-5 ">Empowering Weavers: Our Core Commitment</h3>
                <p className=" line-relaxed text-black">At DEKOBUDDY Rugs, our primary focus is on empowering the talented weavers who form the backbone of our brand. We work closely with these skilled artisans, providing them with sustainable livelihoods, skill development opportunities, and fair wages. By integrating them into our global value chain, we aim to uplift their communities and preserve the centuries-old traditions of rug-making.</p>
                <p className=" line-relaxed text-black">
                    We believe that empowering weavers is not just an initiative—it&apos;s a responsibility. Through our efforts, we seek to ensure that their art thrives for generations to come, while also improving their quality of life.
                </p>
                <h6 className=" font-h3 text-theme1 fw-4 mt-3">What We Stand For</h6>
                <ul className="line-relaxed text-black mt-3 ms-0 ps-0">
                    <li><strong>Heritage:</strong> Rooted in Bhadohi&apos;s carpet-making legacy, we honor traditional weaving techniques passed down through generations.</li>
                    <li><strong>Craftsmanship:</strong> Every DEKOBUDDY rug is a testament to meticulous craftsmanship and unparalleled attention to detail.</li>
                    <li><strong>Innovation:</strong> We blend time-honored artistry with contemporary designs to create rugs that suit modern lifestyles.</li>
                    <li><strong>Sustainability:</strong> Our eco-friendly practices and ethical sourcing reflect our commitment to protecting the environment and supporting artisan communities.</li>
                    <li><strong>Empowerment:</strong> We prioritize the welfare and growth of our weavers, ensuring their work is recognized and rewarded.</li>
                </ul>

            </Container>
            <Container className="mt-5" >

                <Row className="align-items-center">
                    <Col lg={{ span: 5, order: 1 }} className="about-image-div" xs={{ order: 2 }} >
                        <Image src={'/images/About-us.webp'} alt="about-us" className="w-100 h-auto" width={725} height={603} />
                        {/* <Image src={'/images/Experience.png'} alt="about-us" className="wp-150 h-auto experience" width={207} height={207} /> */}
                    </Col>
                    <Col className="ps-lg-5" xs={{ order: 1 }}>
                        <h2 className="font-h2 text-theme1 fw-4">Organizational Value Statement for DEKOBUDDY Rugs</h2>
                        <p className="text-justify line-relaxed text-black">At DEKOBUDDY Rugs, we are driven by a clear purpose: to craft luxurious, timeless rugs that transform spaces and elevate lives. Our values guide every decision, ensuring that we not only create exceptional products but also foster meaningful connections and a lasting impact.</p>
                        <ul className="line-relaxed text-black mt-3 ps-0">
                            <li><strong>Integrity:</strong> We do what&apos;s right, always. Integrity is the foundation of our relationships, inspiring trust, authenticity, and accountability in everything we do.</li>
                            <li><strong>Humility:</strong> We believe in staying grounded and open to learning. Humility allows us to respect every perspective, celebrate teamwork, and continually improve.</li>
                            <li><strong>Empathy:</strong> At DEKOBUDDY, empathy is more than a value—it&apos;s a practice. We strive to bring care and understanding to our work, going above and beyond to empower and uplift those we interact with.</li>
                            <li><strong>Shared Wisdom:</strong> Knowledge is most valuable when shared. We embrace the responsibility to use our expertise for the collective good, inspiring growth and collaboration.</li>
                            <li><strong>Simplicity:</strong> We value clarity and effortlessness in our approach. Simplicity is our way of ensuring honest communication and seamless experiences, both in our designs and in how we work.</li>

                        </ul>


                    </Col>


                </Row>
                <ul className="line-relaxed text-black mt-3 ps-0">

                    <li><strong>Excellence:</strong> Creating rugs is our art form, and excellence is our standard. Every piece reflects our unwavering dedication to detail, quality, and beauty.</li>
                    <li><strong>Sustainability:</strong> We are committed to preserving the planet. By sourcing responsibly and prioritizing eco-friendly practices, we ensure our work benefits future generations as much as it does today.</li>
                    <li><strong>Innovation:</strong> Tradition meets modernity at DEKOBUDDY. We constantly push creative boundaries, blending timeless artistry with fresh ideas to redefine luxury.</li>
                </ul>
                <p className="line-relaxed text-black">Our purpose is simple yet profound: to enrich homes and hearts with rugs that are as meaningful as they are beautiful. Through our values, we aim to leave a legacy of elegance, trust, and care.</p>
            </Container>







            <Container className="mt-5">
                <Row className="align-items-center gap-20">
                    <Col >
                        <h3 className="text-center font-h2 text-theme1 fw-4 text-uppercase">Our Mission</h3>

                        <p className="text-center line-relaxed text-black">To transform living spaces with handcrafted rugs that blend beauty, functionality, and sustainability, while creating meaningful opportunities for the weavers who bring our vision to life.</p>
                    </Col>
                    <Col lg={5}>
                        <Image src={'/images/About-us-2.webp'} alt="about-us" className="w-100 h-auto" width={861} height={430} />
                    </Col>
                </Row>
            </Container>


            <Container className="mt-5">
                <Row className="align-items-center gap-20">
                    <Col lg={{ span: 5, order: 1 }} xs={{ order: 2 }}>
                        <Image src={'/images/About-us-3.webp'} alt="about-us" className="w-100 h-auto" width={861} height={430} />
                    </Col>
                    <Col lg={{ order: 2 }} xs={{ order: 1 }}>
                        <h3 className="text-center font-h2 text-theme1 fw-4 text-uppercase">Our Vision</h3>

                        <p className="text-center line-relaxed text-black">
                            To become a global leader in luxury rugs, celebrated for our exceptional craftsmanship, innovative designs, and commitment to empowering artisans and preserving Bhadohi&apos;s heritage.</p>
                    </Col>

                </Row>
            </Container>

            <Container className="mt-5">
                <Row className="align-items-center gap-20">
                    <Col lg={{ span: 5, order: 2 }} xs={{ order: 2 }}>
                        <Image src={'/images/our-values.webp'} alt="about-us" className="w-100 h-auto" width={861} height={430} />
                    </Col>
                    <Col lg={{ order: 1 }} xs={{ order: 1 }}>
                        <h3 className="font-h2 text-theme1 fw-4 text-uppercase">Why Choose DEKOBUDDY Rugs?</h3>



                        <ul className="line-relaxed text-black ms-0 mt-3 ps-0">
                            <li><strong>Authenticity:</strong> Each rug tells a story of authenticity and the unmatched skill of Bhadohi&apos;s artisans.</li>
                            <li><strong>Empowerment:</strong> By choosing DEKOBUDDY, you contribute to the well-being of weaving communities and the preservation of their craft.</li>
                            <li><strong>Customization:</strong> We offer personalized solutions to ensure your rug complements your unique style and space.</li>
                            <li><strong>Luxury:</strong> Combining the finest materials with exquisite designs, our rugs are a hallmark of sophistication.</li>
                            <li><strong>Global Appeal:</strong> While rooted in Bhadohis traditions, our rugs are designed to cater to the tastes of customers worldwide.</li>
                        </ul>

                    </Col>

                </Row>
                <p className="line-relaxed text-center">   DEKOBUDDY Rugs is more than just a brand; it is a movement to celebrate the artistry of weavers, preserve the heritage of Bhadohi, and bring timeless elegance to homes across the globe.</p>
            </Container>
            <div className="mt-5">
                {/* <ScrollWrapper direction={20}>
                    <Whychooseus />
                </ScrollWrapper> */}
            </div>
        </>
    )
}
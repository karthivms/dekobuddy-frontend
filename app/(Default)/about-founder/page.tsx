import { Col, Container, Row } from "react-bootstrap";
import "@/app/sass/components/aboutus.scss"
import Image from "next/image";


export default function Page() {
    return (
        <>
            <Container fluid className="banner3">
                <Container className="d-flex h-100 align-items-center">
                    <h1 className="font-hero font-sm-h1 text-white fw-6 mb-2">About Founder</h1>
                </Container>
            </Container>



            <Container className="mt-5" >

                <Row className="align-items-center">
                    <Col lg={{ span: 5, order: 1 }} className="about-image-div" xs={{ order: 2 }} >
                        <Image src={'/images/About-us.png'} alt="about-us" className="w-100 h-auto" width={725} height={603} />
                        {/* <Image src={'/images/Experience.png'} alt="about-us" className="wp-150 h-auto experience" width={207} height={207} /> */}
                    </Col>
                    <Col className="ps-lg-5" xs={{ order: 1 }}>
                        <h2 className="font-h2 text-theme1 fw-4">About the Founder: Mr. Ahad</h2>
                        <p className="text-justify line-relaxed text-black">Mr. Ahad, the visionary founder of DEKOBUDDY Rugs, embarked on an extraordinary journey driven by purpose and compassion. Born and raised in Bhadohi, the &ldquo;City of Carpets,&ldquo; he grew up amidst the rich traditions of rug craftsmanship, as his family was deeply rooted in the rug manufacturing industry. While his upbringing offered him a firsthand appreciation for the artistry of rug-making, it also exposed him to the challenges faced by the weavers who bring these masterpieces to life.</p>
                        <p className="text-justify line-relaxed text-black">
                            During his preparation for the Indian Administrative Services (IAS), a visit to his hometown became a pivotal moment. Witnessing the daily struggles of the weavers—many of whom grappled with economic hardships despite their exceptional skills—ignited a profound sense of responsibility in him. The contrast between the global admiration for Bhadohi&apos;s rugs and the underappreciation of the weavers efforts inspired him to make a life-changing decision. He chose to step away from his IAS aspirations and dedicate himself to uplifting the weaving community and preserving their art.
                        </p>

                    </Col>


                </Row>
            </Container>


            <Container className="mt-5">
                <Row className="align-items-center gap-20">
                    <Col >
                        <h3 className=" font-h2 text-theme1 fw-4 text-uppercase">A Vision of Empowerment</h3>

                        <p className=" line-relaxed text-black">Mr. Ahad&apos;s mission was clear: to bridge the gap between the immense talent of the weavers and the global demand for their work. With DEKOBUDDY Rugs, he envisioned not just a brand, but a platform to empower artisans, celebrate their craftsmanship, and ensure they receive the recognition and rewards they deserve.</p>
                        <p className=" line-relaxed text-black">    Drawing on his family&apos;s expertise in rug manufacturing, Mr. Ahad combined traditional knowledge with modern business practices to create DEKOBUDDY Rugs in 2020. His approach focuses on sustainable livelihoods, fair trade, and skill development for weavers, while delivering luxurious, handcrafted rugs to homes worldwide.
                        </p>
                    </Col>
                    <Col lg={5}>
                        <Image src={'/images/About-us-2.png'} alt="about-us" className="w-100 h-auto" width={861} height={430} />
                    </Col>
                </Row>
            </Container>


            <Container className="mt-5">
                <Row className="align-items-center gap-20">
                    <Col lg={{ span: 5, order: 1 }} xs={{ order: 2 }}>
                        <Image src={'/images/About-us-3.png'} alt="about-us" className="w-100 h-auto" width={861} height={430} />
                    </Col>
                    <Col lg={{ order: 2 }} xs={{ order: 1 }}>
                        <h3 className="font-h2 text-theme1 fw-4 text-uppercase">Guiding Principles</h3>
                        <ul className="line-relaxed text-black ms-0 mt-3 ps-0">
                            <li><strong>Empathy and Responsibility:</strong> Deeply moved by the challenges faced by weavers, Mr. Ahad&apos;s leadership is guided by a genuine commitment to their welfare and growth.</li>
                            <li><strong>Heritage and Innovation:</strong> He seamlessly integrates Bhadohi&apos;s rich rug-making legacy with contemporary designs to meet modern tastes.</li>
                            <li><strong>Sustainability:</strong> Mr. Ahad ensures that DEKOBUDDY Rugs adopts eco-friendly practices, reflecting his dedication to ethical business operations.</li>
                        </ul>

                    </Col>

                </Row>
            </Container>

            <Container className="mt-5">
                <Row className="align-items-center gap-20">
                    <Col lg={{ span: 5, order: 2 }} xs={{ order: 2 }}>
                        <Image src={'/images/our-values.webp'} alt="about-us" className="w-100 h-auto" width={861} height={430} />
                    </Col>
                    <Col lg={{ order: 1 }} xs={{ order: 1 }}>
                        <h3 className="font-h2 text-theme1 fw-4 text-uppercase">A Legacy in the Making</h3>
                        <p className="line-relaxed text-black">
                            DEKOBUDDY Rugs is more than just a brand; it is a movement to celebrate the artistry of weavers, preserve the heritage of Bhadohi, and bring timeless elegance to homes across the globe.</p>
                        <p className="line-relaxed text-black">Through his work, Mr. Ahad embodies the spirit of transformation, proving that true leadership lies in lifting others and building a future that honors tradition, promotes sustainability, and celebrates humanity.</p>



                    </Col>

                </Row>
            </Container >
            <div className="mt-5">
                {/* <ScrollWrapper direction={20}>
                    <Whychooseus />
                </ScrollWrapper> */}
            </div>
        </>
    )
}
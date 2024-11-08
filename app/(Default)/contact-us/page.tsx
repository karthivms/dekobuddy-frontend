import { Col, Container, Row } from "react-bootstrap";
import '@/app/sass/components/contactus.scss';
import contact from '@/app/datas/contact/contact.json'
import Link from "next/link";
import Phone from "@/app/components/icons/phone2";
import Envelope from "@/app/components/icons/envelope";
import Location from "@/app/components/icons/location";
import ContactForm from "@/app/components/contact/contactform";

export default function Page() {
    const getIcon = (item: string) => {
        switch (item) {
            case "Phone":
                return <Phone />
            case "Email":
                return <Envelope width="25px" height="25px" />
            case "Location":
                return <Location />
        }
    }

    return (
        <>
            <Container fluid className="banner4">
                <Container className="d-flex h-100 align-items-center">
                    <h1 className="font-hero font-sm-h1 text-white fw-6 mb-2">Contact Us</h1>
                </Container>
            </Container>

            <Container className="mt-5">
                <Row className="gap-30">
                    <Col>
                        <h2 className="font-h2 text-theme1 fw-4">Get In Touch</h2>
                        <p className="text-justify line-relaxed text-black my-3">
                            Lorem ipsum dolor sit amet consectetur Sed ullamcorper pulvinar massa ultr dignissim
                            eget.Lorem ipsum dolor sit amet consectetur.</p>
                        <ul className="mt-4">
                            {contact.map((item) => (
                                <li className="mb-5" key={`contact_${item.name}`}>
                                    <div className="d-flex gap-20 align-items-center">
                                        <div className="bg-theme1 align-items-center justify-content-center wp-55 h-55 br-5 d-flex">
                                            <span className="text-theme1 br-20 p-1 bg-white">{getIcon(item.name)}</span>
                                        </div>
                                        <div>
                                            <h3 className="font-h3 text-black fw-5 mb-1">{item.name}</h3>
                                            <Link href={item.link} className="font-primary">{item.data}</Link>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Col>
                    <Col className="bg-theme2 p-5 br-10">
                        <ContactForm />
                    </Col>
                </Row>

            </Container>

            <Container className="my-5">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.5910763898614!2d80.9985806!3d26.8529557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be30076f4a92f%3A0x5ec36237bb8b9e4f!2sDEKOBUDDY!5e0!3m2!1sen!2sin!4v1730963893728!5m2!1sen!2sin" width="100%" height="350"   loading="lazy" ></iframe>
            </Container>




        </>
    )
}
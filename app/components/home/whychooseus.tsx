import { Col, Container, Row } from "react-bootstrap";
import features from "@/app/datas/home/whychooseus.json"
import Image from "next/image";

interface feature {
    id: number;
    name: string;
    img_url: string;
}



export default function Whychooseus() {
    return (
        <Container className="mt-4 pt-2 mb-5 wc-70 w-sm-100">
            <Row className="row-gap-40">
                {
                    features.map((item: feature) => (
                        <Col lg={3} sm={6} xs={6} key={`feature_${item.id}`} className="text-center">
                            <Image 
                            src={item.img_url} 
                            alt="features" 
                            width={97} 
                            height={97}
                            className="wp-75 h-auto" />
                            <h6 className="mt-3 fw-4">{item.name}</h6>
                        </Col>
                    ))
                }
            </Row>
        </Container>
    )
}
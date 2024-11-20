import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";

interface feature {
    title: string;
    image: string;
}


export default function Whychooseus({features}:{features:feature[]}) {
    return (
        <Container className="mt-4 pt-2 mb-5 wc-70 w-sm-100">
            <Row className="row-gap-40">
                {
                    features.map((item: feature) => (
                        <Col lg={3} sm={6} xs={6} key={`feature_${item.title}`} className="text-center">
                            <Image 
                            src={item.image} 
                            alt="features" 
                            width={97} 
                            height={97}
                            className="wp-75 h-auto" />
                            <h6 className="mt-3 fw-4">{item.title}</h6>
                        </Col>
                    ))
                }
            </Row>
        </Container>
    )
}
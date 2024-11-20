import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";

export default function BottomBar() {
    return (
        <div className="bt-border-2 py-3">
            <Container>
                <Row>
                    <Col xs={12} md={6} lg={6}>
                        <span className="font-primary fw-3">Copyright © {new Date().getFullYear()} All rights reserved.</span>
                    </Col>
                    <Col className="text-start text-lg-end text-md-end" xs={12} md={6} lg={6}>
                        <span className="font-primary fw-3">
                            Website Designed By <Link
                                href="https://www.zinavo.com"
                                target="_blank"
                                className="link1">
                                Zinavo
                            </Link>
                        </span>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
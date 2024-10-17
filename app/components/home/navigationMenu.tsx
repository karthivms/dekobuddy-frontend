import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";

import { CategoryItem } from "@/app/types/types";



export default function NavigationMenu({ links, height, id }: { links: CategoryItem[], height: string, id : string }) {
    return (
        <Container className="mt-4 pt-2">
            <Row className="row-gap-25">
                {links.map((item: CategoryItem) => (
                    <Col
                        lg={4}
                        key={`${id}_${item.id}`}
                    >
                        <div style={{ backgroundImage: `url(${item.image})`, height: `${height}` }}
                            className="br-7 nav-grid d-flex justify-content-center align-items-end">
                            <h3 className="font-h3 text-white fw-3"><Link href={`category/${item.slug}`} >{item.name}</Link></h3>
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}
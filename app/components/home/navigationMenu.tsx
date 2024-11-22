'use client'

import { navigationItem } from "@/app/types/types";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";


export default function NavigationMenu({ links, source, height, id }: { links: navigationItem[], source: string, height: string, id: string }) {
    return (
        <Container className="mt-4 pt-2">
            <Row className="row-gap-25">
                <>
                    {links.map((item: navigationItem) => (
                        <Col
                            lg={4}
                            key={`${id}_${item.id}`}
                        >
                            <div style={{ backgroundImage: `url(${item.image})`, height: `${height}` }}
                                className="br-7 nav-grid d-flex justify-content-center align-items-end">
                                <h3 className="font-h3 text-white fw-3"><Link href={`${source === "category" ? `/category/${item.slug}` : item.link}`} >{item.name}</Link></h3>
                                <Link className="nav-cat-btn" href={`${source === "category" ? `/category/${item.slug}` : item.link}`}>Shop Now</Link>
                            </div>
                        </Col>
                    ))}
                </>


            </Row>
        </Container>
    )
}
'use client'

import Link from "next/link";
import { Container } from "react-bootstrap";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css/effect-fade';

export interface banner {
    id: number,
    banner_image: string,
    banner_name: string,
    link : string,
    banner_button: string
}

export default function Banner({ data }: { data: banner[] }) {
    return (

        <div className="banner-wrapper">
            <Swiper
                slidesPerView={1}
            
                className=""
                effect={'fade'}
                speed = {1500}
                spaceBetween={30}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,

                }}
                modules={[EffectFade, Autoplay]}
            >
                {data.map((item: banner) => (
                    <SwiperSlide key={`banner_${item.id}`}>
                        <Container fluid className="banner text-center pt-5" style={{ backgroundImage: `url(${item.banner_image})` }}>
                            <h1 className="font-2 font-h1 text-white font-sm-h2">&quot;{item.banner_name}&quot;</h1>
                            <div className="btn-banner mx-auto mt-5">
                                <Link className="font-large font-sm-primary fw-4 d-inline-block" href={item.link}>{item.banner_button}</Link>
                            </div>
                        </Container>
                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    )
}
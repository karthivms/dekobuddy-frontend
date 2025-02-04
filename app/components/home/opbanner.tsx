'use client'

import Link from "next/link";
import { Container } from "react-bootstrap";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css/effect-fade';
import Image from "next/image";

export interface banner {
    id: number,
    banner_image: string,
    banner_name: string,
    link: string,
    banner_button: string
}

export default function Banner({ data }: { data: banner[] }) {
    return (

        <div className="banner-wrapper">
            <Swiper
                slidesPerView={1}

                className=""
                effect={'fade'}
                speed={1500}
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
                        <Container fluid className="banner text-center px-0" >
                            <Image src={item.banner_image} width={1900} height={680} alt="banner_image" className="w-100 h-auto" priority />
                            <div className="contentdiv pt-5">
                                <h1 className="font-2 font-h1 text-white font-sm-h2">&quot;{item.banner_name}&quot;</h1>
                                <div className="btn-banner mx-auto mt-5 slide">
                                    <Link className="font-large font-sm-primary fw-4 d-inline-block" href={item.link}>{item.banner_button}</Link>
                                </div>
                            </div>
                        </Container>
                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    )
}
'use client'

import { Container } from "react-bootstrap";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import quote from "@/public/images/quote-1.png";
import Image from "next/image";
import testimonials from "@/app/datas/home/testimonials.json";
import ScrollWrapper from "../scrollanimation";

interface testimonial {
    id: number,
    name: string,
    review: string,
    img_url: string
}


export default function Testimonials() {
    return (
        <div className="py-4 bg-theme2">
            <Container className="wc-77 w-sm-97">
                <ScrollWrapper direction={-20}>
                    <h2 className="mt-3 text-uppercase font-h2 text-center text-theme1 fw-4">Testimonials</h2>
                </ScrollWrapper>
                <ScrollWrapper direction={20}>

                    <Swiper
                        spaceBetween={0}
                        slidesPerView={1}
                        className="pt-5 testimonial-slider"
                        breakpoints={{

                            1024: {
                                slidesPerView: 3,
                                spaceBetween: -10,
                            },
                        }}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        modules={[Autoplay]}
                    >
                        {testimonials.map((item: testimonial) => (
                            <SwiperSlide className="pb-5" key={`testimonila_${item.id}`}>
                                <div className="text-center bg-white p-3 pb-4">
                                    <Image src={quote} alt="quote" width="49" height="49" className="quote" />
                                    <p className="font-primary mt-2 mb-4 pb-2">{item.review}</p>
                                    <div className="client-details">
                                        <Image src={item.img_url} alt="trestimonials" width={75} height={75} className="wp-60 h-auto" />
                                        <h5 className="font-primary fw-4 text-black mt-2">{item.name}</h5>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </ScrollWrapper>
            </Container>
        </div>
    )
}



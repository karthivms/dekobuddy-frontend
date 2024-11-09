'use client'

import Image from "next/image";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { productimage } from "@/app/types/types";




export default function GallerySlider({ images }: { images: productimage[] }) {


    return (
        <div>
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                className="mb-1  galleryslider"
                effect={'fade'}
                pagination={{
                    clickable: true,
                  }}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay, EffectFade, Pagination]}
            >
                {images.map((item: productimage) => (
                    <SwiperSlide  key={`testimonila_${item.id}`}>
                            <Image src={item.image} alt="quote" width="552" height="558" className="w-100 h-400 br-30" />
                            
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
} 
'use client'

import galimages from "@/app/datas/singleproduct/gallery.json";
import Image from "next/image";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';


interface Product {
    id: number;
    product_Image1: string;
}

export default function GallerySlider() {

    const product = {
        id: 1,
        product_Image1: "/images/gallery_img_1.jpg"
    }

    const images = [product, ...galimages];


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
                {images.map((item: Product) => (
                    <SwiperSlide  key={`testimonila_${item.id}`}>
                            <Image src={item.product_Image1} alt="quote" width="552" height="558" className="w-100 h-400 br-30" />
                            
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
} 
'use client'

import Image from 'next/image';
import React, { useRef, useState, MouseEvent } from 'react';
import galimages from "@/app/datas/singleproduct/gallery.json";

interface Product {
    id: number;
    product_Image1: string;
}


const ProductGallery = () => {

    const product = {
        id: 1,
        product_Image1: "/images/gallery_img_1.jpg"
    }


    const [zoomPos, setZoomPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [showZoom, setShowZoom] = useState(false);
    const [activeImage, setActiveImage] = useState<Product>(product);
    const imageRef = useRef<HTMLImageElement>(null);
    const images = [product, ...galimages];

    const handleMouseMove = (e: MouseEvent) => {
        if (!imageRef.current) return;

        const rect = imageRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const boxSize = 200;
        const halfBox = boxSize / 2;

        const zoomX = Math.min(Math.max(x - halfBox, 0), rect.width - boxSize);
        const zoomY = Math.min(Math.max(y - halfBox, 0), rect.height - boxSize);

        setZoomPos({ x: zoomX, y: zoomY });

        const percentX = (x / rect.width) * 100;
        const percentY = (y / rect.height) * 100;

        const zoomResult = document.getElementById('zoom-result');
        if (zoomResult) {
            zoomResult.style.backgroundPosition = `${percentX}% ${percentY}%`;
        }
    };

    const handleActiveImg = (image: Product) => setActiveImage(image);

    return (
        <div className='d-block d-lg-flex gap-40 align-items-center'>
            <div className='product-gallery wc-13 d-flex justify-content-around d-lg-block w-sm-100'>
                {images.map((image: Product) => (
                    <div
                        key={`gallery_img_${image.id}`}
                        className={`${activeImage.id === image.id ? 'border-theme1-solid active' : "border-transparent-solid"} br-10 w-sm-18 mb-4`}
                        onMouseOver={() => handleActiveImg(image)}
                    >
                        <Image
                            src={image.product_Image1}
                            alt={"gallery_image"}
                            width={80}
                            height={80}
                            className='m-auto d-block br-10 w-100 h-auto'
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
            <div
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setShowZoom(true)}
                onMouseLeave={() => setShowZoom(false)}
               >
                <div className='product-image-block'>
                    <Image
                        src={activeImage.product_Image1}
                        alt={"gallery_image"}
                        width={552}
                        height={558}
                        className="d-block wp-420 h-auto m-auto br-30"
                        ref={imageRef}
                        loading="eager"
                    />
                    {showZoom && (
                        <div
                            className="zoomBox"
                            style={{ left: zoomPos.x, top: zoomPos.y }}
                        />
                    )}
                    <div
                        id="zoom-result"
                        className="zoomResult"
                        style={{ display: showZoom ? 'block' : 'none', backgroundImage: `url(${activeImage.product_Image1})` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default React.memo(ProductGallery);

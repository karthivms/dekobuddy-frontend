'use client'

import { Product } from '@/app/types/types';
import { Container } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';
import Addtowishlist from '../category/addtowishlist';
import CartIcon2 from '../icons/carticon2';
import Modal from '../category/Modal';
import Link from 'next/link';
import Star from '../icons/star';

import { useCallback, useState } from 'react';
import Toaster from '../toaster';
import formatPriceIndian from '@/app/utilis/formatPrice';


export default function SimilarProducts({ userid, data }: { userid: string, data: Product[] }) {

    const [attModal, setAttModal] = useState<number | null>(null);
    const [selectedSize, setSelectedsize] = useState(0);


    const handleQuickAddClick = (productId: number) => {
        setAttModal(attModal === productId ? null : productId);
    };

    const getDiscount = useCallback((reg_price: number, sale_price: number) => {
        const discount = Math.floor(reg_price / sale_price * 100);
        return discount;
    }, []);

    const createSlug = useCallback((input: string) => {
        return input.trim().replace(/\s+/g, '-').toLowerCase();
    }, []);

    const cartAPiinfo = {
        quantity: 1,
        user_id: Number(userid)
    }

    const handleToastClose = () => {
        setShow(false);
    }

    const [show, setShow] = useState(false);
    const [wishmsg, SetWishmsg] = useState(true);

    const handleSelected = (value: number) => {
        setSelectedsize(value);
    }

    return (
        <Container className='mt-5 mb-4'>
            <h2 className="mt-3 text-uppercase font-h2 text-center text-theme1 fw-4 pb-2">Similar Products</h2>
            <Toaster show={show} msg={wishmsg} handleClose={handleToastClose} />

            <Swiper
                spaceBetween={10}
                slidesPerView={1}
                className="pt-2"
                breakpoints={{
                    640: {
                        slidesPerView : 2
                    },
                    769 : {
                        slidesPerView: 4,

                    },
                    1200: {
                        slidesPerView: 5
                    }
                    
                }}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
            >
                {data.map((item: Product) => (
                    <SwiperSlide className="" key={`similar-product_${item.id}`}>
                        <div className="p-1 mb-1 product_item " >

                            <div className="bg-white br-8 p-3">
                                <div className="product_grid">
                                    <div className="pro_btn_holder">
                                        <Image alt="product-image" width={384} height={384} className="w-100 zoomimage h-auto br-10" src={item.images[1].image} loading="lazy" />
                                        <Image alt="product-image" width={384} height={384} className="w-100 initialimage h-auto br-10" src={item.images[2].image} loading="lazy" />
                                        <Addtowishlist category={item.categories[0].name} variations={item.variations} handleMsg={SetWishmsg} handleToast={setShow} name={item.name} userid={Number(userid)} id={item.id} price={Number(item.regular_price)} images={item.images} />
                                        <button
                                            className="border-transparent-solid font-primary text-white py-1  wc-100 justify-content-center fw-3 d-flex align-items-center gap-6 cart_btn"
                                            onClick={() => handleQuickAddClick(item.id)}>
                                            <CartIcon2 /> Select Size
                                        </button>
                                        {attModal === item.id && (
                                            <Modal handleSelected={handleSelected} selectedSize={selectedSize} Apiinfo={cartAPiinfo} category={item.categories[0].name} productid={item.id} image={item.images[0]} name={item.name} variations={item.variations} closeModal={() => setAttModal(null)} />)}
                                    </div>
                                    <h6 className="m-0 mt-3 font-primary"><Link href={`/product/${item.id}/${createSlug(item.name)}`}>{item.name}</Link></h6>
                                    {item.rating_count > 0 && (<div className="d-flex align-items-center">
                                        <div className="d-flex gap-1">
                                            {[...Array(5)].map((_, index) => (
                                                <span key={`key_${index}`} className="text-review">
                                                    <Star fill={index < Math.floor(Number(item.average_rating)) ? "currentcolor" : "none"} size={"13"} />
                                                </span>
                                            ))}
                                        </div>
                                        <span className="d-inline-block text-grey font-primary mt-1 ms-2">{item.rating_count} Ratings</span>
                                    </div>)}
                                    <div className="font-primary mt-1 fw-3 d-flex gap-10 text-black align-items-center">
                                        {item.sale_price ? (<>
                                            <span>₹{item.sale_price}</span>
                                            <s>₹{item.regular_price}</s>
                                            <span className="font-small bg-theme2 px-1 br-5">
                                                {getDiscount(Number(item.regular_price), item.sale_price)}%
                                            </span>
                                        </>) : (
                                            <span>
                                                {attModal === item.id ? (
                                                    <>
                                                        {item.variations[selectedSize] && formatPriceIndian(item.variations[selectedSize].regular_price)}
                                                        <span className="ms-2 text-secondary fs-8 fw-3">({item.variations[selectedSize] && item.variations[selectedSize].size})</span>
                                                    </>
                                                ) : (<>
                                                    {item.variations[0] && formatPriceIndian(item.variations[0].regular_price)}
                                                    {item.variations[0] && <span className="ms-2 text-secondary fs-8 fw-3">({item.variations[0].size})</span>}
                                                </>)}
                                            </span>
                                        )}

                                    </div>
                                </div>

                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Container>
    )
}
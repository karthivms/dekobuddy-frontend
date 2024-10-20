"use client"

import { Col, Row } from "react-bootstrap";
import Image from "next/image";
import Star from "../icons/star";
import Link from "next/link";
import Addtowishlist from "./addtowishlist";
import { useCallback, useEffect } from "react";
import CartIcon2 from "../icons/carticon2";
import { Product } from '@/app/types/types'
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
import { getProducts } from "@/app/redux/Filterslice";


export default function ProductGrid({ products, grid }: { products: Product[], grid: number }) {

    const dispatch: AppDispatch = useDispatch()

    const getDiscount = useCallback((reg_price: number, sale_price: number) => {
        const discount = Math.floor(reg_price / sale_price * 100);
        return discount;
    }, []);

    const createSlug = useCallback((input: string) => {
        return input.trim().replace(/\s+/g, '-').toLowerCase();
    }, []);

useEffect(() => {
    dispatch(getProducts({ rejectValue: '' }))
})

    return (
        <Row className="mt-4">
            {
                products.map((item: Product) => (
                    <Col lg={grid} xs={6} className="p-1 mb-1 product_item " key={`productitem_${item.id}`}>
                        <div className="bg-white br-8 p-3">
                            <div className="product_grid">
                                <div className="pro_btn_holder">
                                    <Image alt="product-image" width={384} height={384} className="w-100 d-none zoomimage h-auto br-10" src={item.images[1].image} loading="lazy" />
                                    <Image alt="product-image" width={384} height={384} className="w-100 initialimage h-auto br-10" src={item.images[2].image} loading="lazy" />
                                    <Addtowishlist id={item.id} />
                                    <button
                                        className="border-transparent-solid font-primary text-white py-1  wc-100 justify-content-center fw-3 d-flex align-items-center gap-6 cart_btn">
                                        <CartIcon2 /> Add to Cart
                                    </button>
                                </div>
                                <h6 className="m-0 mt-3 font-primary"><Link href={`/product/${item.id}/${createSlug(item.name)}`}>{item.name}</Link></h6>
                                {/* <p className="m-0 font-primary text-grey">{item.props}</p> */}
                                <div className="d-flex align-items-center">
                                    <div className="d-flex gap-1">
                                        {[...Array(5)].map((_, index) => (
                                            <span key={`key_${index}`} className="text-review">
                                                <Star fill={index < 4 ? "currentcolor" : "none"} size={"13"} />
                                            </span>
                                        ))}
                                    </div>
                                    <span className="d-inline-block text-grey font-primary mt-1 ms-2">{item.no_of_reviews} Reviews</span>
                                </div>
                                <div className="font-primary fw-3 d-flex gap-10 text-black align-items-center">
                                    {item.sale_price ? (<>
                                        <span>₹{item.sale_price}</span>
                                        <s>₹{item.regular_price}</s>
                                        <span className="font-small bg-theme2 px-1 br-5">
                                            {getDiscount(Number(item.regular_price), item.sale_price)}%
                                        </span>
                                    </>) : (
                                        <span>
                                            ₹{item.regular_price}
                                        </span>
                                    )}

                                </div>
                            </div>

                        </div>
                    </Col>
                ))
            }
        </Row>
    )
}
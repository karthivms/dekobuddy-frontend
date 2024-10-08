'use client'

import { useCallback, useEffect } from "react";
import { Col, Row } from "react-bootstrap"
import CloseIcon from "../icons/closeicon";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { handleSelectedItem, removeItem, showTab } from "@/app/redux/wishlistslice";
import CartIcon2 from "../icons/carticon2";

interface Product {
    id: number;
    name: string;
    img_url: string;
    props: string;
    price: number;
    discount: number;
}


export default function Wishlist() {
    const dispatch = useDispatch()
    const wishlist = useSelector((state: RootState) => state.wishlist.wishlistItems);
    const selectedItems = useSelector((state: RootState) => state.wishlist.selectedItems);

    const isProductSelected = (id: number): boolean => {
        return selectedItems.includes(id)
    }


    useEffect(() => {
        const anyChecked = selectedItems.length >= 1;
        dispatch(showTab(anyChecked));
    }, [selectedItems, dispatch])


    const getDiscount = useCallback((price: number, dis: number) => {
        const discount = Math.floor(dis / 100 * price);
        return price - discount;
    }, []);

    const createSlug = useCallback((input: string) => {
        return input.trim().replace(/\s+/g, '-').toLowerCase();
    }, []);


    return (
        <Row className="my-4 row-gap-20">
            {
                wishlist.map((item: Product, index: number) => (
                    <Col lg={20} sm={3} className="p-1 mb-1 product_item " key={`productitem_${item.id}`} id={`${item.id}`}>

                        <div className="bg-white br-8 p-3 pt-1">
                            <div className="mb-1 d-flex justify-content-between align-items-center remove_wishlist">
                                <button className="font-small btn fw-3 d-flex align-items-center gap-1"
                                    onClick={() => dispatch(removeItem(item.id))}>
                                    <CloseIcon /> Remove
                                </button>
                                <input
                                    type="checkbox"
                                    id={`${item.name}_value_${index}`}
                                    className="bg-transparent"
                                    checked={isProductSelected(item.id)}
                                    onChange={() => dispatch(handleSelectedItem(item.id))}
                                    name={item.name}
                                />
                            </div>
                            <div className="product_grid">
                                <div className="pro_btn_holder">
                                    <Image alt="product-image" width={271} height={224} className="w-100 h-auto br-10" src={item.img_url} loading="lazy" />
                                    <button
                                        className="border-transparent-solid font-primary text-white py-1  wc-100 justify-content-center fw-3 d-flex align-items-center gap-6 cart_btn">
                                        <CartIcon2 /> Add to Cart
                                    </button>
                                </div>
                                <h6 className="m-0 mt-3 font-primary"><Link href={`/product/${item.id}/${createSlug(item.name)}`}>{item.name}</Link></h6>
                                <p className="m-0 font-primary text-grey">{item.props}</p>

                                <div className="font-primary fw-3 d-flex gap-10 text-black align-items-center">
                                    <span>₹{getDiscount(item.price, item.discount)}</span>
                                    <s>₹{item.price}</s>
                                    <span className="font-small bg-theme2 px-1 br-5">{item.discount}%</span>
                                </div>
                            </div>
                        </div>
                    </Col>
                ))
            }
        </Row>
    )
}
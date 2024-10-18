'use client'

import { useCallback, useEffect } from "react";
import { Col, Row } from "react-bootstrap"
import CloseIcon from "../icons/closeicon";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { fetchWishlistItems, handleSelectedItem, removeItem, showTab } from "@/app/redux/wishlistslice";
import CartIcon2 from "../icons/carticon2";
import ActionTab from "./actionTab";
import { Product } from '@/app/types/types';



export default function Wishlist({ userid }: { userid: string }) {
    const dispatch: AppDispatch = useDispatch()
    const wishlist = useSelector((state: RootState) => state.wishlist.wishlistItems);
    const status = useSelector((state: RootState) => state.wishlist.status);
    const selectedItems = useSelector((state: RootState) => state.wishlist.selectedItems);

    const isProductSelected = (id: number): boolean => {
        return selectedItems.includes(id)
    }


    useEffect(() => {
        const anyChecked = selectedItems.length >= 1;
        dispatch(showTab(anyChecked));
    }, [selectedItems, dispatch])


    useEffect(() => {
        dispatch(fetchWishlistItems(userid))
    }, [dispatch, userid])

    console.log(status)
    const getDiscount = useCallback((price: number, dis: number) => {
        const discount = Math.floor(dis / 100 * price);
        return price - discount;
    }, []);

    const createSlug = useCallback((input: string) => {
        return input.trim().replace(/\s+/g, '-').toLowerCase();
    }, []);


    return (
        <Row className="my-4 row-gap-20">
            {wishlist.length > 0 ? (<>
                <ActionTab />
                {
                    wishlist.map((item, index: number) => (
                        <Col lg={20} sm={3} className="p-1 mb-1 product_item " key={`productitem_${item.id}`} id={`${item.id}`}>

                            <div className="bg-white br-8 p-3 pt-1">
                                <div className="mb-5 d-flex justify-content-between align-items-center remove_wishlist">
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
                                        {/* <Image alt="product-image" width={384} height={384} className="w-100 d-none zoomimage h-auto br-10" src={item.images[1].image} loading="lazy" />
                                        <Image alt="product-image" width={384} height={384} className="w-100 initialimage h-auto br-10" src={item.images[2].image} loading="lazy" /> */}
                                        <button
                                            className="border-transparent-solid font-primary text-white py-1  wc-100 justify-content-center fw-3 d-flex align-items-center gap-6 cart_btn">
                                            <CartIcon2 /> Add to Cart
                                        </button>
                                    </div>
                                    <h6 className="m-0 mt-3 font-primary"><Link href={`/product/${item.id}/${createSlug(item.product_name)}`}>{item.product_name}</Link></h6>
                                    <p className="m-0 font-primary text-grey">{item.props}</p>
                                    <div className="font-primary fw-3 mt-2 d-flex gap-10 text-black align-items-center">

                                        {item.sale_price ? (<>
                                            <span>₹{item.sale_price}</span>
                                            <s>₹{item.regular_price}</s>
                                            <span className="font-small bg-theme2 px-1 br-5">
                                                {getDiscount(item.product_regular_price, item.product_sale_price)}%
                                            </span>
                                        </>) : (
                                            <span>
                                                ₹{item.product_regular_price}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))
                }
            </>) : (
                <div className="d-flex justify-content-center align-items-center py-3">
                    <div className="text-center">
                        <Image src={'/images/empty-wishlist.png'} width={485} height={380} className='wp-350 h-auto' alt="empty_wishlist"/>
                        <h1 className="font-h2 fw-5 mb-5">Your wishlist is empty</h1>
                        <Link href="/" className="bg-theme1 text-white px-4 py-2 br-5">Continue Shopping</Link>
                    </div>
                </div>
            )}

        </Row>
    )
}
'use client';

import { Offcanvas } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { cartItem } from "../types/types";
import Image from "next/image";
import formatPriceIndian from "../utilis/formatPrice";
import Link from "next/link";
import CloseIcon from "./icons/closeicon";

export default function CartSidebar({ showsidebar, handleClose }: { showsidebar: boolean, handleClose: () => void }) {

    const cartItems = useSelector((state: RootState) => state.cart.cartItems)

    return (

        <Offcanvas show={showsidebar} onHide={handleClose} placement="end">
            <div className="br-10 py-3 cartsidebar  overflow-auto  custom-scrollbar">
                <div className="d-flex px-3  pb-3 bb-border2-1 mb-2 justify-content-between">
                    <h3 className="font-h3 fw-4 text-black ">Added to Cart</h3>
                    <span className="text-theme1 br-50 me-2 pointer" onClick={handleClose}><CloseIcon /></span>
                </div>
                <div className="p-3 ">
                    {cartItems.map((item: cartItem) => (
                        <div key={`cart_item_sidebar_${item.id}`} className="d-flex flex-wrap justify-content-between gap-10">
                            <div className="wc-20"> <Image alt="cart_images" width={70} height={70} src={item.product.images.image} className="br-5" /></div>
                            <div className="wc-60">
                                <p className="mb-1 fw-3 font-primary">{item.product.name} - {item.product.size}</p>
                                <span className="font-info text-theme1 fw-4 bg-theme2 p-1 br-3">{item.product.categories}</span>
                                <p className="mt-1 fw-3 font-primary">{formatPriceIndian(item.product.quantity * Number(item.product.regular_price))}</p>
                            </div >
                            <div className="wc-10">({item.product.quantity})</div>
                        </div >
                    ))}
                </div>
                <div className="px-3 d-flex mt-auto align-items-end cartsidebar_btn">
                    <Link href="/cart" className="btn1 w-100 py-1 text-center">View Cart</Link>
                </div>
            </div>
        </Offcanvas >

    )
}
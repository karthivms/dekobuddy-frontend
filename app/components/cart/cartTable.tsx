'use client'


import { Col, Row } from "react-bootstrap";
import QuanityHandler from "./quantityHandler";
import Image from "next/image";
import BinIcon from "../icons/binIcon";
import { AppDispatch, RootState } from "@/app/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { cartItem } from "@/app/types/types";

import Link from "next/link";
import formatPriceIndian from "@/app/utilis/formatPrice";
import { useEffect } from "react";
import { DeleteCartItem, gettotal, removeCartItem } from "@/app/redux/cartSlice";
import CartSkeleton from "../cartSkeleton";


export default function CartTable({ userid }: { userid: string }) {

    const cartproducts = useSelector((state: RootState) => state.cart.cartItems);
    const total = useSelector((state: RootState) => state.cart.total);
    const status = useSelector((state: RootState) => state.cart.status);
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(gettotal())
    }, [cartproducts])

    const deleteItem = (id: number) => {
        const delbody = {
            cart_id: id,
            user_id: Number(userid)
        }

        dispatch(removeCartItem(id));
        dispatch(DeleteCartItem(delbody))
    }

    return (
        <>
            {status === 'loading' ? (<>
                <h1 className="mt-3 font-h1  text-theme1 fw-4 pb-2">Cart</h1>
                <CartSkeleton />
            </>
            ) : (
                <>
                    {cartproducts.length > 0 ? (<>

                        <h1 className="mt-3 font-h1 font-sm-h2 text-theme1 fw-4 pb-2">Cart</h1>

                        <Row className="mt-4 gap-40 row-gap-40">

                            <Col lg={8} className="cart-table-div">
                                <table className="cart-table w-100">
                                    <thead>
                                        <tr className="text-uppercase font-primary h-30 bb-border2-1 bt-border2-1">
                                            <th></th>
                                            <th>Product</th>
                                            <th>Quantity</th>
                                            <th>Subtotal</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody className="">
                                        {cartproducts.map((product: cartItem) => (
                                            <tr key={`cart_items_${product.id}_${product.product.id}`} >
                                                <td>
                                                    <Image alt="cart_images" width={60} height={60} src={product.product.images.image} className="br-5" />
                                                </td>
                                                <td>
                                                    <p className="mb-1 fw-3">{product.product.name} - {product.product.size}</p>
                                                    <span className="font-small text-theme1 fw-4 bg-theme2 p-1 br-3">{product.product.categories}</span></td>
                                                <td>
                                                    <QuanityHandler cartid={product.id} userid={Number(userid)} count={product.product.quantity} />
                                                </td>
                                                <td>{formatPriceIndian(product.product.quantity * Number(product.product.regular_price))}</td>
                                                <td>
                                                    <button className="delete-btn btn text-theme3 delete-cart" onClick={() => deleteItem(product.id)}>
                                                        <BinIcon />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </Col>
                            <Col>
                                <div className="bg-theme2 br-10 p-4 cart_price_details">

                                    <h3 className="font-h2 text-black fw-4 font-sm-h3">Cart Totals</h3>
                                    <div className="d-flex pt-2 pb-3 mt-4  d-flex justify-content-between align-items-center subtotal">
                                        <h5 className="font-large text-theme1">Subtotal</h5>
                                        <span className="text-black fw-3">{total}</span>
                                    </div>

                                    <div className="d-flex pt-2 pb-3 mt-3 justify-content-between align-items-center">
                                        <h5 className="font-h3 fw-4 text-theme1">Total</h5>
                                        <span className="text-black fw-4 font-large">{total}</span>
                                    </div>

                                    <button className="btn bg-theme1 mt-2 py-2 text-white text-center w-100 fw-4 checkout_btn">Proceed to Checkout</button>
                                </div>
                            </Col>
                        </Row></>) : (
                        <div className="d-flex justify-content-center align-items-center py-3">
                            <div className="text-center">
                                <Image src={'/images/empty-cart.png'} width={485} height={380} className='wp-350 h-auto' alt="empty_cart" />
                                <h1 className="font-h2 fw-5 mb-5">Your cart is empty</h1>
                                <Link href="/" className="bg-theme1 text-white px-4 py-2 br-5">Continue Shopping</Link>
                            </div>
                        </div>)}
                </>)}

        </>
    )
}
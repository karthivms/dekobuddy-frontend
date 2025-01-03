'use client'

import Image from "next/image";
import { Col, Row } from "react-bootstrap";
import Step from "./step";
import OrderMail from "./orderMail";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { cartItem, profile } from "@/app/types/types";
import formatPriceIndian from "@/app/utilis/formatPrice";
import QuanityHandler from "../cart/quantityHandler";
import { DeleteCartItem, gettotal, removeCartItem } from "@/app/redux/cartSlice";
import { useEffect } from "react";
import AddressSkeleton from "../account/AddressSkeleton";
import { getBuytotal, removeBuyItem } from "@/app/redux/checkoutslice";
import BuyQuantity from "./buyNowquantity";


export default function OrderSummary({ userid, profiledata }: { userid: string, profiledata: profile }) {

    const step = useSelector((state: RootState) => state.checkout.activeStep);
    const cartproducts = useSelector((state: RootState) => state.cart.cartItems);
    const buyProducts = useSelector((state: RootState) => state.checkout.buy_now);
    const status = useSelector((state: RootState) => state.cart.status);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(gettotal())
    }, [cartproducts, dispatch])


    useEffect(() => {
        dispatch(getBuytotal())
    }, [buyProducts, dispatch])

    function getDateTwoDaysFromToday() {
        const today = new Date();
        today.setDate(today.getDate() + 2);
        return today.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
        });
    }

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
            {step === 3 ? (<>
                <div className="bg-theme3 mt-4 d-flex px-4 py-3 br-2 gap-15">
                    <Step number={3} />
                    <div className="d-flex justify-content-between w-100 align-items-start gap-20">
                        <h4 className="text-uppercase font-secondary fw-4 text-grey3 mb-0">Order Summary</h4>
                    </div>
                </div>
                <div className="px-4 py-3 bg-grey3">
                    {buyProducts.length !== 0 ? (<>
                        {/* buy Now */}
                        <Row className="row-gap-20 mt-3">

                            <Col lg={8} >

                                {buyProducts.map((item: cartItem) => (
                                    <div className="mb-4" key={`checkout_item_${item.id}`}>
                                        <div className="d-flex gap-20">
                                            <div>
                                                <Image alt="cart_images" width={60} height={60} src={item.product.images.image} className="br-5" />
                                            </div>
                                            <div className="d-grid align-items-between justify-content-start">
                                                <p className="mb-0 fw-3">{item.product.name} - {item.product.size}</p>
                                                <div className="d-flex gap-10 align-items-center">
                                                    <span className="font-small text-theme1 fw-4 bg-theme2 p-1 br-3 w-auto line-tight">{item.product.categories}</span>                                                        <div className="font-primary fw-3 d-flex gap-10 text-black align-items-center">
                                                        <span>{formatPriceIndian(item.product.quantity * Number(item.product.regular_price))}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center gap-20">
                                            <BuyQuantity userid={userid} stock={item.product.stock} buyId={item.id} count={item.product.quantity} />
                                            <button className="btn mt-4  fw-3 text-theme1" onClick={() => dispatch(removeBuyItem(item.id))}>Remove</button>
                                        </div>
                                    </div>


                                ))}
                            </Col>
                            <Col className="text-end checkout_delivery">
                                <span className="font-primary fw-3">Delivery Expected by {getDateTwoDaysFromToday()}</span>
                            </Col>
                        </Row>
                    </>) : (<>

                        {/* cart Item */}
                        {status === 'loading' ? (<AddressSkeleton array={1} height={101} />) : (
                            <>
                                {cartproducts.length > 0 ? (
                                    <Row className="row-gap-20 mt-3">

                                        <Col lg={8} >

                                            {cartproducts.map((item: cartItem) => (
                                                <div className="mb-4" key={`checkout_item_${item.id}`}>
                                                    <div className="d-flex gap-20">
                                                        <div>
                                                            <Image alt="cart_images" width={60} height={60} src={item.product.images.image} className="br-5" />
                                                        </div>
                                                        <div className="d-grid align-items-between justify-content-start">
                                                            <p className="mb-0 fw-3">{item.product.name} - {item.product.size}</p>
                                                            <div className="d-flex gap-10 align-items-center">
                                                                <span className="font-small text-theme1 fw-4 bg-theme2 p-1 br-3 w-auto line-tight">{item.product.categories}</span>                                                        <div className="font-primary fw-3 d-flex gap-10 text-black align-items-center">
                                                                    <span>{formatPriceIndian(item.product.quantity * Number(item.product.regular_price))}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-20">
                                                        <QuanityHandler page={'checkout'} stock={item.product.stock} cartid={item.id} userid={Number(userid)} count={item.product.quantity} />
                                                        <button className="btn mt-4  fw-3 text-theme1" onClick={() => deleteItem(item.id)}>Remove</button>
                                                    </div>
                                                </div>


                                            ))}
                                        </Col>
                                        <Col className="text-end checkout_delivery">
                                            <span className="font-primary fw-3">Delivery Expected by {getDateTwoDaysFromToday()}</span>
                                        </Col>
                                    </Row>) : (<p className="mb-0 text-theme1 fw-4">Your Checkout has no items</p>)}
                            </>)}
                    </>)}




                </div>

                {/* <GstInvoice /> */}
                {buyProducts.length !== 0 ? (<>
                    <OrderMail email={profiledata.email} />
                </>) : (<>
                    {cartproducts.length > 0 && (<OrderMail email={profiledata.email} />)}

                </>)}

            </>) : (<div className="bg-grey3 mt-4 d-flex px-4 py-3 br-2 gap-15">
                <Step number={3} />
                <div className="d-flex justify-content-between w-100 align-items-start gap-20">
                    <h4 className="text-uppercase font-secondary fw-4 text-theme3 mb-0">Order Summary</h4>
                </div>
            </div>)}

        </>
    )
}
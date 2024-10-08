'use client'

import products from "@/app/datas/category/products.json";
import Image from "next/image";
import { useCallback } from "react";
import { Col, Row } from "react-bootstrap";
import Step from "./step";
import QuanityHandler from "../singleproduct/quantityHandler";
import GstInvoice from "./gstInvoice";
import OrderMail from "./orderMail";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

interface Product {
    id: number;
    name: string;
    img_url: string;
    props: string;
    no_of_reviews: number;
    price: number;
    discount: number;
}

export default function OrderSummary() {

    const step = useSelector((state: RootState) => state.checkout.activeStep)

    const cartproducts = products.slice(0, 1)

    function getDateTwoDaysFromToday() {
        const today = new Date();
        today.setDate(today.getDate() + 2);
        return today.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
        });
    }

    const getDiscount = useCallback((price: number, dis: number) => {
        const discount = Math.floor(dis / 100 * price);
        return price - discount;
    }, []);

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
                    {cartproducts.map((item: Product) => (
                        <Row key={`checkout_item_${item.id}`} className="row-gap-20">
                            <Col lg={8} >
                                <div className="d-flex gap-20">
                                    <div>
                                        <Image alt="cart_images" width={80} height={80} src={item.img_url} className="br-5" />
                                    </div>
                                    <div className="d-grid align-items-between">
                                        <p className="mb-0 fw-3">{item.name}</p>
                                        <p className="m-0 font-primary text-grey">{item.props}</p>
                                        <div className="font-primary fw-3 d-flex gap-10 text-black align-items-center">
                                            <span>₹{getDiscount(item.price, item.discount)}</span>
                                            <s>₹{item.price}</s>
                                            <span className="font-small bg-theme2 px-1 br-5">{item.discount}%</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-20">
                                    <QuanityHandler />
                                    <button className="btn mt-4  fw-3 text-theme1">Remove</button>
                                </div>
                            </Col>
                            <Col className="text-end checkout_delivery">
                                <span className="font-primary fw-3">Delivery by {getDateTwoDaysFromToday()}</span>
                            </Col>
                        </Row>
                    ))}

                </div>

                <GstInvoice />
                <OrderMail />
            </>) : (<div className="bg-grey3 mt-4 d-flex px-4 py-3 br-2 gap-15">
                <Step number={3} />
                <div className="d-flex justify-content-between w-100 align-items-start gap-20">
                    <h4 className="text-uppercase font-secondary fw-4 text-theme3 mb-0">Order Summary</h4>
                </div>
            </div>)}

        </>
    )
}
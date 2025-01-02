'use client'

import { Col, Row } from "react-bootstrap";
import ProgressBar from "./progressBar";
import CancelOrder from "./cancelOrder";
import { order } from "@/app/types/types";
import MobileProgress from "./mobileProgress";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { useEffect } from "react";
import { changeStatus, changeStep } from "@/app/redux/checkoutslice";
import { clearCart } from "@/app/redux/cartSlice";
import ReplaceOrder from "./replaceOrder";

export const Delivery = ({ userid, data, id }: { userid: string, data: order, id: string }) => {
    // function getDateTwoDaysFromToday() {
    //     const today = new Date();
    //     today.setDate(today.getDate() + 2);
    //     return today.toLocaleDateString('en-US', {
    //         weekday: 'short',
    //         month: 'short',
    //         day: 'numeric',
    //     });
    // }

    const order_status = useSelector((state: RootState) => state.checkout.orderPlaced);
    const dispatch = useDispatch()

    useEffect(() => {
        if (order_status) {
            dispatch(clearCart())
            dispatch(changeStatus());
            dispatch(changeStep(3));
        }
    }, [dispatch, order_status])


    const deliveredDate = new Date(data.delivered_date || new Date());
    const fifteenDaysAfterDelivered = new Date(deliveredDate.getTime() + 1 * 24 * 60 * 60 * 1000);
    const now = new Date();


    return (
        <>
            {/* <p className="mt-4 mb-0 font-secondary text-secondary">Estimated Delivery Date</p>
            <p className="font-h3 fw-4 mt-1 mb-0">{getDateTwoDaysFromToday()}</p> */}
            <ProgressBar
                order_date={data.order_date}
                currentstatus={data.order_status}
                shipped_date={data.shipped_date}
                cancel_date={data.cancelled_date}
                deliver_date={data.delivered_date}
            />
            <MobileProgress
                order_date={data.order_date}
                currentstatus={data.order_status}
                shipped_date={data.shipped_date}
                cancel_date={data.cancelled_date}
                deliver_date={data.delivered_date}

            />
            <Row className="align-items-end flex-wrap">
                <Col lg={8}>
                    <h5 className="font-large text-black my-2">Billing Address</h5>
                    <ul className="m-0 ps-3 my-3 line-relaxed">
                        <li className="fw-4 text-black mb-1">{data.billing_address.first_name}</li>
                        <li >
                            {data.billing_address.address},
                        </li>
                        <li >
                            {data.billing_address.city},
                        </li>
                        <li >
                            {data.billing_address.state},
                        </li>
                        <li >
                            {data.billing_address.pincode}
                        </li>
                        <li className="fw-4 text-black mt-2 ">Phone Number</li>
                        <li>{data.billing_address.phone}</li>
                        {data.billing_address.alternative_phone && (<><li className="fw-4 text-black mt-2 ">Alternate Phone Number</li>
                            <li>{data.billing_address.phone}</li></>)}
                    </ul>
                </Col>
                <Col >
                    {data.order_status !== 'Shipped' && data.order_status !== 'Cancelled' && data.order_status !== 'Replacement' && data.order_status !== 'Delivered' && (
                        <CancelOrder userid={userid} id={id} />)}
                    {data.order_status === 'Delivered' && fifteenDaysAfterDelivered > now && (<ReplaceOrder userid={userid} id={id} />)}
                </Col>
            </Row>
        </>
    )
}
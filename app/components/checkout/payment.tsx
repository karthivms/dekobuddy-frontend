'use client'

import { useDispatch, useSelector } from "react-redux";
import Step from "./step";
import { AppDispatch, RootState } from "@/app/redux/store";
import Coupon from "./Coupon";
import { useEffect, useState } from "react";
import { placeOrder } from "@/app/redux/checkoutslice";
import { redirect } from "next/navigation";
import { Spinner } from "react-bootstrap";

export default function Payment({ userid }: { userid: string }) {
    const step = useSelector((state: RootState) => state.checkout.activeStep);
    const order_status = useSelector((state: RootState) => state.checkout.orderPlaced);
    const orderStatus = useSelector((state: RootState) => state.checkout.orderStatus);
    const order_id = useSelector((state: RootState) => state.checkout.placed_order_id);

    const [order, setOrder] = useState(false);
    const dispatch: AppDispatch = useDispatch()


    const handleOrder = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(placeOrder(Number(userid)));


    }

    if (orderStatus === 'loading') {
        return <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    }


    useEffect(() => {
        if (order_status) {
            redirect(`/order-success/${order_id}`)
        }
    }, [dispatch, handleOrder, order_status])

   
    return (
        <>
            {step === 4 ? (<>
                <div className="bg-theme3 mt-4 d-flex px-4 py-3 br-2 gap-15">
                    <Step number={4} />
                    <div className="d-flex justify-content-between w-100 align-items-start gap-20">
                        <h4 className="text-uppercase font-secondary fw-4 text-grey3 mb-0">Payment Options</h4>
                    </div>
                </div>
                <div className="px-4 py-3 bg-grey3">
                    <form onSubmit={handleOrder}>
                        <label htmlFor="cod" className="d-flex align-items-center">
                            <input type="radio" id="cod" name="cod" required value="cod" onClick={() => setOrder(true)} />
                            <div className="ms-2 d-inline-block">
                                <span className="font-primary fw-3  pointer">Cash on Delivery</span>

                            </div>

                        </label>
                        {order && (<button className="btn1 d-block font-primary mt-3 py-2 px-4" >Confirm Order</button>
                        )}
                    </form>
                </div>

                <Coupon userid={userid} />


            </>) : (<div className="bg-grey3 mt-4 d-flex px-4 py-3 br-2 gap-15">
                <Step number={4} />
                <div className="d-flex justify-content-between w-100 align-items-start gap-20">
                    <h4 className="text-uppercase font-secondary fw-4 text-theme3 mb-0">Payment Options</h4>
                </div>
            </div>)}
        </>
    )
}
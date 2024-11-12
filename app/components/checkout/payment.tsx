'use client'

import { useDispatch, useSelector } from "react-redux";
import Step from "./step";
import { AppDispatch, RootState } from "@/app/redux/store";
import Coupon from "./Coupon";
import { useState } from "react";
import { placeOrder } from "@/app/redux/checkoutslice";

export default function Payment({ userid }: { userid: string }) {
    const step = useSelector((state: RootState) => state.checkout.activeStep)

    const [order, setOrder] = useState(false);
    const dispatch: AppDispatch = useDispatch()


    const handleOrder = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(placeOrder(Number(userid)));

    }

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
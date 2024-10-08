'use client'

import { useSelector } from "react-redux";
import Step from "./step";
import { RootState } from "@/app/redux/store";
import GiftCard from "./giftCard";

export default function Payment() {
    const step = useSelector((state: RootState) => state.checkout.activeStep)

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
                <label htmlFor="male">
                    <input type="radio" id="male" name="gender" value="male" />
                    <div className="ms-2 d-inline-block">
                        <span className="font-primary fw-3 ms-3">Cash on Delivery</span>
                    </div>
                </label>
                </div>

                <GiftCard/>
            </>) : (<div className="bg-grey3 mt-4 d-flex px-4 py-3 br-2 gap-15">
                <Step number={4} />
                <div className="d-flex justify-content-between w-100 align-items-start gap-20">
                    <h4 className="text-uppercase font-secondary fw-4 text-theme3 mb-0">Payment Options</h4>
                </div>
            </div>)}
        </>
    )
}
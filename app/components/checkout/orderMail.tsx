'use clirnt'

import { changeStep } from "@/app/redux/checkoutslice"
import { useDispatch } from "react-redux"


export default function OrderMail() {
    const dispatch = useDispatch()

    return (
        <>
            <div className="bg-grey3 mt-2 d-flex flex-wrap row-gap-20 align-items-center px-4 py-3 br-2 gap-15 justify-content-between">
                <span className="font-secondary fw-3 line-tight mt-1">
                    Order confirmation email will be sent to <span className="fw-4">abc@gmail.com</span>
                </span>
                <button className="btn1 h-35 br-0 px-4 text-uppercase font-primary fw-3" onClick={() => dispatch(changeStep(4))}>Continue</button>
            </div>

        </>
    )
}








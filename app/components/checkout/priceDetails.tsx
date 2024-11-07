'use client'

import { RootState } from "@/app/redux/store"
import formatPriceIndian from "@/app/utilis/formatPrice";
import { useSelector } from "react-redux"

export function PriceDetail(){
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const total = useSelector((state : RootState) => state.cart.total)
    return(
        <>
        {cartItems.length > 0 && (<div className="bg-theme2 p-4 br-5 total_box">
            <h3 className="font-h2 font-sm-h3 text-black fw-4">Price Details</h3>
            <div className="subtotal  mt-4">
                <div className="d-flex pt-2 pb-3  d-flex justify-content-between align-items-center">
                    <h5 className="font-large text-theme1">Price ({cartItems.length})</h5>
                    <span className="text-black fw-3">{formatPriceIndian(total)}</span>
                </div>
                <div className="d-flex pt-2 pb-3 d-flex justify-content-between align-items-center">
                    <h5 className="font-large text-theme1">Delivery Charge</h5>
                    <span className="text-black fw-3">₹40</span>
                </div>
            </div>
            <div className="d-flex pt-2 pb-1 mt-3 justify-content-between align-items-center">
                <h5 className="font-h3 fw-4 text-theme1">Total</h5>
                <span className="text-black fw-4 font-large">{formatPriceIndian(total)}</span>
            </div>

        </div>)}
        </>
    )
}
'use client'

import { RootState } from "@/app/redux/store"
import formatPriceIndian from "@/app/utilis/formatPrice";
import { useSelector } from "react-redux"

export function PriceDetail() {
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const buyProduct = useSelector((state: RootState) => state.checkout.buy_now);
    const total = useSelector((state: RootState) => state.cart.total)
    const buy_total = useSelector((state: RootState) => state.checkout.buy_total)
    const state = useSelector((state: RootState) => state.checkout)
    return (
        <>
            {buyProduct.length !== 0 ? (
                <div className="bg-theme2 p-4 br-5 total_box">
                    <h3 className="font-h2 font-sm-h3 text-black fw-4">Price Details</h3>
                    <div className="subtotal  mt-4">
                        <div className="d-flex pt-2 pb-3  d-flex justify-content-between align-items-center">
                            <h5 className="font-large text-theme1">Price ({buyProduct.length})</h5>
                            <span className="text-black fw-3">{formatPriceIndian(buy_total)}</span>
                        </div>
                        {state.coupon_code && (
                            <div className="d-flex pt-2 pb-3 d-flex justify-content-between align-items-center">
                                <h5 className="font-large text-theme1">Coupon Applied</h5>
                                <span className="text-success fw-3">- {formatPriceIndian(state.discount_amount)}</span>
                            </div>
                        )}

                    </div>
                    <div className="d-flex pt-2 pb-1 mt-3 justify-content-between align-items-center">
                        <h5 className="font-h3 fw-4 text-theme1">Total</h5>

                        <span className="text-black fw-4 font-large">
                            {state.coupon_code ? (<>{formatPriceIndian(state.discounted_total)}</>) : (<>{formatPriceIndian(buy_total)}</>)}
                        </span>
                    </div>

                </div>
            ) : (<>
                {cartItems.length > 0 && (<div className="bg-theme2 p-4 br-5 total_box">
                    <h3 className="font-h2 font-sm-h3 text-black fw-4">Price Details</h3>
                    <div className="subtotal  mt-4">
                        <div className="d-flex pt-2 pb-3  d-flex justify-content-between align-items-center">
                            <h5 className="font-large text-theme1">Price ({cartItems.length})</h5>
                            <span className="text-black fw-3">{formatPriceIndian(total)}</span>
                        </div>
                        {state.coupon_code && (
                            <div className="d-flex pt-2 pb-3 d-flex justify-content-between align-items-center">
                                <h5 className="font-large text-theme1">Coupon Applied</h5>
                                <span className="text-black fw-3">{formatPriceIndian(state.discount_amount)}</span>
                            </div>
                        )}

                    </div>
                    <div className="d-flex pt-2 pb-1 mt-3 justify-content-between align-items-center">
                        <h5 className="font-h3 fw-4 text-theme1">Total</h5>

                        <span className="text-black fw-4 font-large">
                            {state.coupon_code ? (<>{formatPriceIndian(state.discounted_total)}</>) : (<>{formatPriceIndian(total)}</>)}
                        </span>
                    </div>

                </div>)}
            </>)}

        </>
    )
}
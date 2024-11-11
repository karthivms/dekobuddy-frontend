'use client'

import { ApplyCoupon } from "@/app/redux/checkoutslice"
import { AppDispatch, RootState } from "@/app/redux/store"
import React, { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"


export default function Coupon({ userid }: { userid: string }) {
    const [show, setShow] = useState(false)
    const dispatch: AppDispatch = useDispatch();
    const [coupon, SetCoupon] = useState("");
    const error = useSelector((state: RootState) => state.checkout.error);
    const state = useSelector((state: RootState) => state.checkout);
    const couponStatus = useSelector((state: RootState) => state.checkout.couponStatus);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const data = {
            coupon: coupon,
            userid: userid
        }
        dispatch(ApplyCoupon(data));
    }

    useEffect(() => {
        if (!error) {
            setShow(false)
        }
    }, [error])

    return (
        < div className="bg-grey3 mt-2 px-4 py-3 br-2 gap-15" >
            {show ? (
                <>
                    <div >
                        <span className="mx-2 font-secondary fw-4">-</span>
                        <span className="font-primary fw-3 line-tight mt-1">Add Coupon</span>
                    </div>
                    <div className="mt-3">
                        <form onSubmit={handleSubmit} className="w-100 d-flex flex-wrap align-items-center gap-20 row-gap-20">
                            <input type="text" placeholder="Coupon Code" className="p-1 wc-40" value={coupon} onChange={(e) => SetCoupon(e.target.value)} required />
                            <button type="submit" className="btn1 h-35 px-4 d-block w-40 font-primary fw-3 text-uppercase" >
                                {couponStatus === 'loading' ? (
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />) : (<>Apply</>)}
                            </button>
                        </form>
                        {error && <p className="mb-0 mt-3 text-danger">{error}</p>}
                    </div>
                </>
            ) : (
                <button className="btn p-0" onClick={() => setShow(true)}>
                    <span className="mx-2 font-secondary fw-4">+</span>
                    <span className="font-primary fw-3 line-tight mt-1">Add Coupon</span>
                    {state.discount_amount && (<p>{state.discount_amount}</p>)}

                </button>

            )}
        </div >)
} 
'use client'

import { useState } from "react"


export default function GiftCard() {
    const [show, setShow] = useState(false)
    return (
        < div className="bg-grey3 mt-2 px-4 py-3 br-2 gap-15" >
            {show ? (
                <>
                    <div >
                        <span className="mx-2 font-secondary fw-4">-</span>
                        <span className="font-primary fw-3 line-tight mt-1">Add Gift Card</span>
                    </div>
                    <div className="d-flex flex-wrap align-items-center gap-20 mt-3 row-gap-20">
                        <input type="text" placeholder="Voucher Number" className="p-1 wc-70" />
                        <button className="btn1 h-35 px-4 d-block w-40 font-primary fw-3 text-uppercase">Apply</button>
                    </div>
                </>
            ) : (
                <button className="btn p-0" onClick={() => setShow(true)}>
                    <span className="mx-2 font-secondary fw-4">+</span>
                    <span className="font-primary fw-3 line-tight mt-1">Add Gift Card</span>
                </button>

            )}
        </div >)
} 
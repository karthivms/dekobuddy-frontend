'use client'

import { useDispatch } from "react-redux";
import CartIcon2 from "../icons/carticon2";
import { cartdata } from "@/app/types/types";
import { AppDispatch } from "@/app/redux/store";
import { AddCartItems } from "@/app/redux/cartSlice";


export default function ActionButtons({ cartdata }: { cartdata: cartdata }) {
    const dispatch : AppDispatch = useDispatch();


    return (
        <div className="mt-4 d-flex align-items-center gap-20 actionbuttons">
            <button
                className="border-transparent-solid bg-theme1 text-white py-1 br-5 wp-130 justify-content-center fw-3 d-flex align-items-center gap-6"
                onClick={() => dispatch(AddCartItems(cartdata))}
                >
                <CartIcon2 /> Add to Cart
            </button>
            <button
                className="border-theme1-solid text-theme1 bg-transparent wp-130 py-1 br-5 fw-3">
                Buy Now
            </button>
        </div>
    )
} 
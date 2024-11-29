'use client'


import { decrementQuantity, incrementQuantity, UpdateQuantity } from "@/app/redux/cartSlice";
import { ApplyCoupon } from "@/app/redux/checkoutslice";
import { AppDispatch, RootState } from "@/app/redux/store";
import { useDispatch, useSelector } from "react-redux";

export default function QuanityHandler({ page, stock, cartid, userid, count }: { page: string, stock: number, cartid: number, userid: number, count: number }) {

    const dispatch: AppDispatch = useDispatch();
    const coupon = useSelector((state: RootState) => state.checkout.coupon_code)

    const handleIncrementQuantity = () => {
        if (count < stock) {
            dispatch(incrementQuantity(cartid));
            const cartData = {
                cart_id: cartid,
                quantity: 1,
                user_id: userid
            }


            dispatch(UpdateQuantity(cartData));


            const data = {
                coupon: coupon,
                userid: `${userid}`
            }


            setTimeout(() => {
                if (page === 'checkout' && coupon) {
                    dispatch(ApplyCoupon(data))
                }
            }, 1000)

        } else {
            alert('Product out of stock, Cannot add more of this item.')
        }

    }

    const handleDecrementQuantity = () => {
        if (count != 1) {
            dispatch(decrementQuantity(cartid));
            const cartData = {
                cart_id: cartid,
                quantity: -1,
                user_id: userid
            }

            dispatch(UpdateQuantity(cartData));


            const data = {
                coupon: coupon,
                userid: `${userid}`
            }


            setTimeout(() => {
                if (page === 'checkout' && coupon) {
                    dispatch(ApplyCoupon(data))
                }
            }, 1000)
        }
    }
    return (
        <div className="mt-4 d-flex align-items-center text-theme1 fw-4 gap-1 quanity-handler">
            <button
                className="border-border2-solid wp-35 h-35 text-theme1 lh-1 bg-transparent"
                onClick={handleDecrementQuantity}>
                -
            </button>
            <span className="border-border2-solid d-flex align-items-center justify-content-center wp-35 h-35 lh-1 bg-transparent ">{count}</span>
            <button
                className="border-border2-solid wp-35 h-35 text-theme1 lh-1 bg-transparent"
                onClick={handleIncrementQuantity}>
                +
            </button>
        </div>
    )
}
'use client'

import { useDispatch, useSelector } from "react-redux";
import CartIcon2 from "../icons/carticon2";
import { Product } from "@/app/types/types";
import { AppDispatch, RootState } from "@/app/redux/store";
import { AddCartItems, AddtoCart } from "@/app/redux/cartSlice";

interface ApiInfo{
    quantity: number,
    user_id: number
} 

export default function ActionButtons({ Apiinfo , productdata }: {Apiinfo:ApiInfo , productdata: Product }) {
    const dispatch: AppDispatch = useDispatch();
    const cartproducts = useSelector((state: RootState) => state.cart.cartItems);

    const handleCartUpdate = () =>{
        const cartData = {
            id: cartproducts.length !== 0? cartproducts[cartproducts.length - 1].id + 1 : 1,
            products: productdata,
            quantity : Apiinfo.quantity,
            user_id:Apiinfo.user_id

        }
        dispatch(AddtoCart(cartData))
        dispatch(AddCartItems(cartData))
    
    }

    return (
        <div className="mt-4 d-flex align-items-center gap-20 actionbuttons">
            <button
                className="border-transparent-solid bg-theme1 text-white py-1 br-5 wp-130 justify-content-center fw-3 d-flex align-items-center gap-6"
                onClick={ handleCartUpdate}
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
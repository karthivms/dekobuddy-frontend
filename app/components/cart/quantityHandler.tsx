'use client'


import { AddCartItems, decrementQuantity, incrementQuantity } from "@/app/redux/cartSlice";
import { AppDispatch } from "@/app/redux/store";
import { cartItem, Product } from "@/app/types/types";
import { useDispatch } from "react-redux";

export default function QuanityHandler({  cartItems, product, userid, count }: {cartItems:cartItem[], cartid:number, product: Product, userid: number, count: number }) {

    const dispatch: AppDispatch = useDispatch();

    const handleIncrementQuantity = () => {
        dispatch(incrementQuantity(product.id));
        const cartData = {
            id: cartItems[cartItems.length - 1].id + 1,
            products: product,
            quantity : 1,
            user_id:userid
        }  

        dispatch(AddCartItems(cartData))
    }

    const handleDecrementQuantity = () => {
        dispatch(decrementQuantity(product.id));
        const cartData = {
            id: cartItems[cartItems.length - 1].id + 1,
            products: product,
            quantity : -1,
            user_id:userid
        }  

        dispatch(AddCartItems(cartData))
        
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
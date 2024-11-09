'use client'

import { RootState } from "@/app/redux/store"
import { useSelector } from "react-redux"


export default function QuanityHandler({ stock, variationId, count, setCount }: { stock: number, variationId : number, count: number, setCount: React.Dispatch<React.SetStateAction<number>> }) {
    const cartproducts = useSelector((state: RootState) => state.cart.cartItems)
    const handleIncrementQuantity = () => {
        const isProduct = cartproducts.find((item) => item.product.id === variationId)

        console.log(isProduct)

        if (isProduct) {
            if (isProduct.product.quantity + count + 1> isProduct.product.stock) {
                alert(`stock not available`);
                return;
            }
        }
        if (count < stock) {
            setCount(count + 1);
        }
    }

    const handleDecrementQuantity = () => {
        if (count != 1) {
            setCount(count - 1);
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
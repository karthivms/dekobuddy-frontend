'use client'

import { RootState } from "@/app/redux/store"
import { Dispatch, SetStateAction, useEffect } from "react";
import { useSelector } from "react-redux"


export default function QuanityHandler({ errorMsg, setErrormsg, stock, variationId, count, setCount }: {errorMsg : string, setErrormsg : Dispatch<SetStateAction<string>>,  stock: number, variationId: number, count: number, setCount: React.Dispatch<React.SetStateAction<number>> }) {
    const cartproducts = useSelector((state: RootState) => state.cart.cartItems);
    const handleIncrementQuantity = () => {
        const isProduct = cartproducts.find((item) => item.product.id === variationId)


        if (isProduct) {
            if (isProduct.product.quantity + count + 1 > isProduct.product.stock) {
                setErrormsg(`Product out of stock, Cannot add more of this item.`);
                return;
            }
        }
        if (count < stock) {
            setCount(count + 1);
            setErrormsg(``);

        } else {
            setErrormsg(`Product out of stock, Cannot add more of this item.`);
        }
    }

    const handleDecrementQuantity = () => {
        if (count != 1) {
            setCount(count - 1);
        }
    }

    useEffect(() => {
        setErrormsg('');
    }, [variationId, setErrormsg])


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

            {errorMsg && <span className="ms-3 text-danger">{errorMsg}</span>}
        </div>
    )
}
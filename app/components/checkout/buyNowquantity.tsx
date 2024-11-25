'use client'


import { decrementBuyQuantity, incrementBuyQuantity } from "@/app/redux/checkoutslice";
import { AppDispatch } from "@/app/redux/store";
import { useDispatch } from "react-redux";

export default function BuyQuantity({  stock, buyId, count }: { stock : number, buyId: number, count: number }) {

    const dispatch: AppDispatch = useDispatch();

    const handleIncrementQuantity = () => {
        if(count < stock){
            dispatch(incrementBuyQuantity(buyId));
           
        }else{
            alert('Product out of stock, Cannot add more of this item.')
        }
       
    }

    const handleDecrementQuantity = () => {
        if (count != 1){
        dispatch(decrementBuyQuantity(buyId));

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
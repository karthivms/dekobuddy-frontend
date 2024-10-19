'use client'


import { useState } from "react"

export default function QuanityHandler() {
    const [count, setCount] = useState(1);

    const handleIncrementQuantity = () => {
        if (count < 5) {
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
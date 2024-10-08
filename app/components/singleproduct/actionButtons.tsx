import CartIcon2 from "../icons/carticon2";

export default function ActionButtons() {
    return (
        <div className="mt-4 d-flex align-items-center gap-20 actionbuttons">
            <button
                className="border-transparent-solid bg-theme1 text-white py-1 br-5 wp-130 justify-content-center fw-3 d-flex align-items-center gap-6">
                <CartIcon2 /> Add to Cart
            </button>
            <button
                className="border-theme1-solid text-theme1 bg-transparent wp-130 py-1 br-5 fw-3">
                Buy Now
            </button>
        </div>
    )
} 
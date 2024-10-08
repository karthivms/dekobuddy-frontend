import CartIcon2 from "../icons/carticon2";

export default function ActionButtons() {
    return (
        <div className="mt-2 font-small d-flex align-items-center gap-6 actionbuttons">
            <button className="border-transparent-solid bg-theme1 text-white py-1 br-5 wc-52 justify-content-center fw-3 d-flex align-items-center gap-6"><CartIcon2 /> Add to Cart</button>
            <button className="border-theme2-solid text-theme1 wc-48 py-1 br-5 fw-3">Buy Now</button>
        </div>
    )
} 
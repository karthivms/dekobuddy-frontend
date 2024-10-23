import { variations } from "@/app/types/types";
import CloseIcon from "../icons/closeicon";


export default function Modal({closeModal, variations}:{closeModal:() => void, variations:variations[]}) {
    return (

        <div className="select-att-modal">
            <div className="wc-90 mx-auto px-2 pt-3 pb-2 bg-white br-3 mt-2">
                <button className="btn attModalClose" onClick={closeModal}><CloseIcon /></button>
                <h5 className="fw-5 font-small text-black text-uppercase">Select Size</h5>
                <select className="w-100 border-border2-solid px-1 py-2 mt-1 font-primary">
                    {variations.map((item) => (
                    <option value={item.size}>{item.size}</option>
                    ))}
                </select>
                <button className="btn1 w-100  font-primary mt-3 br-0 py-1">Add to cart</button>
            </div>
        </div>

    )
}
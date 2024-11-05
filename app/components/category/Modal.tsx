'use client'

import { productimage, variations } from "@/app/types/types";
import CloseIcon from "../icons/closeicon";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { useState } from "react";
import { AddCartItems, AddtoCart } from "@/app/redux/cartSlice";
import CartSidebar from "../cartSidebar";

interface ApiInfo {
    quantity: number,
    user_id: number
}

export default function Modal({ Apiinfo, category, productid, image, closeModal, variations, name }: { Apiinfo: ApiInfo, category: string, productid: number, image: productimage, name: string, closeModal: () => void, variations: variations[] }) {

    const cartproducts = useSelector((state: RootState) => state.cart.cartItems);
    const dispatch: AppDispatch = useDispatch()

    const [selectedSize, setSelectedsize] = useState(0);

    const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        setSelectedsize(Number(value));
    }

    const [showsidebar, setShowSidebar] = useState(false);

    const handleCartUpdate = () => {
        const cartAPiData = {
            id: cartproducts[cartproducts.length - 1]?.id + 1,
            productid: productid,
            product: {
                id: variations[selectedSize].id,
                name: name,
                regular_price: Number(variations[selectedSize].regular_price),
                size: variations[selectedSize].size,
                categories: category,
                images: image,
                quantity: 1
            },
            user_id: Apiinfo.user_id
        }

        dispatch(AddtoCart(cartAPiData));
        dispatch(AddCartItems(cartAPiData));
        setShowSidebar(true);
    }

    const handleClose = () => {
        setShowSidebar(false)
    }
    return (
        <>
            <div className="select-att-modal">
                <div className="wc-90 mx-auto px-2 pt-3 pb-2 bg-white br-3 mt-2">
                    <button className="btn attModalClose" onClick={closeModal}><CloseIcon /></button>
                    <h5 className="fw-5 font-small text-black text-uppercase">Select Size</h5>
                    <select className="w-100 border-border2-solid px-1 py-2 mt-1 font-primary" value={selectedSize} onChange={handleSort}>
                        {variations.map((item, index) => (
                            <option value={index}>{item.size}</option>
                        ))}
                    </select>
                    <button className="btn1 w-100  font-primary mt-3 br-0 py-1" onClick={handleCartUpdate}>Add to cart</button>
                </div>
            </div>

<CartSidebar showsidebar={showsidebar} handleClose={handleClose}/>
        </>

    )
}
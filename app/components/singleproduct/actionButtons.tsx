'use client'

import { useDispatch, useSelector } from "react-redux";
import CartIcon2 from "../icons/carticon2";
import { AppDispatch, RootState } from "@/app/redux/store";
import { AddCartItems, AddtoCart } from "@/app/redux/cartSlice";
import { Dispatch, SetStateAction, useState } from "react";
import CartSidebar from "../cartSidebar";
import { productimage, variations } from "@/app/types/types";
// import { useRouter } from "next/navigation";

interface ApiInfo {
    quantity: number,
    user_id: number
}

export default function ActionButtons({  setErrormsg, Apiinfo, category, productid, image, variation, name, setCount }: {  setErrormsg: Dispatch<SetStateAction<string>>, Apiinfo: ApiInfo, category: string, productid: number, image: productimage, variation: variations, name: string, setCount: React.Dispatch<React.SetStateAction<number>> }) {
    const dispatch: AppDispatch = useDispatch();
    const cartproducts = useSelector((state: RootState) => state.cart.cartItems);
    // const router = useRouter()

    const [showsidebar, setShowSidebar] = useState(false);

    const handleClose = () => setShowSidebar(false);

    const isProduct = cartproducts.find((item) => item.product.id === variation.id)


    const handleCartUpdate = () => {

        const cartAPiData = {
            id: cartproducts[cartproducts.length - 1]?.id + 1,
            productid: productid,
            product: {
                id: variation.id,
                name: name,
                regular_price: Number(variation.regular_price),
                size: variation.size,
                stock: variation.stock,
                categories: category,
                images: image,
                quantity: Apiinfo.quantity
            },
            user_id: Apiinfo.user_id
        }


        if (isProduct) {
            if (isProduct.product.quantity + Apiinfo.quantity > isProduct.product.stock) {
                setErrormsg(`Product out of stock, Cannot add more of this item.`);
                return;
            }
        }

        dispatch(AddtoCart(cartAPiData));
        dispatch(AddCartItems(cartAPiData));
        setShowSidebar(true);
        setCount(1)
        setErrormsg('')
    }

    // const handleBuyNow = () => {
    //     const cartAPiData = {
    //         id: cartproducts[cartproducts.length - 1]?.id + 1,
    //         productid: productid,
    //         product: {
    //             id: variation.id,
    //             name: name,
    //             regular_price: Number(variation.regular_price),
    //             size: variation.size,
    //             stock: variation.stock,
    //             categories: category,
    //             images: image,
    //             quantity: Apiinfo.quantity
    //         },
    //         user_id: Apiinfo.user_id
    //     }

    //     if (isProduct) {
    //         if (isProduct.product.quantity + Apiinfo.quantity > isProduct.product.stock) {
    //             setErrormsg(`Product out of stock, Cannot add more of this item.`);
    //             return;
    //         }
    //     }

    //     dispatch(AddtoCart(cartAPiData));
    //     dispatch(AddCartItems(cartAPiData));
    //     setCount(1)
    //     setErrormsg('')

    //     router.push('/checkout')
    // }

    return (
        <div className="mt-4 d-flex align-items-center gap-20 actionbuttons">
            <button
                className="border-transparent-solid bg-theme1 text-white py-1 br-5 wp-130 justify-content-center fw-3 d-flex align-items-center gap-6"
                onClick={handleCartUpdate}
            >
                <CartIcon2 /> Add to Cart
            </button>
            {/* <button
                className="border-theme1-solid text-theme1 bg-transparent wp-130 py-1 br-5 fw-3" onClick={handleBuyNow}>
                Buy Now
            </button> */}
            <CartSidebar showsidebar={showsidebar} handleClose={handleClose} />
        </div>
    )
} 
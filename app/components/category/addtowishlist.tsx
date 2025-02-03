'use client'
import heart from "@/public/images/heart.png"
import filheart from "@/public/images/filled-heart.png"

import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { AddItem, addWishlistItems } from "@/app/redux/wishlistslice";
import { productimage, variations } from "@/app/types/types";
import { Dispatch, SetStateAction } from "react";

export default function Addtowishlist(
    { category, variations, handleMsg, handleToast, name, userid, id, price, images }:
        {
            category: string,
            variations: variations[],
            handleMsg: Dispatch<SetStateAction<boolean>>,
            handleToast: Dispatch<SetStateAction<boolean>>,
            name: string,
            userid: number, id: number, price: number, images: productimage[]
        }) {
    const wishlist = useSelector((state: RootState) => state.wishlist.wishlistItems);
    const dispatch: AppDispatch = useDispatch();
    const isWishlistItem = wishlist.some((item) => item.products.id === id)

    const handleWishlistItem = () => {
        const wishlistdata = {
            id: wishlist[wishlist.length - 1]?.id + 1,
            productid: id,
            product:
            {
                id: id,
                name: name,
                category: category,
                regular_price: price,
                images: images,
                variations: variations
            },
            user_id: userid
        }

        dispatch(AddItem(wishlistdata))
        dispatch(addWishlistItems(wishlistdata));
        handleToast(true)
        if (isWishlistItem) {
            handleMsg(false);
        } else {
            handleMsg(true);
        }
    }

    return (
        <div className={`text-danger addtowishlist wp-26 h-26 d-flex justify-content-center align-items-center bg-white br-13  ${isWishlistItem? "" : "inactive_wishlist"}`} onClick={handleWishlistItem}>
            {isWishlistItem ? (
                <Image width={15} height={13} alt="heart" className="wp-13 h-auto" src={filheart} />
            ) : (<><Image width={15} height={13} alt="heart" className="wp-13 h-auto heart" src={heart} />
                <Image width={15} height={13} alt="heart" className="wp-13 h-auto activeheart" src={filheart} /></>)}
        </div>
    )
}                 
'use client'

import { Dispatch, SetStateAction, useState } from "react";
import ShareIcon from "../icons/shareicon";
import Wishlisticon from "../icons/wishlisticon";
import Link from "next/link";
import { usePathname, useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { AddItem, addWishlistItems } from "@/app/redux/wishlistslice";
import { productimage } from "@/app/types/types";


export default function Options({handleMsg, handleToast, id, userid, price, images, title }: {handleMsg: Dispatch<SetStateAction<boolean>>, handleToast : Dispatch<SetStateAction<boolean>>, id: number, userid : number, price : number, images : productimage[], title: string }) {

    const pathname = usePathname();
    const params = useSearchParams();
    const wishlist = useSelector((state: RootState) => state.wishlist.wishlistItems);
    const isWishlistItem = wishlist.some((item) => item.products.id === id);

    const dispatch : AppDispatch = useDispatch()

    let message;
    const variation = params.get('variation');

    if (variation) {
        message = `Check out this ${title} Product ! from Dekobuddy \n https://dekobuddy.com${pathname}?variation=${variation}`;
    } else {
        message = `Check out this ${title} Product ! from Dekobuddy \n https://dekobuddy.com${pathname}`;
    }


    const handleWishlistItem = () => {
        const wishlistdata = {
            id: wishlist[wishlist.length - 1]?.id + 1,
            productid: id,
            product:
            {
                id: id,
                name: title,
                regular_price: price,
                images: images
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


    const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;

    return (
        <div className="option">
            <div className={` ${isWishlistItem ? "bg-danger text-white" : "bg-border2"} pointer`} onClick={handleWishlistItem}>
                <Wishlisticon />
            </div>
            <div className="bg-border2 mt-3">
                <Link target={"_blank"} className="d-flex justify-content-center align-items-center w-100 " href={whatsappShareUrl}><ShareIcon /></Link>
            </div>
        </div>
    )
}
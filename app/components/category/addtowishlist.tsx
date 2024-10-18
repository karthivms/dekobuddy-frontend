'use client'
import heart from "@/public/images/heart.png"
import filheart from "@/public/images/filled-heart.png"

import { useState } from "react";
import Image from "next/image";
import { addToWishlist } from "@/app/api/addtowishlist";

export default function Addtowishlist({ id }: { id: number }) {
    const [fill, setFill] = useState(false)

    const handleWishlistItem = async (id: number) => {
        console.log(id)
        setFill(!fill)
        await addToWishlist(id)
    }

    return (
        <div className="text-danger addtowishlist wp-26 h-26 d-flex justify-content-center align-items-center bg-white br-13" onClick={() => handleWishlistItem(id)}>
            {fill ? (
                <Image width={15} height={13} alt="heart" className="wp-13 h-auto" src={filheart} />
            ) : (<><Image width={15} height={13} alt="heart" className="wp-13 h-auto heart" src={heart} />
                <Image width={15} height={13} alt="heart" className="wp-13 h-auto activeheart" src={filheart} /></>)}
        </div>
    )
}                 
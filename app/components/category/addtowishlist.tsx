'use client'
import heart from "@/public/images/heart.png"
import filheart from "@/public/images/filled-heart.png"

import { useState } from "react";
import Image from "next/image";

export default function Addtowishlist() {
    const [fill, setFill] = useState(false)
    return (
        <div className="text-danger addtowishlist wp-26 h-26 d-flex justify-content-center align-items-center bg-white br-13" onClick={() => setFill(!fill)}>
            {fill ? (
                <Image width={15} height={13} alt="heart" className="wp-13 h-auto" src={filheart} />
            ) : (<><Image width={15} height={13} alt="heart" className="wp-13 h-auto heart" src={heart} />
                <Image width={15} height={13} alt="heart" className="wp-13 h-auto activeheart" src={filheart} /></>)}


        </div>
    )
}                 
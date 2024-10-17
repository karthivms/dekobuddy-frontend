'use client'

import { useState } from "react";
import ShareIcon from "../icons/shareicon";
import Wishlisticon from "../icons/wishlisticon";
import Link from "next/link";
import { usePathname, useSearchParams } from 'next/navigation'


export default function Options({ title }: { title: string }) {

    const [active, setActive] = useState(false)
    const pathname = usePathname();
    const params = useSearchParams();

    let message;
    const variation = params.get('variation');
    
    if (variation) {
        message = `Check out this ${title} Product ! from Dekobuddy \n https://dekobuddy.com${pathname}?variation=${variation}`;
    } else {
        message = `Check out this ${title} Product ! from Dekobuddy \n https://dekobuddy.com${pathname}`;
    }



    const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;

    return (
        <div className="option">
            <div className={` ${active ? "bg-danger text-white" : "bg-border2"}`} onClick={() => setActive(!active)}>
                <Wishlisticon />
            </div>
            <div className="bg-border2 mt-3">
                <Link target={"_blank"} className="d-flex justify-content-center align-items-center w-100 " href={whatsappShareUrl}><ShareIcon /></Link>
            </div>
        </div>
    )
}
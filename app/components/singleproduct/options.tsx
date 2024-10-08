'use client'

import { useState } from "react";
import ShareIcon from "../icons/shareicon";
import Wishlisticon from "../icons/wishlisticon";

export default function Options() {

    const [active, setActive] = useState(false)

    return (
        <div className="option">
            <div className={` ${active? "bg-danger text-white":"bg-border2"}`} onClick={() => setActive(!active)}>
                <Wishlisticon />
            </div>
            <div className="bg-border2 mt-3">
                <ShareIcon />
            </div>
        </div>
    )
}
'use client'


import Nav from "@/app/datas/account/accountNav.json"
import Link from "next/link"
import CartIcon from "../icons/carticon";
import Wishlisticon from "../icons/wishlisticon";
import AccountIcon from "../icons/accounticon";
import AddressIcon from "../icons/addressicon";
import OrderIcon from "../icons/ordericon";
import UserCircle from "../icons/usercircle";
import { usePathname } from "next/navigation";
import { LogoutUser } from "@/app/utilis/logout";
import { getUser } from "@/app/utilis/auth";
import { useEffect, useState } from "react";


export const SideBar = () => {
    const pathname = usePathname();
    const [username, setUsername] = useState();

    const getIcon = (name: string) => {
        switch (name) {
            case "Cart":
                return <CartIcon />
            case "Addresses":
                return <AddressIcon />
            case "Wishlist":
                return <Wishlisticon />
            case "Orders":
                return <OrderIcon />
            case "Profile":
                return <AccountIcon />
        }

    };

    const handleLogout = async () => {
        await LogoutUser()
    }

    useEffect(() => {
        const getusername = async () => {

            const userData = await getUser()

            if (userData) {
                setUsername(userData.username)
            }
        }

        getusername()
    }, [])


    return (
        <>
            <div className="py-3 bb-border3-1 text-center text-theme3">
                <UserCircle />
                <h5 className="font-large fw-4 text-black text-center m-0">Hello, {username}</h5>
            </div>
            <ul className="py-3 m-0 ps-3">
                {Nav.map((item) => (
                    <li key={`item_${item.id}`} className={` d-flex align-items-center gap-8 p-1 px-2 my-2  ${item.link === pathname ? ("active-link") : ("")}`}>
                        <span className="mb-1">{getIcon(item.name)}</span>
                        <Link href={item.link}
                            className="fw-3 text-black d-block w-100 line-tight">
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="p-3 bt-border3-1">
                <button className="btn2 w-100 mt-2 py-1 fw-4" onClick={handleLogout}>Logout</button>
            </div>
        </>
    )
}
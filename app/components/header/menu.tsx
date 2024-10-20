
import menu from "@/app/datas/header/menu.json";
import Link from 'next/link';
import usermenu from "@/app/datas/header/usermenu.json";
import { useEffect } from "react";
import CartIcon from "../icons/carticon";
import Wishlisticon from "../icons/wishlisticon";
import AccountIcon from "../icons/accounticon";
import { Product } from "@/app/types/types";



interface MenuItem {
    id: number;
    name: string;
    link: string;
}


interface MenuProps {
    cart: number;
    wishlist: number;
    hideOffcanvas: () => void;
    username:string
}

const Menu: React.FC<MenuProps> = ({ cart, wishlist, username, hideOffcanvas }) => {

 

    const getIcon =  (name: string) => {
        switch (name) {
            case "cart":
                return <CartIcon />
            case "wishlist":
                return <Wishlisticon />
            case "account":

                if (username) {
                    return <AccountIcon />
                }
                else {
                    return 'login / register'
                }
        }

    };


    const getItems = (name: string) => {
        switch (name) {
            case "cart":
                return cart || 0;
            case "wishlist":
                return wishlist || 0;
            case "account":
                return 0
        }
    };

    useEffect(() => {
        const links = document.querySelectorAll('a');
        links.forEach((link) => {
            link.addEventListener('click', hideOffcanvas);
        });
    })



    return (
        <>
            <ul className="d-flex p-0 m-0 ms-3">
                {menu.map((item: MenuItem) => (
                    <li key={`menu_${item.id}`} className="text-white ">
                        <Link
                            href={item.link}
                            className="text-black font-primary fw-4 px-3 link1">
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
            <ul className="d-flex p-0 m-0 ms-3 gap-20 font-h3 text-black ">
                {usermenu.map((item: MenuItem) => {
                    const itemcount = getItems(item.name);
                    return (
                        <li key={`usermenu_${item.id}`}>
                            <Link href={username || item.name !== 'account' ? item.link : "/login"} className="link1 font-primary fw-4 no-of-items">

                                {getIcon(item.name)}
                                {username && item.name === 'account' && (<span className="ms-1 d-inline-block text-capitalize">{username}</span>)}
                                {itemcount !== 0 && item.name !== "account" && (
                                    <sup className="bg-theme1 text-white font-small">
                                        {getItems(item.name)}
                                    </sup>)}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default Menu;
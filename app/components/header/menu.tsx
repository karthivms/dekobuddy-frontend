
import menu from "@/app/datas/header/menu.json";
import Link from 'next/link';
import usermenu from "@/app/datas/header/usermenu.json";
import { useEffect, useMemo } from "react";
import CartIcon from "../icons/carticon";
import Wishlisticon from "../icons/wishlisticon";
import AccountIcon from "../icons/accounticon";


interface MenuItem {
    id: number;
    name: string;
    link: string;
}

interface Product {
    id: number;
    name: string;
    img_url: string;
    props: string;
    no_of_reviews: number;
    price: number;
    discount: number;
}

interface MenuProps {
    cart: Array<Product>;
    wishlist: Array<Product>;
    hideOffcanvas: () => void;
}

const Menu: React.FC<MenuProps> = ({ cart, wishlist, hideOffcanvas }) => {
    const getIcon = useMemo(() => (name: string) => {
        switch (name) {
            case "cart":
                return <CartIcon />

            case "wishlist":
                return <Wishlisticon />
            case "account":
                return <AccountIcon />
        }

    }, []);


    const getItems = (name: string) => {
        switch (name) {
            case "cart":
                return cart?.length || 0;
            case "wishlist":
                return wishlist?.length || 0;
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
                            <Link href={item.link} className="link1 no-of-items">

                                {getIcon(item.name)}
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

import menu from "@/app/datas/header/menu.json";
import Link from 'next/link';
import usermenu from "@/app/datas/header/usermenu.json";
import { useEffect } from "react";
import CartIcon from "../icons/carticon";
import Wishlisticon from "../icons/wishlisticon";
import AccountIcon from "../icons/accounticon";
import { NavDropdown } from "react-bootstrap";
import { categoryMenu } from "@/app/types/types";



interface MenuItem {
    id: number;
    name: string;
    link: string;
}


interface MenuProps {
    cart: number;
    wishlist: number;
    hideOffcanvas: () => void;
    username: string
    categoryMenu: categoryMenu[]
}



const Menu: React.FC<MenuProps> = ({ categoryMenu, cart, wishlist, username, hideOffcanvas }) => {


    const getIcon = (name: string) => {
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
            <NavDropdown title="All Categories" id="basic-nav-dropdown" className="text-black font-primary fw-4 ms-3 categorymenu">
                {categoryMenu.map((item) => (
                    <div key={`category_menu_${item.name}`} className="catmenu">
                        <Link href={`/category/${item.slug}`} className="w-100 d-block font-primary px-3 py-2 link1">{item.name}</Link>
                        {item.subcategories.map((subcat) => (
                            <div key={`category_menu_${item.name}_${subcat.slug}`} className="subcategorymenu">
                                <Link href={`/category/${item.slug}/${subcat.slug}`} className="w-100 d-block font-primary px-3 py-2 link1">{subcat.name}</Link>
                            </div>
                        ))}

                    </div>
                ))}

            </NavDropdown>
            <ul className="d-flex p-0 m-0 ">
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
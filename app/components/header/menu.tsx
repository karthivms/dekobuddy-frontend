
import menu from "@/app/datas/header/menu.json";
import Link from 'next/link';
import usermenu from "@/app/datas/header/usermenu.json";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CartIcon from "../icons/carticon";
import Wishlisticon from "../icons/wishlisticon";
import AccountIcon from "../icons/accounticon";
import { Dropdown } from "react-bootstrap";
import { categoryMenu } from "@/app/types/types";
import SearchPopup from "./SearchPopup";
import { useSession } from "next-auth/react";
import Image from "next/image";



interface MenuItem {
    id: number;
    name: string;
    link: string;
}


interface MenuProps {
    cart: number;
    wishlist: number;
    setshow: Dispatch<SetStateAction<boolean>>,
    hideOffcanvas: () => void;
    username: string
    categoryMenu: categoryMenu[]
}



const Menu: React.FC<MenuProps> = ({ categoryMenu, cart, setshow, wishlist, username, hideOffcanvas }) => {

    const [showMenu, setShowMenu] = useState(false);

    const { data: session, status } = useSession();

    const getIcon = (name: string) => {
        switch (name) {
            case "cart":
                return <CartIcon />
            case "wishlist":
                return <Wishlisticon />
            case "account":
                if (username) {
                    return <AccountIcon />
                } else if (status === 'authenticated') {
                    return <Image
                        src={session?.user?.image || ''}
                        alt="Profile Picture"
                        width={22}
                        height={22}
                        style={{ borderRadius: '50%' }}
                    />
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
            <Dropdown show={showMenu} onMouseEnter={() => setShowMenu(true)}
                onMouseLeave={() => setShowMenu(false)}>
                <Dropdown.Toggle
                    as="button"
                    id="basic-nav-dropdown"
                    className="text-black font-primary bg-transparent border-transparent-solid fw-4 ms-3 px-2"

                >
                    All Categories
                </Dropdown.Toggle>
                <Dropdown.Menu className="categorymenu" >
                    {categoryMenu.map((item) => (
                        <div key={`category_menu_${item.name}`} className="catmenu">
                            <Link href={`/category/${item.slug}`} className="w-100 d-block font-primary px-3 py-2 link1" onClick={() => setshow(false)}>{item.name}</Link>
                            {item.subcategories.map((subcat) => (
                                <div key={`category_menu_${item.name}_${subcat.slug}`} className="subcategorymenu">
                                    <Link href={`/category/${item.slug}/${subcat.slug}`} className="w-100 d-block font-primary px-3 py-2 link1" onClick={() => setshow(false)}>{subcat.name}</Link>
                                </div>
                            ))}

                        </div>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            <ul className="d-flex user-menu-new p-0 m-0 ">
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
                            <Link href={username || status === 'authenticated' || item.name !== 'account' ? item.link : "/login"} className="link1 font-primary fw-4 no-of-items">

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
                <li className="d-xl-none d-lg-block d-none">
                    <SearchPopup />
                </li>
            </ul>
        </>
    )
}

export default Menu;
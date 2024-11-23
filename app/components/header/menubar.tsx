'use client'

import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import Menu from './menu';
import Link from 'next/link';
import Image from 'next/image';
import logo from "@/public/images/logo.svg";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import Search from '../icons/search';
import { useCallback, useEffect, useState } from 'react';
import { fetchWishlistItems } from '@/app/redux/wishlistslice';
import { fetchCartItems, updateUrl } from '@/app/redux/cartSlice';
import { categoryMenu } from '@/app/types/types';
import { searchItem } from '@/app/api/searchQuery';
import { useRouter } from 'next/navigation';

interface search {
    id?: number,
    category?: string,
    name: string,
    size?: string,
    image: string,
    slug?: string,
    sku?: string
}

export default function Menubar({ categoryMenu, username, userid }: { categoryMenu: categoryMenu[], username: string, userid: string }) {
    const cart = useSelector((state: RootState) => state.cart.cartItems);
    const wishlist = useSelector((state: RootState) => state.wishlist.wishlistItems);
    const dispatch: AppDispatch = useDispatch();

    const [show, setShow] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [search, setSearch] = useState("");
    const [results, setResults] = useState<search[]>([]);
    const router = useRouter();

    const hideOffcanvas = () => {
        setShow(false)
    }

    useEffect(() => {
        dispatch(updateUrl())
    }, [dispatch, userid])

    useEffect(() => {
        dispatch(fetchCartItems(userid))
    }, [dispatch, userid])

    useEffect(() => {
        dispatch(fetchWishlistItems(userid))
    }, [dispatch, userid])


    useEffect(() => {

        const handleClickOutside = (event: MouseEvent) => {
            const offcanvasElement = document.querySelector('.offcanvas');
            if (offcanvasElement && !offcanvasElement.contains(event.target as Node)) {
                setShow(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

    }, []);


    useEffect(() => {
        const debounceTimer = setTimeout(async () => {
            const response = await searchItem(search);
            setResults(response);
        }, 500)

        return () => clearTimeout(debounceTimer);
    }, [search])

    const createSlug = useCallback((input: string) => {
        return input.trim().replace(/\s+/g, '-').toLowerCase();
    }, []);

    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'ArrowDown') {
            setSelectedIndex((prevIndex) => (prevIndex + 1) % results.length);
        } else if (event.key === 'ArrowUp') {
            setSelectedIndex((prevIndex) =>
                prevIndex === 0 ? results.length - 1 : prevIndex - 1
            );
        } else if (event.key === 'Enter') {
            const item = results[selectedIndex]

            if (item.slug) {
                router.push(`/category/${item.slug}`);
            } else {
                router.push(`/product/${item.id}/${createSlug(item.name)}/?variation=${item.sku}`);

            }
        }
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        setIsFocused(true)
    }

    return (
        <>
            <Container fluid className="bg-theme2 h-74 h-sm-65 align-items-center d-flex">
                <Container>
                    <Navbar expand={'lg'} className="">
                        <Link href="/">
                            <Image src={logo} alt="deko-buddy" width={267} height={39} className='wp-220 wp-sm-180 h-auto' />
                        </Link>
                        <Navbar.Toggle onClick={() => setShow(true)} aria-controls={`offcanvasNavbar-expand-lg`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-lg`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                            placement="start"
                            show={show}
                            onHide={() => setShow(false)}
                        >
                            <Offcanvas.Header closeButton>
                            </Offcanvas.Header>
                            <Offcanvas.Body  >
                                <Nav className="justify-content-end flex-grow-1 align-items-lg-center">
                                    <form className="search-form " onSubmit={(e) => e.preventDefault()}>
                                        <Search />
                                        <input
                                            type="text"
                                            value={search}
                                            onKeyDown={handleKeyDown}
                                            onChange={handleChange}
                                            onFocus={() => setIsFocused(true)}
                                            placeholder='Search for Products...'
                                            className="bg-theme1 border-transparent-solid br-3 wp-450 h-30 text-white font-primary pe-4" />
                                        {isFocused && (<>{
                                            results.length !== 0 ? (
                                                <div onMouseLeave={() => setIsFocused(false)}
                                                    onClick={() => setIsFocused(false) }
                                                    className="search-result w-100  max-h-300 overflow-auto custom-scrollbar">
                                                    {results.map((item: search, index) => (
                                                        <div key={`search_item_${index}`} className={index === selectedIndex ? 'active-item' : 'bg-white'} onMouseOver={() => setSelectedIndex(index)}>
                                                            {item.slug ? (
                                                                <div className='d-flex align-items-center  gap-20 search-item' >
                                                                    <Image alt="cart_images" width={40} height={40} src={item.image} className="br-5" />
                                                                    <div>
                                                                        <Link href={`/category/${item.slug}`} className="mb-1 fw-3 d-block" >{item.name}</Link>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className='d-flex align-items-center gap-20  search-item'>
                                                                    <Image alt="cart_images" width={40} height={40} src={item.image} className="br-5" />
                                                                    <div>
                                                                        <Link href={`/product/${item.id}/${createSlug(item.name)}/?variation=${item.sku}`} className="mb-0 d-block fw-4 font-primary ">{item.name} - {item.size}</Link>
                                                                        <span className="font-small d-block text-theme1 fw-4  br-3">in {item.category}</span>
                                                                    </div>
                                                                </div>)}

                                                        </div>
                                                    ))}
                                                </div>) : (
                                                <div className="search-result p-3  w-100 fw-3 text-theme1" onMouseLeave={() => setIsFocused(false)}>
                                                    No results Found
                                                </div>
                                            )
                                        }</>)}
                                    </form>
                                    <Menu categoryMenu={categoryMenu} cart={cart.length} setshow={setShow} username={username} wishlist={wishlist.length} hideOffcanvas={hideOffcanvas} />
                                </Nav>

                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Navbar>
                </Container>
            </Container >
        </>
    )

}
'use client'

import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import Menu from './menu';
import Link from 'next/link';
import Image from 'next/image';
import logo from "@/public/images/logo.svg";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import Search from '../icons/search';
import { useEffect, useState } from 'react';
import { fetchWishlistItems } from '@/app/redux/wishlistslice';
import { fetchCartItems } from '@/app/redux/cartSlice';


export default function Menubar({ username, userid }: { username: string, userid: string }) {
    const cart = useSelector((state: RootState) => state.cart.cartItems);
    const wishlist = useSelector((state: RootState) => state.wishlist.wishlistItems);
    const dispatch: AppDispatch = useDispatch();

    const [show, setShow] = useState(false);

    const hideOffcanvas = () => {
        setShow(false)
    }

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
                                    <form className="search-form">
                                        <Search />
                                        <input
                                            type="text"
                                            placeholder='Search for Products...'
                                            className="bg-theme1 border-transparent-solid br-3 wp-220 h-30 text-white font-primary pe-4" />
                                    </form>
                                    <Menu cart={cart.length} username={username} wishlist={wishlist.length} hideOffcanvas={hideOffcanvas} />
                                </Nav>

                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Navbar>
                </Container>
            </Container>
        </>
    )
}
'use client'

import { useCallback, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import CloseIcon from "../icons/closeicon";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { fetchWishlistItems, handleSelectedItem, removeItem, removeWishlistItems, showTab } from "@/app/redux/wishlistslice";
import ActionTab from "./actionTab";
import ProductSkeleton from "../productCardSkeleton";
import { wishlistItem } from "@/app/types/types";
import formatPriceIndian from "@/app/utilis/formatPrice";



export default function Wishlist({ userid }: { userid: string }) {
    const dispatch: AppDispatch = useDispatch()
    const wishlist = useSelector((state: RootState) => state.wishlist.wishlistItems);
    const status = useSelector((state: RootState) => state.wishlist.status);
    const selectedItems = useSelector((state: RootState) => state.wishlist.selectedItems);

    const isProductSelected = (id: number): boolean => {
        return selectedItems.includes(id)
    }


    useEffect(() => {
        const anyChecked = selectedItems.length >= 1;
        dispatch(showTab(anyChecked));
    }, [selectedItems, dispatch])


    useEffect(() => {
        dispatch(fetchWishlistItems(userid))
    }, [dispatch, userid])

    const getDiscount = useCallback((price: number, dis: number) => {
        const discount = Math.floor(dis / 100 * price);
        return price - discount;
    }, []);

    const createSlug = useCallback((input: string) => {
        return input.trim().replace(/\s+/g, '-').toLowerCase();
    }, []);


    const deleteItem = (id: number) => {
        const delbody = {
            wishlist_id: id,
            user_id: Number(userid)
        }

        dispatch(removeItem(id));
        dispatch(removeWishlistItems(delbody))
    }

    return (
        <Row className="my-4 row-gap-20">
            {status === 'loading' ? (<>
                <h1 className="mt-3 font-h1  text-theme1 fw-4 pb-2">Wishlist</h1>
                <ProductSkeleton grid={20} array={5}/>
            </>
            ) : (<>
                {wishlist.length > 0 ? (<>
                    <ActionTab userid={userid} />
                    {
                        wishlist.map((item: wishlistItem) => (
                            <Col lg={20} xs={6} className="p-1 mb-1 product_item " key={`productitem_${item.id}`}>
                                <div className="bg-white br-8 p-3 pt-1">
                                <div className="mb-2 d-flex justify-content-between align-items-center remove_wishlist">
                                        <button className="font-small btn fw-3 d-flex align-items-center gap-1"
                                            onClick={() => deleteItem(item.id)}>
                                            <CloseIcon /> Remove
                                        </button>
                                        <input
                                            type="checkbox"
                                            id={`${item.products.name}_value_${item.id}`}
                                            className="bg-transparent"
                                            checked={isProductSelected(item.id)}
                                            onChange={() => dispatch(handleSelectedItem(item.id))}
                                            name={item.products.name}
                                        />
                                    </div>
                                    <div className="product_grid">
                                        <div className="pro_btn_holder">
                                            <Image alt="product-image" width={384} height={384} className="w-100 zoomimage h-auto br-10" src={item.products.images[0].image} loading="lazy" />
                                            <Image alt="product-image" width={384} height={384} className="w-100 initialimage h-auto br-10" src={item.products.images[1].image} loading="lazy" />


                                        </div>
                                        <h6 className="m-0 mt-3 font-primary"><Link href={`/product/${item.id}/${createSlug(item.products.name)}`}>{item.products.name}</Link></h6>
                                        {/* <p className="m-0 font-primary text-grey">{item.props}</p> */}
                                     
                                        <div className="font-primary mt-1 fw-3 d-flex gap-10 text-black align-items-center">
                                            {item.products.sale_price ? (<>
                                                <span>₹{item.products.sale_price}</span>
                                                <s>₹{item.products.regular_price}</s>
                                                <span className="font-small bg-theme2 px-1 br-5">
                                                    {getDiscount(Number(item.products.regular_price), item.products.sale_price)}%
                                                </span>
                                            </>) : (
                                                <span>
                                                    {formatPriceIndian(item.products.regular_price)}
                                                </span>
                                            )}
    
                                        </div>
                                    </div>
    
                                </div>
                            </Col>
                        ))
                    }
                </>) : (
                    <div className="d-flex justify-content-center align-items-center py-3">
                        <div className="text-center">
                            <Image src={'/images/empty-wishlist.png'} width={485} height={380} className='wp-350 h-auto' alt="empty_wishlist" />
                            <h1 className="font-h2 fw-5 mb-5">Your wishlist is empty</h1>
                            <Link href="/" className="bg-theme1 text-white px-4 py-2 br-5">Continue Shopping</Link>
                        </div>
                    </div>
                )}
            </>)}


        </Row>
    )
}
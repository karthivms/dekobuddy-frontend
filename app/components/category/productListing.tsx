"use client"

import { Col, Row } from "react-bootstrap";
import Image from "next/image";
import Star from "../icons/star";
import Link from "next/link";
import Addtowishlist from "./addtowishlist";
import { useCallback, useEffect, useState } from "react";
import CartIcon2 from "../icons/carticon2";
import { Product } from '@/app/types/types'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { getProducts, updateCurrentCategory, updateOffset } from "@/app/redux/Filterslice";
import ProductSkeleton from "../productCardSkeleton";
import Pagination from "./pagination";
import Modal from "./Modal";
import Toaster from "../toaster";


export default function ProductGrid({ grid, userid, category }: { grid: number, userid: string, category: string }) {

    const products = useSelector((state: RootState) => state.product.products);
    const state = useSelector((state: RootState) => state.product);
    const status = useSelector((state: RootState) => state.product.status);
    const count = state.count;
    const [attModal, setAttModal] = useState<number | null>(null);


    const dispatch: AppDispatch = useDispatch()

    const getDiscount = useCallback((reg_price: number, sale_price: number) => {
        const discount = Math.floor(reg_price / sale_price * 100);
        return discount;
    }, []);

    const createSlug = useCallback((input: string) => {
        return input.trim().replace(/\s+/g, '-').toLowerCase();
    }, []);

    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(updateOffset(0));
    }, [category])

    const handlePageChange = (pageNumber: number) => {
        setPage(pageNumber)
        if (pageNumber === 1) {
            dispatch(updateOffset(0))
        } else {
            dispatch(updateOffset((pageNumber - 1) * state.limit))
        }
    }

    const paginationProps = {
        page,
        handlePageChange,
        count,
    }

    useEffect(() => {
        dispatch(updateCurrentCategory(category))
    }, [category])


    useEffect(() => {
        dispatch(getProducts(category))
    }, [state.attributes, category, state.offset, state.sort]);

    const handleQuickAddClick = (productId: number) => {
        setAttModal(attModal === productId ? null : productId);
    };

    const cartAPiinfo = {
        quantity: count,
        user_id: Number(userid)
    }

    const handleToastClose = () => {
        setShow(false);
    }

    const [show, setShow] = useState(false);
    const [wishmsg, SetWishmsg] = useState(true)

    return (
        <>
          <Toaster show={show} msg={wishmsg} handleClose={handleToastClose}/>
            <Row className="mt-4">
              
                {status === 'loading' ? (<ProductSkeleton grid={3} array={20} />) : (<>
                    {
                        products.map((item: Product) => (
                            <Col lg={grid} xs={6} className="p-1 mb-1 product_item " key={`productitem_${item.id}`}>
                                <div className="bg-white br-8 p-3">
                                    <div className="product_grid">
                                        <div className="pro_btn_holder">
                                            <Image alt="product-image" width={384} height={384} className="w-100 zoomimage h-auto br-10" src={item.images[1].image} loading="lazy" />
                                            <Image alt="product-image" width={384} height={384} className="w-100 initialimage h-auto br-10" src={item.images[2].image} loading="lazy" />
                                            <Addtowishlist handleMsg={SetWishmsg} handleToast={setShow}  name={item.name} userid={Number(userid)} id={item.id} price={Number(item.regular_price)} images={item.images} />
                                            <button
                                                className="border-transparent-solid font-primary text-white py-1  wc-100 justify-content-center fw-3 d-flex align-items-center gap-6 cart_btn"
                                                onClick={() => handleQuickAddClick(item.id)}>
                                                <CartIcon2 /> Quick Add
                                            </button>
                                            {attModal === item.id && (
                                                <Modal Apiinfo={cartAPiinfo} category={item.categories[0].name} productid={item.id} image={item.images[0]} name={item.name} variations={item.variations} closeModal={() => setAttModal(null)} />)}
                                        </div>
                                        <h6 className="m-0 mt-3 font-primary"><Link href={`/product/${item.id}/${createSlug(item.name)}`}>{item.name}</Link></h6>
                                        {/* <p className="m-0 font-primary text-grey">{item.props}</p> */}
                                        <div className="d-flex align-items-center">
                                            <div className="d-flex gap-1">
                                                {[...Array(5)].map((_, index) => (
                                                    <span key={`key_${index}`} className="text-review">
                                                        <Star fill={index < 4 ? "currentcolor" : "none"} size={"13"} />
                                                    </span>
                                                ))}
                                            </div>
                                            <span className="d-inline-block text-grey font-primary mt-1 ms-2">{item.no_of_reviews} Reviews</span>
                                        </div>
                                        <div className="font-primary fw-3 d-flex gap-10 text-black align-items-center">
                                            {item.sale_price ? (<>
                                                <span>₹{item.sale_price}</span>
                                                <s>₹{item.regular_price}</s>
                                                <span className="font-small bg-theme2 px-1 br-5">
                                                    {getDiscount(Number(item.regular_price), item.sale_price)}%
                                                </span>
                                            </>) : (
                                                <span>
                                                    ₹{item.regular_price}
                                                </span>
                                            )}

                                        </div>
                                    </div>

                                </div>
                            </Col>
                        ))
                    }
                </>)}

            </Row>
            <Pagination {...paginationProps} />
        </>

    )
}
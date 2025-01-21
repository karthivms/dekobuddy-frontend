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
import { getProducts, updateCurrentCategory, updateOffset, updateSubCategory } from "@/app/redux/Filterslice";
import ProductSkeleton from "../productCardSkeleton";
import Pagination from "./pagination";
import Modal from "./Modal";
import Toaster from "../toaster";
import formatPriceIndian from "@/app/utilis/formatPrice";


export default function ProductGrid({ grid, userid, category, subcategory }: { grid: number, userid: string, category: string, subcategory : string }) {

    const products = useSelector((state: RootState) => state.product.products);
    const state = useSelector((state: RootState) => state.product);
    const status = useSelector((state: RootState) => state.product.status);
    const count = state.count;
    const [attModal, setAttModal] = useState<number | null>(null);
    const [selectedSize, setSelectedsize] = useState(0);

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
    }, [category, dispatch])



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
    }, [category, dispatch])

    useEffect(() => {
        dispatch(updateSubCategory(subcategory))
    }, [subcategory, dispatch])


    useEffect(() => {
        dispatch(getProducts(category))
    }, [state.attributes.length, category, state.offset, state.sort, dispatch]);

    const handleQuickAddClick = (productId: number) => {
        setAttModal(attModal === productId ? null : productId);
    };

    const cartAPiinfo = {
        quantity: 1,
        user_id: Number(userid)
    }


    const handleToastClose = () => {
        setShow(false);
    }

    const [show, setShow] = useState(false);
    const [wishmsg, SetWishmsg] = useState(true)

    const handleSelected = (value: number) => {
        setSelectedsize(value)
    }

    

    return (
        <>
            <Toaster show={show} msg={wishmsg} handleClose={handleToastClose} />
            <Row className="mt-2">

                {status === 'loading' ? (<ProductSkeleton grid={3} array={20} />) : (<>
                    {products.length === 0 ? (<div className="mt-3">
                        <Image src={'/images/empty-cart.png'} width={485} height={380} className='wp-350 h-auto d-block m-auto' alt="empty_cart" />
                        <h3 className="text-theme1 font-h2 fw-4 text-center"> Products Not Found</h3>
                    </div>
                    ) : (
                        <>
                            {
                                products.map((item: Product) => (
                                    <Col xl={grid} lg={4} sm={4} xs={6} className="p-1 mb-1 product_item d-flex" key={`productitem_${item.id}`}>
                                        <div className="bg-white br-8 p-3">
                                            <div className="product_grid ">
                                                <div className="pro_btn_holder">
                                                    <Image alt="product-image" width={384} height={384} className="w-100 zoomimage h-auto br-10" src={item.images[1].image} loading="lazy" />
                                                    <Image alt="product-image" width={384} height={384} className="w-100 initialimage h-auto br-10" src={item.images[2].image} loading="lazy" />
                                                    <Addtowishlist category={item.categories[0].name} variations={item.variations} handleMsg={SetWishmsg} handleToast={setShow} name={item.name} userid={Number(userid)} id={item.id} price={Number(item.regular_price)} images={item.images} />
                                                    <button
                                                        className="border-transparent-solid font-primary text-white py-1  wc-100 justify-content-center fw-3 d-flex align-items-center gap-6 cart_btn"
                                                        onClick={() => handleQuickAddClick(item.id)}>
                                                        <CartIcon2 /> Select Size
                                                    </button>
                                                    {attModal === item.id && (
                                                        <Modal handleSelected={handleSelected} selectedSize={selectedSize} Apiinfo={cartAPiinfo} category={item.categories[0].name} productid={item.id} image={item.images[0]} name={item.name} variations={item.variations} closeModal={() => setAttModal(null)} />)}
                                                </div>
                                                <h6 className="m-0 mt-3 font-primary"><Link href={`/product/${item.id}/${createSlug(item.name)}`}>{item.name}</Link></h6>
                                                {item.rating_count > 0 && (<div className="d-flex align-items-center">
                                                    <div className="d-flex gap-1">
                                                        {[...Array(5)].map((_, index) => (
                                                            <span key={`key_${index}`} className="text-review">
                                                                <Star fill={index < Math.floor(Number(item.average_rating)) ? "currentcolor" : "none"} size={"13"} />
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <span className="d-inline-block text-grey font-primary mt-1 ms-2">{item.rating_count} Ratings</span>
                                                </div>)}
                                                <div className="font-primary mt-1 fw-3 d-flex gap-10 text-black align-items-center">
                                                    {item.sale_price ? (<>
                                                        <span>₹{item.sale_price}</span>
                                                        <s>₹{item.regular_price}</s>
                                                        <span className="font-small bg-theme2 px-1 br-5">
                                                            {getDiscount(Number(item.regular_price), item.sale_price)}%
                                                        </span>
                                                    </>) : (
                                                        <span>
                                                            {attModal === item.id ? (
                                                                <>
                                                                    {item.variations[selectedSize] && formatPriceIndian(item.variations[selectedSize].regular_price)}
                                                                    <span className="ms-2 text-secondary fs-8 fw-3">({item.variations[selectedSize] && item.variations[selectedSize].size})</span>
                                                                </>
                                                            ) : (<>
                                                                {item.variations[0] && formatPriceIndian(item.variations[0].regular_price)}
                                                                {item.variations[0] && <span className="ms-2 text-secondary fs-8 fw-3">({item.variations[0].size})</span>}
                                                            </>)}
                                                        </span>
                                                    )}

                                                </div>
                                            </div>

                                        </div>
                                    </Col>
                                ))
                            }

                        </>)}
                </>)}

            </Row>
            {products.length !== 0 && (<Pagination {...paginationProps} />
            )}
        </>

    )
}
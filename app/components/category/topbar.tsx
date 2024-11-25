'use client'

import { updateBestsellers, updateSort } from "@/app/redux/Filterslice";
import { AppDispatch, RootState } from "@/app/redux/store";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";



export default function Topbar() {

    const products = useSelector((state: RootState) => state.product);
    const params = useSearchParams();
    const dispatch: AppDispatch = useDispatch();
    const [disabled, setDisabled] = useState(false)

    const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        dispatch(updateSort(value))
        setDisabled(true)
    }



    useEffect(() => {
        dispatch(updateSort(params?.get('sort')))
        if(params?.get('best_sellers')){
            dispatch(updateBestsellers(true))
        }
    }, [params, dispatch])


    function deslugger(slug: string) {
        return slug
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    return (
        <div >
            {products.count !== 0 && (<Row className="align-items-center">

                <Col>
                    <h3 className="font-h2 text-black font-sm-secondary line-normal">
                        Showing {products.count} Products
                        { products.currentCategory !== "" ?
                            (<> for {deslugger(products.currentSubCategory === '' ? products.currentCategory : products.currentSubCategory)}</>) : <></>}
                    </h3></Col>
                <Col className="d-flex justify-content-end align-items-center ">
                    <select className="ms-2 p-2 br-5 border-theme1-solid bg-transparent text-theme1 fw-4 font-primary" value={products.sort} onChange={handleSort}>
                        <option value="" disabled={disabled}>Sort by</option>
                        <option value="price_low_to_high">Price --Low to High</option>
                        <option value="price_high_to_low">Price --High to Low</option>
                        <option value="newest_first">Newest First</option>
                    </select>
                </Col>
            </Row>)}

        </div>
    )
}
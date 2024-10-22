'use client'

import { updateSort } from "@/app/redux/Filterslice";
import { AppDispatch, RootState } from "@/app/redux/store";
import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";



export default function Topbar() {

    const products = useSelector((state: RootState) => state.product);
    const category = products.products[0]?.categories[0].name;
    const dispatch:AppDispatch = useDispatch()

    const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        dispatch(updateSort(value))
    }

    return (
        <div >
            <Row className="align-items-center">
                <Col><h3 className="font-h2 text-black font-sm-secondary line-normal">Showing {products.count} Products for {category}</h3></Col>
                <Col className="d-flex justify-content-end align-items-center ">
                    <select className="ms-2 p-2 br-5 border-theme1-solid bg-transparent text-theme1 fw-4 font-primary" onChange={handleSort}>
                        <option value="" disabled>Sort by</option>
                        <option value="price_low_to_high">Price --Low to High</option>
                        <option value="price_high_to_low">Price --High to Low</option>
                        <option value="newest_first">Newest First</option>
                    </select>
                </Col>
            </Row>
        </div>
    )
}
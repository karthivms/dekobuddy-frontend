'use client'

import { RootState } from "@/app/redux/store";
import {  useMemo, useState, useCallback } from "react";
import { useSelector } from "react-redux";

interface ChildComponentProps {
    page: number;
    count: number;
    handlePageChange: (newPage: number) => void;
}

const Pagination: React.FC<ChildComponentProps> = ({ page, count, handlePageChange }) => {
    const perPage = useSelector((state: RootState) => state.product.limit);


    const totalPages = useMemo(() => {
        return count % perPage === 0 ? Math.floor(count / perPage) : Math.floor(count / perPage) + 1;
    }, [count, perPage]);
    const pageNumbers = useMemo(() => Array.from({ length: totalPages }, (_, i) => i + 1), [totalPages]);

    const [visibleRange, setVisibleRange] = useState([0, 5]);

    const pagination = useMemo(() => pageNumbers.slice(visibleRange[0], visibleRange[1]), [pageNumbers, visibleRange]);

    const handleNextNavigation = useCallback(() => {
        if (visibleRange[1] < pageNumbers.length) {
            setVisibleRange([visibleRange[0] + 5, visibleRange[1] + 5]);
        }
    }, [visibleRange, pageNumbers.length]);

    const handlePrevNavigation = useCallback(() => {
        if (visibleRange[0] > 0) {
            setVisibleRange([visibleRange[0] - 5, visibleRange[1] - 5]);
        }
    }, [visibleRange]);

    return (
        <div className="d-flex justify-content-end align-items-center">
            <button className="btn border-transparent-solid px-2 bg-theme2 me-2" disabled={visibleRange[0] === 0} onClick={handlePrevNavigation}>
                «
            </button>
            {pagination.map((number, index) => (
                <button
                    key={`pagination_${index}`}
                    className={`font-small btn fw-4 wp-20 br-5 ms-1 me-1 ${Number(page) === number ? "text-white bg-theme1" : ""
                        }`}
                    onClick={() => handlePageChange(number)}
                >
                    {number}
                </button>
            ))}
            <button
                className="btn border-transparent-solid px-2 bg-theme2 ms-2"
                disabled={visibleRange[1] >= pageNumbers.length}
                onClick={handleNextNavigation}
            >
                »
            </button>
        </div>
    );
};

export default Pagination;

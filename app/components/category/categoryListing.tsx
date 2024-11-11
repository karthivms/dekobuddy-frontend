'use client'

import { useState } from "react";
import { Button, Collapse } from "react-bootstrap";
import { navigationItem } from "@/app/types/types";
import Link from "next/link";


const ArrowIcon = ({ open }: { open: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#868588" style={{ transform: open ? 'rotate(90deg)' : 'rotate(270deg)', transition: 'transform 0.3s ease' }}>
        <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
    </svg>
);

export default function CategoryListing({ category }: { category: navigationItem[] }) {

    const [open, setOpen] = useState(true);

    return (
        <>
            <Button
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
                className="mt-4 w-100 bg-transparent text-capitalize border-transparent-solid text-black font-primary d-flex align-items-center fw-4 justify-content-between p-0"
            >
                Categories
                <ArrowIcon open={open} />
            </Button>
            <Collapse in={open}>
                <div id="example-collapse-text">

                    {category.map((item: navigationItem, index) => (
                        <div key={`${item.name}_${index}`} className="mt-1 ps-3">
                            <Link href={item.slug ? `/category/${item.slug}` : ''}>
                                <label className="ms-1 font-primary text-black " htmlFor={`${item.name}_value_${index}`}>{item.name}</label><br />
                            </Link>
                        </div>
                    ))}
                </div>
            </Collapse>
        </>
    )
}
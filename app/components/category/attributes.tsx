'use client'

import { addAttribute, removeAttribute } from "@/app/redux/Filterslice";
import { RootState } from "@/app/redux/store";
import { Attribute } from "@/app/types/types";
import { useState } from "react";
import { Button, Collapse } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";


const ArrowIcon = ({ open }: { open: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#868588" style={{ transform: open ? 'rotate(90deg)' : 'rotate(270deg)', transition: 'transform 0.3s ease' }}>
        <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
    </svg>
);

export default function Attributes({ attribute }: { attribute: Attribute }) {
    const [open, setOpen] = useState(true);
    const dispatch = useDispatch();
    const selectedAttributes = useSelector((state: RootState) => state.product.attributes)

    const handleCheckboxChange = (item: string, ischecked: boolean) => {
        if (ischecked) {
            dispatch(addAttribute(item));
        } else {
            dispatch(removeAttribute(item));
        }
    }

    return (
        <>

            <Button
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
                className="mt-4 w-100 bg-transparent text-capitalize border-transparent-solid text-black font-primary d-flex align-items-center fw-4 justify-content-between p-0"
            >
                {attribute.name}
                <ArrowIcon open={open} />
            </Button>
            <Collapse in={open}>
                <div id="example-collapse-text">
                    {attribute.name !== "Color" ? (
                        <>
                            {attribute.values.map((item: string, index) => (
                                <div key={`${attribute.name}_${index}`} className="mt-1 ps-3">
                                    <input
                                        type="checkbox"
                                        id={`${attribute.name}_value_${index}`}
                                        className="me-1 bg-transparent"
                                        checked={selectedAttributes.includes(item)}
                                        name={item}
                                        onChange={(e) => { handleCheckboxChange(item, e.target.checked) }} />
                                    <label className="ms-1 font-primary text-black " htmlFor={`${attribute.name}_value_${index}`}>{item}</label><br />
                                </div>
                            ))}
                        </>
                    ) : (
                        <div className="d-flex flex-wrap gap-6 row-gap-6 mt-3">
                            {attribute.values.map((item: string, index) => (
                                <span key={`${attribute.name}_${index}`} className="bg-white px-2 py-1 br-10 font-small text-black d-flex align-items-center gap-6">
                                    <span className="wp-10 h-10 br-5 d-inline-block" style={{ backgroundColor: `${item}` }}></span>{item}</span>
                            ))}
                        </div>)}
                </div>
            </Collapse>

        </>
    )
}
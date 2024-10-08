'use client'

import Attributes from "./attributes";
import Selected from "./selectedAttributes";
import patterns from "@/app/datas/category/patterns.json";
import types from "@/app/datas/category/types.json";
import colors from "@/app/datas/category/colors.json";
import materials from "@/app/datas/category/materials.json";
import shapes from "@/app/datas/category/shapes.json";
import size from "@/app/datas/category/carpetsize.json";
import ClearAll from "./clearAllbtn";
import { Offcanvas } from "react-bootstrap";
import { useState } from "react";
import FilterIcon from "../icons/filter";

export default function MobileFilter() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <button className="d-lg-none mb-3 btn2 py-1 wp-80 text-start px-2 font-primary" onClick={handleShow}>
              <span><FilterIcon/> </span><span>Filter</span>
            </button>

            <Offcanvas show={show} onHide={handleClose}>
                <div className="bg-theme2 br-10 py-3 px-4 filterbox custom-scrollbar">
                    <div className="d-flex align-items-center justify-content-between">
                        <h5 className="font-secondary fw-4 text-black m-0">Filter</h5>
                        <ClearAll />
                    </div>
                    <Selected />
                    <div className="attributes-section">
                        <Attributes attribute={patterns} />
                        <Attributes attribute={types} />
                        <Attributes attribute={colors} />
                        <Attributes attribute={materials} />
                        <Attributes attribute={shapes} />
                        <Attributes attribute={size} />
                    </div>
                </div>
            </Offcanvas>

        </>
    )
}
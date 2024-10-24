'use client';

import { Offcanvas } from "react-bootstrap";
import { useState } from "react";

export default function CartSidebar({showsidebar, handleClose}:{showsidebar : boolean, handleClose : () => void}) {

    return (
        
            <Offcanvas show={showsidebar} onHide={handleClose} placement="end">
                <div className="br-10 py-3 px-4 custom-scrollbar">
            
                </div>
            </Offcanvas>

    )
}
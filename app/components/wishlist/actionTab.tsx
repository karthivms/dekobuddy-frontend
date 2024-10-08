'use client'

import CloseIcon from "../icons/closeicon";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { deSelectAllItems, removeSelectedItems, selectAllItems } from "@/app/redux/wishlistslice";


export default function ActionTab() {

    const show = useSelector((state: RootState) => state.wishlist.actionTab);

    const dispatch = useDispatch();

    return (
        <>
            {show && (<div className="bg-theme2 p-3 br-5 d-flex gap-20">
                <button className="btn1 font-small d-flex align-items-center gap-1 px-2" onClick={() => dispatch(removeSelectedItems())}>
                    <CloseIcon />
                    Remove
                </button>
                <button className="btn1 font-small d-flex align-items-center gap-1 px-2" onClick={() => dispatch(selectAllItems())}>
                    <CloseIcon />
                    Select All
                </button>
                <button className="btn1 font-small d-flex align-items-center gap-1 px-2" onClick={() => dispatch(deSelectAllItems())}>
                    <CloseIcon />
                    Deselect All
                </button>

            </div>)}
        </>

    )
}
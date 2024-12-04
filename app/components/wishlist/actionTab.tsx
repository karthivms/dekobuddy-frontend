'use client'

import CloseIcon from "../icons/closeicon";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { deSelectAllItems, removeSelectedItems, removeSelectedWishlistItems, selectAllItems } from "@/app/redux/wishlistslice";


export default function ActionTab({ userid }: { userid: string }) {

    const show = useSelector((state: RootState) => state.wishlist.actionTab);

    const dispatch: AppDispatch = useDispatch();

    const deleteItems = () => {
        dispatch(removeSelectedWishlistItems(Number(userid)));
        dispatch(removeSelectedItems());

    }

    return (
        <>
            <h1 className="mt-3 font-h1  text-theme1 fw-4 pb-2">Wishlist</h1>
            {show && (<div className="bg-theme2 p-3 br-5 d-flex flex-wrap row-gap-20 gap-20">
                <button className="btn1 font-small d-flex align-items-center gap-1 px-2 py-1" onClick={deleteItems}>
                    <CloseIcon />
                    Remove
                </button>
                <button className="btn1 font-small d-flex align-items-center gap-1 px-2 py-1" onClick={() => dispatch(selectAllItems())}>
                    <CloseIcon />
                    Select All
                </button>
                <button className="btn1 font-small d-flex align-items-center gap-1 px-2 py-1" onClick={() => dispatch(deSelectAllItems())}>
                    <CloseIcon />
                    Deselect All
                </button>

            </div>)}
        </>

    )
}
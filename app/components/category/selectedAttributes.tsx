'use client'

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from '@/app/redux/store';
import CloseIcon from "../icons/closeiconSmall";
import { removeAttribute } from "@/app/redux/Filterslice";


export default function Selected() {

    const attributes = useSelector((state: RootState) => state.product.attributes);
    const dispatch: AppDispatch = useDispatch();

    return (
        <>
            {
                attributes && attributes.length > 0 && (
                    <div className="d-flex flex-wrap gap-6 row-gap-6 mt-3">
                        {attributes.map((item: string, index) => (
                            <span key={`selected_${index}`} className="bg-white px-2 py-1 br-10 font-small fw-4 text-theme1">
                                {item}
                                <span className="ms-1 pointer" onClick={() => dispatch(removeAttribute(item))}><CloseIcon /></span>
                            </span>
                        ))}
                    </div>
                )
            }
        </>
    )
}
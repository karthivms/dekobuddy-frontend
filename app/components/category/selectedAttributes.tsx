'use client'

import { useSelector } from "react-redux";
import { RootState } from '@/app/redux/store';


export default function Selected() {

    const attributes = useSelector((state: RootState) => state.attribute)
    return (
        <>
            {
                attributes && attributes.length > 0 && (
                    <div className="d-flex flex-wrap gap-6 row-gap-6 mt-3">
                        {attributes.map((item: string, index) => (
                            <span key={`selected_${index}`} className="bg-white px-2 py-1 br-10 font-small fw-4 text-theme1">
                                {item}
                            </span>
                        ))}
                    </div>
                )
            }
        </>
    )
}
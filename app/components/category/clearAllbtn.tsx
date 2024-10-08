'use client'

import { clearAttributes } from "@/app/redux/Filterslice"
import { useDispatch } from "react-redux"

export default function ClearAll() {
    const dispatch = useDispatch()
    return (
        <div>
            <button
                className="border-transparent-solid bg-transparent font-secondary fw-4"
                onClick={ () => dispatch(clearAttributes()) }>
                Clear all
            </button>
        </div>
    )
}
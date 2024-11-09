'use client'


import { useState } from "react";
import AddressForm from "@/app/components/checkout/addressForm";



export default function AddAddress({userid}:{userid : string}) {

    const [add, setAdd] = useState(false);

   
    const changeAddState = () => {
        setAdd(false)
    }
    const handleAddaddress = () => {
        setAdd(true)
    }

    return (
        <>
            
            <div className="border-border-solid account-address mt-3  px-4 py-3 br-2 gap-15">
                {add ? (
                    <AddressForm page="address" setedit={changeAddState} userid={userid} />
                ) : (
                    <button className="btn p-0" onClick={() => handleAddaddress()}>
                        <span className="mx-2 font-secondary fw-4">+</span> <span className="font-primary fw-3 line-tight mt-1">Add New Address</span>
                    </button>
                )}

            </div>
        </>

    )
}
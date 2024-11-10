'use client'

import { fetchAddress } from "@/app/redux/checkoutslice"
import { AppDispatch, RootState } from "@/app/redux/store"
import { address } from "@/app/types/types"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import AddressSkeleton from "./AddressSkeleton"
import BinIcon from "../icons/binIcon"
import EditIcon from "../icons/editIcon"
import EditAddressForm from "../checkout/editAddress"



export default function Address({ userid }: { userid: string }) {

    const [edit, setEdit] = useState(false);

    const addresses = useSelector((state: RootState) => state.checkout.addresses);
    const status = useSelector((state: RootState) => state.checkout.status);
    const dispatch: AppDispatch = useDispatch();
    const [editState, setEditState] = useState(addresses[0]);


    useEffect(() => {
        dispatch(fetchAddress(Number(userid)))
    }, [userid])

    const changeState = () => {
        setEdit(false)
    }

    const handleEdit = (item: address) => {
        setEdit(true);
        setEditState(item)
    }


    return (
        <>{edit ? (<>
            <EditAddressForm userid={userid} page="account" setedit={changeState} address={editState} />
        </>) : (<>
            {status === 'loading' ? (<AddressSkeleton array={3} />) : (<>
                {addresses && addresses.map((item: address) => (
                    <div className="border-border-solid p-3 mb-4" key={`address_${item.id}`}>
                        <div>
                            {/* <div className="d-flex mb-2 justify-content-between text-secondary">
                    <span className="fw-4 font-small  text-uppercase bg-border2 p-1 br-2 d-block w-auto">Home</span>
                    <More />
                </div> */}

                            <div className="d-flex align-items-center">
                                <span className="fw-4 ">{item.first_name}</span>
                                <span className="font-primary fw-3 ms-3">{item.phone}</span>
                                <div className="ms-auto text-theme1">
                                    <span onClick={() => handleEdit(item)} className="me-2 pointer" title="edit"><EditIcon /></span> <BinIcon />
                                </div>
                            </div>
                            <span className="font-primary d-block fw-3 d-inline-block mt-2">
                                {item.address_1}, {item.landmark && item.landmark}, {item.city}, {item.state_country}, {item.postcode}
                            </span>
                        </div>
                    </div>
                ))}
            </>)}
        </>)}
            
        </>

    )
}
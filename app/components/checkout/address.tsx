'use client'

import Tick from "../icons/tick";
import Step from "./step";
import { useDispatch, useSelector } from "react-redux";
import { changeStep, fetchAddress } from "@/app/redux/checkoutslice";
import { AppDispatch, RootState } from "@/app/redux/store";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import AddressForm from "./addressForm";
import { address } from "@/app/types/types";
import { fetchCartItems, updateUrl } from "@/app/redux/cartSlice";
import AddressSkeleton from "../account/AddressSkeleton";

function ChangeAddress({ userid, selectedAdd, addresses, setSelectedAdd }: { userid: string, selectedAdd: address, addresses: address[], setSelectedAdd: Dispatch<SetStateAction<address>> }) {
    const dispatch: AppDispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const [add, setAdd] = useState(false);



    const changeState = () => {
        setEdit(false)
    }
    const changeAddState = () => {
        setAdd(false)
    }
    const handleAddaddress = () => {
        setAdd(true)
        setEdit(false)
    }
    const handleEditaddress = () => {
        setAdd(false)
        setEdit(true)
    }
    return (
        <>
            <div className="bg-theme3 mt-3 d-flex px-4 py-3 br-2 gap-15">
                <Step number={2} />
                <div className="d-flex justify-content-between w-100 align-items-start gap-20">
                    <h4 className="text-uppercase font-secondary fw-4 text-grey3 mb-0">Delivery Address</h4>
                </div>
            </div>
            {edit ? (<div className="px-4 py-4 bg-grey3">
                <AddressForm userid={userid} page="checkout" setedit={changeState} />
            </div>) : (
                <div className="px-4 py-4 bg-grey3">
                    {addresses.map((item) => (
                        <div key={item.id} className="mb-3 d-flex flex-wrap justify-content-between">
                            <div >
                                <div>
                                    <label htmlFor={`${item.id}`}>
                                        <input
                                            type="radio"
                                            id={`${item.id}`}
                                            checked={selectedAdd.id === item.id}
                                            name={`${item.id}`}
                                            value={`${item.id}`}
                                            onClick={() => setSelectedAdd(item)}
                                        />
                                        <div className="ms-2 d-inline-block">
                                            <span className="fw-4 ">{item.first_name}</span>
                                            {/* <span className="fw-4 ms-3 font-small text-secondary text-uppercase bg-border2 p-1 br-2">Home</span> */}
                                            <span className="font-primary fw-3 ms-3">{item.phone}</span>
                                        </div>
                                    </label><br />
                                    <span className="font-primary d-block fw-3 ms-4 d-inline-block mt-2">
                                        {item.address_1}, {item.landmark && item.landmark}, {item.city}, {item.state_country}, {item.postcode}
                                    </span>
                                </div>



                            </div>
                            <div>
                                <button className="btn text-uppercase fw-3 text-theme1 ms-4" onClick={() => handleEditaddress()}>
                                    Edit
                                </button>
                            </div>

                        </div>
                    ))}


                    <button className="btn1 h-35 br-0 px-4 mt-3 d-block w-40 font-primary fw-3 text-uppercase" onClick={() => dispatch(changeStep(3))}>
                        Deliver Here
                    </button>
                </div>
            )}
            <div className="bg-grey3 mt-2 d-flex align-items-center px-4 py-3 br-2 gap-15">
                {add ? (
                    <AddressForm userid={userid} page="checkout" setedit={changeAddState} />
                ) : (
                    <button className="btn p-0" onClick={() => handleAddaddress()}>
                        <span className="mx-2 font-secondary fw-4">+</span> <span className="font-primary fw-3 line-tight mt-1">Add New Address</span>
                    </button>
                )}

            </div>


        </>
    )
}

export default function Address({ userid }: { userid: string }) {
    const dispatch: AppDispatch = useDispatch()
    const step = useSelector((state: RootState) => state.checkout.activeStep)
    const status = useSelector((state: RootState) => state.checkout.status);



    useEffect(() => {
        dispatch(updateUrl())

    }, [dispatch, userid])


    useEffect(() => {
        dispatch(fetchCartItems(userid))

    }, [dispatch, userid])

    
    useEffect(() => {
        dispatch(fetchAddress(Number(userid)));

    }, [dispatch, userid])





    const addresses = useSelector((state: RootState) => state.checkout.addresses);
    const [editState, setEditState] = useState(addresses[0]);


    useEffect(() => {
        setSelectedAdd(addresses[0])
    }, [addresses])

    const [SelectedAdd, setSelectedAdd] = useState<address>({
        id: 0,
        first_name: "",
        address_type: "Billing",
        email: "",
        phone: "",
        postcode: "",
        Country_Region: "",
        address_1: "",
        city: "",
        state_country: "",
        landmark: "",
        alternative_phone: "",
        user: 0
    });


    return (
        <>
            {step === 2 ? (<ChangeAddress userid={userid} selectedAdd={SelectedAdd} addresses={addresses} setSelectedAdd={setSelectedAdd} />) : (<div className="bg-grey3 mt-4 d-flex px-4 py-3 br-2 gap-15">
                <Step number={2} />
                <div className="d-flex justify-content-between flex-wrap row-gap-10 w-100 align-items-start gap-20">
                    <div>
                        <h4 className="text-uppercase font-secondary fw-4 text-theme3 mb-0">Delivery Address
                            <Tick color="#8F5547" />
                        </h4>
                        {status === "loading" ? (<AddressSkeleton array={1} />) : (<>
                            <span className="fw-4 d-inline-block mt-2">{SelectedAdd.first_name}</span>
                            <span className="font-primary fw-3 ms-2">
                                {SelectedAdd.address_1}, {SelectedAdd.landmark && SelectedAdd.landmark}, {SelectedAdd.city}, {SelectedAdd.state_country}, {SelectedAdd.postcode}
                            </span>
                        </>)}


                    </div>
                    <button className="btn2 px-4 font-primary fw-4 py-1" onClick={() => dispatch(changeStep(2))}>Change</button>
                </div>
            </div>)}

        </>

    )
}
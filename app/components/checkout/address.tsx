'use client'

import Tick from "../icons/tick";
import Step from "./step";
import { useDispatch, useSelector } from "react-redux";
import { changeStep } from "@/app/redux/checkoutslice";
import { RootState } from "@/app/redux/store";
import { useState } from "react";
import AddressForm from "./addressForm";

function ChangeAddress({userid}:{userid : string}) {
    const dispatch = useDispatch();
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
                    <div className=" d-flex flex-wrap justify-content-between">
                        <div >
                            <div>
                                <label htmlFor="male">
                                    <input type="radio" id="male" name="gender" value="male" defaultChecked />
                                    <div className="ms-2 d-inline-block">
                                        <span className="fw-4 ">User</span>
                                        <span className="fw-4 ms-3 font-small text-secondary text-uppercase bg-border2 p-1 br-2">Home</span>
                                        <span className="font-primary fw-3 ms-3">+91 9876543210</span>
                                    </div>
                                </label><br />
                                <span className="font-primary d-block fw-3 ms-4 d-inline-block mt-2">
                                    742, pongalmanagar poolankuruchi, sivagangai(DT), Thiruppathur (TK), poolankuruchi, Nerkuppai, Tamil Nadu
                                </span>
                            </div>



                        </div>
                        <div>
                            <button className="btn text-uppercase fw-3 text-theme1 ms-4" onClick={() => handleEditaddress()}>
                                Edit
                            </button>
                        </div>

                    </div>

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

export default function Address({userid}:{userid : string}) {
    const dispatch = useDispatch()
    const step = useSelector((state: RootState) => state.checkout.activeStep)

 


    return (
        <>
            {step === 2 ? (<ChangeAddress userid={userid}/>) : (<div className="bg-grey3 mt-4 d-flex px-4 py-3 br-2 gap-15">
                <Step number={2} />
                <div className="d-flex justify-content-between flex-wrap row-gap-10 w-100 align-items-start gap-20">
                    <div>
                        <h4 className="text-uppercase font-secondary fw-4 text-theme3 mb-0">Delivery Address
                            <Tick color="#8F5547" />
                        </h4>
                        <span className="fw-4 d-inline-block mt-2">User</span>
                        <span className="font-primary fw-3 ms-2">742, pongalmanagar poolankuruchi, sivagangai(DT), Thiruppathur (TK), poolankuruchi, Nerkuppai, Tamil Nadu</span>
                    </div>
                    <button className="btn2 px-4 font-primary fw-4 py-1" onClick={() => dispatch(changeStep(2))}>Change</button>
                </div>
            </div>)}

        </>

    )
}
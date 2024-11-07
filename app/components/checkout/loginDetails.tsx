'use client'

import Tick from "../icons/tick";
import Step from "./step";
import { Col, Row } from "react-bootstrap";
import { changeStep } from "@/app/redux/checkoutslice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { LogoutUser } from "@/app/utilis/logout";
import { profile } from "@/app/types/types";




function Logout({username, profiledata} : {username : string, profiledata : profile}) {
    const dispatch = useDispatch();

    const handleLogout = async () => {
        await LogoutUser()
    }

    return (
        <>
            <div className="bg-theme3 mt-3 d-flex px-4 py-3 br-2 gap-15">
                <Step number={1} />
                <div className="d-flex justify-content-between w-100 align-items-start gap-20">
                    <h4 className="text-uppercase font-secondary fw-4 text-grey3 mb-0">Login</h4>
                </div>
            </div>
            <div className="px-4 py-4 bg-grey3">
                <Row className="px-4 gap-60 row-gap-30" >
                    <Col >
                        <div className="d-flex gap-20 ">
                            <span className="text-secondary fw-3">Name</span>
                            <span className="fw-4 d-inline-block">{username}</span>
                        </div>
                        {profiledata.phone && (   <div className="d-flex gap-20 mt-2">
                            <span className="text-secondary fw-3">Phone</span>
                            <span className="fw-4 d-inline-block">{profiledata.phone}</span>
                        </div>)}
                     
                        <button className="btn text-theme1 mt-3 font-primary fw-3" onClick={handleLogout}>
                            Logout & Sign in to another account
                        </button>

                        <button className="btn1 h-35 br-0 px-4 mt-3 d-block w-100 font-primary fw-3 text-uppercase" onClick={() => dispatch(changeStep(2))}>
                            Continue Checkout
                        </button>

                    </Col>
                    <Col>
                        <span className="text-secondary font-secondary fw-4">Advantages of our secure login</span>
                        <ul className="m-0 p-0 mt-2 font-primary d-grid row-gap-10">
                            <li>
                                <span className="text-theme1 fw-4">1.</span> Easily Track Orders, Hassle free Returns</li>
                            <li>
                                <span className="text-theme1 fw-4">2.</span> Get Relevant Alerts and Recommendation</li>
                            <li><span className="text-theme1 fw-4">3.</span> Wishlist, Reviews, Ratings and more.</li>
                        </ul>
                    </Col>
                </Row>
                <div className="px-4 mt-3">
                    <span className="font-primary fw-3">Please note that upon clicking  &quot;Logout&quot; you will lose all items in cart and will be redirected to home page.</span>
                </div>
            </div>
        </>
    )
}

export default function LoginDetails({username, profiledata}:{username : string, profiledata : profile}) {
    const step = useSelector((state: RootState) => state.checkout.activeStep)
    const dispatch = useDispatch();

    return (
        <>
            {step === 1 ? (
                <Logout username={username} profiledata={profiledata}/>
            ) : (<div className="bg-grey3 mt-3 d-flex px-4 py-3 br-2 gap-15">
                <Step number={1} />
                <div className="d-flex justify-content-between w-100 flex-wrap row-gap-10 align-items-start">
                    <div>
                        <h4 className="text-uppercase font-secondary fw-4 text-theme3 mb-0">Login
                            <Tick color={"#8F5547"} />
                        </h4>
                        <div className="d-flex flex-wrap gap-10 mt-2 align-items-center">
                            <span className="fw-4 d-inline-block">{username}</span>
                            <span className="font-primary fw-3 ">{profiledata.phone}</span>
                        </div>

                    </div>
                    <button className="btn2 px-4 font-primary fw-4 py-1" onClick={() => dispatch(changeStep(1))}>Change</button>
                </div>
            </div>)}
        </>
    )
}
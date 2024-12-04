'use client'

import google from "@/public/images/google.png"
import Image from 'next/image';
import { useState } from "react";
import EyeOn from "../icons/eyeOn";
import EyeOff from "../icons/eyeOff";
import { LoginUser } from "@/app/api/login";
import ForgotPassword from "./forgotpassword";
import Toaster from "./toaster";
import { cartItem, wishlistItem } from "@/app/types/types";
import { Spinner } from "react-bootstrap";



interface ErrorObject {
    [key: string]: string;
}

export default function Login() {
    const [show, setShow] = useState(false);
    const [responseError, setResponseError] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [isLoading, setIsLoading] = useState(false);



    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [error, setError] = useState<{ username?: string; password?: string }>({});


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setResponseError("")
        const { name, value } = e.target;

        const trimmedValue = value.replace(" ", "");

        setFormData({
            ...formData,
            [name]: trimmedValue
        })
    }

    const validateForm = (field: string) => {


        const errors: ErrorObject = {};

        if (field === 'username') {
            if (!formData.username) {
                errors.username = "username is required";
            } else {
                errors.username = "";
            }
        }

        if (field === 'password') {
            if (!formData.password) {
                errors.password = "password is required";
            } else {
                errors.password = "";
            }
        }

        setError((prevError) => ({ ...prevError, ...errors }));
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        validateForm("username");
        validateForm("password");

        if (error.username === "" && error.password === "") {

            setError({});
            const cartdata = localStorage.getItem('cart') || "";
            const Wishlistdata = localStorage.getItem('wishlist') || "";

            const cartbody = cartdata !== "" && JSON.parse(cartdata).map((item: cartItem) => ({ variation_id: item.product.id, quantity: item.product.quantity }));
            const wishlistbody = Wishlistdata !== "" && JSON.parse(Wishlistdata).map((item: wishlistItem) => (item.products.id));

            const body = {
                username: formData.username,
                password: formData.password,
                ...(cartbody && { cart_item: cartbody }),
                ...(wishlistbody && { wishlist_item: wishlistbody })
            }
            setIsLoading(true)
            const response = await LoginUser(body);
            setIsLoading(false);

            if (!response) {
                setShowToast(true)
            }
            setResponseError(response)

            setFormData({
                username: "",
                password: ""
            })
        }


    }

    const handleClose = () => {
        setShowToast(false)
    }

    return (
        <div className='w-100'>
            <h2 className="text-center font-h2 fw-4 text-theme1 mb-4">Login</h2>
            <form className='login-form' onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Username / Email</label>
                    <input
                        type="text"
                        name="username"
                        autoComplete='username'
                        value={formData.username}
                        onChange={handleChange}
                        onKeyUp={() => validateForm("username")}
                        className={error.username ? ('border-danger') : ('')}
                    />
                    <div className="min-h-21 my-1">
                        {error.username && <p className="text-danger m-0  font-primary fw-3">{error.username}</p>}
                    </div>
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <div className="password-input">
                        <input
                            type={show ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            onKeyUp={() => validateForm("password")}
                            autoComplete="new-password"
                            className={error.password ? ('border-danger') : ('')} />
                        <div
                            className="text-theme1"
                            onClick={() => setShow(!show)}>
                            {show ? <EyeOff /> : <EyeOn />}
                        </div>
                    </div>
                    <div className="min-h-21 my-1">
                        {error.password && <p className="text-danger m-0 font-primary fw-3">{error.password}</p>}
                    </div>
                </div>
                <div className='w-100 d-flex justify-content-between align-items-center fw-3 mb-4'>
                    <span>
                        <input type='checkbox' id="remember" className='me-2 text-black' />
                        <label htmlFor='remember'>Remember Me</label>
                    </span>
                    <ForgotPassword />
                </div>
                {responseError && <div className="text-danger text-center mb-4 font-primary fw-3">{responseError}</div>}
                <button className='btn3 fw-3 text-uppercase w-100 py-2' type="submit" disabled={isLoading}>
                {isLoading? (<Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />) : <>Log In</>}
                </button>
            </form>
            <div className='d-flex align-items-center justify-content-center gap-30 my-5 or_block'>
                <hr className="wc-40 d-inline-block" />
                <span className='fw-3 text-grey2'>Or</span>
                <hr className="wc-40 d-inline-block" />
            </div>
            <button className='bg-grey3 mt-2 border-border2-solid br-5 py-2 wc-80 fw-3 mx-auto d-block text-grey2 font-secondary '>
                <Image src={google} width={18} height={18} alt='google' className=' d-inline-block mb-1' />
                <span className='ms-2'>Sign in with Google</span>
            </button>
            <Toaster show={showToast} handleClose={handleClose} />
        </div>
    )
}
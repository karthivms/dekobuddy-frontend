'use client'

import Link from "next/link";
import EyeOff from "../icons/eyeOff";
import EyeOn from "../icons/eyeOn";
import { useState } from "react";
import { RegisterUser } from "@/app/api/Register";
import Activation from "./activationPopup";

interface ErrorObject {
    [key: string]: string;
}

export default function SignUp() {
    const [show, setShow] = useState(false);
    const [showCon, setShowCon] = useState(false);
    const [terms, setTerms] = useState(false);
    const [responseError, setResponseError] = useState("");
    const [modalShow, setModalShow] = useState(false);

const handleModal = () => {
    setModalShow(false)
}

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirm_password: ''
    });

    const [error, setError] = useState<ErrorObject>({});


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        const trimmedValue = value.replace(" ", "");

        setFormData({
            ...formData,
            [name]: trimmedValue
        })
    }

    const handleCheckboxChange = () => {

        setTerms((prev) => !prev);


        if (terms) {
            error.acceptterms = "You must accept the terms and conditions.";
        } else {
            error.acceptterms = "";
        }

    };

    const validateForm = (field: string) => {
        const usernameRegex = /^[a-zA-Z]+$/
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const errors: ErrorObject = {};

        if (field === "username") {
            if (!formData.username) {
                errors.username = "username is required";
            } else if (!usernameRegex.test(formData.username)) {
                errors.username = "Username can only contain letters";
            } else if (formData.username.length < 4) {
                errors.username = "username must be at least 4 characters";
            } else {
                errors.username = "";
            }
        }

        if (field === "password") {
            if (!formData.password) {
                errors.password = "password is required";
            } else if (!passwordRegex.test(formData.password)) {
                errors.password = "password must be at least 8 characters, including uppercase, lowercase, number, and special character.";
            } else {
                errors.password = "";
            }
        }

        if (field === 'email') {
            if (!formData.email) {
                errors.email = "email is required";
            } else if (!emailRegex.test(formData.email)) {
                errors.email = "email is not valid";
            } else {
                errors.email = "";
            }
        }

        if (field === "terms") {
            if (!terms) {
                errors.acceptterms = "You must accept the terms and conditions.";
            } else {
                errors.acceptterms = "";
            }
        }

        if (field === "confirmpassword") {
            if (!formData.confirm_password) {
                errors.confirmpassword = "confirm password is required";
            } else if (formData.confirm_password !== formData.password) {
                errors.confirmpassword = "confirm password does'nt match with password";
            } else {
                errors.confirmpassword = "";
            }
        }

        setError((prevError) => ({ ...prevError, ...errors }))

    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        validateForm("username");
        validateForm("email");
        validateForm("password");
        validateForm("confirmpassword");
        validateForm("terms");


        if (error.username === "" && error.password === "" && error.email === "" && error.confirmpassword === "" && error.acceptterms === "") {
            setError({})
            const response = await RegisterUser(formData);
            if (response === "successfully registered") {
                setResponseError("")
                setModalShow(true)

            } else {
                setResponseError(response)

            }
            setFormData({
                username: "",
                email: "",
                password: "",
                confirm_password: "",
            })
            setTerms(false)
        }
    }

    return (
        <div className='w-100'>
            <h2 className="text-center font-h2 fw-4 text-theme1 mb-4">Register / Sign Up</h2>
            <form className='login-form' onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Username</label>
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
                    <label> Email Address</label>
                    <input
                        type="text"
                        autoComplete='email'
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onKeyUp={() => validateForm("email")}
                        className={error.email ? ('border-danger') : ('')}
                    />
                    <div className="min-h-21 my-1">
                        {error.email && <p className="text-danger m-0  font-primary fw-3">{error.email}</p>}
                    </div>
                </div>

                <div className='form-group'>
                    <label>Password</label>
                    <div className="password-input">
                        <input
                            type={show ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            autoComplete="new-password"
                            onChange={handleChange}
                            onKeyUp={() => validateForm("password")}
                            className={error.password ? ('border-danger') : ('')}
                        />
                        <div className="text-theme1" onClick={() => setShow(!show)}>{show ? <EyeOff /> : <EyeOn />}</div>
                    </div>
                    <div className="min-h-21 my-1">
                        {error.password && <p className="text-danger m-0  font-primary fw-3">{error.password}</p>}
                    </div>
                </div>

                <div className='form-group'>
                    <label>Confirm Password</label>
                    <div className="password-input">
                        <input
                            type={showCon ? 'text' : 'password'}
                            name="confirm_password"
                            value={formData.confirm_password}
                            autoComplete="new-password"
                            onChange={handleChange}
                            onKeyUp={() => validateForm("confirmpassword")}
                            className={error.confirmpassword ? ('border-danger') : ('')}
                        />
                        <div className="text-theme1" onClick={() => setShowCon(!showCon)}>{showCon ? <EyeOff /> : <EyeOn />}</div>
                    </div>
                    <div className="min-h-21 my-1">
                        {error.confirmpassword && <p className="text-danger m-0  font-primary fw-3">{error.confirmpassword}</p>}
                    </div>
                </div>

                <div className='w-100 fw-3'>
                    <span className="d-flex align-items-center">
                        <input
                            type='checkbox'
                            name="acceptterms"
                            checked={terms}
                            onChange={handleCheckboxChange}
                            id="acceptance"
                            className='me-2 text-black' />
                        <label htmlFor='acceptance'>
                            I accept the dekobuddy&apos;s <Link href={"/"} className="text-theme3">Terms of Use</Link> and have read the <Link href={"/"} className="text-theme3">Privacy Policy</Link>
                        </label>

                    </span>
                    <div className="min-h-21 my-2">
                        {error.acceptterms && <p className="text-danger m-0  font-primary fw-3">{error.acceptterms}</p>}
                    </div>
                </div>
                {responseError && <div className="text-danger text-center mb-4 font-primary fw-3">{responseError}</div>}
                <button className='btn3 fw-3 text-uppercase w-100 py-2'>Sign Up</button>
            </form>
            <Activation show={modalShow} handleShow={handleModal}/>
        </div>
    )
}
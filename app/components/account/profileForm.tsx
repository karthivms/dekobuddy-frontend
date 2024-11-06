'use client'

import { useState } from "react";
import EyeOff from "../icons/eyeOff";
import EyeOn from "../icons/eyeOn";
import { updateProfile } from "@/app/api/updateProfile";
import Toaster from "./msgtoaster";



interface ErrorObject {
    [key: string]: string;
}

interface userData {
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
}


export default function Profile({ userid, data }: { userid: string, data: userData }) {
    const [show, setShow] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [showmsg, setShowMsg] = useState(false);
    const [showOld, setShowOld] = useState(false);
    const [showCon, setShowCon] = useState(false);

    const [formData, setFormData] = useState({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        old_password: '',
        new_password: '',
        confirm_password: ''

    });

    const [error, setError] = useState<{ email?: string; new_password?: string; confirm_password?: string, old_password?: string, phone?: string }>
        ({
            email: '',
            new_password: '',
            confirm_password: '',
            old_password: '',
            phone: ''
        });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        const trimmedValue = value.replace(" ", "");

        setFormData({
            ...formData,
            [name]: trimmedValue
        })

    }

    const validateForm = (field: string) => {


        const errors: ErrorObject = {
            email: '',
            new_password: '',
            confirm_password: '',
            old_password: '',
            phone: ''
        };

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;


        if (field === "new_password") {
            if (!passwordRegex.test(formData.new_password) && formData.old_password.length > 0) {
                errors.new_password = "password must be at least 8 characters, including uppercase, lowercase, number, and special character.";
            } else {
                errors.new_password = "";
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

        if (field === 'phone') {
            if (!formData.phone) {
                errors.phone = "phone Number is required";
            } else if (!phoneRegex.test(formData.phone)) {
                errors.phone = "phone Number is not valid";
            } else {
                errors.phone = "";
            }
        }

        if (field === 'confirm_password') {
            if (formData.old_password.length > 0 && !formData.confirm_password) {
                errors.confirm_password = "confirm password is required"
            } else if (formData.new_password !== formData.confirm_password) {
                errors.confirm_password = 'confirm password does not match'
            } else {
                errors.confirm_password = ''
            }
        }

        if (field === 'old_password') {
            if (formData.new_password.length > 0 && !formData.old_password) {
                errors.old_password = 'current password is required';
            } else {
                errors.old_password = '';
            }
        }

        setError((prevError) => ({ ...prevError, ...errors }));
    }


    const handleSubmit = async () => {
        validateForm("new_password");
        validateForm("email");
        validateForm("confirm_password");
        validateForm("old_password");
        validateForm("phone");

        if (error.email === "" && error.new_password === "" && error.confirm_password === "" && error.old_password === "" && error.phone === "") {

            const response = await updateProfile(userid, formData);
            if (response.email) {
                setShowToast(true);
                setShowMsg(true);
                setFormData({
                    first_name: response.first_name,
                    last_name: response.last_name,
                    email: response.email,
                    phone: response.phone,
                    old_password: '',
                    new_password: '',
                    confirm_password: ''
                })
            } else {
                setShowToast(true);
                setShowMsg(false);
            }

        }
    }

    const handleClose = () => {
        setShowToast(false)
    }

    return (
        <>
            <div className='w-100'>
                <form className='profile-form' action={handleSubmit}>
                    <div className='form-group grid-box mb-4'>
                        <div>
                            <label>First name</label>
                            <input
                                type="text"
                                name="first_name"
                                autoComplete='username'
                                value={formData.first_name}
                                onChange={handleChange}
                            />

                        </div>
                        <div>
                            <label>Last name</label>
                            <input
                                type="text"
                                name="last_name"
                                autoComplete='last_name'
                                value={formData.last_name}
                                onChange={handleChange}
                            />

                        </div>
                    </div>

                    <div className='form-group'>
                        <label>Email</label>
                        <div className="password-input">
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                onKeyUp={() => validateForm('email')}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="min-h-21 my-1">
                            {error.email && <p className="text-danger m-0 font-primary fw-3">{error.email}</p>}
                        </div>
                    </div>

                    <div className='form-group  pb-1'>
                        <label>Phone Number</label>
                        <div className="password-input">
                            <input
                                type='text'
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                onKeyUp={() => validateForm('phone')}

                            />
                        </div>
                        <div className="min-h-21 my-1">
                            {error.phone && <p className="text-danger m-0 font-primary fw-3">{error.phone}</p>}
                        </div>
                    </div>
                    <h3 className="font-h3 fw-4 text-theme1 mb-3">Password Change</h3>
                    <div className='form-group'>
                        <label>Current Password (leave blank to leave unchanged)</label>
                        <div className="password-input">
                            <input
                                type={showOld ? 'text' : 'password'}
                                name="old_password"
                                value={formData.old_password}
                                onChange={handleChange}
                                onKeyUp={() => validateForm("old_password")}
                                autoComplete="old_password"
                                className={error.old_password ? ('border-danger') : ('')}
                            />
                            <div
                                className="text-theme1"
                                onClick={() => setShowOld(!showOld)}>
                                {showOld ? <EyeOff /> : <EyeOn />}
                            </div>
                        </div>
                        <div className="min-h-21 my-1">
                            {error.old_password && <p className="text-danger m-0 font-primary fw-3">{error.old_password}</p>}
                        </div>

                    </div>
                    <div className='form-group'>
                        <label>New Password (leave blank to leave unchanged)</label>
                        <div className="password-input">
                            <input
                                type={show ? 'text' : 'password'}
                                name="new_password"
                                value={formData.new_password}
                                onChange={handleChange}
                                onKeyUp={() => validateForm("new_password")}
                                autoComplete="new_password"
                                className={error.new_password ? ('border-danger') : ('')} />
                            <div
                                className="text-theme1"
                                onClick={() => setShow(!show)}>
                                {show ? <EyeOff /> : <EyeOn />}
                            </div>
                        </div>
                        <div className="min-h-21 my-1">
                            {error.new_password && <p className="text-danger m-0 font-primary fw-3">{error.new_password}</p>}
                        </div>
                    </div>
                    <div className='form-group'>
                        <label>Confirm Password</label>
                        <div className="password-input">
                            <input
                                type={showCon ? 'text' : 'password'}
                                name="confirm_password"
                                value={formData.confirm_password}
                                onChange={handleChange}
                                onKeyUp={() => validateForm("confirm_password")}
                                autoComplete="confirm_password"
                                className={error.confirm_password ? ('border-danger') : ('')} />
                            <div
                                className="text-theme1"
                                onClick={() => setShowCon(!showCon)}>
                                {showCon ? <EyeOff /> : <EyeOn />}
                            </div>
                        </div>
                        <div className="min-h-21 my-1">
                            {error.confirm_password && <p className="text-danger m-0 font-primary fw-3">{error.confirm_password}</p>}
                        </div>
                    </div>

                    <button className='btn3 fw-3 text-uppercase w-100 py-2' type="submit">Save Changes</button>

                </form>


            </div>
            <Toaster msg={showmsg} show={showToast} handleClose={handleClose} />
        </>
    )
}
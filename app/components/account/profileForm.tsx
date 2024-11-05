'use client'

import { useState } from "react";
import EyeOff from "../icons/eyeOff";
import EyeOn from "../icons/eyeOn";



interface ErrorObject {
    [key: string]: string;
}

interface userData {
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    confirm_password: string
}


export default function Profile({ data }: { data: userData }) {
    const [show, setShow] = useState(false);

    const [formData, setFormData] = useState({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        old_password: '',
        new_password: '',
        confirm_password: ''

    });

    const [error, setError] = useState<{ email?: string; new_password?: string; confirm_password? :string }>({});


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        const trimmedValue = value.replace(" ", "");

        setFormData({
            ...formData,
            [name]: trimmedValue
        })

    }

    const validateForm = (field: string) => {


        const errors: ErrorObject = {};

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (field === "new_password") {
            if (!passwordRegex.test(formData.new_password)) {
                errors.new_password = "password must be at least 8 characters, including uppercase, lowercase, number, and special character.";
            } else {
                errors.new_password = "";
            }
        }

        if (field === 'email') {
            if (!formData.email){
                errors.email = "email is required";
            }else if(!emailRegex.test(formData.email)) {
                errors.email = "email is not valid";
            } else {
                errors.email = "";
            }
        }

        setError((prevError) => ({ ...prevError, ...errors }));
    }


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        validateForm("new_password");
        validateForm("email");

        if (error.email === "" && error.new_password === "") {
            setError({})
            setFormData({
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                phone: data.phone,
                old_password: '',
                new_password: '',
                confirm_password: ''
            })
        }
    }

    return (
        <>
            <div className='w-100'>
                <form className='profile-form' onSubmit={handleSubmit}>
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
                            />
                        </div>
                        <div className="min-h-21 my-1">
                            {error.email && <p className="text-danger m-0 font-primary fw-3">{error.email}</p>}
                        </div>
                    </div>

                    <div className='form-group mb-4 pb-1'>
                        <label>Phone Number</label>
                        <div className="password-input">
                            <input
                                type='text'
                                name="Phone"
                                value={formData.phone}
                            />
                        </div>
                  
                    </div>
                    <h3 className="font-h3 fw-4 text-theme1 mb-3">Password Change</h3>
                    <div className='form-group mb-4'>
                        <label>Current Password</label>
                        <div className="password-input">
                            <input
                                type={show ? 'text' : 'password'}
                                name="old_password"
                                value={formData.old_password}
                                onChange={handleChange}
                                autoComplete="old_password"
                                />
                            <div
                                className="text-theme1"
                                onClick={() => setShow(!show)}>
                                {show ? <EyeOff /> : <EyeOn />}
                            </div>
                        </div>
                        
                    </div>
                    <div className='form-group'>
                        <label>New Password</label>
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
                                type={show ? 'text' : 'password'}
                                name="confirm_password"
                                value={formData.confirm_password}
                                onChange={handleChange}
                                onKeyUp={() => validateForm("confirm_password")}
                                autoComplete="confirm_password"
                                className={error.confirm_password ? ('border-danger') : ('')} />
                            <div
                                className="text-theme1"
                                onClick={() => setShow(!show)}>
                                {show ? <EyeOff /> : <EyeOn />}
                            </div>
                        </div>
                        <div className="min-h-21 my-1">
                            {error.confirm_password && <p className="text-danger m-0 font-primary fw-3">{error.confirm_password}</p>}
                        </div>
                    </div>

                    <button className='btn3 fw-3 text-uppercase w-100 py-2' type="submit">Save Changes</button>

                </form>


            </div>
        </>
    )
}
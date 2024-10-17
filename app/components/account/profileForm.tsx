'use client'

import { useState } from "react";
import EyeOff from "../icons/eyeOff";
import EyeOn from "../icons/eyeOn";



interface ErrorObject {
    [key: string]: string;
}


export default function Profile() {
    const [show, setShow] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [error, setError] = useState<{ username?: string; password?: string }>({});


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


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        validateForm("username");
        validateForm("password");

        if (error.username === "" && error.password === "") {
            setError({})
            alert("form submitted")
            setFormData({
                username: "",
                password: ""
            })
        }
    }

    return (
        <>
            <div className='w-100'>
                <form className='profile-form' onSubmit={handleSubmit}>
                    <div className='form-group grid-box'>
                        <div>
                            <label>First name</label>
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
                        <div>
                            <label>Last name</label>
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
                    </div>

                    <div className='form-group'>
                        <label>Email</label>
                        <div className="password-input">
                            <input
                                type="text"
                                name="email"
                                value={formData.password}
                            />
                        </div>
                        <div className="min-h-21 my-1">
                            {error.password && <p className="text-danger m-0 font-primary fw-3">{error.password}</p>}
                        </div>
                    </div>

                    <div className='form-group'>
                        <label>Phone Number</label>
                        <div className="password-input">
                            <input
                                type='text' 
                                name="email"
                                value={formData.password}
                            />
                        </div>
                        <div className="min-h-21 my-1">
                            {error.password && <p className="text-danger m-0 font-primary fw-3">{error.password}</p>}
                        </div>
                    </div>
                    <h3 className="font-h3 fw-4 text-theme1 mb-3">Password Change</h3>
                    <div className='form-group'>
                        <label>Current Password</label>
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
                    <div className='form-group'>
                        <label>New Password</label>
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
                    <div className='form-group'>
                        <label>Confirm Password</label>
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

                    <button className='btn3 fw-3 text-uppercase w-100 py-2' type="submit">Save Changes</button>

                </form>


            </div>
        </>
    )
}
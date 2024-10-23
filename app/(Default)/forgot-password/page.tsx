'use client'

import EyeOff from "@/app/components/icons/eyeOff";
import EyeOn from "@/app/components/icons/eyeOn";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import '@/app/sass/components/forgotpassword.scss';
import ForgotPasswordApi from "@/app/api/forgotPassword";
import { useSearchParams } from "next/navigation";

interface ErrorObject {
    [key: string]: string;
}

export default function Page() {

    const [formData, setFormData] = useState({
        password: '',
        confirm_password: ''
    });
    const [show, setShow] = useState(false);
    const [showCon, setShowCon] = useState(false);
    const [responseError, setResponseError] = useState("");
    const [color, setColor] = useState("");
    const [error, setError] = useState<ErrorObject>({});
    const params = useSearchParams();
    const token = params.get('token');

    useEffect(() => {
        if(!token){
            setResponseError("The link to reset your password is not valid");
            setColor("danger");
                }
    
    }, [params])
   
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        const trimmedValue = value.replace(" ", "");

        setFormData({
            ...formData,
            [name]: trimmedValue
        })
    }

    const validateForm = (field: string) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        const errors: ErrorObject = {};

        if (field === "password") {
            if (!formData.password) {
                errors.password = "password is required";
            } else if (!passwordRegex.test(formData.password)) {
                errors.password = "password must be at least 8 characters, including uppercase, lowercase, number, and special character.";
            } else {
                errors.password = "";
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
        validateForm("password");
        validateForm("confirmpassword");


        if (error.password === "" && error.confirmpassword === "") {
            setError({})
            const response = await ForgotPasswordApi(formData);
            setFormData({
                password: "",
                confirm_password: "",
            })
            setResponseError(response.message);
            if (response.status === 400) {
                setColor("danger")
            } else {
                setColor("success")

            }

        }
    }
    return (
        <Container className="my-5">
            <form className='px-5 pb-3 wc-40 mx-auto' onSubmit={handleSubmit}>
                <h1 className='text-theme1 fw-4 font-h1 text-center mb-3'>
                    Reset Your Password
                </h1>
                <p className='text-center fw-4 font-secondary'>Please Enter a New Password</p>
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
                <button className="btn1 p-2 w-100 fw-3 mt-2" >Submit</button>
                {responseError && <div className={`bg-${color} text-center text-white py-2 br-5 mt-4 font-primary fw-3`}>{responseError}</div>}
                <div className='d-flex align-items-center justify-content-center gap-30 my-4 or_block'>
                    <hr className="wc-40 d-inline-block" />
                    <span className='fw-3 text-grey2'>Or</span>
                    <hr className="wc-40 d-inline-block" />
                </div>
                <Link
                    className="btn p-0 w-100 text-theme1 fw-3 text-center"
                    href={'/login'}
                >
                    Sign In
                </Link>
            </form>
        </Container>
    )
} 
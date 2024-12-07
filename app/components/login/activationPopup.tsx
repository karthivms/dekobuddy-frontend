'use client'

import Modal from 'react-bootstrap/Modal';
import { ModalProps, Spinner } from 'react-bootstrap';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { verifyOtp } from '@/app/api/verifyotp';
import { resendOtp } from '@/app/api/resendOTP';


interface MyVerticallyCenteredModalProps extends ModalProps {
    show: boolean,
    onHide: () => void,
    isDisabled: boolean,
    setIsDisabled: Dispatch<SetStateAction<boolean>>
}

function MyVerticallyCenteredModal(props: MyVerticallyCenteredModalProps) {
    const [otp, setOtp] = useState(Array(6).fill(""));
    const inputRefs = useRef<HTMLInputElement[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isReloading, setIsReloading] = useState(false);
    const [responseError, setResponse] = useState('');
    const [color, setColor] = useState("");



    const handleInputChange = (value: string, index: number) => {
        if (isNaN(Number(value))) return;

        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace") {
            if (otp[index]) {
                const updatedOtp = [...otp];
                updatedOtp[index] = "";
                setOtp(updatedOtp);
            } else if (index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const clipboardData = e.clipboardData.getData("Text").slice(0, 6);
        const updatedOtp = [...otp];


        for (let i = 0; i < clipboardData.length; i++) {
            if (isNaN(Number(clipboardData[i]))) break;
            updatedOtp[i] = clipboardData[i];
        }

        setOtp(updatedOtp);
        const filledIndex = clipboardData.length - 1;
        inputRefs.current[filledIndex]?.focus();
    };


    const [countdown, setCountdown] = useState(300);

    useEffect(() => {
        if (!props.show) {
            setCountdown(300)
            props.setIsDisabled(true)
        }
    }, [props.show])

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;

        if (props.isDisabled) {
            timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer!);
                        props.setIsDisabled(false);
                        return 300; // Reset the countdown for the next use
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [props.isDisabled, props]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const OtpHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const email = localStorage.getItem('dkb_email') || ""
        const stored_otp = localStorage.getItem('dkb_otp') || ""
        const form_otp = otp.join("")
        console.log(countdown)
        if (countdown === 300) {
            setColor("danger")
            setResponse("OTP expired. Please click resend otp to try again")
        } else if (atob(`${stored_otp}`) !== form_otp) {
            console.log(atob(`${stored_otp}`))
            setColor("danger")
            setResponse("Invalid OTP. Please try again")
        } else {
            setColor("success")
            setIsLoading(true)
            const response = await verifyOtp({ email: email, status: true })
            setIsLoading(false)

            if (!response) {
                setResponse("OTP Verified successfully")
                localStorage.removeItem('dkb_email')
                localStorage.removeItem('dkb_otp')
                setTimeout(() => {
                    props.onHide();
                    setCountdown(0)
                    props.setIsDisabled(true);
                }, 3000)
            }



        }

    };

    const resendOtp2 = async () => {
        const email = localStorage.getItem('dkb_email') || ""
        const data = { email: email }
        setIsReloading(true)
        const response = await resendOtp(data);
        setIsReloading(false)

        if (response.otp) {
            setResponse("OTP resent successfully")
            setColor("success")
            localStorage.setItem("dkb_otp", btoa(`${response.otp}`))
            props.setIsDisabled(true);
        } else {
            setResponse(response)
            setColor("danger")
        }
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className=''
        >
            <Modal.Header closeButton className='bb-transparent-1 pb-0 '>
                <Modal.Title id="contained-modal-title-vcenter" className='fw-4 text-theme1 '>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='pt-3 px-md-5 px-2'>
                <h6 className='text-theme1 fw-4 font-h2 text-center mb-3'>
                    Successfully Registered
                </h6>
                <p className='text-center fw-4 font-secondary line-relaxed'>
                    Please check your email for the OTP  to activate your account.

                </p>
                <form onSubmit={OtpHandler}>
                    <div className=" mt-3 d-flex justify-content-center py-2 gap-20 gap-sm-10">

                        {otp.map((value, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                value={value}
                                onChange={(e) => handleInputChange(e.target.value, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onPaste={handlePaste}
                                required
                                ref={(el) => {
                                    inputRefs.current[index] = el!;
                                }}
                                className={`wp-40 h-40 text-center text-theme1 fw-3 border-border-solid`}
                            />
                        ))}
                    </div>

                    <button className='btn1 w-100 py-2 mt-3' disabled={isLoading}>

                        {isLoading ? (<Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />) : <>Verify OTP</>}
                    </button>
                    {responseError && <p className={`bg-${color} br-5 text-white py-1 mb-0 font-primary mt-3 text-center`}>{responseError}</p>}
                </form>

                <div className='mt-3 d-flex align-items-center justify-content-center text-center'>Didn &apos; t receive the OTP?
                    <button className={`text-theme1 btn ms-1 border-transparent-solid p-0`} onClick={resendOtp2} disabled={props.isDisabled}>
                        {isReloading ? (<Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />) : (<>Resend OTP</>)}
                    </button>
                    {props.isDisabled && <span className='ms-2 text-theme3'>{formatTime(countdown)}</span>}
                </div>
            </Modal.Body>
        </Modal >
    );
}

function Activation({ show, handleShow, isDisabled, setIsDisabled }: { show: boolean, handleShow: () => void, isDisabled: boolean, setIsDisabled: Dispatch<SetStateAction<boolean>> }) {


    return (
        <>
            <MyVerticallyCenteredModal
                show={show}
                onHide={handleShow}
                isDisabled={isDisabled}
                setIsDisabled={setIsDisabled}
            />
        </>
    );
}

export default Activation;
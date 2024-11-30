'use client'

import Modal from 'react-bootstrap/Modal';
import { ModalProps } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import { verifyOtp } from '@/app/api/verifyotp';
import { resendOtp } from '@/app/api/resendOTP';


interface MyVerticallyCenteredModalProps extends ModalProps {
    onHide: () => void;
}

function MyVerticallyCenteredModal(props: MyVerticallyCenteredModalProps) {
    const [otp, setOtp] = useState(Array(6).fill(""));
    const inputRefs = useRef<HTMLInputElement[]>([]);

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
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;

        if (isDisabled) {
            timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer!);
                        setIsDisabled(false);
                        return 300; // Reset the countdown for the next use
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isDisabled]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };


    const OtpHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const email = localStorage.getItem('email') || ""
        const data = { email: email, otp: otp.join("") }
        const response = await verifyOtp(data)
        if (response === "verified successfully") {
            props.onHide()
        }
        setIsDisabled(true);
    };

    const resendOtp2 = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const email = localStorage.getItem('email') || ""
        const data = { email: email }
        const response = await resendOtp(data)
        if (response === "verified successfully") {
            props.onHide()
        }
        setIsDisabled(true);
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
            <Modal.Body className='pt-3'>
                <h6 className='text-theme1 fw-4 font-h2 text-center mb-3'>
                    Successfully Registered
                </h6>
                <p className='text-center fw-4 font-secondary line-relaxed'>
                    Please check your email for the OTP  to activate your account.

                </p>
                <form onSubmit={OtpHandler}>
                    <div className="otp-container mt-3 d-flex justify-content-center gap-20">

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
               
                    <button className='btn1 w-100 py-2 mt-3' >Verify OTP</button>
                </form>

                <div className='mt-3 d-flex align-items-center justify-content-center text-center'>Didn't receive the OTP?
                         <button className={`text-theme1 btn ms-1 border-transparent-solid p-0`} onClick={() => resendOtp2} disabled={isDisabled}> Resend OTP</button>
                        {isDisabled && <span className='ms-2 text-theme3'>{formatTime(countdown)}</span>}
                    </div>
            </Modal.Body>
        </Modal >
    );
}

function Activation({ show, handleShow }: { show: boolean, handleShow: () => void }) {

    return (
        <>

            <MyVerticallyCenteredModal
                show={show}
                onHide={handleShow}
            />
        </>
    );
}

export default Activation;
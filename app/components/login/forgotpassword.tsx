'use client'

import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { ModalProps, Spinner } from 'react-bootstrap';
import ForgotPasswordApi from '@/app/api/forgotPassword';


interface MyVerticallyCenteredModalProps extends ModalProps {
    onHide: () => void;
}

function MyVerticallyCenteredModal(props: MyVerticallyCenteredModalProps) {
    const [email, setemail] = useState("");
    const [response, setResponse] = useState("");
    const [color, setColor] = useState("");
    const [isLoading, setIsLoading] = useState(false);



    const handlePopup = async (e: React.FormEvent) => {
        e.preventDefault();
        const body = { email: email }
        setIsLoading(true)
        const response = await ForgotPasswordApi(body);
        setIsLoading(false)
        setResponse(response.message);
        if (response.status === 400) {
            setColor("danger")
        } else {
            setColor("success")

        }

        setemail("");
    }

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
                <form className='px-5 pb-3' onSubmit={handlePopup}>
                    <h6 className='text-theme1 fw-4 font-h2 text-center mb-3'>
                        Reset Password
                    </h6>
                    <p className='text-center fw-4 font-secondary'>Enter your email to receive instructions on how to reset your password.</p>
                    <label className='text-black fw-3 font-secondary my-2'>Email Address</label>
                    <input className='w-100 p-2 border-border2-solid' required type='email' value={email} onChange={(e) => setemail(e.target.value)} />
                    <button className="btn1 p-2 w-100 fw-3 mt-4" disabled={isLoading}>
                        {isLoading ? (<Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />) : <>Submit</>}
                    </button>
                    {response && <p className={`bg-${color} font-primary mb-0 br-5 text-white py-1 mt-3 text-center`}>{response}</p>}
                    <div className='d-flex align-items-center justify-content-center gap-30 my-4 or_block'>
                        <hr className="wc-40 d-inline-block" />
                        <span className='fw-3 text-grey2'>Or</span>
                        <hr className="wc-40 d-inline-block" />
                    </div>
                    <span
                        className="btn p-0  w-100 text-theme1 fw-3 text-center"
                        onClick={() => props.onHide()}>
                        Sign In
                    </span>
                </form>
            </Modal.Body>
        </Modal>
    );
}

function ForgotPassword() {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>

            <span
                className="btn p-0 text-theme1 fw-3 "
                onClick={() => setModalShow(true)}>
                Forgot Password ?
            </span>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export default ForgotPassword;
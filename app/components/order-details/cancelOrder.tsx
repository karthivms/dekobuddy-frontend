'use client'

import { useState } from "react";
import { Modal } from "react-bootstrap";
import { ModalProps } from 'react-bootstrap';


interface MyVerticallyCenteredModalProps extends ModalProps {
    onHide: () => void;
}

export default function CancelOrder() {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <button className="ms-auto d-block btn2 px-2 py-1 cancel_order_btn" onClick={() => setModalShow(true)}>
                cancel order
            </button>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}


function MyVerticallyCenteredModal(props: MyVerticallyCenteredModalProps) {

    const handlePopup = () => {
        props.onHide();
    }

    return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className='cancelpopup'
            >
                <Modal.Header closeButton className='bb-transparent-1 pb-0 '>
                    <Modal.Title id="contained-modal-title-vcenter" className='fw-4 text-theme1'>
                        Request Cancellation
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='pt-3 pb-0'>
                    <input type="text" className='w-100 h-40 px-2' placeholder="Reason" />
                    <textarea className='w-100 h-150 mt-4 p-3' placeholder="Comments" />
                </Modal.Body>
                <Modal.Footer className='bt-transparent-1 d-flex gap-10 justify-content-center'>
                    <button className="btn1 px-2 fw-3 wc-46 h-40" onClick={() => handlePopup()}>Cancel</button>
                    <button className="btn2 px-2 fw-3 wc-46 h-40" onClick={() => handlePopup()}>Close</button>
                </Modal.Footer>
            </Modal>

    );
}



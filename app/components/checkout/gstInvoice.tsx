'use client'

import { useState } from "react";
import { Modal } from "react-bootstrap";
import { ModalProps } from 'react-bootstrap';


interface MyVerticallyCenteredModalProps extends ModalProps {
    onHide: () => void;
  }

export default function GstInvoice() {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <div className="bg-grey3 mt-2 d-flex align-items-center px-4 py-3 br-2 gap-15">
                <input type="checkbox" onChange={() => setModalShow(true)}/>
                <span className="font-primary fw-3 line-tight mt-1">Use GST Invoice</span>
            </div>

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
            className=''
        >
            <Modal.Header closeButton className='bb-transparent-1 pb-0 '>
                <Modal.Title id="contained-modal-title-vcenter" className='fw-4 text-theme1'>
                    Your GST Information
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='pt-3 '>
                <input type="text" className='w-100 h-40 px-2' placeholder="GSTIN" />
                <input type="text" className='w-100 h-40 my-4 px-2' placeholder="Business Name" />
                <span className="font-small text-black fw-3">
                    Incorrect GSTIN details will lead to order cancellation
                </span>
            </Modal.Body>
            <Modal.Footer className='bt-transparent-1 justify-content-between'>
                <button className="btn1 px-2 fw-3 w-100 h-40" onClick={() => handlePopup()}>Submit</button>
            </Modal.Footer>
        </Modal>
    );
}



'use client'

import { cancelOrder } from "@/app/api/cancelOrder";
import { RootState } from "@/app/redux/store";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { ModalProps } from 'react-bootstrap';
import { useSelector } from "react-redux";


interface MyVerticallyCenteredModalProps extends ModalProps {
    onHide: () => void;
    id : string
}

export default function CancelOrder({id}:{id:string}) {
    const [modalShow, setModalShow] = useState(false);
    const order_id = useSelector((state:RootState) => state.checkout.placed_order_id )

    if(order_id === id){
        return;
    }
    return (
        <>
            <button className="ms-auto d-block btn2 px-2 py-1 cancel_order_btn" onClick={() => setModalShow(true)}>
                cancel order
            </button>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                id={id}
            />
        </>
    )
}


function MyVerticallyCenteredModal(props: MyVerticallyCenteredModalProps) {

    const handlePopup = () => {
        props.onHide();
        setReason("");
        setComments("")
    }


    const [reason, setReason] = useState('');
    const [comments, setComments] = useState('');

    const handleSubmit = async () => {
        const data={
            reason : reason,
            comment : comments
        }
        const response = await cancelOrder(props.id, data)
        console.log(response)
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
            <form action={handleSubmit}>
                <Modal.Body className='pt-3 pb-0'>
                    <input type="text" value={reason} className='w-100 h-40 px-2' placeholder="Reason" onChange={(e) => setReason(e.target.value)} required />
                    <textarea className='w-100 h-150 mt-4 p-3' value={comments} placeholder="Comments" onChange={(e) => setComments(e.target.value)} required />
                </Modal.Body>
                <Modal.Footer className='bt-transparent-1 d-flex gap-10 justify-content-center'>
                    <button className="btn1 px-2 fw-3 wc-46 h-40">Cancel</button>
                    <span className="btn2 p-2 fw-3 wc-46 h-40 text-center pointer" onClick={() => handlePopup()}>Close</span>
                </Modal.Footer>
            </form>

        </Modal>

    );
}



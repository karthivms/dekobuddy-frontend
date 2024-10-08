'use client'

import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Star from '../icons/star';
import { ModalProps } from 'react-bootstrap';


interface MyVerticallyCenteredModalProps extends ModalProps {
    onHide: () => void;
  }

function MyVerticallyCenteredModal(props: MyVerticallyCenteredModalProps) {
    const [rate, setRate] = useState(0);
    const [comment, setComment] = useState("");

    const handlePopup = () => {
        setRate(0);
        setComment("");
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
                    Rate and review
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='pt-3'>
                <h6 className='text-black fw-4 font-large'>Rating ({rate}/5)</h6>
                {[...Array(5)].map((_, index) => (
                    <span key={`key_${index}`} className="text-review me-2" onClick={() => setRate(index + 1)}>
                        <Star fill={index < rate ? "currentcolor" : "none"} size={"20"} />
                    </span>
                ))}

                <h6 className='text-black fw-4 font-large mt-4'>Review</h6>
                <textarea className='w-100 h-150' value={comment} onChange={(e) => setComment(e.target.value)}/>
            </Modal.Body>
            <Modal.Footer className='bt-transparent-1 justify-content-between'>
                <button className="fw-3 btn2 px-2" onClick={() => handlePopup()}>Cancel</button>
                <button className="btn1 px-2 fw-3" onClick={() => handlePopup()}>Submit</button>
            </Modal.Footer>
        </Modal>
    );
}

function RatingPopup() {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>

            <button
                className="border-transparent-solid bg-theme2 py-1 px-2  text-theme1 fw-4 br-5 rate-product-btn"
                onClick={() => setModalShow(true)}>
                Rate Product
            </button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export default RatingPopup;
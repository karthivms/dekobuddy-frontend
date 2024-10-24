'use client'

import Modal from 'react-bootstrap/Modal';
import { ModalProps } from 'react-bootstrap';


interface MyVerticallyCenteredModalProps extends ModalProps {
    onHide: () => void;
}

function MyVerticallyCenteredModal(props: MyVerticallyCenteredModalProps) {
    

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
                <p className='text-center fw-4 font-secondary line-relaxed'>An email has been sent to your email address containing an activation link. Please click on the link to activate your account. If you do not click the link your account will remain inactive and you will not receive further emails. If you do not receive the email within a few minutes, please check your spam folder.</p>
            </Modal.Body>
        </Modal>
    );
}

function Activation({show, handleShow}:{show:boolean, handleShow : () => void}) {

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
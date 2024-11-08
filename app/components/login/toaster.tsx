'use client'

import {  Toast, ToastContainer } from 'react-bootstrap';
import Tick from '../icons/tick';



function Toaster({ show, handleClose}:{ show : boolean, handleClose : () => void }) {
    return (
        <div className='toast-message'>
            <ToastContainer position={'bottom-end'}>
            <Toast onClose={handleClose}  show={show} delay={3000} autohide>
                <Toast.Body className='bg-theme2 br-0 fw-4 text-theme1'><span className='me-2'><Tick color='currentcolor'/></span>Successfully Logged In</Toast.Body>
            </Toast>
            </ToastContainer>
        </div>
    );
}

export default Toaster;
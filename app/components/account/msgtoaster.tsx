'use client'

import {  Toast, ToastContainer } from 'react-bootstrap';
import Tick from '../icons/tick';



function Toaster({msg, error, show, handleClose}:{msg : boolean, error : string, show : boolean, handleClose : () => void }) {
    return (
        <div className='toast-message'>
            <ToastContainer position={'bottom-end'}>
            <Toast onClose={handleClose}  show={show} delay={3000} autohide>
                <Toast.Body className='bg-theme2 br-0 fw-4 text-theme1'>{msg ? (<><span className='me-2'><Tick color='currentcolor'/></span> Profile Updated</>):(<span className='text-danger'>{error}</span>)}</Toast.Body>
            </Toast>
            </ToastContainer>
        </div>
    );
}

export default Toaster;
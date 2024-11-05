'use client'

import { useState } from 'react';
import {  Toast, ToastContainer } from 'react-bootstrap';
import Tick from './icons/tick';


function Toaster({msg, show, handleClose}:{msg : boolean, show : boolean, handleClose : () => void }) {
    return (
        <div className='toast-message'>
            <ToastContainer position={'bottom-end'}>
            <Toast onClose={handleClose}  show={show} delay={3000} autohide>
                <Toast.Body className='bg-theme1 br-0 fw-3 text-white'><span className='me-2'><Tick color='currentcolor'/></span>{msg ? (<>Added to Wishlist</>):(<>Removed from Wishlist</>)}</Toast.Body>
            </Toast>
            </ToastContainer>
        </div>
    );
}

export default Toaster;
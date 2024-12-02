'use client'

import { FormEvent, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Star from '../icons/star';
import { ModalProps } from 'react-bootstrap';
import rateProduct from '@/app/api/rateProduct';
import { AppDispatch } from '@/app/redux/store';
import { useDispatch } from 'react-redux';
import { getReviews } from '@/app/redux/reviewSlice';


interface MyVerticallyCenteredModalProps extends ModalProps {
    onHide: () => void;
    userid: number;
    productid: number;
}

function MyVerticallyCenteredModal(props: MyVerticallyCenteredModalProps) {
    const [rate, setRate] = useState(0);
    const [comment, setComment] = useState("");
    const [error, setError] = useState('');
    const dispatch: AppDispatch = useDispatch()


    const handlePopup = async (e: FormEvent) => {
        e.preventDefault();

        if (rate === 0) {
            setError('Please select a rating before submitting.')
        } else if (props.userid === 0) {
            setError('Please Login to review a product.')

        }
        else {
            const data = {
                rating: rate,
                review: comment,
                product_id: props.productid,
                user_id: props.userid
            }
            const response = await rateProduct(data);
            setRate(0);
            setComment("");
            setError("");
            props.onHide();
            dispatch(getReviews(props.productid));

            if (response.error) {
                window.alert(response.error);
            }

        }



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
            <form onSubmit={handlePopup}>
                <Modal.Body className='pt-3'>
                    <h6 className='text-black fw-4 font-large'>Rating ({rate}/5)</h6>
                    {[...Array(5)].map((_, index) => (
                        <span key={`key_${index}`} className="text-review me-2" onClick={() => setRate(index + 1)}>
                            <Star fill={index < rate ? "currentcolor" : "none"} size={"20"} />
                        </span>
                    ))}
                    {error && <p className="text-danger  mt-3 font-primary fw-3">{error}</p>}
                    <h6 className='text-black fw-4 font-large mt-4'>Review</h6>
                    <textarea className='w-100 h-150 p-2' value={comment} onChange={(e) => setComment(e.target.value)} />
                </Modal.Body>
                <Modal.Footer className='bt-transparent-1 justify-content-between'>
                    <span className="fw-3 btn2 px-2 pointer" onClick={() => props.onHide()}>Cancel</span>
                    <button className="btn1 px-2 fw-3" type='submit' >Submit</button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}

function RatingPopup({ userid, productid }: { userid: number, productid: number }) {
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
                userid={userid}
                productid={productid}
            />
        </>
    );
}

export default RatingPopup;
'use client'

import { cancelOrder } from "@/app/api/cancelOrder";
import { Reasons } from "@/app/api/getReasons";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { ModalProps } from 'react-bootstrap';


interface MyVerticallyCenteredModalProps extends ModalProps {
    onHide: () => void;
    id: string;
    userid: string

}

export default function CancelOrder({ userid, id }: { userid: string, id: string }) {
    const [modalShow, setModalShow] = useState(false);


    const pathname = usePathname();

    if (pathname.includes('order-success')) {
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
                userid={userid}
            />
        </>
    )
}


function MyVerticallyCenteredModal(props: MyVerticallyCenteredModalProps) {
    const [reasons, setReasons] = useState([])
    const router = useRouter();

    const handlePopup = () => {
        props.onHide();
        setReason("");
        setComments("")
    }


    const handleRequest = () => {
        setReason("");
        setComments("")
        setMsg("Your order has been cancelled successfully");
        router.refresh()
    }


    const [reason, setReason] = useState("1");
    const [comments, setComments] = useState('');
    const [msg, setMsg] = useState('');

    const handleSubmit = async () => {
        const data = {
            user_id: Number(props.userid),
            reason: reason,
            comment: comments
        }


        const response = await cancelOrder(props.id, data)

        if (response) {
            handleRequest()
        }
    }

    const getReasons = async () => {
        const response = await Reasons();
        setReasons(response);
    }

    useEffect(() => {
        getReasons()
    }, [])

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='cancelpopup px-5'
        >
            <Modal.Header closeButton className='bb-transparent-1 pb-0 '>
                <Modal.Title id="contained-modal-title-vcenter" className='fw-4 text-theme1'>
                    Request Cancellation
                </Modal.Title>
            </Modal.Header>
            {msg ? (<p className="text-success p-3 text-center my-5">{msg}</p>) : (<form action={handleSubmit}>
                <Modal.Body className='pt-3 pb-0'>
                    <label className="text-theme3 fw-4 mb-2 font-large">Reason</label>
                    <select className="w-100 p-2 text-grey2" value={reason} onChange={(e) => setReason(e.target.value)}>
                        {reasons.map((item: { id: number, reason: string }) => (
                            <option key={item.id} value={item.id}>{item.reason}</option>
                        ))}
                    </select>
                    <textarea className='w-100 h-150 mt-4 p-3' value={comments} placeholder="Comments" onChange={(e) => setComments(e.target.value)} required />
                </Modal.Body>
                <Modal.Footer className='bt-transparent-1 d-flex gap-10 justify-content-center'>
                    <button className="btn1 px-2 fw-3 wc-46 h-40">Cancel</button>
                    <span className="btn2 p-2 fw-3 wc-46 h-40 text-center pointer" onClick={() => handlePopup()}>Close</span>
                </Modal.Footer>
            </form>)

            }
        </Modal>

    );
}



import { Col, Row } from "react-bootstrap";
import ProgressBar from "./progressBar";
import CancelOrder from "./cancelOrder";
import { order } from "@/app/types/types";

export const Delivery = ({ data, id }: { data : order,id: number }) => {
    function getDateTwoDaysFromToday() {
        const today = new Date();
        today.setDate(today.getDate() + 2);
        return today.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
        });
    }

    return (
        <>
            <h3 className='font-secondary fw-4'># ORDER ID : {id}</h3>
            {/* <p className="mt-4 mb-0 font-secondary text-secondary">Estimated Delivery Date</p>
            <p className="font-h3 fw-4 mt-1 mb-0">{getDateTwoDaysFromToday()}</p> */}
            <ProgressBar currentstatus={data.order_status}/>
            <Row className="align-items-end flex-wrap">
            <Col lg={8}>
                <h5 className="font-large text-black">Billing Address</h5>
                <ul className="m-0 ps-3 ">
                    <li className="fw-4 text-black mb-1">{data.billing_address.name}</li>
                        <li >
                            {data.billing_address.address},
                        </li>
                        <li >
                            {data.billing_address.city},
                        </li>
                        <li >
                            {data.billing_address.state},
                        </li>
                        <li >
                            {data.billing_address.pincode}
                        </li>
                    <li className="fw-4 text-black mt-2 mb-1">Phone Number</li>
                    <li>{data.billing_address.phone}</li>
                </ul>
            </Col>
            <Col >
            <CancelOrder id={id}/>
            </Col>
            </Row>
        </>
    )
}
import { Col, Container, Row } from "react-bootstrap";
import LoginDetails from "@/app/components/checkout/loginDetails";
import Address from "@/app/components/checkout/address";
import OrderSummary from "@/app/components/checkout/orderSummary";
import Payment from "@/app/components/checkout/payment";
import "@/app/sass/components/checkout.scss";


export default function Page() {
    return (
        <Container className="mb-4">
            <h1 className="mt-4 font-h1  text-theme1 fw-4 pb-2 font-sm-h2">Checkout</h1>

            <Row className="mt-2 gap-20 row-gap-30">
                <Col lg={8}>
                    <LoginDetails />
                    <Address />
                    <OrderSummary />
                    <Payment />
                </Col>
                <Col className="checkout_total">
                    <div className="bg-theme2 p-4 br-5 total_box">
                        <h3 className="font-h2 font-sm-h3 text-black fw-4">Price Details</h3>
                        <div className="subtotal  mt-4">
                            <div className="d-flex pt-2 pb-3  d-flex justify-content-between align-items-center">
                                <h5 className="font-large text-theme1">Price (1 item)</h5>
                                <span className="text-black fw-3">₹1328</span>
                            </div>
                            <div className="d-flex pt-2 pb-3 d-flex justify-content-between align-items-center">
                                <h5 className="font-large text-theme1">Delivery Charge</h5>
                                <span className="text-black fw-3">₹40</span>
                            </div>
                        </div>
                        <div className="d-flex pt-2 pb-1 mt-3 justify-content-between align-items-center">
                            <h5 className="font-h3 fw-4 text-theme1">Total</h5>
                            <span className="text-black fw-4 font-large">₹1368</span>
                        </div>

                    </div>
                </Col>
            </Row>
        </Container>
    )
}
import { Col, Container, Row } from "react-bootstrap";
import LoginDetails from "@/app/components/checkout/loginDetails";
import Address from "@/app/components/checkout/address";
import OrderSummary from "@/app/components/checkout/orderSummary";
import Payment from "@/app/components/checkout/payment";
import "@/app/sass/components/checkout.scss";
import { getUser } from "../utilis/auth";
import { apiRequest } from "../api/apiConfig";
import { PriceDetail } from "../components/checkout/priceDetails";

const baseurl = process.env.NEXT_PUBLIC_API_BASE_URL;

async function GetProfileData(userid: string) {

    const response = await apiRequest('GET', `${baseurl}/profile/${userid}`);
    return response;
}


export default async function Page() {

    let username: string = "";
    let userid: string = "";

    const userData = await getUser();

    if (userData) {
        username = userData.username;
        userid = userData.user_id;
    }

    const profiledata = await GetProfileData(userid);


    return (
        <Container className="mb-4">
            <h1 className="mt-4 font-h1  text-theme1 fw-4 pb-2 font-sm-h2">Checkout</h1>

            <Row className="mt-2 gap-20 row-gap-30">
                <Col lg={8}>
                    <LoginDetails username={username} profiledata={profiledata} />
                    <Address userid={userid} />
                    <OrderSummary userid={userid} profiledata={profiledata} />
                    <Payment userid={userid} />
                </Col>
                <Col className="checkout_total">
                    <PriceDetail />
                </Col>
            </Row>
        </Container>
    )
}
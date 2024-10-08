
import { Col, Container, Row } from "react-bootstrap";
import SignUp from "@/app/components/login/signUp";
import Login from "@/app/components/login/login";
import "@/app/sass/components/login.scss";



export default function Page() {
    return (
        <Container className="my-5 px-5 login_page">

       
            <Row className="">
                <Col sm={12} lg={6} className="px-5 signup_div" 
                style={{borderRight:"1px dashed #BDB7AE"}}
                >
                    <SignUp />
                </Col>
                <Col className="px-5 login_div">
                    <Login />
                </Col>
            </Row>
        </Container>
    )
}
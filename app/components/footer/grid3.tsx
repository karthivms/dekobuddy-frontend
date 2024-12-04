import { Col } from "react-bootstrap";
import Image from "next/image";

export default function Grid3() {
    return (
        <Col xl={4} xs={12} lg={4}>
            <h5 className="text-black font-h3 fw-4">Secure Payment</h5>
            <p className="font-primary my-4 line-relaxed">We accept all major credit cards, debit cards, and digital wallets for a seamless shopping experience.</p>
            {/* <form className="newsletter-form mt-3">
                <button className="text-light font-h3 bg-theme1 h-100 px-2 border-transparent-solid" type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentcolor"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" /></svg></button>
                <input type="email" placeholder="Enter Email ID..." className="bg-theme2 border-transparent-solid h-35 w-100 pe-5" />
            </form> */}
            <Image src={"/images/payment-method.png"} alt="payment-methods" width={634} height={29} className="w-100 w-md-50 w-sm-100 h-auto " />
        </Col>
    )
}
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import products from "@/app/datas/category/products.json";
import { Delivery } from "@/app/components/order-details/deliveryDetails";
import '@/app/sass/components/orderdetails.scss'

interface Product {
    id: number;
    name: string;
    img_url: string;
    props: string;
    no_of_reviews: number;
    price: number;
    discount: number;
}

type Params = {
    id: string;
};

export default function OrderDetail({ params }: { params: Params }) {
    const orderproducts = products.slice(0, 2)
    return (
        <>
            <Container className="my-4 ">
                <button className="btn fw-3 mb-2 d-flex align-items-center">
                    <span className="font-h2 me-2">&lsaquo;</span> Your Orders</button>
                <Row className="gap-40 align-items-start px-3 row-gap-40">
                    <Col lg={8} className="bg-grey3 br-10 p-4">
                        <Delivery id={Number(params.id)}/>
                    </Col>
                    <Col className="bg-theme2 br-10 p-4 order_summary">

                        <h3 className="font-h2 text-black fw-4">Order Summary</h3>
                        <Row className='mt-4 row-gap-30'>

                            {orderproducts.map((item: Product) => (
                                <Col key={`checkout_item_${item.id}`} lg={12} className="d-flex gap-20">
                                    <div>
                                        <Image alt="cart_images" width={60} height={60} src={item.img_url} className="br-5" />
                                    </div>
                                    <div className="d-grid align-items-between">
                                        <p className="mb-0 fw-3 font-primary">{item.name}</p>
                                        <p className="mb-0 fw-3 font-primary text-theme1">quantity : 1</p>

                                    </div>
                                    <div>
                                        <div className="font-primary fw-3 d-flex gap-10 text-black align-items-center">
                                            <span>₹{item.price}</span>
                                        </div>

                                    </div>
                                </Col>

                            ))}
                        </Row>

                        <div className="d-flex pt-2 pb-3 mt-4  d-flex justify-content-between align-items-center bb-border3-1">
                            <h5 className="font-large text-theme1">Subtotal</h5>
                            <span className="text-black fw-3">₹7000</span>
                        </div>
                        <div className="d-flex pt-2 pb-3 mt-3 justify-content-between align-items-center">
                            <h5 className="font-h3 fw-4 text-theme1">Total</h5>
                            <span className="text-black fw-4 font-large">₹7000</span>
                        </div>

                    </Col>
                </Row>

            </Container>

        </>
    )
}
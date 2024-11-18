import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import { Delivery } from "@/app/components/order-details/deliveryDetails";
import '@/app/sass/components/orderdetails.scss'
import { apiRequest } from "@/app/api/apiConfig";
import { getUser } from "@/app/utilis/auth";
import { order, orderItem } from "@/app/types/types";
import formatPriceIndian from "@/app/utilis/formatPrice";
import Link from "next/link";
import { redirect } from "next/navigation";


type Params = {
    id: string;
};

 async function getorder(userid: string, id: string) {
    const response = await apiRequest('GET', '/order/', null, { user_id: userid, order_id: id });
    return response;
}

export default async function OrderDetail({ params }: { params: Params }) {
    let userid: string = "";

    const userData = await getUser();

    if (userData) {
        userid = userData.user_id;
    }

    const order: order[] = await getorder(userid, params.id)

    if(order.length === 0){
        redirect('/404')
    }

    return (
        <>
            <Container className="my-4 ">
                <Link href={'/account/orders'} className="fw-3 mb-2 d-flex align-items-center">
                    <span className="font-h2 me-2">&lsaquo;</span> Your Orders</Link>
                <Row className="gap-40 align-items-start px-3 row-gap-40">
                    <Col lg={8} className="bg-grey3 br-10 p-4">
                    <h3 className='font-secondary fw-4 mb-5'># ORDER ID : {params.id}</h3>

                        <Delivery data={order[0]} id={params.id} userid={userid}/>
                    </Col>
                    <Col className="bg-theme2 br-10 p-4 order_summary">

                        <h3 className="font-h2 text-black fw-4">Order Summary</h3>
                        <Row className='mt-4 row-gap-30'>

                            {order[0].order_items.map((item: orderItem) => (
                                <Col key={`checkout_item_${item.id}`} lg={12} className="d-flex justify-content-between">
                                    <div className="d-flex gap-10">
                                        <Image alt="cart_images" width={60} height={60} src={item.images[0].image} className="br-5" />
                                        <div className="d-grid align-items-between">
                                        <p className="mb-0 fw-3 font-primary">{item.product_name}</p>
                                        <p className="mb-0 fw-3 font-primary text-theme1">quantity :{item.quantity}</p>

                                    </div>
                                    </div>
                                   
                                    <div>
                                        <div className="font-primary fw-3 d-flex gap-10 text-black align-items-center">
                                            <span>{formatPriceIndian(item.price)}</span>
                                        </div>

                                    </div>
                                </Col>

                            ))}
                        </Row>

                        <div className="d-flex pt-2 pb-3 mt-4  d-flex justify-content-between align-items-center bb-border3-1">
                            <h5 className="font-large text-theme1">Subtotal</h5>
                            <span className="text-black fw-3">{formatPriceIndian(order[0].amount)}</span>
                        </div>
                        <div className="d-flex pt-2 pb-3 mt-3 justify-content-between align-items-center">
                            <h5 className="font-h3 fw-4 text-theme1">Total</h5>
                            <span className="text-black fw-4 font-large">{formatPriceIndian(order[0].bill_amount)}</span>
                        </div>

                    </Col>
                </Row>

            </Container>

        </>
    )
}
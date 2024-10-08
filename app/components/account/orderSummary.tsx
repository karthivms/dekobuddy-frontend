import Image from 'next/image';
import { Col, Row } from 'react-bootstrap';


interface Product {
    id: number;
    name: string;
    img_url: string;
    props: string;
    no_of_reviews: number;
    price: number;
    discount: number;
}

export default function OrderSummary({ orderproducts, status }: { orderproducts: Product[], status: string }) {


    const getColor = (status: string) => {
        switch (status) {
            case "Cancelled":
                return "text-danger"
            case "Delivered":
                return "text-success"
           default:
                return "text-theme1"
        }
    }


    return (
        <div className="px-4 py-3 mt-4 border-border-solid">
            <div className='d-flex flex-wrap gap-10 row-gap-10 justify-content-between'>
                <h3 className='font-secondary fw-4'># ORDER ID : 1234</h3>
                <span className={`font-primary fw-3 bg-grey3 pt-1 br-5 px-2 ${getColor(status)}`}>{status}</span>
            </div>
            {orderproducts.map((item: Product) => (
                <Row key={`checkout_item_${item.id}`} className='mt-4'>
                    <Col lg={8} className="d-flex gap-20 flex-wrap row-gap-10">
                        <div>
                            <Image alt="cart_images" width={80} height={80} src={item.img_url} className="br-5" />
                        </div>
                        <div className="d-grid align-items-between">
                            <p className="mb-0 fw-3">{item.name}</p>
                            <p className="m-0 font-primary text-grey">{item.props}</p>
                            <div className="font-primary fw-3 d-flex gap-10 text-black align-items-center">
                                <span>₹{item.price}</span>
                            </div>
                        </div>
                    </Col>

                </Row>
            ))}
        </div>
    )
}
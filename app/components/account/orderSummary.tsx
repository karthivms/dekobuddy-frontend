import { order, orderItem } from '@/app/types/types';
import formatPriceIndian from '@/app/utilis/formatPrice';
import Image from 'next/image';
import Link from 'next/link';
import { Col, Row } from 'react-bootstrap';



export default function OrderSummary({ orderproducts, status }: { orderproducts: order, status: string }) {


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
        <div className="px-4 py-3 mt-4 border-border-solid order-listing">
            <div className='d-flex flex-wrap gap-10 row-gap-10 justify-content-between'>
                <Link href={`/order-detail/${orderproducts.order_id}`} className='font-secondary fw-4 '># ORDER ID : {orderproducts.order_id}</Link>
                <span className={`font-primary text-capitalize fw-3 bg-grey3 br-5 px-2 ${getColor(status)}`}>{status === 'Confirmed' ? (<>Processing</>):(status)}</span>
            </div>
            {orderproducts.order_items.map((item: orderItem) => (
                <Row key={`checkout_item_${item.id}`} className='mt-4'>
                    <Col lg={12} className="d-flex gap-20 row-gap-10">
                        <div>
                            <Image alt="cart_images" width={60} height={60} src={item.images[0].image} className="br-5" />
                        </div>
                        <div className="d-grid align-items-between">
                            <p className="mb-0 fw-4 font-sm-primary">{item.product_name}</p>
                            <div className="font-primary  fw-3 d-flex gap-10 text-black align-items-center">
                                <span>{formatPriceIndian(item.price)}</span>
                            </div>
                        </div>
                    </Col>

                </Row>
            ))}
        </div>
    )
}
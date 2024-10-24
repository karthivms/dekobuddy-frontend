import { Col, Row } from "react-bootstrap";
import "@/app/sass/components/productskeleton.scss";

export default function CartSkeleton() {
    return (
        <>
            <Row className="mt-4 gap-40 row-gap-40">
                <Col lg={8} className="cart-table-div">
                    <table className="cart-table w-100">
                        <thead>
                            <tr className="text-uppercase font-primary h-30 bb-border2-1 bt-border2-1">
                                <th></th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                                <th></th>
                            </tr>
                        </thead>
                    </table>
                    {[...Array(3)].map((_, index) => (
                        <div key={`cart_skelton_${index}`} className="skeleton h-40 br-5 mt-3"></div>
                    ))}
                </Col>
                <Col className="h-276 mt-3 br-10">
                    <div className="bg-theme2 br-10 p-4 cart_price_details">
                        <h3 className="font-h2 text-black fw-4 font-sm-h3">Cart Totals</h3>
                        <div className="pt-2 pb-3 mt-4 h-34 br-5 skeleton"> </div>
                        <div className="pt-2 pb-3 mt-4 h-34 br-5 skeleton"> </div>
                        <div className="skeleton mt-4 h-45 br-5"></div>
                    </div>
                </Col>
            </Row>
        </>

    )
}
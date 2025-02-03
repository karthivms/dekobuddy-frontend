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
                        <tbody>
                            {[...Array(3)].map((_, index) => (
                                <tr key={`cart_skeleton_${index}`}>
                                    <td>
                                        <div className="skeleton wp-60" style={{ height: '60px' }}></div>
                                    </td>
                                    <td>
                                        <div className="skeleton wp-220 mb-1 br-5" style={{ height: '15px' }}></div>
                                        <div className="skeleton wp-110 br-2 mt-2" style={{ height: '20px' }}></div>
                                    </td>
                                    <td className="d-flex gap-1">
                                        <div className="skeleton wp-35" style={{ height: '35px' }} ></div>
                                        <div className="skeleton wp-35" style={{ height: '35px' }} ></div>
                                        <div className="skeleton wp-35" style={{ height: '35px' }} ></div>
                                    </td>
                                    <td>
                                        <div className="skeleton wp-120 br-3" style={{ height: '15px' }} ></div>
                                    </td>
                                    <td>
                                        <div className="skeleton wp-30 br-3" style={{ height: '25px' }} ></div>
                                    </td>
                                </tr>))}
                        </tbody>
                    </table>

                </Col>
                <Col className="h-276 mt-3 br-10">
                    <div className="bg-theme2 br-10 p-4 cart_price_details">
                        <h3 className="font-h2 text-black fw-4 font-sm-h3">Cart Totals</h3>
                        <div className="d-flex justify-content-between align-items-center mt-4" >
                            <div className=" br-2 skeleton wp-70 " style={{ height: '15px' }}> </div>
                            <div className=" br-2 skeleton wp-80 " style={{ height: '10px' }}> </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-4 pt-1" >
                            <div className=" br-2 skeleton wp-60 " style={{ height: '20px' }}> </div>
                            <div className=" br-2 skeleton wp-120 " style={{ height: '20px' }}> </div>
                        </div>
                        <div className="skeleton mt-4 h-45 br-5"></div>
                    </div>
                </Col>
            </Row>
        </>

    )
}
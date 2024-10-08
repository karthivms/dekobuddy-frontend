import { Col, Row } from "react-bootstrap";
import QuanityHandler from "../singleproduct/quantityHandler";
import products from "@/app/datas/category/products.json";
import Image from "next/image";
import BinIcon from "../icons/binIcon";

interface Product {
    id: number;
    name: string;
    img_url: string;
    props: string;
    no_of_reviews: number;
    price: number;
    discount: number;
}

export default function CartTable() {

    const cartproducts = products.slice(0, 2)
    return (
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
                    <tbody className="">
                        {cartproducts.map((product: Product) => (
                            <tr key={`cart_items_${product.id}`} >
                                <td>
                                    <Image alt="cart_images" width={60} height={60} src={product.img_url} className="br-5" />
                                </td>
                                <td><p className="mb-0 fw-3">{product.name}</p></td>
                                <td>
                                    <QuanityHandler />
                                </td>
                                <td>₹{product.price}</td>
                                <td>
                                    <button className="delete-btn btn text-theme3 delete-cart">
                                        <BinIcon />
                                    </button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </Col>
            <Col className="bg-theme2 br-10 p-4 cart_price_details">

                <h3 className="font-h2 text-black fw-4 font-sm-h3">Cart Totals</h3>
                <div className="d-flex pt-2 pb-3 mt-4  d-flex justify-content-between align-items-center subtotal">
                    <h5 className="font-large text-theme1">Subtotal</h5>
                    <span className="text-black fw-3">₹7000</span>
                </div>

                <div className="d-flex pt-2 pb-3 mt-3 justify-content-between align-items-center">
                    <h5 className="font-h3 fw-4 text-theme1">Total</h5>
                    <span className="text-black fw-4 font-large">₹7000</span>
                </div>

                <button className="btn bg-theme1 mt-2 py-2 text-white text-center w-100 fw-4 checkout_btn">Proceed to Checkout</button>
            </Col>
        </Row>
    )
}
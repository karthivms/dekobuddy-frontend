import { Row, Col } from "react-bootstrap";



export default function Topbar({ category, no_of_products }: { category: string, no_of_products : number }) {
    return (
        <div >
            <Row className="align-items-center">
                <Col><h3 className="font-h2 text-black font-sm-secondary line-normal">Showing {no_of_products} Products for {category}</h3></Col>
                <Col className="d-flex justify-content-end align-items-center ">
                    <select className="ms-2 p-2 br-5 border-theme1-solid bg-transparent text-theme1 fw-4 font-primary" >
                        <option value="">Sort by</option>
                        <option value="1">Price --Low to High</option>
                        <option value="2">Price --High to Low</option>
                        <option value="3">Newest First</option>
                    </select>
                </Col>
            </Row>
        </div>
    )
}
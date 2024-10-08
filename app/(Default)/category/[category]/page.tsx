import { Col, Container, Row } from "react-bootstrap";
import ProductGrid from "@/app/components/category/productListing";
import Topbar from "@/app/components/category/topbar";
import Filter from "@/app/components/category/filterbox";
import products from "@/app/datas/category/products.json";
import "@/app/sass/components/category.scss";

type Params = {
    category: string;
  };

export default function page({ params }: { params: Params }) {

    return (
        <>
            <Container fluid className="banner2">
                <Container className="d-flex h-100 align-items-center">
                    <h1 className="font-big font-sm-h1 text-theme3 fw-6">STYLE OF YOUR <br /> HOME</h1>
                </Container>
            </Container>
            <Container>
                <Row className="my-4">
                    <Col lg={3} >
                    <Filter/>
                    </Col>
                    <Col className="">
                        <Topbar category={params}/>
                        <ProductGrid products={products} grid={3}/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}



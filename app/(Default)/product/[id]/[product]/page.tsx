import ProductGallery from "@/app/components/singleproduct/productGallery";
import { Col, Container, Row } from "react-bootstrap";
import productData from "@/app/datas/singleproduct/productdetails.json";
import ProductData from "@/app/components/singleproduct/productData";
import Description from "@/app/components/singleproduct/description";
import Ratings from "@/app/components/singleproduct/ratings";
import SimilarProducts from "@/app/components/singleproduct/similarproducts";
import "@/app/sass/components/product.scss";
import GallerySlider from "@/app/components/singleproduct/gallerySlider";


export default function page() {
    return (
        <>
            <Container className="single_product_info">
                <Row className="my-5">
                    <Col lg={5} className="d-none d-md-none d-lg-block">
                        <ProductGallery />
                    </Col>
                    <Col lg={5} className="d-block d-md-block d-lg-none">
                        <GallerySlider/>
                    </Col>
                    <Col>
                        <ProductData data={productData} />
                    </Col>
                </Row>
            </Container>

            <Description />
            <Ratings/>
            <SimilarProducts/>
        </>

    )
}
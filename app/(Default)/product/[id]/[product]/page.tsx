import ProductGallery from "@/app/components/singleproduct/productGallery";
import { Col, Container, Row } from "react-bootstrap";
import ProductData from "@/app/components/singleproduct/productData";
import Description from "@/app/components/singleproduct/description";
import Ratings from "@/app/components/singleproduct/ratings";
import SimilarProducts from "@/app/components/singleproduct/similarproducts";
import "@/app/sass/components/product.scss";
import GallerySlider from "@/app/components/singleproduct/gallerySlider";
import { apiRequest } from "@/app/api/apiConfig";


interface params {
    id: number,

}


const getProduct = async (id: number) => {
    const response = await apiRequest('GET', `/api/productfilterlistview/?id=${id}`);
    return response.results[0];
}

async function getSimilarProducts(category: string) {
    const url = `/api/productfilterlistview/?categories__slug=${category}`;

    const response = await apiRequest('GET', url);

    return response.results;
}


export default async function page({ params }: { params: params }) {


    const { id } = params;
    
    const data = await getProduct(id);

    const simproducts = await getSimilarProducts(data.categories[0].slug)

    return (
        <>
            <Container className="single_product_info">
                <Row className="my-5">
                    <Col lg={5} className="d-none d-md-none d-lg-block">
                        <ProductGallery images={data.images}/>
                    </Col>
                    <Col lg={5} className="d-block d-md-block d-lg-none">
                        <GallerySlider />
                    </Col>
                    <Col>
                        <ProductData data={data} />
                    </Col>
                </Row>
            </Container>

            <Description data={data.description}/>
            <Ratings />
            <SimilarProducts data={simproducts}/>
        </>

    )
}
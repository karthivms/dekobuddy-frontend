import ProductGallery from "@/app/components/singleproduct/productGallery";
import { Col, Container, Row } from "react-bootstrap";
import ProductData from "@/app/components/singleproduct/productData";
import Description from "@/app/components/singleproduct/description";
import Ratings from "@/app/components/singleproduct/ratings";
import SimilarProducts from "@/app/components/singleproduct/similarproducts";
import "@/app/sass/components/product.scss";
import GallerySlider from "@/app/components/singleproduct/gallerySlider";
import { apiRequest } from "@/app/api/apiConfig";
import { getUser } from "@/app/utilis/auth";


interface params {
    id: number,

}


const getProduct = async (id: number) => {
    const response = await apiRequest('GET', `/products/?id=${id}`);
    return response.results[0];
}

async function getSimilarProducts(category: string) {
    const url = `/products/?category=${category}&limit=10&offset=10`;

    const response = await apiRequest('GET', url);

    return response.results;
}

async function getReviews(id: number) {
    const url = `/rating/`;
    const body = { product_id: id }
    const response = await apiRequest('GET', url, body);
    return response;
}


export default async function page({ params }: { params: params }) {


    const { id } = params;

    const data = await getProduct(id);

    const [simproducts, userData, reviews] = await Promise.all([getSimilarProducts(data.categories[0].slug), getUser(), getReviews(id)])

    let userid: string = "";

    if (userData) {
        userid = userData.user_id;
    }

    return (
        <>
            <Container className="single_product_info">
                <Row className="my-5">
                    <Col lg={5} className="d-none d-md-none d-lg-block">
                        <ProductGallery images={data.images} />
                    </Col>
                    <Col lg={5} className="d-block d-md-block d-lg-none">
                        <GallerySlider images={data.images} />
                    </Col>
                    <Col>
                        <ProductData data={data} userid={userid} />
                    </Col>
                </Row>
            </Container>

            <Description data={data.description} /> 
            <Ratings userid={Number(userid)} productid={id} reviews={reviews} average={data.average_rating} rat_count={data.rating_count} rev_count={data.review_count} />
            
            <SimilarProducts userid={userid} data={simproducts} />
        </>

    )
}
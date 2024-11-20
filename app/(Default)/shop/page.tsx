import { Col, Container, Row } from "react-bootstrap";
import ProductGrid from "@/app/components/category/productListing";
import Topbar from "@/app/components/category/topbar";
import Filter from "@/app/components/category/filterbox";
import "@/app/sass/components/category.scss";
import { apiRequest } from "@/app/api/apiConfig";
import { getUser } from "@/app/utilis/auth";
import Link from "next/link";

async function getCategories() {
    const url = `/parentcategory/`;
    const response = await apiRequest('GET', url);
    return response;
}


async function getAttributes() {
    const url = `/attribute/`;
    const response = await apiRequest('GET', url);
    return response;
}


export default async function page() {


    const categoriesPromise = getCategories();
    const attributesPromise = getAttributes()

    const [categories, attributes] = await Promise.all([categoriesPromise, attributesPromise]);


    const user = await getUser();

    let userid: string = "";

    if (user) {
        userid = user.user_id;
    }

    return (
        <>
            <Container fluid className="banner2">
                <Container className="d-flex h-100 align-items-center">
                    <h1 className="font-big font-sm-h1 text-theme3 fw-6">STYLE OF YOUR <br/>HOME</h1>
                </Container>
            </Container>
            <Container className="mt-3">
                <ul className="breadcrumbs">
                    <li className="d-inline font-primary  fw-4"><Link href="/" className="text-theme1">Home</Link></li>
                    <li className="d-inline text-black font-primary">Shop</li>
                </ul>
            </Container>
            <Container>
                <Row className="mt-3 mb-4">
                    <Col lg={3} >
                        <Filter categories={categories} attributes={attributes} />
                    </Col>
                    <Col className="">
                        <Topbar />
                        <ProductGrid  grid={3} userid={userid} category={''} subcategory="" />
                    </Col>
                </Row>
            </Container>
        </>
    )
}



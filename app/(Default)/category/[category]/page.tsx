import { Col, Container, Row } from "react-bootstrap";
import ProductGrid from "@/app/components/category/productListing";
import Topbar from "@/app/components/category/topbar";
import Filter from "@/app/components/category/filterbox";
import "@/app/sass/components/category.scss";
import { apiRequest } from "@/app/api/apiConfig";
import { navigationItem } from "@/app/types/types";
import { getUser } from "@/app/utilis/auth";
import Link from "next/link";


type Params = {
    category: string;
};


export async function generateStaticParams() {
    const categories = await getCategories();
    const staticParams = categories.map((item: navigationItem) => ({
        category: item.slug,
    }));
    return staticParams;
}

async function getCategories() {
    const url = `/parentcategory/`;
    const response = await apiRequest('GET', url);
    return response;
}


async function getSubCategories(category: string) {
    const url = `/subcategory/?category=${category}`;
    const response = await apiRequest('GET', url);
    return response;
}

async function getAttributes(category: string) {
    const url = `/attribute/?category=${category}`;
    const response = await apiRequest('GET', url);
    return response;
}


export default async function page({ params }: { params: Params }) {

    function deslugger(slug: string) {
        return slug
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }


    const SubcategoriesPromise = getSubCategories(params.category);
    const attributesPromise = getAttributes(params.category)

    const [subcategories, attributes] = await Promise.all([SubcategoriesPromise, attributesPromise]);

    const user = await getUser();

    let userid: string = "";

    if (user) {
        userid = user.user_id;
    }

    return (
        <>
            <Container fluid className="banner2">
                <Container className="d-flex h-100 align-items-center">
                    <h1 className="font-big font-sm-h1 text-theme3 fw-6">{deslugger(params.category)}</h1>
                </Container>
            </Container>
            <Container className="mt-3">
                <ul className="breadcrumbs">
                    <li className="d-inline font-primary  fw-4"><Link href="/" className="text-theme1">Home</Link></li>
                    <li className="d-inline text-black font-primary">{deslugger(params.category)}</li>
                </ul>
            </Container>
            <Container>
                <Row className="mt-3 mb-4">
                    <Col lg={3} >
                        <Filter categories={subcategories} attributes={attributes} />
                    </Col>
                    <Col className="">
                        <Topbar />
                        <ProductGrid grid={3} userid={userid} category={params.category} subcategory="" />
                    </Col>
                </Row>
            </Container>
        </>
    )
}



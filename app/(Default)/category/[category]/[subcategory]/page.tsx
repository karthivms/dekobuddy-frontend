import { Col, Container, Row } from "react-bootstrap";
import ProductGrid from "@/app/components/category/productListing";
import Topbar from "@/app/components/category/topbar";
import Filter from "@/app/components/category/filterbox";
import "@/app/sass/components/category.scss";
import { apiRequest } from "@/app/api/apiConfig";
import { categoryMenu } from "@/app/types/types";
import { getUser } from "@/app/utilis/auth";
import Link from "next/link";


type Params = {
    category: string;
    subcategory: string;
};


export async function generateStaticParams() {
    const categories = await apiRequest('GET', '/menus/');
    const params : Params[] = [];

    categories.forEach((category: categoryMenu) => {

        category.subcategories.forEach((subcategory: { slug: string }) => {
            params.push({
                category: category.slug,
                subcategory: subcategory.slug,
            });
        });
    });

    return params;
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
                    <h1 className="font-big font-sm-h1 text-theme3 fw-6">{deslugger(params.subcategory)}</h1>
                </Container>
            </Container>
            <Container className="mt-3">
                <ul className="breadcrumbs">
                    <li className="d-inline font-primary  fw-4"><Link href="/" className="text-theme1">Home</Link></li>
                    <li className="d-inline  font-primary fw-4">
                        <Link href={`/category/${params.category}`} className="text-theme1">{deslugger(params.category)}</Link>
                    </li>
                    <li className="d-inline text-black font-primary">{deslugger(params.subcategory)}</li>
                </ul>
            </Container>
            <Container>
                <Row className="mt-3 mb-4">
                    <Col lg={3} >
                        <Filter categories={subcategories} attributes={attributes} />
                    </Col>
                    <Col className="">
                        <Topbar />
                        <ProductGrid grid={3} userid={userid} category={params.category} subcategory={params.subcategory} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}



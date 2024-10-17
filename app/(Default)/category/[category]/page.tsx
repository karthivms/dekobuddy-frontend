import { Col, Container, Row } from "react-bootstrap";
import ProductGrid from "@/app/components/category/productListing";
import Topbar from "@/app/components/category/topbar";
import Filter from "@/app/components/category/filterbox";
import "@/app/sass/components/category.scss";
import { apiRequest } from "@/app/api/apiConfig";
import {  CategoryItem } from "@/app/types/types";
import { redirect } from "next/navigation";


type Params = {
    category: string;
};


export async function generateStaticParams() {
    const categories = await getCategories();
    return categories.map((item: CategoryItem) => ({
        category: item.slug,
    }));
}

 async function getCategories() {
    const url = `/api/parentcategory/`;
    const response = await apiRequest('GET', url);
    return response ;
}


 async function getProducts(category: string) {
    const url = `/api/productfilterlistview/?categories__slug=${category}`;
    const response = await apiRequest('GET', url);
    return response.results;
}

export default async function page({ params }: { params: Params }) {
    const { category } = params;
    const productsData = await getProducts(category);


    const categoriesData = await getCategories();

    const [products, categories] = await Promise.all([productsData, categoriesData]);

    if (products.length === 0) {
        return redirect("/404")
    }
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
                        <Filter categories={categories} />
                    </Col>
                    <Col className="">
                        <Topbar no_of_products={products.length} category={products[0]?.categories[0].name} />
                        <ProductGrid products={products} grid={3} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}



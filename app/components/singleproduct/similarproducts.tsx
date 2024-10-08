import products from '@/app/datas/category/products.json';
import ProductGrid from '../category/productListing';
import { Container } from 'react-bootstrap';



export default function SimilarProducts(){
    const similarproducts = products.slice(0,5)
    return(
        <Container className='mt-5 mb-4'>
            <h2 className="mt-3 text-uppercase font-h2 text-center text-theme1 fw-4 pb-2">Similar Products</h2>
            <ProductGrid products={similarproducts} grid={20}/>

        </Container>
    )
}
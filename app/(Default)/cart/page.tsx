

import { Container } from "react-bootstrap"
import CartTable from "@/app/components/cart/cartTable"
import "@/app/sass/components/cart.scss"

export default function page() {
    return (
        <Container className="py-4">
            <h1 className="mt-3 font-h1 font-sm-h2 text-theme1 fw-4 pb-2">Cart</h1>
            <CartTable/>
        </Container>
    )
}
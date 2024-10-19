

import { Container } from "react-bootstrap"
import CartTable from "@/app/components/cart/cartTable"
import "@/app/sass/components/cart.scss"
import { getUser } from "@/app/utilis/auth";

export default async function page() {

    let userid: string = "";

    const userData = await getUser();

    if (userData) {
        userid = userData.user_id;
    }

    return (
        <Container className="py-4">
            <CartTable userid={userid}/>
        </Container>
    )
}
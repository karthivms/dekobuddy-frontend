import { Container } from "react-bootstrap";
import Wishlist from "@/app/components/wishlist/list";
import ActionTab from "@/app/components/wishlist/actionTab";
import '@/app/sass/components/wishlist.scss'

export default function Page() {

    return (
        <Container>
            <h1 className="mt-5 font-h1  text-theme1 fw-4 pb-2">Wishlist</h1>
            <ActionTab/>
            <Wishlist />
        </Container>
    )
}
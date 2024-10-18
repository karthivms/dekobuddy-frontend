import { Container } from "react-bootstrap";
import Wishlist from "@/app/components/wishlist/list";
import '@/app/sass/components/wishlist.scss'
import { getUser } from "@/app/utilis/auth";

export default  async function Page() {

    let userid: string = "";

    const userData = await getUser()

    if (userData) {
        userid = userData.user_id
    }
    return (
        <Container>
            <Wishlist userid={userid}/>
        </Container>
    )
}
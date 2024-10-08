import { Container, Row } from "react-bootstrap";
import Grid1 from "./footer/grid1";
import Grid2 from "./footer/grid2";
import Grid3 from "./footer/grid3";
import BottomBar from "./footer/bottombar";
import '@/app/sass/components/footer.scss';


export default function Footer() {
    return (
        <footer className="bg-white ">
            <Container className="pt-5 pb-4">
                <Row className=" row-gap-30">
                   <Grid1/>
                   <Grid2/>
                   <Grid3/>
                </Row>
            </Container>
            <BottomBar/>
        </footer>
    )
}

import { Col } from "react-bootstrap";
import quicklinks from "@/app/datas/footer/quicklinks.json"
import services from "@/app/datas/footer/services.json" 
import Links from "./links";


export default function Grid2() {

    return (
        <Col xl={4} md={12} lg={4} className="d-grid row-gap-10 d-lg-flex justify-content-between quick_links px-xl-4 p-0">
           <Links links={quicklinks} id={"Quick Links"}/>
           <Links links={services} id={"Services"}/>
        </Col>
    )
}
import { Container } from "react-bootstrap";
import contact from "@/app/datas/header/contact.json";
import Phone from "../icons/phone";
import Envelope from "../icons/envelope";




export default function Topbar() {
    const getIcon = (type: string) => {
        return type === "email" ? <Phone /> : <Envelope/>
    };
    return (

        <Container fluid className="bg-theme1 py-1">
            <Container>
                <ul className="d-flex justify-content-end align-items-center gap-35 gap-sm-20 font-primary fw-3 p-0 m-0">
                    {contact.map((item) => (
                        <li key={item.type} className="text-white ">
                            <span className="font-h3">{getIcon(item.type)}</span>
                            <a
                                href={item.type === "email" ? `mailto:${item.data}` : `tel:${item.data}`}
                                className="ms-2 link2">
                                {item.data}
                            </a>
                        </li>
                    ))}

                </ul>
            </Container>
        </Container>
    )
}
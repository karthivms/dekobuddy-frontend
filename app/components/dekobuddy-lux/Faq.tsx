'uce client';
import { Accordion } from "react-bootstrap";


export default function Faq() {
    return (
        <>
            <Accordion defaultActiveKey="0">
                {[...Array(5)].map((item, index) => (
                    <Accordion.Item key={`faq_${index}`} eventKey={index.toString()} className="lux-faq">
                        {item}
                        <Accordion.Header >Lorem ipsum dolor sit amet consectetur Consequat</Accordion.Header>
                        <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat.
                        </Accordion.Body>
                    </Accordion.Item>
                ))}


            </Accordion>
        </>
    )
}
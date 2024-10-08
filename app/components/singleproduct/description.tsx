'use client'

import { Container } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


export default function Description() {
    return (
        <Container className='pt-3'>
            <Tabs
                defaultActiveKey="Description"
                className="description-tabs bb-border2-2"
            >
                <Tab eventKey="Description" title="Description" className='pt-5 ps-5 font-secondary line-relaxed'>
                    Lorem ipsum dolor sit amet consectetur. Consequat feugiat lacus nisi malesuada aliquet Lorem ipsum dolor sit amet consectetur. Consequat feugiat lacus nisi malesuada
                    alique Lorem ipsum dolor sit amet consectetur. Consequat feugiat lacus nisi malesuada aliquet Lorem ipsum dolor sit amet consectetur. Consequat feugiat lacus nisi
                    malesuada alique Lorem ipsum dolor sit amet consectetur. Consequat feugiat lacus nisi malesuada aliquet Lorem ipsum dolor sit amet consectetur. Consequat feugiat lacus
                    nisi malesuada alique Lorem ipsum dolor sit amet consectetur. Consequat feugiat lacus nisi malesuada aliquet Lorem ipsum dolor sit amet consectetur. Consequat feugiat
                    lacus nisi malesuada alique Lorem ipsum dolor sit amet consectetur. Consequat feugiat lacus nisi malesuada aliquet Lorem ipsum dolor sit amet consectetur. Consequat
                    feugiat lacus nisi malesuada alique
                </Tab>
                <Tab eventKey="Information" title="Information" className='pt-5 ps-5 font-secondary line-relaxed'>
                    Tab content for Information
                </Tab>
            </Tabs>
        </Container>
    )
}





'use client'

import { Container } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


export default function Description({data}:{data:string}) {
    return (
        <Container className='pt-3'>
            <Tabs
                defaultActiveKey="Description"
                className="description-tabs bb-border2-2"
            >
                <Tab eventKey="Description" title="Description" className='pt-5 ps-5 font-secondary line-relaxed'>
                <div className=" font-primary des_list fw-3" dangerouslySetInnerHTML={{__html : data}}></div>

                </Tab>
                {/* <Tab eventKey="Information" title="Information" className='pt-5 ps-5 font-secondary line-relaxed'>
                    Tab content for Information
                </Tab> */}
            </Tabs>
        </Container>
    )
}





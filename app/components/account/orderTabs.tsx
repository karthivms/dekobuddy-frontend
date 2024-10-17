'use client'


import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import OrderSummary from './orderSummary';
import products from "@/app/datas/category/products.json";




export default function OrderTabs() {

    const moreproducts = products.slice(0, 2)
    const singleproduct = products.slice(0, 1)


    return (
        <div >
            <h1 className='font-h3 fw-4 text-theme1'>My Orders</h1>
            <Tabs
                defaultActiveKey="All"
                className="order-tabs mt-4"
            >
                <Tab eventKey="All" title="All" >
                    <OrderSummary orderproducts={moreproducts} status={`Delivery by Wed, Oct 2`} />
                    <OrderSummary orderproducts={singleproduct} status={`Delivered`} />
                    <OrderSummary orderproducts={singleproduct} status={`Cancelled`} />
                </Tab>
                <Tab eventKey="Delivered" title="Delivered" >
                    <OrderSummary orderproducts={singleproduct} status={`Delivered`} />

                </Tab>
                <Tab eventKey="On Process" title="On Process" >
                    <OrderSummary orderproducts={moreproducts} status={`Delivery by Wed, Oct 2`} />

                </Tab>
                <Tab eventKey="Cancelled" title="Cancelled" >
                    <OrderSummary orderproducts={singleproduct} status={`Cancelled`} />

                </Tab>
            </Tabs>
        </div>
    )
}





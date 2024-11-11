'use client'


import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import OrderSummary from './orderSummary';
import { order } from '@/app/types/types';




export default function OrderTabs({ All, Delivered, Processing, Cancelled }: { All: order[], Delivered: order[], Processing: order[], Cancelled: order[] }) {

    const ordertabs = [
        {
            id: 1,
            order: "All",
            data: All
        },
        {
            id: 2,
            order: "Delivered",
            data: Delivered

        },
        {
            id: 3,
            order: "Processing",
            data: Processing

        },
        {
            id: 4,
            order: "Cancelled",
            data: Cancelled
        }
    ]
    return (
        <div >
            <h1 className='font-h3 fw-4 text-theme1'>My Orders</h1>
            <Tabs
                defaultActiveKey="All"
                className="order-tabs mt-4"
            >
                {ordertabs.map((tabitem, index) => (
                    <Tab eventKey={tabitem.order} key={`tab_item_${index}`} title={tabitem.order} >
                        {tabitem.data.length > 0 ? (<>
                            {tabitem.data.map((item: order) => (
                                <div key={`order_${item.id}`}>
                                    <OrderSummary orderproducts={item} status={item.order_status} />
                                </div>
                            ))}
                        </>) : (
                            <p className='my-5 text-center text-theme1 fw-4'>No Orders Found</p>
                        )}


                    </Tab>
                ))}


            </Tabs>
        </div>
    )
}





import { replacementDates } from "@/app/types/types";
import Tick from "../icons/tick";

interface orderstatus {
    status: string, date: string | undefined | null
}


export default function ProgressBar({ order_date, replacement_date, replacement_status, currentstatus, shipped_date, cancel_date, deliver_date }: { order_date: string, replacement_date: replacementDates, replacement_status: string, currentstatus: string, shipped_date: string | undefined, cancel_date: string | undefined, deliver_date: string | undefined }) {

    const orderstatus = [
        { status: 'processing', date: order_date },
        { status: 'Shipped', date: shipped_date },
        { status: 'Delivered', date: deliver_date },

    ];


    const cancelstatus = [
        { status: 'Ordered', date: order_date },
        { status: 'Cancelled', date: cancel_date }];


    const replacementStatus = [
        { status: 'processing', date: replacement_date?.approved_date },
        { status: 'Approved', date: replacement_date?.approved_date },
        { status: 'Delivered', date: replacement_date?.delivered_date },
    ];


    const replacecancelstatus = [
        { status: 'processing', date: replacement_date?.approved_date },
        { status: 'Cancelled', date: replacement_date?.canceled_date }];

    const setWidth = (status: string) => {
        switch (status) {
            case 'processing':
                return 'wc-0';
            case 'Shipped':
                return 'wc-50';
            case 'Delivered':
                return 'wc-100';
        }
    }


    const setReplaceWidth = (status: string) => {
        switch (status) {
            case 'processing':
                return 'wc-0';
            case 'Approved':
                return 'wc-50';
            case 'Delivered':
                return 'wc-100';
        }
    }

    const getIndex = () => {
        if (currentstatus === 'Confirmed') {
            return 0
        } else {
            const index = orderstatus.findIndex((item) => item.status === currentstatus)
            return index
        }

    }


    const getreplaceIndex = () => {
        if (replacement_status === 'Processing') {
            return 0
        } else {
            const index = replacementStatus.findIndex((item) => item.status === replacement_status)
            return index
        }
    }




    function getDate(date: Date) {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
        });
    }


    return (
        <div className="my-4 largeProgress">
            {currentstatus === 'Cancelled' && (
                <div className="shipmentTracking mt-4">
                    {cancelstatus.map((item: orderstatus, index) => (
                        <div key={`status_${index}`} className={`statusBar activestatus`}>
                            <div className="text-white d-flex justify-content-center align-items-center statusCheck">
                                <Tick color="white" />
                            </div>
                            <div>
                                <h6 className="mt-3 mb-0 text-capitalize">{item.status}</h6>
                                {item.date && (<span className="font-primary fw-3 text-secondary">
                                    {getDate(new Date(item.date))}
                                </span>)}
                            </div>                        </div>
                    ))}
                    <div className="progress-line wc-90 br-20 m-auto h-8">
                        <div className={' progress-line-fill w-100'}></div>
                    </div>
                </div>
            )}

            {currentstatus === 'Delivered' && (
                <div className="shipmentTracking mt-4">
                    {orderstatus.map((item: orderstatus, index) => (
                        <div key={`status_${index}`} className={`statusBar text-center ${getIndex() >= index && ('activestatus')}`} >
                            <div className="text-white d-flex justify-content-center align-items-center statusCheck">
                                {getIndex() >= index && (<Tick color="white" />)}
                            </div>
                            <div>
                                <h6 className="mt-3 mb-0 text-capitalize">{item.status}</h6>
                                {item.date && (<span className="font-primary fw-3 text-secondary">
                                    {getDate(new Date(item.date))}
                                </span>)}
                            </div>
                        </div>
                    ))}
                    <div className="progress-line wc-90 br-20 m-auto h-8">
                        <div className={`progress-line-fill ${setWidth(currentstatus)}`}></div>
                    </div>
                </div>
            )}


            {currentstatus === 'Replacement' && (
                <>

                    {replacement_status === 'Processing' && (<p className="font-large  text-theme1 fw-3 mb-3  text-center mb-5">Your replacement request is being processed. Please check back later for updates.</p>
                    )}

                    {replacement_status === 'Approved' && (<p className="font-large  text-theme1 fw-3  text-center mb-5">Your replacement request has been approved, you will get the product shortly</p>
                    )}

                    {replacement_status === 'Delivered' && (<p className="font-large  text-success fw-3  text-center mb-5">Your replacement has been delivered. Thank you for your patience.</p>
                    )}

                    {replacement_status === 'Canceled' && (<p className="font-large text-danger fw-3 text-center mb-5">Your replacement request has been canceled.</p>
                    )}
                    {replacement_status === 'Canceled' ? (<div className="shipmentTracking mt-4">
                        {replacecancelstatus.map((item: orderstatus, index) => (
                            <div key={`status_${index}`} className={`statusBar text-center activestatus`} >
                                <div className="text-white d-flex justify-content-center align-items-center statusCheck">
                                    <Tick color="white" />
                                </div>
                                <div>
                                    <h6 className="mt-3 mb-0 text-capitalize">{item.status}</h6>
                                    {item.date && (<span className="font-primary fw-3 text-secondary">
                                        {getDate(new Date(item.date))}
                                    </span>)}
                                </div>
                            </div>
                        ))}
                        <div className="progress-line wc-90 br-20 m-auto h-8">
                            <div className={' progress-line-fill w-100'}></div>
                        </div>
                    </div>) : (<div className="shipmentTracking mt-4">
                        {replacementStatus.map((item: orderstatus, index) => (
                            <div key={`status_${index}`} className={`statusBar text-center ${getreplaceIndex() >= index && ('activestatus')}`} >
                                <div className="text-white d-flex justify-content-center align-items-center statusCheck">
                                    {getreplaceIndex() >= index && (<Tick color="white" />)}
                                </div>
                                <div>
                                    <h6 className="mt-3 mb-0 text-capitalize">{item.status}</h6>
                                    {item.date && (<span className="font-primary fw-3 text-secondary">
                                        {getDate(new Date(item.date))}
                                    </span>)}
                                </div>
                            </div>
                        ))}

                        <div className="progress-line wc-90 br-20 m-auto h-8">
                            <div className={`progress-line-fill ${setReplaceWidth(replacement_status)}`}></div>
                        </div>
                    </div>)}



                </>
            )}

        </div>
    )
}
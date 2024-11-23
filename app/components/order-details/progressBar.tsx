import Tick from "../icons/tick";

interface orderstatus {
    status: string, date: string | undefined
}


export default function ProgressBar({ order_date, currentstatus,  shipped_date, cancel_date, deliver_date }: { order_date: string, currentstatus: string, shipped_date: string | undefined, cancel_date : string | undefined, deliver_date : string | undefined }) {

    const orderstatus = [
        { status: 'processing', date: order_date },
        { status: 'Shipped', date: shipped_date },
        { status: 'Delivered', date: deliver_date },

    ];

    
    const cancelstatus = [
        { status: 'Ordered', date: order_date },
        { status: 'Cancelled', date: cancel_date }];


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

    const getIndex = () => {
        if(currentstatus === 'Confirmed'){
            return 0
        }else{
            const index = orderstatus.findIndex((item) => item.status === currentstatus)
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
            {currentstatus === 'Cancelled' ? (
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
            ) : (
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

        </div>
    )
}
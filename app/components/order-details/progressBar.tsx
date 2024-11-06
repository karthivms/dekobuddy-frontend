import Tick from "../icons/tick";



export default function ProgressBar({ currentstatus }: { currentstatus: string }) {

    const orderstatus = ['Processing', 'Confirmed', 'Shipped', 'Delivered'];
    const cancelstatus = ['Ordered',  'Cancelled'];


    
    
    const setWidth = (status: string) => {
        switch (status) {
            case 'Processing':
                return 'wc-0';
            case 'Confirmed':
                return 'wc-33';
            case 'Shipped':
                return 'wc-66';
            case 'Delivered':
                return 'wc-100';
        }
    }

    return (
        <div className="my-3">
            {currentstatus === 'Cancelled' ? (
                <div className="shipmentTracking mt-4">
                    {cancelstatus.map((item: string, index) => (
                        <div key={`status_${index}`} className={`statusBar activestatus`}>
                            <div className="text-white d-flex justify-content-center align-items-center">
                           <Tick color="white" />
                            </div>
                            <h6 className="mt-3 text-capitalize">{item}</h6>
                        </div>
                    ))}
                    <div className="progress-line wc-90 br-20 m-auto h-8">
                        <div className={'w-100'}></div>
                    </div>
                </div>
            ):(
                <div className="shipmentTracking mt-4">
                {orderstatus.map((item: string, index) => (
                    <div key={`status_${index}`} className={`statusBar ${orderstatus.indexOf(currentstatus) >= index && ('activestatus') }`}>
                        <div className="text-white d-flex justify-content-center align-items-center">
                            {orderstatus.indexOf(currentstatus) >= index && (<Tick color="white" />)}
                        </div>
                        <h6 className="mt-3 text-capitalize">{item}</h6>
                    </div>
                ))}
                <div className="progress-line wc-90 br-20 m-auto h-8">
                    <div className={setWidth(currentstatus)}></div>
                </div>
            </div>
            )}

        </div>
    )
}
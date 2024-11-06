import { apiRequest } from "@/app/api/apiConfig";
import OrderTabs from "@/app/components/account/orderTabs";
import { getUser } from "@/app/utilis/auth";


export async function getorders(userid:string) {
    const response = await apiRequest('GET', '/order/', null, {user_id : userid});
    return response;
}

export async function getDeliveredorders(userid:string) {
    const response = await apiRequest('GET', '/order/', null, {user_id : userid, order_status : 'Delivered'});
    return response;
}

export async function getProcessingorders(userid:string) {
    const response = await apiRequest('GET', '/order/', null, {user_id : userid, order_status : 'Processing'});
    return response;
}

export async function getCancelledorders(userid:string) {
    const response = await apiRequest('GET', '/order/', null, {user_id : userid, order_status : 'Cancelled'});
    return response;
}

export default async function page() {

    let userid: string = "";

    const userData = await getUser();

    if (userData) {
        userid = userData.user_id;
    }


    const [orders, Delivered, Processing, Cancelled] = await Promise.all([getorders(userid), getDeliveredorders(userid), getProcessingorders(userid), getCancelledorders(userid)])
    return (
        <>
            <OrderTabs All={orders} Delivered={Delivered} Processing={Processing} Cancelled={Cancelled}/>
        </>
    )
}
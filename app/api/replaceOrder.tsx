'use server'

import { apiRequest } from "./apiConfig";

interface reason {
    user_id: number,
    reason: string,
    comment: string
}

export async function Replace(orderid: string, data: reason) {
    console.log(data)
    console.log(orderid)

    const response = await apiRequest('POST', `/orders/${orderid}/replace_order/`, data);
    return response;
}
'use server'

import { apiRequest } from "./apiConfig";

interface reason {
    user_id: number,
    reason: string,
    comment: string
}

export async function cancelOrder(orderid: string, data: reason) {
    console.log(data)
    const response = await apiRequest('POST', `/order/${orderid}/cancel/`, data);
    console.log(response)
    return response;
}
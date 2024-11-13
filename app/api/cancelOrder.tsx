'use server'

import { apiRequest } from "./apiConfig";

interface reason {
   reason : string,
   comment : string
}

export async function cancelOrder(orderid : string, data : reason){

    const response = await apiRequest('POST', `/orders/${orderid}/cancel/`, data);
    return response;
}
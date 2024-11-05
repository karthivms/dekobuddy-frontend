'use server'

import { apiRequest } from "./apiConfig";

interface reviewBody {
    rating : number,
    review : string,
    product_id : number,
    user_id : number
}


export default async function rateProduct(data:reviewBody) {
    const response = await apiRequest('POST', '/ratingvalue', data);
    return response;
}
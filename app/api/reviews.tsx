'use server'

import { apiRequest } from "./apiConfig";


export const getReviews = async (id: Number) => {

    const url = `/rating/`;
    const body = { product_id: id }
    const response = await apiRequest('GET', url, body);
    if (response.error) {
        return response.error;
    } else {
        return response;
    }


}

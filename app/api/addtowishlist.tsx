'use server'

import { apiRequest } from "./apiConfig";

interface response {
    access: string
    error: string
}

export const addToWishlist = async (id: number) => {

    const response: response = await apiRequest('POST', `wishlist/add/${id}/`);
    return response;

}



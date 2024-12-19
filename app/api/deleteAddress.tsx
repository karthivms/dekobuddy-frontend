'use server';

import { apiRequest } from "./apiConfig";

export async function DeleteAddress(id: number) {
    const response = await apiRequest('DELETE', `/addresses/${id}/`);
    return response;
}
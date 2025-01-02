'use server'

import { apiRequest } from "./apiConfig";


export async function Reasons() {

    const response = await apiRequest('GET', '/replace-reason');
    return response;
}


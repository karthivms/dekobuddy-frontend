'use server'

import { apiRequest } from "./apiConfig"

export const searchItem = async (search : string) => {
    const response = await apiRequest('GET', `/search/suggest/?query=${search}`)
    return response;
}
'use server'


interface body {
    name: string,
    email: string,
    phone: string,
    message: string
}

import { apiRequest } from "./apiConfig"

export const Enquire = async (body: body) => {
    const response = await apiRequest('POST', `/contact/`, body)
    return response;
}
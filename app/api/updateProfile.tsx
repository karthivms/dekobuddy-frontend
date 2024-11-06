'use server'

import { apiRequest } from "./apiConfig";

interface userData {
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    old_password?: string,
    new_password? : string,
}

export async function updateProfile(userid : string, data : userData){

    const payload : userData = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
    };

    if (data.old_password && data.new_password) {
        payload.old_password = data.old_password;
        payload.new_password = data.new_password;
    }
    const response = await apiRequest('PUT', `/profile/${userid}/`, payload);
    return response;
}
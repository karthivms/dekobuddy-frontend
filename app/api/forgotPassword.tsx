'use server'

import { apiRequest } from "./apiConfig";

interface response {
    message : string,
    error: string
}

interface data {
    email: string
}

interface data2{
    new_password : string
}


export default async function ForgotPasswordApi(data: data | data2) {
    const response: response = await apiRequest('POST', '/forgot-password/', data);
    console.log(response);

    if (response.message) {
        return {message : "Password reset link has been sent to your email.", status : 200}
    } else {
        return {message : response.error, status : 400};
    }
}
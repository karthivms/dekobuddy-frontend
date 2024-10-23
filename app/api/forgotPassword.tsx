'use server'

import { apiRequest } from "./apiConfig";

interface response {
    message : string,
    email: string[]
}

interface data {
    email: string
}

interface data2{
    password : string,
    confirm_password : string
}


export default async function ForgotPasswordApi(data: data | data2) {
    const response: response = await apiRequest('POST', '/forgot-password/', data);

    if (response.message) {
        return {message : "Password reset link has been sent to your email.", status : 200}
    } else {
        return {message : response.email[0], status : 400};
    }
}
'use server'

import { redirect } from "next/navigation";
import { apiRequest } from "./apiConfig";
import { cookies } from "next/headers";

interface response {
    access: string
    error: string
}


interface otpdata {
    email: string,
    status: boolean
}

export const verifyOtp = async (data: otpdata) => {

    const response: response = await apiRequest('POST', '/register/', data);
    if (response.error) {
        return response;
    } else {
        const encryptedSessionData = response.access;
        cookies().set('_acdkb', encryptedSessionData, {
            httpOnly: true,
            secure: false,
            // maxAge: 60 * 60 * 24 * 7,
            path: '/',
        })
        redirect('/')
    }


}

'use server'
import { redirect } from 'next/navigation';


import { cookies } from "next/headers";
import { User } from "../types/types";
import { apiRequest } from "./apiConfig";

interface response {
    access: string
    error: string
}

export const RegisterUser = async (data: User) => {

    const response: response = await apiRequest('POST', 'api/register/', data);
    console.log(response)
    if (response.access) {
        const encryptedSessionData = response.access;
        cookies().set('_acdkb', encryptedSessionData, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
        })
        redirect('/')

    } else {
        return response.error;
    }


}

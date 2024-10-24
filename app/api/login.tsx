'use server'
import { redirect	 } from 'next/navigation';


import { cookies } from "next/headers";
import { User } from "../types/types";
import { apiRequest } from "./apiConfig";

interface response {
    access: string
    error: string
}

export const LoginUser = async (data: User) => {

    const response: response = await apiRequest('POST', '/login/', data);

    if (!response.error) {
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



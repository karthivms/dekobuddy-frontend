'use server'
import { redirect } from 'next/navigation';


import { cookies } from "next/headers";
import { User } from "../types/types";
import { apiRequest } from "./apiConfig";

interface response {
    access: string
    error: string
}

interface cartbody {
    variation_id: number,
    quantity: number
}

interface logindata extends User {
    cart_item?: cartbody[],
    wishlist_item?: string[]
}

export const LoginUser = async (data: logindata) => {
    console.log(data)

    const response: response = await apiRequest('POST', '/login/', data);

    if (!response.error) {
        const encryptedSessionData = response.access;
        cookies().set('_acdkb', encryptedSessionData, {
            httpOnly: true,
            secure: false,
            // maxAge: 60 * 60 * 24 * 7,
            path: '/',
        })
        redirect('/')
    } else {
        return response.error;
    }


}



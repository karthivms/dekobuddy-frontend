'use server'

import { User } from "../types/types";
import { apiRequest } from "./apiConfig";

interface response {
    access: string
    error: string
    otp : string
}

interface body extends User{
    email: string
}

export const RegisterUser = async (data: body) => {
    const body = {
        username: data.username,
        email: data.email,
        password: data.password
    }

    console.log(`fromregister : ${JSON.stringify(body)}`)
    const response: response = await apiRequest('POST', '/register/', body);
    console.log(`fromregister : ${JSON.stringify(response)}`)
    if (response.error) {
        return {error : response.error};
    } else {
        return {otp : response.otp};
    }


}

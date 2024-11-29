'use server'

import { User } from "../types/types";
import { apiRequest } from "./apiConfig";

interface response {
    access: string
    error: string
}


interface otpdata{
    email : string,
    otp? : string
}

export const verifyOtp = async (data: User | otpdata) => {

    const response: response = await apiRequest('POST', '/register/', data);
    console.log(data)
    console.log(response)
    if (response.error) {
        return response.error;
    } else {
        return 'successfully registered';
    }


}

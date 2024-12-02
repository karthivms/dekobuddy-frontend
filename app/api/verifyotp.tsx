'use server'

import { apiRequest } from "./apiConfig";

interface response {
    access: string
    error: string
}


interface otpdata{
    email : string,
    otp : string
}

export const verifyOtp = async (data: otpdata) => {

    const response: response = await apiRequest('POST', '/register/', data);
    console.log(`fromverify : ${JSON.stringify(data)}`)
    console.log(`fromverify : ${JSON.stringify(response)}`)
    if (response.error) {
        return response.error;
    } else {
        return 'verified successfully';
    }


}

'use server'

import { apiRequest } from "./apiConfig";



interface otpdata{
    email : string,
}

export const resendOtp = async (data: otpdata) => {

    const response = await apiRequest('POST', '/resend/', data);

    if (response.error) {
        return response.error;
    } else {
        return 'successfully registered';
    }


}

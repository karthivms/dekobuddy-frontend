'use server'

import { User } from "../types/types";
import { apiRequest } from "./apiConfig";

interface response {
    access: string
    error: string
}

export const RegisterUser = async (data: User) => {

    const response: response = await apiRequest('POST', '/register/', data);
    if (response.error) {
        return response.error;
    } else {
        return 'successfully registered';
    }


}

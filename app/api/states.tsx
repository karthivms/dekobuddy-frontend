'use server'

import { apiRequest } from "./apiConfig";

export async function GetState(){
    const body = {
        country: 'India'
    }

    const response = await apiRequest('POST', `https://countriesnow.space/api/v0.1/countries/states`, body);
    return response;
}


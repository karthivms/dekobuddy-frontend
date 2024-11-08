'use server'

import { apiRequest } from "./apiConfig";

interface country{
    name:string,
}

export async function GetCountries() {

    const response = await apiRequest('GET', `https://countriesnow.space/api/v0.1/countries/states`);
    const data = response.data.map((item:country) => (
        {
            name: item.name,
        }
    ))
    return data;
}


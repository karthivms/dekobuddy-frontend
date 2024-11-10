'use server';

import { apiRequest } from "./apiConfig";

 interface propsdata {
    first_name: string,
    mobileNumber: string,
    email : string,
    pincode: string,
    country: string,
    address: string,
    city: string,
    state: string,
    landmark: string,
    alternatePhone: string,
    user : number
}


 interface bodydata {
    first_name: string,
    address_1: string,
    email : string,
    city: string,
    postcode: string,
    Country_Region: string,
    state_country: string,
    phone: string,
    user: number,
    alternative_phone? : string,
    landmark? : string
}

export async function AddAddress(data: propsdata) {

    const body : bodydata= {
        first_name: data.first_name,
        address_1: data.address,
        email : data.email,
        city: data.city,
        postcode: data.pincode,
        Country_Region: data.country,
        state_country: data.state,
        phone: data.mobileNumber,
        user: data.user
    }

    if(data.landmark !== "" && data.alternatePhone !== ""){
        body.landmark = data.landmark;
        body.alternative_phone = data.alternatePhone;
    }

    const response = await apiRequest('POST', `/address/${data.user}/`, body);
    return response
}
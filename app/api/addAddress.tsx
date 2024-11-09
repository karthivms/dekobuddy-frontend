'use server';

import { apiRequest } from "./apiConfig";

 interface propsdata {
    name: string,
    mobileNumber: string,
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
    name: string,
    address_1: string,
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
        name: data.name,
        address_1: data.address,
        city: data.city,
        postcode: data.pincode,
        Country_Region: data.country,
        state_country: data.state,
        phone: data.mobileNumber,
        user: data.user
    }

    if(data.landmark !== "" && data.alternatePhone !== ""){
        body.landmark = data.landmark;
        body.alternative_phone = data.alternatePhone
    }

    const response = await apiRequest('POST', `http://ec2-13-201-230-68.ap-south-1.compute.amazonaws.com:8002/addresses/${data.user}/`, body);
    return response
}
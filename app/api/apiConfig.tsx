import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const username = process.env.API_USERNAME;
const password = process.env.API_PASSWORD;



const basicAuth = 'Basic ' + btoa(`${username}:${password}`);

const instance = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': basicAuth
    }
});


export const apiRequest = async < D = unknown, P = unknown>(
    method: 'GET' | 'PUT' | 'POST' | 'PATCH' | 'DELETE',
    url: string,
    data?: D | null,
    params?: P | null

) => {
    try {
        const response = await instance({ method, url, data, params })
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return(error.response?.data);
        }
    }
} 
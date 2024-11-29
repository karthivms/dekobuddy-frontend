import { NextResponse } from 'next/server';
import { apiRequest } from '../apiConfig';

export async function GET(request: Request) {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const username = process.env.API_USERNAME;
    const password = process.env.API_PASSWORD;
    const basicAuth = 'Basic ' + btoa(username + ':' + password);

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    try {
        const body = {
            product_id: id
        }

        const url = `/rating/`;
        const data = await apiRequest('GET', url, body)


        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

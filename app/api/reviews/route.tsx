import { NextResponse } from 'next/server';
import { apiRequest } from '../apiConfig';

export async function GET(request: Request) {


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

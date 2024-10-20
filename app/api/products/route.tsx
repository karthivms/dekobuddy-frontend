import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const username = process.env.API_USERNAME;
    const password = process.env.API_PASSWORD;
    const basicAuth = 'Basic ' + btoa(username + ':' + password);

    try {
        const res = await fetch(`${baseUrl}/api/products/`, {
            headers: {
                'Authorization': basicAuth,
            },
            cache: 'no-cache'
        });

        if (!res.ok) {
            const errorData = await res.json();
            return NextResponse.json({ error: errorData }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json({ data }, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

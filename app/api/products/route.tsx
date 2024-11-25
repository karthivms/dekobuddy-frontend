import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const username = process.env.API_USERNAME;
    const password = process.env.API_PASSWORD;
    const basicAuth = 'Basic ' + btoa(username + ':' + password);

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = searchParams.get('limit');
    const offset = searchParams.get('offset');
    const size = searchParams.get('size');
    const sort_by = searchParams.get('sort_by');
    const min_price = searchParams.get('min_price');
    const max_price = searchParams.get('max_price');
    const subcategories__slug = searchParams.get('subcategories__slug');
    const bestsellers = searchParams.get('bestsellers');



    try {
        let url = '';
        if (Number(min_price) !== 0 && Number(max_price) !== 0) {
            url = `${baseUrl}/products/?category=${category}&subcategories__slug=${subcategories__slug}&limit=${limit}&offset=${offset}&size=${size}&sort_by=${sort_by}&min_price=${min_price}&max_price=${max_price}&bestsellers=${bestsellers}`;
        } else {
            url = `${baseUrl}/products/?category=${category}&subcategories__slug=${subcategories__slug}&limit=${limit}&offset=${offset}&size=${size}&sort_by=${sort_by}&bestsellers=${bestsellers}`;
        }


        const res = await fetch(url, {
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
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

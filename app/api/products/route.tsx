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
    const min_price = Number(searchParams.get('min_price'));
    const max_price = Number(searchParams.get('max_price'));
    const subcategories__slug = searchParams.get('subcategories__slug');
    const bestsellers = searchParams.get('bestsellers');

    try {
        const params = new URLSearchParams();
        if (category) params.append('category', category);
        if (subcategories__slug) params.append('subcategories__slug', subcategories__slug);
        if (limit) params.append('limit', limit);
        if (offset) params.append('offset', offset);
        if (size) params.append('size', size);
        if (sort_by) params.append('sort_by', sort_by);
      
        if (bestsellers) params.append('bestsellers', bestsellers);


        if (min_price !== 0 || max_price !== 0) {
            if (min_price) params.append('min_price', String(min_price));
            if (max_price) params.append('max_price', String(max_price));
        }

        const url = `${baseUrl}/products/?${params.toString()}`;

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

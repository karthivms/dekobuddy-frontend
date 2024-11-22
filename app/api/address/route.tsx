
export async function GET(request: Request) {
    const username = process.env.API_USERNAME;
    const password = process.env.API_PASSWORD;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const basicAuth = 'Basic ' + btoa(username + ':' + password);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    try {
       
        const res = await fetch( `${baseUrl}/address/${id}/`, {
            method: 'GET',
            headers: {
                'Authorization': basicAuth,
            },
            cache: 'no-store'
        });


        if (!res.ok) {
            const errorData = await res.json();
            return new Response(JSON.stringify({ error: errorData }), { status: res.status });
        }

        const data = await res.json();
        return new Response(JSON.stringify({ data }), { status: 200 });
    } catch (error) {
        console.error('Error fetching Address:', error);
        return new Response(JSON.stringify({ error: 'An error occurred' }), { status: 500 });
    }
}

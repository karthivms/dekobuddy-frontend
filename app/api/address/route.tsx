
export async function GET(request: Request) {
    const username = process.env.API_USERNAME;
    const password = process.env.API_PASSWORD;
    const basicAuth = 'Basic ' + btoa(username + ':' + password);

    try {
       
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');


        const res = await fetch( `http://ec2-13-201-230-68.ap-south-1.compute.amazonaws.com:8002/addresses/${id}/`, {
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
    } catch (error: any) {
        console.error('Error fetching Address:', error);
        return new Response(JSON.stringify({ error: 'An error occurred' }), { status: 500 });
    }
}


export async function POST(request: Request) {
    const username = process.env.API_USERNAME;
    const password = process.env.API_PASSWORD;
    const basicAuth = 'Basic ' + btoa(username + ':' + password);
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    try {

        const body = await request.json();
  

        const res = await fetch(`${baseUrl}/apply-coupon/`, {
            method: 'POST',
            headers: {
                'Authorization': basicAuth,
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(body),
            cache: 'no-store'
        });


        if (!res.ok) {
            const errorData = await res.json();
            console.log(errorData)

            return new Response(JSON.stringify({ error: errorData }), { status: res.status });
        }

        const data = await res.json();
        console.log(data)
        return new Response(JSON.stringify({ data }), { status: 200 });
    } catch (error) {
        console.error('Error Adding Coupon:', error);
        return new Response(JSON.stringify({ error: 'An error occurred' }), { status: 500 });
    }
}

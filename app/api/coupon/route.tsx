
export async function POST(request: Request) {
    const username = process.env.API_USERNAME;
    const password = process.env.API_PASSWORD;
    const basicAuth = 'Basic ' + btoa(username + ':' + password);

    try {

        const body = await request.json();

        const res = await fetch(`http://ec2-13-201-230-68.ap-south-1.compute.amazonaws.com:8002/apply-coupon/`, {
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
        console.error('Error fetching Address:', error);
        return new Response(JSON.stringify({ error: 'An error occurred' }), { status: 500 });
    }
}

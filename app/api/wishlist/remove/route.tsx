
export async function DELETE(request: Request) {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const username = process.env.API_USERNAME;
    const password = process.env.API_PASSWORD;
    const basicAuth = 'Basic ' + btoa(username + ':' + password);

    try {
        const body = await request.json();

        const bodyData = {
            user_id: body.user_id
        }


        const res = await fetch(`${baseUrl}/remove-wishlist-item/${body.wishlist_id}/`, {
            method: 'DELETE',
            headers: {
                'Authorization' : basicAuth,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyData),
            cache: 'no-store'
        });

        if (!res.ok) {
            const errorData = await res.json();
            return new Response(JSON.stringify({ error: errorData }), { status: res.status });
        }

        const data = await res.json();
        return new Response(JSON.stringify({ data }), { status: 200 });
    } catch (error) {
        console.error('Error removing product:', error);
        return new Response(JSON.stringify({ error: 'An error occurred' }), { status: 500 });
    }
}

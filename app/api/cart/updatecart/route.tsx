
export async function PUT(request: Request) {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    try {
        const body = await request.json();

        const bodyData = {
            cart_item_id:body.cart_id,
            quantity: body.quantity,
            user_id: body.user_id
        }

        console.log(bodyData)

        const res = await fetch(`${baseUrl}/update_quantity/`, {
            method: 'PUT',
            headers: {
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
        console.error('Error fetching products:', error);
        return new Response(JSON.stringify({ error: 'An error occurred' }), { status: 500 });
    }
}

    import { cartdata } from "@/app/types/types";

    export async function POST(request: Request) {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

        try {
            const body: cartdata = await request.json();
            console.log(body)
            const res = await fetch(`${baseUrl}/cart/add-to-cart/${body.productid}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body.data),
                next: {
                    revalidate: 3600
                }
            });

            if (!res.ok) {
                const errorData = await res.json();
                return new Response(JSON.stringify({ error: errorData }), { status: res.status });
            }

            const data = await res.json();
            return new Response(JSON.stringify({ data }), { status: 200 });
        } catch (error: any) {
            console.error('Error fetching products:', error);
            return new Response(JSON.stringify({ error: 'An error occurred' }), { status: 500 });
        }
    }

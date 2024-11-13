export async function GET(request: Request, { params }: { params: { id: string } }) {

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const username = process.env.API_USERNAME;
    const password = process.env.API_PASSWORD;
    const basicAuth = 'Basic ' + btoa(username + ':' + password);
    try {
      const res = await fetch(`${baseUrl}/wishlist/${params.id}`, {
        headers: {
          'Authorization': basicAuth,
        },
        cache : 'no-cache'
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        return new Response(JSON.stringify({ error: errorData }), { status: res.status });
      }
      const data = await res.json();
      return Response.json({ data });
    }
    catch (error) {
      console.error('Error fetching products:', error);
    }
  }
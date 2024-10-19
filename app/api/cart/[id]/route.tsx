export async function GET(request: Request, { params }: { params: { id: string } }) {

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const username = process.env.API_USERNAME;
    const password = process.env.API_PASSWORD;
    const basicAuth = 'Basic ' + btoa(username + ':' + password);
    try {
      const res = await fetch(`${baseUrl}/api/cart/${params.id}`, {
        headers: {
          'Authorization': basicAuth,
        },
        next: {
          revalidate: 3600
        }
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        return errorData;
      }
      const data = await res.json();
      return Response.json({ data });
    }
    catch (error: any) {
      console.error('Error fetching products:', error);
    }
  }
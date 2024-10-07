import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { products } = await req.json(); 

    if (!Array.isArray(products) || products.length === 0) {
      return NextResponse.json({ message: 'Productos inválidos' }, { status: 400 });
    }

    const cookieStore = cookies();
    const accessToken = cookieStore.get('access_token')?.value; 

    if (!accessToken) {
      return NextResponse.json({ message: 'Token de acceso no encontrado' }, { status: 401 });
    }

    const response = await fetch('http://http://192.168.88.39:7000///auth/checkout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date: new Date().toISOString(),
        products,
        totalItems: products.reduce((sum, product) => sum + product.quantity, 0),
        priceTotal: products.reduce((sum, product) => sum + (product.price * product.quantity), 0),
      }), 
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ message: data.message || 'Error en la solicitud' }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error); 
    return NextResponse.json({ message: 'Error fetching data' }, { status: 500 });
  }
}

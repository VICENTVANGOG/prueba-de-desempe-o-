import { NextResponse } from 'next/server';
import { Product } from '@/interfaces/producto'; 
import { cookies } from 'next/headers';

export async function GET() {

    const cookieStore = cookies();
    const accessToken = cookieStore.get('access_token')?.value; 

    if (!accessToken) {
        return NextResponse.json({ message: 'Token de acceso no encontrado' }, { status: 401 });
    }

    try {
        const response = await fetch('http://192.168.88.39:7000/auth/products', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return NextResponse.json({ message: 'Error al obtener los productos' }, { status: response.status });
        }

        const products: Product[] = await response.json();
        return NextResponse.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}

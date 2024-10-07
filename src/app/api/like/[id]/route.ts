import { NextResponse } from 'next/server';


export async function POST(req: Request, { params }: { params: { productId: string } }): Promise<NextResponse> {
  console.log({ path: 'post - like' });
  const { productId } = params;

  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ message: 'Token no encontrado' }, { status: 401 });
    }

    const response = await fetch(`http://192.168.88.39:7000/auth/products/${productId}/like`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ message: data.message || 'Error al dar like al producto' }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : 'Error fetching data';
    return NextResponse.json({ message }, { status: 500 });
  }
}


export async function DELETE(req: Request, { params }: { params: { productId: string } }): Promise<NextResponse> {
  console.log({ path: 'delete - like' });
  const { productId } = params;

  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ message: 'Token no encontrado' }, { status: 401 });
    }

    const response = await fetch(`http://192.168.88.39:7000/auth/products/${productId}/like`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ message: data.message || 'Error al quitar like del producto' }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : 'Error fetching data';
    return NextResponse.json({ message }, { status: 500 });
  }
}

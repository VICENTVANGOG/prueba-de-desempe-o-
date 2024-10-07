import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json(); 

    if (!username || !password) {
      return NextResponse.json({ message: 'Faltan datos requeridos' }, { status: 400 });
    }

    const response = await fetch('https://api-coders-advanced-route-production.up.railway.app/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ message: data.message || 'Error en la solicitud' }, { status: response.status });
    }

    const res = NextResponse.json(data);
    res.cookies.set('access_token', data.access_token, {
    });

    return res;
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : 'Error fetching data';
    return NextResponse.json({ message }, { status: 500 });
  }
}

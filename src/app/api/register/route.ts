import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  console.log('Método recibido: POST');

  try {
    const body = await req.json();
    console.log('Cuerpo de la solicitud:', body);

    const credentials = {
      email: body.email,
      username: body.username,
      password: body.password,
      name:body.name,
      phone: body.phone,
    };

    console.log('Credenciales a enviar:', credentials);

    const response = await fetch('http://http://192.168.88.39:7000/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    console.log('Respuesta de la API:', data);

    if (!response.ok) {
      console.log('Error en la respuesta:', data.message);
      return NextResponse.json({ message: data.message || 'Error al registrar el usuario' }, { status: response.status });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error('Error en el registro:', err);
    return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
  }
}

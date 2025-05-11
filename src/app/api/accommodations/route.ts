import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get('city');
    const country = searchParams.get('country');

    const where = {
      ...(city && { city }),
      ...(country && { country })
    };

    const accommodations = await prisma.accommodation.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ accommodations });
  } catch (error) {
    console.error('Get accommodations error:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar acomodações' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json(
        { error: 'Token não fornecido' },
        { status: 401 }
      );
    }

    const user = await verifyToken(token);

    if (!user) {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 401 }
      );
    }

    const { name, city, country, description, price, images } = await req.json();

    const accommodation = await prisma.accommodation.create({
      data: {
        name,
        city,
        country,
        description,
        price,
        images
      }
    });

    return NextResponse.json({ accommodation });
  } catch (error) {
    console.error('Create accommodation error:', error);
    return NextResponse.json(
      { error: 'Erro ao criar acomodação' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json(
        { error: 'Token não fornecido' },
        { status: 401 }
      );
    }

    const user = await verifyToken(token);

    if (!user) {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 401 }
      );
    }

    const { id, name, city, country, description, price, images } = await req.json();

    const accommodation = await prisma.accommodation.update({
      where: { id },
      data: {
        name,
        city,
        country,
        description,
        price,
        images
      }
    });

    return NextResponse.json({ accommodation });
  } catch (error) {
    console.error('Update accommodation error:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar acomodação' },
      { status: 500 }
    );
  }
} 
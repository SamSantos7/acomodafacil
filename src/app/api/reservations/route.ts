import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(req: Request) {
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

    const reservations = await prisma.reservation.findMany({
      where: { userId: user.id },
      include: {
        accommodation: true
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ reservations });
  } catch (error) {
    console.error('Get reservations error:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar reservas' },
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

    const { accommodationId, startDate, endDate } = await req.json();

    // Verificar se a acomodação existe
    const accommodation = await prisma.accommodation.findUnique({
      where: { id: accommodationId }
    });

    if (!accommodation) {
      return NextResponse.json(
        { error: 'Acomodação não encontrada' },
        { status: 404 }
      );
    }

    // Verificar se já existe reserva para o período
    const existingReservation = await prisma.reservation.findFirst({
      where: {
        accommodationId,
        OR: [
          {
            AND: [
              { startDate: { lte: new Date(startDate) } },
              { endDate: { gte: new Date(startDate) } }
            ]
          },
          {
            AND: [
              { startDate: { lte: new Date(endDate) } },
              { endDate: { gte: new Date(endDate) } }
            ]
          }
        ]
      }
    });

    if (existingReservation) {
      return NextResponse.json(
        { error: 'Já existe uma reserva para este período' },
        { status: 400 }
      );
    }

    const reservation = await prisma.reservation.create({
      data: {
        userId: user.id,
        accommodationId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status: 'pending'
      },
      include: {
        accommodation: true
      }
    });

    return NextResponse.json({ reservation });
  } catch (error) {
    console.error('Create reservation error:', error);
    return NextResponse.json(
      { error: 'Erro ao criar reserva' },
      { status: 500 }
    );
  }
} 
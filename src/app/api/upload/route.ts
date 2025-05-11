import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth';

const prisma = new PrismaClient();

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

    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'Nenhum arquivo enviado' },
        { status: 400 }
      );
    }

    // Aqui você deve implementar a lógica de upload do arquivo
    // Por exemplo, usando um serviço como AWS S3, Cloudinary, etc.
    // Por enquanto, vamos apenas simular o upload
    const fileUrl = `https://example.com/uploads/${file.name}`;
    const fileType = file.type;

    const upload = await prisma.upload.create({
      data: {
        userId: user.id,
        fileUrl,
        fileType
      }
    });

    return NextResponse.json({ upload });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Erro ao fazer upload do arquivo' },
      { status: 500 }
    );
  }
}

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

    const uploads = await prisma.upload.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ uploads });
  } catch (error) {
    console.error('Get uploads error:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar uploads' },
      { status: 500 }
    );
  }
} 
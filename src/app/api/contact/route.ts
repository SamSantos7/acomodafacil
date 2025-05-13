import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, email, phone, cityOfInterest, accommodationType, message } = await req.json();

    // Salvar no banco de dados
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone,
        cityOfInterest,
        accommodationType,
        message
      }
    });

    // Enviar e-mail de notificação
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.ADMIN_EMAIL || 'admin@acomodafacil.com',
      subject: 'Nova mensagem de contato - AcomodaFácil',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Nova mensagem de contato</h2>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <p><strong>Telefone:</strong> ${phone || 'Não informado'}</p>
          <p><strong>Cidade de interesse:</strong> ${cityOfInterest || 'Não informada'}</p>
          <p><strong>Tipo de acomodação:</strong> ${accommodationType || 'Não informado'}</p>
          <p><strong>Mensagem:</strong></p>
          <div style="background-color: #f4f4f4; padding: 10px; margin: 10px 0;">
            ${message}
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Erro ao processar formulário de contato' },
      { status: 500 }
    );
  }
}
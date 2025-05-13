import { prisma } from '../../lib/prisma';
import { getSession } from 'next-auth/react';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const session = await getSession({ req });
    const { name, email, phone, cityOfInterest, accommodationType, message } = req.body;

    // Salvar no banco de dados
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone,
        cityOfInterest,
        accommodationType,
        message,
        userId: session?.user?.id || null,
      },
    });

    // Configurar transporte de email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Enviar email para o administrador
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.ADMIN_EMAIL || 'admin@acomodafacil.com.br',
      subject: 'Nova mensagem de contato - AcomodaFácil',
      html: `
        <h1>Nova mensagem de contato</h1>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${phone}</p>
        <p><strong>Cidade de Interesse:</strong> ${cityOfInterest}</p>
        <p><strong>Tipo de Acomodação:</strong> ${accommodationType}</p>
        <p><strong>Mensagem:</strong> ${message}</p>
      `,
    });

    return res.status(201).json({ success: true, contact });
  } catch (error) {
    console.error('Erro ao processar contato:', error);
    return res.status(500).json({ message: 'Erro ao processar sua solicitação' });
  }
}
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { createOTPSession, verifyOTP } from '@/lib/otp';
import { sendOTPEmail } from '@/lib/email';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    // Se não forneceu OTP, envia um novo
    if (!otp) {
      const otpCode = await createOTPSession(email);
      const emailSent = await sendOTPEmail(email, otpCode);

      if (!emailSent) {
        return NextResponse.json(
          { error: 'Erro ao enviar código de verificação' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        message: 'Código de verificação enviado com sucesso'
      });
    }

    // Se forneceu OTP, verifica
    const result = await verifyOTP(email, otp);

    if (!result) {
      return NextResponse.json(
        { error: 'Código de verificação inválido ou expirado' },
        { status: 401 }
      );
    }

    const { user, token } = result;
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Erro ao fazer login' },
      { status: 500 }
    );
  }
}

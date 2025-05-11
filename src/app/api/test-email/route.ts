import { NextResponse } from 'next/server';
import { sendOTPEmail } from '@/lib/email';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email não fornecido' },
        { status: 400 }
      );
    }

    const testOTP = '12345';
    const emailSent = await sendOTPEmail(email, testOTP);

    if (!emailSent) {
      return NextResponse.json(
        { error: 'Erro ao enviar email' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Email de teste enviado com sucesso'
    });
  } catch (error) {
    console.error('Test email error:', error);
    return NextResponse.json(
      { error: 'Erro ao enviar email de teste' },
      { status: 500 }
    );
  }
} 
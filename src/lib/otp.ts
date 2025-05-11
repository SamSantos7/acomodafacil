import { PrismaClient } from '@prisma/client';
import { generateToken } from './auth';

const prisma = new PrismaClient();

export function generateOTP(): string {
  return Math.floor(10000 + Math.random() * 90000).toString();
}

export async function createOTPSession(email: string) {
  const otp = generateOTP();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutos

  // Salvar OTP no banco de dados
  await prisma.oTP.create({
    data: {
      email,
      code: otp,
      expiresAt
    }
  });

  return otp;
}

export async function verifyOTP(email: string, otp: string) {
  const otpRecord = await prisma.oTP.findFirst({
    where: {
      email,
      code: otp,
      expiresAt: {
        gt: new Date()
      },
      used: false
    }
  });

  if (!otpRecord) {
    return null;
  }

  // Marcar OTP como usado
  await prisma.oTP.update({
    where: { id: otpRecord.id },
    data: { used: true }
  });

  // Buscar ou criar usuário
  let user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        name: email.split('@')[0],
        password: '', // Senha vazia pois o usuário usará OTP
        provider: 'email'
      }
    });
  }

  // Gerar token JWT
  const token = generateToken(user.id);

  return {
    user,
    token
  };
} 
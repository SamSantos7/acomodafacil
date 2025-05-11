import { compare, hash } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function hashPassword(password: string) {
  return await hash(password, 10);
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return await compare(password, hashedPassword);
}

export function generateToken(userId: number) {
  return sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '7d' });
}

export async function verifyToken(token: string) {
  try {
    const decoded = verify(token, process.env.JWT_SECRET!) as { userId: number };
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, name: true }
    });
    return user;
  } catch (error) {
    return null;
  }
} 
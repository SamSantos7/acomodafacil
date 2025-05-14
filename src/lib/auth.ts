import jwt from 'jsonwebtoken';
import { db } from './db';

// Função para verificar autenticação
export async function verifyAuth(token?: string): Promise<string | null> {
  if (!token) return null;
  
  try {
    // Verificar o token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret') as { id: string };
    
    // Verificar se o usuário existe
    const user = await db.user.findUnique({
      where: { id: decoded.id }
    });
    
    if (!user) return null;
    
    return user.id;
  } catch (error) {
    console.error('Erro na verificação de autenticação:', error);
    return null;
  }
}

// Função para verificar token (usada em outras partes do código)
export async function verifyToken(token?: string) {
  if (!token) return null;
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret') as { id: string };
    
    const user = await db.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, name: true }
    });
    
    return user;
  } catch (error) {
    return null;
  }
}
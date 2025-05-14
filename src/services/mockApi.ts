// Serviço de mock para simular respostas da API
import { v4 as uuidv4 } from 'uuid';

// Tipos
interface User {
  id: string;
  name: string;
  email: string;
  role?: 'user' | 'admin';
  avatar?: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

// Funções de API simuladas
export const mockApi = {
  // Autenticação
  login: async (email: string, password: string): Promise<LoginResponse> => {
    // Simular um atraso de rede
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simular verificação de credenciais (em um sistema real, verificaríamos no banco de dados)
    if (email === 'estudante@exemplo.com' && password === 'senha123') {
      return {
        user: {
          id: '1',
          name: 'Estudante Exemplo',
          email: 'estudante@exemplo.com',
          avatar: 'https://i.pravatar.cc/150?u=estudante@exemplo.com'
        },
        token: 'jwt-token-simulado-123456789'
      };
    }
    
    // Se as credenciais não forem válidas
    throw new Error('Email ou senha inválidos');
  },
  
  register: async (name: string, email: string, password: string): Promise<LoginResponse> => {
    // Simular um atraso de rede
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simular registro (em um sistema real, verificaríamos se o email já existe)
    return {
      user: {
        id: Math.random().toString(36).substring(2, 9),
        name: name,
        email: email,
        avatar: `https://i.pravatar.cc/150?u=${email}`,
        role: 'user'
      },
      token: `jwt-token-simulado-${Math.random().toString(36).substring(2, 15)}`
    };
  },
  
  // OTP (One-Time Password)
  sendOtp: async (email: string): Promise<{ success: boolean }> => {
    // Simular um atraso de rede
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Simular envio de OTP (em um sistema real, enviaríamos um email)
    return { success: true };
  },
  
  verifyOtp: async (email: string, otp: string): Promise<LoginResponse> => {
    // Simular um atraso de rede
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simular verificação de OTP (em um sistema real, verificaríamos o código)
    if (otp.length === 5) {
      const username = email.split('@')[0];
      return {
        user: {
          id: Math.random().toString(36).substring(2, 9),
          name: username.charAt(0).toUpperCase() + username.slice(1),
          email: email,
          avatar: `https://i.pravatar.cc/150?u=${email}`,
          role: 'user'
        },
        token: `jwt-token-simulado-${Math.random().toString(36).substring(2, 15)}`
      };
    }
    
    throw new Error('Código OTP inválido');
  },
  
  // Upload de documento
  uploadDocument: async (name: string, file: File) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newDoc = {
      id: 'doc-' + Math.random().toString(36).substring(2, 9),
      userId: '1',
      name,
      fileUrl: URL.createObjectURL(file),
      uploadDate: new Date().toISOString(),
      status: 'pending'
    };
    
    return { document: newDoc };
  }
};
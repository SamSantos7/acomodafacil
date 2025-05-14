// Serviço de mock para simular respostas da API
import { v4 as uuidv4 } from 'uuid';

// Tipos
interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
}

interface Reservation {
  id: string;
  accommodationId: string;
  accommodationName: string;
  location: string;
  country: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  price: number;
  imageUrl: string;
}

interface Document {
  id: string;
  userId: string;
  name: string;
  fileUrl: string;
  uploadDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface LoginResponse {
  user: User;
  token: string;
}

// Mock de dados
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Samuel Santos',
    email: 'samuel.santos@exemplo.com',
    role: 'user',
    avatar: 'https://i.pravatar.cc/150?u=user1'
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@acomodafacil.com',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?u=admin'
  }
];

const mockReservations: Reservation[] = [
  {
    id: 'res1',
    accommodationId: 'acc1',
    accommodationName: 'Student Housing Dublin',
    location: 'Dublin, Irlanda',
    country: 'Irlanda',
    startDate: '2023-01-10',
    endDate: '2023-02-10',
    status: 'confirmed',
    price: 800,
    imageUrl: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  },
  {
    id: 'res2',
    accommodationId: 'acc2',
    accommodationName: 'Toronto Student Residence',
    location: 'Toronto, Canadá',
    country: 'Canadá',
    startDate: '2023-03-15',
    endDate: '2023-06-15',
    status: 'pending',
    price: 950,
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  }
];

const mockDocuments: Document[] = [
  {
    id: 'doc1',
    userId: '1',
    name: 'Passaporte.pdf',
    fileUrl: 'https://example.com/documents/passport.pdf',
    uploadDate: '2023-01-05',
    status: 'approved'
  },
  {
    id: 'doc2',
    userId: '1',
    name: 'Comprovante_Matricula.pdf',
    fileUrl: 'https://example.com/documents/enrollment.pdf',
    uploadDate: '2023-01-07',
    status: 'pending'
  }
];

// Funções de API simuladas
export const mockApi = {
  // Autenticação
  login: async (email: string, password: string): Promise<LoginResponse> => {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const user = mockUsers.find(u => u.email === email);
    
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    
    // Simular autenticação bem-sucedida (em produção, verificaria a senha)
    return {
      user,
      token: 'mock-jwt-token-' + uuidv4()
    };
  },
  
  // Dados do usuário
  getUser: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { user: mockUsers[0] };
  },
  
  // Reservas
  getReservations: async () => {
    await new Promise(resolve => setTimeout(resolve, 700));
    return { reservations: mockReservations };
  },
  
  // Documentos
  getDocuments: async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return { documents: mockDocuments };
  },
  
  // Upload de documento
  uploadDocument: async (name: string, file: File) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newDoc: Document = {
      id: 'doc-' + uuidv4().substring(0, 8),
      userId: '1',
      name,
      fileUrl: URL.createObjectURL(file),
      uploadDate: new Date().toISOString(),
      status: 'pending'
    };
    
    return { document: newDoc };
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
  }
};

// Serviço de API simulada para desenvolvimento

// Importe as dependências necessárias
import { v4 as uuidv4 } from 'uuid';

// Defina as interfaces
// Remover esta segunda definição de mockApi e suas interfaces associadas
// interface User {
//   id: string;
//   name: string;
//   email: string;
//   avatar?: string;
// }

// interface LoginResponse {
//   user: User;
//   token: string;
// }

// const mockApi = {
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
        avatar: `https://i.pravatar.cc/150?u=${email}`
      },
      token: `jwt-token-simulado-${Math.random().toString(36).substring(2, 15)}`
    };
  },
  
  // Documentos
  getDocuments: async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return { documents: mockDocuments };
  },
  
  uploadDocument: async (name: string, file: File) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newDoc: Document = {
      id: 'doc-' + uuidv4().substring(0, 8),
      userId: '1',
      name,
      fileUrl: URL.createObjectURL(file),
      uploadDate: new Date().toISOString(),
      status: 'pending'
    };
    
    return { document: newDoc };
  },
  
  // OTP (One-Time Password)
  sendOtp: async (email: string): Promise<{ success: boolean }> => {
    // Simular um atraso de rede
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Simular envio de OTP (em um sistema real, enviaríamos um email)
    return { success: true };
  },
  
  verifyOtp: async (email: string, otp: string) => {
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
          avatar: `https://i.pravatar.cc/150?u=${email}`
        },
        token: `jwt-token-simulado-${Math.random().toString(36).substring(2, 15)}`
      };
    }
    
    throw new Error('Código OTP inválido');
  }
  
  register: async (name: string, email: string, password: string) => {
    // Simular um atraso de rede
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simular registro (em um sistema real, verificaríamos se o email já existe)
    return {
      user: {
        id: Math.random().toString(36).substring(2, 9),
        name: name,
        email: email,
        avatar: `https://i.pravatar.cc/150?u=${email}`
      },
      token: `jwt-token-simulado-${Math.random().toString(36).substring(2, 15)}`
    };
  }
};

export default mockApi;
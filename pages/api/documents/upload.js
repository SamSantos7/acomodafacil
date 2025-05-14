import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    // Verificar autenticação
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    const user = await verifyToken(token);
    
    if (!user) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    // Processar o upload do arquivo
    const { name, fileType, fileUrl } = req.body;
    
    if (!name || !fileType || !fileUrl) {
      return res.status(400).json({ error: 'Dados incompletos' });
    }

    // Determinar o tipo de documento
    let type = 'OUTRO';
    
    if (fileType.includes('pdf')) {
      type = 'PDF';
    } else if (fileType.includes('word')) {
      type = 'DOCX';
    } else {
      type = 'OUTRO';
    }
    
    // Salvar o documento no banco de dados
    const document = await prisma.document.create({
      data: {
        userId: user.id,
        name,
        fileUrl,
        fileType: type,
        status: 'pending'
      }
    });

    return res.status(200).json({ document });
  } catch (error) {
    console.error('Erro ao fazer upload:', error);
    return res.status(500).json({ error: 'Erro ao processar o upload' });
  }
}
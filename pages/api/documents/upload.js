// Importar o serviço de mock em vez de prisma
import { mockApi } from '@/services/mockApi';

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
    
    // Simular o upload usando o mockApi
    const file = new File(["conteúdo simulado"], name, { type: fileType });
    const result = await mockApi.uploadDocument(name, file);

    return res.status(200).json({ document: result.document });
  } catch (error) {
    console.error('Erro ao fazer upload:', error);
    return res.status(500).json({ error: 'Erro ao processar o upload' });
  }
}
import { IncomingForm } from 'formidable';
import { uploadFile } from '../../../lib/cloudinary';
import { prisma } from '../../../lib/prisma';
import { getSession } from 'next-auth/react';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ message: 'Não autorizado' });
    }

    const form = new IncomingForm();
    
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao processar o formulário' });
      }

      const file = files.file[0];
      const name = fields.name[0];
      const userId = fields.userId[0] || session.user.id;

      // Verificar tipo de arquivo
      const fileType = file.mimetype;
      let type;
      
      if (fileType.includes('pdf')) {
        type = 'PDF';
      } else if (fileType.includes('word')) {
        type = 'DOCX';
      } else {
        type = 'OUTRO';
      }
      
      // Continuar com o restante da implementação
      const file = files.file[0];
      const name = fields.name[0];
      const userId = fields.userId[0] || session.user.id;

      // Verificar tipo de arquivo
      const fileType = file.mimetype;
      let type;
      
      if (fileType.includes('pdf')) {
        type = 'PDF';
      } else if (fileType.includes('word')) {
        type = 'DOCX';
      } else {
        type = 'OUTRO';
      }
      
      // Continuar com o restante da implementação
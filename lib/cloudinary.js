import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadFile = async (file, folder = 'documents') => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: `acomodafacil/${folder}`,
    });
    
    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error('Erro ao fazer upload para o Cloudinary:', error);
    throw new Error('Falha ao fazer upload do arquivo');
  }
};

export const deleteFile = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
    return true;
  } catch (error) {
    console.error('Erro ao excluir arquivo do Cloudinary:', error);
    return false;
  }
};
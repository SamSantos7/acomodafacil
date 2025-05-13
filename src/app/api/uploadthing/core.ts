import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getServerSession } from "next-auth/next";
import { db } from "@/lib/db";
 
const f = createUploadthing();
 
export const ourFileRouter = {
  // Rota para upload de documentos (PDF, DOCX)
  documentUploader: f({ pdf: { maxFileSize: "4MB" }, "application/msword": { maxFileSize: "4MB" }, "application/vnd.openxmlformats-officedocument.wordprocessingml.document": { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      // Verificar autenticação
      const token = req.headers.get("authorization")?.split(" ")[1];
      if (!token) throw new Error("Não autorizado");
      
      // Aqui você deve verificar o token e obter o userId
      // Simplificado para este exemplo
      const userId = "user-id-from-token";
      
      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // Salvar referência do arquivo no banco de dados
      await db.document.create({
        data: {
          userId: metadata.userId,
          name: file.name,
          fileUrl: file.url,
          fileType: file.type,
          status: "pending"
        }
      });
      
      return { uploadedBy: metadata.userId };
    }),
    
  // Rota para upload de imagens
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      // Verificar autenticação
      const token = req.headers.get("authorization")?.split(" ")[1];
      if (!token) throw new Error("Não autorizado");
      
      // Aqui você deve verificar o token e obter o userId
      const userId = "user-id-from-token";
      
      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // Salvar referência do arquivo no banco de dados
      await db.upload.create({
        data: {
          userId: metadata.userId,
          fileUrl: file.url,
          fileType: file.type
        }
      });
      
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;
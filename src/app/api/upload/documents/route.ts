
import { verifyAuth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    const userId = await verifyAuth(token);

    if (!userId) {
      return new Response("Não autorizado", { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return new Response("Nenhum arquivo enviado", { status: 400 });
    }

    // Implemente aqui a lógica de upload do arquivo
    // Por exemplo, usando um serviço de armazenamento

    return Response.json({ message: "Arquivo enviado com sucesso" });
  } catch (error) {
    return new Response("Erro ao fazer upload", { status: 500 });
  }
}

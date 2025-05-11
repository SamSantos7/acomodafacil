
import { db } from "@/lib/db";
import { verifyAuth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    const userId = await verifyAuth(token);

    if (!userId) {
      return new Response("Não autorizado", { status: 401 });
    }

    const data = await req.json();

    const accommodation = await db.accommodation.create({
      data: {
        ...data,
        userId
      }
    });

    return Response.json(accommodation);
  } catch (error) {
    return new Response("Erro ao criar acomodação", { status: 500 });
  }
}


import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const accommodations = await db.accommodation.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    return Response.json(accommodations);
  } catch (error) {
    return new Response("Erro ao listar acomodações", { status: 500 });
  }
}

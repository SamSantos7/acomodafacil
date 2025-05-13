
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs"; // Alterado de bcrypt para bcryptjs

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    // Verificar se usuário já existe
    const existingUser = await db.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return new Response("Usuário já existe", { status: 400 });
    }

    // Hash da senha
    // Onde você usa bcrypt, substitua por bcryptjs:
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Criar usuário
    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    // Remover senha do retorno
    const { password: _, ...userWithoutPassword } = user;

    return Response.json(userWithoutPassword);
  } catch (error) {
    return new Response("Erro ao criar usuário", { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin');
  const isDashboardPath = request.nextUrl.pathname.startsWith('/dashboard');
  
  // Verificar se o usuário está tentando acessar rotas protegidas
  if ((isDashboardPath || isAdminPath) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Para rotas admin, verificar se o usuário é admin (implementação completa requer verificação do token)
  if (isAdminPath) {
    // Aqui você pode adicionar lógica adicional para verificar se o usuário é admin
    // Por enquanto, estamos apenas verificando se há um token
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};
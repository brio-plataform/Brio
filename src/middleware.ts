import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    // Adicione aqui as rotas que precisam de autenticação
    "/dashboard/:path*",
    "/profile/:path*",
    // Não protege a rota de login
    "/((?!login|api|_next/static|_next/image|favicon.ico).*)",
  ],
}; 
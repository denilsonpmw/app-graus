import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token

    // Verificar se é rota admin e se usuário é admin
    if (pathname.startsWith('/admin')) {
      if (!token?.isAdmin) {
        return Response.redirect(new URL('/dashboard', req.url))
      }
    }

    // Redirecionar admin para área administrativa
    if (pathname === '/dashboard' && token?.isAdmin) {
      return Response.redirect(new URL('/admin/dashboard', req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl

        // Páginas públicas que não precisam de autenticação
        const publicRoutes = ['/', '/login', '/cadastro', '/esqueci-senha']
        if (publicRoutes.includes(pathname)) {
          return true
        }

        // Rotas de afiliado são públicas para clientes
        if (pathname.startsWith('/ref/')) {
          return true
        }

        // API routes de autenticação
        if (pathname.startsWith('/api/auth')) {
          return true
        }

        // Todas as outras rotas precisam de token
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    // Proteger todas as rotas exceto as públicas
    '/((?!api/auth|_next/static|_next/image|favicon.ico|login|cadastro|esqueci-senha).*)',
  ],
}

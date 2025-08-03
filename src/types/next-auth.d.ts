import "next-auth"
import "next-auth/jwt"

declare module "next-auth" {
  interface User {
    id: string
    plan: string
    affiliateCode?: string
    isAdmin: boolean
  }

  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      plan: string
      affiliateCode?: string
      isAdmin: boolean
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    plan: string
    affiliateCode?: string
    isAdmin: boolean
  }
}

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios, { AxiosError } from "axios";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import bcrypt from "bcryptjs";

// Estendendo os tipos para incluir o ID
interface ExtendedUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface ExtendedSession extends Session {
  user: ExtendedUser;
}

interface ExtendedToken extends JWT {
  id?: string;
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Credenciais recebidas:", credentials);
          return null;
        }

        try {
          console.log("Tentando autenticar com:", {
            email: credentials.email,
            passwordLength: credentials.password.length
          });

          // Buscar usuário no json-server
          const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/users?email=${credentials.email}`;
          console.log("Fazendo requisição para:", apiUrl);

          const response = await axios.get(apiUrl);
          console.log("Resposta do servidor:", response.data);

          const users = response.data;

          if (users.length === 0) {
            console.log("Usuário não encontrado para o email:", credentials.email);
            return null;
          }

          const user = users[0];
          console.log("Dados do usuário encontrado:", {
            id: user.id,
            email: user.email,
            hasPassword: !!user.password
          });

          // Verificar se a senha existe no banco
          if (!user.password) {
            console.log("Senha não encontrada para o usuário:", user.email);
            return null;
          }

          // Comparação segura da senha usando bcrypt
          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );

          console.log("Resultado da validação de senha:", {
            isValid: isValidPassword,
            providedPasswordLength: credentials.password.length,
            storedPasswordLength: user.password.length
          });

          if (isValidPassword) {
            return {
              id: user.id,
              name: user.name,
              email: user.email
            };
          }

          console.log("Senha inválida para o usuário:", user.email);
          return null;
        } catch (error) {
          if (error instanceof AxiosError) {
            console.error("Erro na requisição:", {
              message: error.message,
              status: error.response?.status,
              data: error.response?.data
            });
          } else if (error instanceof Error) {
            console.error("Erro na autenticação:", {
              message: error.message,
              stack: error.stack
            });
          } else {
            console.error("Erro desconhecido:", error);
          }
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // Ativando logs de debug do NextAuth
  callbacks: {
    async jwt({ token, user }): Promise<ExtendedToken> {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }): Promise<ExtendedSession> {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string
        }
      };
    }
  }
});

export { handler as GET, handler as POST }; 
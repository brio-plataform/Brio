"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("john.doe@example.com");
  const [password, setPassword] = useState("123456");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Credenciais inválidas");
        return;
      }

      if (result?.ok) {
        router.push("/feed");
        router.refresh();
      }
    } catch (error) {
      console.error("Erro no login:", error);
      setError("Ocorreu um erro ao fazer login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-in-up">
      <Card className="w-full backdrop-blur-sm bg-background/80 border-muted/20 shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Bem-vindo de volta
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Entre com suas credenciais para acessar a plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                disabled={isLoading}
                className="bg-background/50 border-muted/30 focus:border-primary transition-colors hover:border-primary/50"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                required
                disabled={isLoading}
                className="bg-background/50 border-muted/30 focus:border-primary transition-colors hover:border-primary/50"
              />
            </div>
            
            {error && (
              <div className="text-sm font-medium text-red-500/80 animate-shake">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-[1.02]"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Entrando...</span>
                </div>
              ) : (
                "Entrar"
              )}
            </Button>

            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Ainda não tem uma conta?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/register")}
                  className="text-primary hover:text-primary/80 hover:underline font-medium transition-colors"
                >
                  Criar conta
                </button>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 
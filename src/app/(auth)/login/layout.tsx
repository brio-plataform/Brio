import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Brio",
  description: "Entre na plataforma Brio para compartilhar e construir conhecimento colaborativamente.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-background to-background relative overflow-hidden">
      {/* Efeito de gradiente animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 animate-pulse"></div>
      
      {/* Círculos decorativos */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
      
      {/* Grid de fundo */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>
      
      {/* Conteúdo */}
      <div className="relative flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md relative">
          {/* Logo ou Ícone */}
          <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-2xl flex items-center justify-center hover:scale-105 transition-transform">
              <span className="text-2xl font-bold text-white">B</span>
            </div>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
} 
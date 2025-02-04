import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertCircle, HomeIcon, RotateCcw } from "lucide-react"

interface ErrorPageProps {
  title?: string;
  message?: string;
  error?: Error | string;
}

export default function ErrorPage({ 
  title = "Ops, algo deu errado",
  message = "Não foi possível carregar o projeto",
  error
}: ErrorPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center max-w-md w-full">
        <div className="mb-8">
          <AlertCircle className="w-16 h-16 mx-auto text-red-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-100 mb-2">{title}</h1>
        <p className="text-xl text-gray-400 mb-4">{message}</p>
        {error && (
          <div className="p-4 bg-red-500/10 rounded-lg mb-8">
            <p className="text-sm text-red-400">
              {error instanceof Error ? error.message : error}
            </p>
          </div>
        )}
        <div className="space-y-4">
          <Button 
            onClick={() => window.location.reload()} 
            variant="outline" 
            className="w-full"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Tentar novamente
          </Button>
          <Button asChild variant="ghost" className="w-full">
            <Link href="/projects" className="flex items-center justify-center">
              <HomeIcon className="mr-2 h-4 w-4" />
              Voltar para projetos
            </Link>
          </Button>
        </div>
      </div>
      <footer className="mt-16 text-center text-gray-400 text-sm">
        <p>Se o problema persistir, por favor entre em contato com o suporte.</p>
      </footer>
    </div>
  )
} 
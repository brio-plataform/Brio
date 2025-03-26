import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertCircle, HomeIcon, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import { ErrorPageProps } from "./types"

export default function NotFound({ 
  title = "Ops, algo deu errado",
  message = "Não foi possível carregar o projeto",
  error,
  showReload = true,
  showHome = true,
  customActions,
  homeLink = "/projects",
  reloadButtonText = "Tentar novamente",
  homeButtonText = "Voltar para projetos",
  footerText = "Se o problema persistir, por favor entre em contato com o suporte.",
  className,
  showIcon = true,
  iconColor = "text-red-400",
  iconSize = "w-16 h-16"
}: ErrorPageProps) {
  return (
    <div className="flex justify-center items-center w-full h-full">
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center max-w-md w-full justify-center items-center flex flex-col">
        <div className="mb-8">
          {showIcon && (
            <AlertCircle className={cn(iconColor, iconSize)} />
          )}
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
          {showReload && (
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline" 
              className="w-full"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              {reloadButtonText}
            </Button>
          )}
          {showHome && (
            <Button asChild variant="ghost" className="w-full">
              <Link href={homeLink} className="flex items-center justify-center">
                <HomeIcon className="mr-2 h-4 w-4" />
                {homeButtonText}
              </Link>
            </Button>
          )}
          {customActions}
        </div>
      </div>
      <footer className="mt-16 text-center text-gray-400 text-sm">
        <p>{footerText}</p>
      </footer>
    </div>
    </div>
  )
} 
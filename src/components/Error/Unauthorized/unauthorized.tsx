import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LockIcon, HomeIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { UnauthorizedPageProps } from "./types"

export default function UnauthorizedPage({
  title = "Opa, acesso restrito",
  message = "Parece que você não tem permissão para acessar esta página.",
  showLogin = true,
  showHome = true,
  customActions,
  supportMessage = "Se você acha que isso é um erro, por favor entre em contato com o suporte.",
  loginLink = "/login",
  homeLink = "/",
  loginButtonText = "Fazer login",
  homeButtonText = "Voltar para a página inicial",
  className,
  showIcon = true,
  iconColor = "text-gray-400",
  iconSize = "w-16 h-16"
}: UnauthorizedPageProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center min-h-screen px-4", className)}>
      <div className="text-center max-w-md w-full justify-center items-center flex flex-col">
        {showIcon && (
          <div className="mb-8">
            <LockIcon className={cn("mx-auto", iconColor, iconSize)} />
          </div>
        )}
        <h1 className="text-3xl font-bold text-gray-100 mb-2">{title}</h1>
        <p className="text-xl text-gray-400 mb-8">{message}</p>
        <div className="space-y-4">
          {showLogin && (
            <Button asChild variant="outline" className="w-full">
              <Link href={loginLink} className="flex items-center justify-center">
                <LockIcon className="mr-2 h-4 w-4" />
                {loginButtonText}
              </Link>
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
        <p>{supportMessage}</p>
      </footer>
    </div>
  )
}


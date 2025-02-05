import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LockIcon, HomeIcon } from "lucide-react"
import type { UnauthorizedPageProps } from "@/types/types"

export default function UnauthorizedPage({
  title = "Opa, acesso restrito",
  message = "Parece que você não tem permissão para acessar esta página.",
  showLogin = true,
  showHome = true,
  customActions,
  supportMessage = "Se você acha que isso é um erro, por favor entre em contato com o suporte."
}: UnauthorizedPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center max-w-md w-full">
        <div className="mb-8">
          <LockIcon className="w-16 h-16 mx-auto text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-100 mb-2">{title}</h1>
        <p className="text-xl text-gray-400 mb-8">{message}</p>
        <div className="space-y-4">
          {showLogin && (
            <Button asChild variant="outline" className="w-full">
              <Link href="/login" className="flex items-center justify-center">
                <LockIcon className="mr-2 h-4 w-4" />
                Fazer login
              </Link>
            </Button>
          )}
          {showHome && (
            <Button asChild variant="ghost" className="w-full">
              <Link href="/" className="flex items-center justify-center">
                <HomeIcon className="mr-2 h-4 w-4" />
                Voltar para a página inicial
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


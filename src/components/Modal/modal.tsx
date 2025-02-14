import { useEffect } from "react"
import type React from "react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  // Previne scroll do body quando modal está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 
                 flex justify-center items-center p-4 overflow-y-auto"
      onClick={onClose} // Fecha ao clicar fora
    >
      <div 
        className="bg-background rounded-lg w-full max-w-4xl max-h-[90vh] 
                   overflow-y-auto shadow-lg animate-in fade-in-0 zoom-in-95"
        onClick={e => e.stopPropagation()} // Previne fechar ao clicar dentro
      >
        {children}
      </div>
    </div>
  )
}


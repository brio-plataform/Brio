"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar, Trophy, Sparkles, GraduationCap } from "lucide-react"
import { cn } from "@/lib/utils"

interface Banner {
  id: number
  title: string
  description: string
  type: "event" | "promotion" | "award" | "course"
  date?: string
  link: string
  bgColor: string
  textColor: string
}

const banners: Banner[] = [
  {
    id: 1,
    title: "Conferência Internacional de IA",
    description: "Participe do maior evento de Inteligência Artificial da América Latina",
    type: "event",
    date: "15-17 Março, 2024",
    link: "/events/ai-conference",
    bgColor: "bg-gradient-to-r from-blue-600 to-purple-600",
    textColor: "text-white",
  },
  {
    id: 2,
    title: "50% de desconto em Cursos Premium",
    description: "Aproveite nossa promoção especial de verão em todos os cursos",
    type: "promotion",
    date: "Válido até 28/02/2024",
    link: "/promotions/summer-sale",
    bgColor: "bg-gradient-to-r from-green-500 to-emerald-700",
    textColor: "text-white",
  },
  {
    id: 3,
    title: "Prêmio de Inovação 2024",
    description: "Inscrições abertas para o Prêmio Brio de Inovação Acadêmica",
    type: "award",
    date: "Inscrições até 31/03/2024",
    link: "/awards/innovation",
    bgColor: "bg-gradient-to-r from-yellow-500 to-orange-600",
    textColor: "text-white",
  },
  {
    id: 4,
    title: "Novo Curso: Quantum Computing",
    description: "Aprenda os fundamentos da computação quântica com especialistas do MIT",
    type: "course",
    link: "/courses/quantum-computing",
    bgColor: "bg-gradient-to-r from-purple-600 to-pink-600",
    textColor: "text-white",
  },
]

export function BannerCarousel() {
  const [currentBanner, setCurrentBanner] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const getIcon = (type: Banner["type"]) => {
    switch (type) {
      case "event":
        return <Calendar className="h-6 w-6" />
      case "promotion":
        return <Sparkles className="h-6 w-6" />
      case "award":
        return <Trophy className="h-6 w-6" />
      case "course":
        return <GraduationCap className="h-6 w-6" />
    }
  }

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length)
  }

  const previousBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)
  }

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(nextBanner, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextBanner]) // Added nextBanner to dependencies

  return (
    <Card className="w-full max-w-7xl mb-4 overflow-hidden relative group">
      <div className="relative">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={cn(
              "transition-all duration-500 ease-in-out",
              index === currentBanner ? "opacity-100" : "opacity-0 absolute inset-0",
            )}
          >
            <div className={cn("p-6", banner.bgColor, banner.textColor)}>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/20 rounded-lg">{getIcon(banner.type)}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{banner.title}</h3>
                  <p className="mb-2 opacity-90">{banner.description}</p>
                  {banner.date && <p className="text-sm opacity-75 mb-3">{banner.date}</p>}
                  <Button
                    variant="secondary"
                    className="bg-white/20 hover:bg-white/30 border-0"
                    onClick={() => (window.location.href = banner.link)}
                  >
                    Saiba mais
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Dots */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                index === currentBanner ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75",
              )}
              onClick={() => setCurrentBanner(index)}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/20 hover:bg-black/30 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={previousBanner}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/20 hover:bg-black/30 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={nextBanner}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </Card>
  )
}
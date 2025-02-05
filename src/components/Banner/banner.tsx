"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar, Trophy, Sparkles, GraduationCap, BookOpen, MessageSquare, Library, Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface Banner {
  id: number
  title: string
  description: string
  type: "event" | "promotion" | "award" | "course" | "study" | "forum" | "library" | "partnership"
  date?: string
  link: string
  bgColor: string
  textColor: string
  buttonText?: string
  institution?: string
}

const banners: Banner[] = [
  {
    id: 1,
    title: "Biblioteca Digital Colaborativa",
    description: "Acesse milhares de livros acadêmicos, TCCs e artigos científicos. Faça anotações e compartilhe conhecimento.",
    type: "library",
    link: "/library",
    bgColor: "bg-gradient-to-r from-indigo-600 to-purple-600",
    textColor: "text-white",
    buttonText: "Explorar Biblioteca",
  },
  {
    id: 2,
    title: "Fórum: Inteligência Artificial e Ética",
    description: "Debate atual sobre os impactos da IA na sociedade. Participe com especialistas da área.",
    type: "forum",
    date: "Debate ao vivo: 15/03/2024",
    link: "/forums/ai-ethics",
    bgColor: "bg-gradient-to-r from-blue-600 to-cyan-600",
    textColor: "text-white",
    buttonText: "Participar",
  },
  {
    id: 3,
    title: "Programa de Mentoria Acadêmica",
    description: "Conecte-se com pesquisadores experientes e receba orientação para seus estudos.",
    type: "partnership",
    link: "/mentorship",
    bgColor: "bg-gradient-to-r from-emerald-600 to-teal-600",
    textColor: "text-white",
    buttonText: "Inscrever-se",
  },
  {
    id: 4,
    title: "Estudo Colaborativo: Mudanças Climáticas",
    description: "Projeto interdisciplinar com participação de Harvard, USP e MIT",
    type: "study",
    date: "Inscrições até 31/03/2024",
    link: "/studies/climate-change",
    bgColor: "bg-gradient-to-r from-green-600 to-emerald-600",
    textColor: "text-white",
    institution: "Harvard, USP, MIT",
    buttonText: "Contribuir",
  },
  {
    id: 5,
    title: "Prêmio Brio de Inovação Acadêmica",
    description: "Reconhecimento para as melhores contribuições científicas da plataforma",
    type: "award",
    date: "Inscrições até 30/04/2024",
    link: "/awards/innovation",
    bgColor: "bg-gradient-to-r from-amber-500 to-orange-600",
    textColor: "text-white",
    buttonText: "Candidate-se",
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
      case "study":
        return <BookOpen className="h-6 w-6" />
      case "forum":
        return <MessageSquare className="h-6 w-6" />
      case "library":
        return <Library className="h-6 w-6" />
      case "partnership":
        return <Users className="h-6 w-6" />
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
  }, [isAutoPlaying])

  return (
    <Card className="w-full max-w-7xl mb-4 overflow-hidden relative group h-[250px]">
      <div className="relative h-full">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-500 ease-in-out",
              index === currentBanner ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            <div className={cn("p-8 h-full flex flex-col justify-between", banner.bgColor, banner.textColor)}>
              <div className="flex items-start gap-6">
                <div className="p-4 bg-white/20 rounded-lg">{getIcon(banner.type)}</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">{banner.title}</h3>
                  <p className="text-lg mb-3 opacity-90">{banner.description}</p>
                  {banner.date && <p className="text-md opacity-75 mb-3">{banner.date}</p>}
                  {banner.institution && (
                    <p className="text-sm opacity-75 mb-3">
                      <span className="font-semibold">Instituições: </span>
                      {banner.institution}
                    </p>
                  )}
                  <Button
                    variant="secondary"
                    className="bg-white/20 hover:bg-white/30 border-0 text-lg px-6 py-5"
                    onClick={() => (window.location.href = banner.link)}
                  >
                    {banner.buttonText || "Saiba mais"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {banners.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                index === currentBanner ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
              )}
              onClick={() => setCurrentBanner(index)}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 hover:bg-black/30 text-white opacity-0 group-hover:opacity-100 transition-opacity z-20"
          onClick={previousBanner}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 hover:bg-black/30 text-white opacity-0 group-hover:opacity-100 transition-opacity z-20"
          onClick={nextBanner}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </Card>
  )
}
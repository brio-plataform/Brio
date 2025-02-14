"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar, Trophy, Sparkles, GraduationCap, BookOpen, MessageSquare, Library, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { Banner, BannerCarouselProps, BannerCarouselState } from './types'
import { MOCK_BANNERS } from './mockData'

export function BannerCarousel({ 
  autoPlayInterval = 5000,
  defaultAutoPlay = true 
}: BannerCarouselProps) {
  const [state, setState] = useState<BannerCarouselState>({
    currentBanner: 0,
    isAutoPlaying: defaultAutoPlay
  })

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
    setState((prev) => ({
      ...prev,
      currentBanner: (prev.currentBanner + 1) % MOCK_BANNERS.length
    }))
  }

  const previousBanner = () => {
    setState((prev) => ({
      ...prev,
      currentBanner: (prev.currentBanner - 1 + MOCK_BANNERS.length) % MOCK_BANNERS.length
    }))
  }

  useEffect(() => {
    if (!state.isAutoPlaying) return

    const interval = setInterval(nextBanner, autoPlayInterval)
    return () => clearInterval(interval)
  }, [state.isAutoPlaying, autoPlayInterval])

  return (
    <Card className="w-full max-w-7xl overflow-hidden relative group h-[250px]">
      <div className="relative h-full">
        {MOCK_BANNERS.map((banner, index) => (
          <div
            key={banner.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-500 ease-in-out",
              index === state.currentBanner ? "opacity-100 z-10" : "opacity-0 z-0"
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
          {MOCK_BANNERS.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                index === state.currentBanner ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
              )}
              onClick={() => setState((prev) => ({ ...prev, currentBanner: index }))}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 hover:bg-black/30 text-white opacity-0 group-hover:opacity-100 transition-opacity z-20"
          onClick={previousBanner}
          onMouseEnter={() => setState((prev) => ({ ...prev, isAutoPlaying: false }))}
          onMouseLeave={() => setState((prev) => ({ ...prev, isAutoPlaying: true }))}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 hover:bg-black/30 text-white opacity-0 group-hover:opacity-100 transition-opacity z-20"
          onClick={nextBanner}
          onMouseEnter={() => setState((prev) => ({ ...prev, isAutoPlaying: false }))}
          onMouseLeave={() => setState((prev) => ({ ...prev, isAutoPlaying: true }))}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </Card>
  )
}
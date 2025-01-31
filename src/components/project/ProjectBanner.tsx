"use client"

import { useCallback, useEffect, useState } from 'react';
import { ImagePlus, Move } from "lucide-react";
import { Button } from "../ui/button";
import { useQueryState } from 'nuqs';

export function ProjectBanner() {
  const [bannerImage, setBannerImage] = useQueryState("banner", {
    defaultValue: "",
    parse: (value) => value || ""
  });
  
  const [bannerPosition, setBannerPosition] = useQueryState("bannerPosition", {
    defaultValue: "50",
    parse: (value) => value || "50"
  });

  const [isRepositioning, setIsRepositioning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);

  const handleBannerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBannerImage(imageUrl);
    }
  };

  const handleGlobalDragMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !isRepositioning) return;
    
    const deltaY = e.clientY - startY;
    const newPosition = Math.max(0, Math.min(100, Number(bannerPosition) - (deltaY * 0.5)));
    
    setBannerPosition(newPosition.toString());
    setStartY(e.clientY);
  }, [isDragging, isRepositioning, startY, bannerPosition, setBannerPosition]);

  const handleGlobalDragEnd = useCallback(() => {
    setIsDragging(false);
    document.body.style.userSelect = '';
    
    document.removeEventListener('mousemove', handleGlobalDragMove);
    document.removeEventListener('mouseup', handleGlobalDragEnd);
  }, [handleGlobalDragMove]);

  const handleDragStart = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isRepositioning) return;
    setIsDragging(true);
    setStartY(e.clientY);
    document.body.style.userSelect = 'none';
    
    document.addEventListener('mousemove', handleGlobalDragMove);
    document.addEventListener('mouseup', handleGlobalDragEnd);
  }, [isRepositioning, handleGlobalDragMove, handleGlobalDragEnd]);

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleGlobalDragMove);
      document.removeEventListener('mouseup', handleGlobalDragEnd);
    };
  }, [handleGlobalDragMove, handleGlobalDragEnd]);

  return (
    <div className="relative w-full h-60 mb-6 rounded-3xl overflow-hidden group">
      {bannerImage ? (
        <>
          <div
            className={`relative w-full h-full ${isRepositioning ? 'cursor-row-resize' : ''}`}
            onMouseDown={handleDragStart}
          >
            <img 
              src={bannerImage} 
              alt="Banner" 
              className="w-full h-full object-cover transition-all duration-300"
              style={{ objectPosition: `center ${bannerPosition}%` }}
            />
            {isRepositioning && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="text-white text-center">
                  <Move className="w-8 h-8 mx-auto mb-2" />
                </div>
              </div>
            )}
          </div>
          <Button
            variant="secondary"
            size="sm"
            className={`absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-30 ${
              isRepositioning ? 'bg-primary text-primary-foreground' : ''
            }`}
            onClick={() => setIsRepositioning(!isRepositioning)}
          >
            <Move className="w-4 h-4 mr-2" />
            {isRepositioning ? 'Concluir' : 'Reposicionar'}
          </Button>
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500" />
      )}

      {!isRepositioning && (
        <label className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-20">
          <div className="flex flex-col items-center gap-2">
            <ImagePlus className="w-8 h-8 text-white" />
            <span className="text-white text-sm">Clique para adicionar uma imagem de capa</span>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleBannerUpload}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
} 
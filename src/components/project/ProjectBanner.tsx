"use client"

import { useCallback, useEffect, useState } from 'react';
import { ImagePlus, Move } from "lucide-react";
import { Button } from "../ui/button";
import { useGetProject } from '@/hooks/useGetProject';
import { useUpdateProject } from '@/hooks/useUpdateProject';
import { useParams } from 'next/navigation';

export function ProjectBanner() {
  const params = useParams();
  const projectId = params.id as string;
  const { banner } = useGetProject(projectId);
  const { updateBanner } = useUpdateProject(projectId);

  const [bannerImage, setBannerImage] = useState<string>("");
  const [bannerPosition, setBannerPosition] = useState("50");
  const [isRepositioning, setIsRepositioning] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Atualiza o estado local quando o banner é carregado do servidor
  useEffect(() => {
    if (banner) {
      setBannerImage(banner);
      setImageError(false);
    }
  }, [banner]);

  const handleBannerUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        // 1. Criar URL temporária
        const imageUrl = URL.createObjectURL(file);
        
        // 2. Atualizar no banco
        await updateBanner(imageUrl);
        
        // 3. Atualizar estado local
        setBannerImage(imageUrl);
        setImageError(false);
      } catch (error) {
        console.error('Error uploading banner:', error);
        handleImageError();
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleWheel = useCallback((e: WheelEvent) => {
    if (!isRepositioning) return;
    
    e.preventDefault();
    const currentPosition = Number(bannerPosition);
    const delta = e.deltaY * 0.1;
    const newPosition = Math.max(0, Math.min(100, currentPosition + delta));
    
    setBannerPosition(newPosition.toString());
  }, [isRepositioning, bannerPosition]);

  useEffect(() => {
    if (isRepositioning) {
      document.addEventListener('wheel', handleWheel, { passive: false });
      document.body.style.cursor = 'row-resize';
    } else {
      document.removeEventListener('wheel', handleWheel);
      document.body.style.cursor = '';
    }

    return () => {
      document.removeEventListener('wheel', handleWheel);
      document.body.style.cursor = '';
    };
  }, [isRepositioning, handleWheel]);

  const handleImageError = () => {
    setImageError(true);
    setBannerImage("");
    updateBanner(""); // Limpa a URL no banco
  };

  return (
    <div className="relative w-full h-60 mb-6 rounded-3xl overflow-hidden group">
      {bannerImage && !imageError ? (
        <>
          <div className={`relative w-full h-full ${isRepositioning ? 'cursor-row-resize' : ''}`}>
            <img 
              src={bannerImage} 
              alt="Banner" 
              className="w-full h-full object-cover transition-all duration-300"
              style={{ objectPosition: `center ${bannerPosition}%` }}
              onError={handleImageError}
            />
            {isRepositioning && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="text-white text-center">
                  <Move className="w-8 h-8 mx-auto mb-2" />
                  <span className="text-sm">Use a roda do mouse para ajustar</span>
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
            <span className="text-white text-sm">
              {isUploading ? 'Carregando...' : 'Clique para adicionar uma imagem de capa'}
            </span>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleBannerUpload}
            className="hidden"
            disabled={isUploading}
          />
        </label>
      )}
    </div>
  );
} 
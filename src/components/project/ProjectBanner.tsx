"use client"

import { useCallback, useEffect, useState } from 'react';
import { ImagePlus, Move, Link } from "lucide-react";
import { Button } from "../ui/button";
import { useGetProject } from '@/hooks/useGetProject';
import { useUpdateProject } from '@/hooks/useUpdateProject';
import { useParams } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

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
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

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

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) return;
    
    setIsUploading(true);
    try {
      await updateBanner(imageUrl);
      setBannerImage(imageUrl);
      setImageError(false);
      setShowImageDialog(false);
      setImageUrl("");
    } catch (error) {
      console.error('Error setting banner URL:', error);
      handleImageError();
    } finally {
      setIsUploading(false);
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
    <>
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
          <div 
            onClick={() => setShowImageDialog(true)}
            className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-20"
          >
            <div className="flex flex-col items-center gap-2">
              <ImagePlus className="w-8 h-8 text-white" />
              <span className="text-white text-sm">
                {isUploading ? 'Carregando...' : 'Clique para adicionar uma imagem de capa'}
              </span>
            </div>
          </div>
        )}
      </div>

      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar imagem de capa</DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">Upload</TabsTrigger>
              <TabsTrigger value="url">URL</TabsTrigger>
            </TabsList>

            <TabsContent value="upload">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <ImagePlus className="w-8 h-8 mb-2 text-gray-500" />
                  <p className="text-sm text-gray-500">Clique para fazer upload</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBannerUpload}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
            </TabsContent>

            <TabsContent value="url">
              <form onSubmit={handleUrlSubmit} className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    type="url"
                    placeholder="Cole a URL da imagem aqui"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    disabled={isUploading}
                  />
                  <Button type="submit" disabled={isUploading || !imageUrl}>
                    {isUploading ? 'Carregando...' : 'Adicionar'}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
} 
"use client"

import { useCallback, useEffect, useState } from 'react';
import { ImagePlus, Move, Link } from "lucide-react";
import { Button } from "../../ui/button";
import { useGetProject } from '@/hooks/useGetProjectByID';
import { useUpdateProject } from '@/hooks/useUpdateProject';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { ProjectBannerProps, ProjectBannerState } from './types';
import { useProjectStore } from '@/store/useProjectStore';

export function ProjectBanner({ editable = true, projectId, initialBanner }: ProjectBannerProps) {
  const { banner } = useGetProject(projectId);
  const { updateBanner } = useUpdateProject(projectId);
  const { updateProjectField } = useProjectStore();

  const [state, setState] = useState<ProjectBannerState>({
    bannerImage: initialBanner || "",
    bannerPosition: "50",
    isRepositioning: false,
    imageError: false,
    isUploading: false,
    showImageDialog: false,
    imageUrl: ""
  });

  // Atualiza o estado local quando o banner é carregado do servidor
  useEffect(() => {
    if (banner) {
      setState(prev => ({ ...prev, bannerImage: banner, imageError: false }));
    }
  }, [banner]);

  const handleBannerUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setState(prev => ({ ...prev, isUploading: true }));
      try {
        // Em vez de usar URL.createObjectURL, vamos converter para base64
        const base64 = await convertToBase64(file);
        await updateBanner(base64);
        setState(prev => ({ 
          ...prev, 
          bannerImage: base64, 
          imageError: false,
          showImageDialog: false 
        }));
        updateProjectField('banner', base64);
      } catch (error) {
        console.error('Error uploading banner:', error);
        handleImageError();
      } finally {
        setState(prev => ({ ...prev, isUploading: false }));
      }
    }
  };

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.imageUrl) return;
    
    setState(prev => ({ ...prev, isUploading: true }));
    try {
      await updateBanner(state.imageUrl);
      setState(prev => ({ 
        ...prev, 
        bannerImage: state.imageUrl, 
        imageError: false, 
        showImageDialog: false, 
        imageUrl: "" 
      }));
      updateProjectField('banner', state.imageUrl);
    } catch (error) {
      console.error('Error setting banner URL:', error);
      handleImageError();
    } finally {
      setState(prev => ({ ...prev, isUploading: false }));
    }
  };

  const handleWheel = useCallback((e: WheelEvent) => {
    if (!state.isRepositioning) return;
    
    e.preventDefault();
    const currentPosition = Number(state.bannerPosition);
    const delta = e.deltaY * 0.1;
    const newPosition = Math.max(0, Math.min(100, currentPosition + delta));
    
    setState(prev => ({ ...prev, bannerPosition: newPosition.toString() }));
  }, [state.isRepositioning, state.bannerPosition]);

  useEffect(() => {
    if (state.isRepositioning) {
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
  }, [state.isRepositioning, handleWheel]);

  const handleImageError = () => {
    setState(prev => ({ ...prev, imageError: true, bannerImage: "" }));
    updateBanner(""); // Limpa a URL no banco
  };

  // Função auxiliar para converter File para base64
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  return (
    <>
      <div className="relative w-full h-60 mb-6 rounded-3xl overflow-hidden group">
        {state.bannerImage && !state.imageError ? (
          <>
            <div className={`relative w-full h-full ${state.isRepositioning && editable ? 'cursor-row-resize' : ''}`}>
              <img 
                src={state.bannerImage} 
                alt="Banner" 
                className="w-full h-full object-cover transition-all duration-300"
                style={{ objectPosition: `center ${state.bannerPosition}%` }}
                onError={handleImageError}
              />
              {state.isRepositioning && editable && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="text-white text-center">
                    <Move className="w-8 h-8 mx-auto mb-2" />
                    <span className="text-sm">Use a roda do mouse para ajustar</span>
                  </div>
                </div>
              )}
            </div>
            {editable && (
              <Button
                variant="secondary"
                size="sm"
                className={`absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-30 ${
                  state.isRepositioning ? 'bg-primary text-primary-foreground' : ''
                }`}
                onClick={() => setState(prev => ({ ...prev, isRepositioning: !state.isRepositioning }))}
              >
                <Move className="w-4 h-4 mr-2" />
                {state.isRepositioning ? 'Concluir' : 'Reposicionar'}
              </Button>
            )}
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500" />
        )}

        {!state.isRepositioning && editable && (
          <div 
            onClick={() => setState(prev => ({ ...prev, showImageDialog: true }))}
            className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-20"
          >
            <div className="flex flex-col items-center gap-2">
              <ImagePlus className="w-8 h-8 text-white" />
              <span className="text-white text-sm">
                {state.isUploading ? 'Carregando...' : 'Clique para adicionar uma imagem de capa'}
              </span>
            </div>
          </div>
        )}
      </div>

      <Dialog 
        open={state.showImageDialog} 
        onOpenChange={() => setState(prev => ({ ...prev, showImageDialog: false }))}
      >
        <DialogContent className="w-full">
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
                  disabled={state.isUploading}
                />
              </label>
            </TabsContent>

            <TabsContent value="url">
              <form onSubmit={handleUrlSubmit} className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    type="url"
                    placeholder="Cole a URL da imagem aqui"
                    value={state.imageUrl}
                    onChange={(e) => setState(prev => ({ ...prev, imageUrl: e.target.value }))}
                    disabled={state.isUploading}
                  />
                  <Button type="submit" disabled={state.isUploading || !state.imageUrl}>
                    {state.isUploading ? 'Carregando...' : 'Adicionar'}
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
"use client"

import { ImagePlus } from "lucide-react";
import { useGetProject } from '@/hooks/useGetProject';
import { useUpdateProject } from '@/hooks/useUpdateProject';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useProjectStore } from '@/store/useProjectStore';

export function ProjectInfo() {
  const params = useParams();
  const projectId = params.id as string;
  const { logo } = useGetProject(projectId);
  const { updateLogo, updateName, updateDescription } = useUpdateProject(projectId);
  
  const { currentProject, updateProjectField } = useProjectStore();
  const [imageError, setImageError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleImageError = () => {
    setImageError(true);
    updateLogo(""); // Limpa a URL no banco
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const imageUrl = URL.createObjectURL(file);
        await updateLogo(imageUrl);
        setImageUrl(imageUrl);
        setImageError(false);
      } catch (error) {
        console.error('Error uploading logo:', error);
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
      await updateLogo(imageUrl);
      setImageUrl("");
    } catch (error) {
      console.error('Error setting logo URL:', error);
      handleImageError();
    } finally {
      setIsUploading(false);
    }
  };

  const handleNameChange = async (value: string) => {
    updateProjectField('name', value);
    await updateName(value);
  };

  const handleDescriptionChange = async (value: string) => {
    updateProjectField('description', value);
    await updateDescription(value);
  };

  return (
    <>
      <div className="flex items-center gap-4 mb-4 mt-4">
        <div 
          className="relative w-16 h-16 rounded-lg overflow-hidden group cursor-pointer"
          onClick={() => setShowImageDialog(true)}
        >
          {logo && !imageError ? (
            <img 
              src={logo} 
              alt="Project" 
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500" />
          )}
          
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <ImagePlus className="w-6 h-6 text-white" />
          </div>
        </div>
        <div>
          <input
            type="text"
            value={currentProject?.name || ''}
            onChange={(e) => handleNameChange(e.target.value)}
            className="text-3xl font-bold bg-transparent border-none focus:outline-none w-full"
          />
          <input
            type="text"
            value={currentProject?.description || ''}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            className="text-muted-foreground bg-transparent border-none focus:outline-none w-full"
          />
        </div>
      </div>

      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar logo do projeto</DialogTitle>
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
                  onChange={handleImageUpload}
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
"use client"

import { ImagePlus } from "lucide-react";
import { useGetProject } from '@/hooks/useGetProjectByID';
import { useUpdateProject } from '@/hooks/useUpdateProject';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { useProjectStore } from '@/store/useProjectStore';
import { ProjectInfoProps, ProjectInfoState, ProjectInfoHandlers } from './types';

export function ProjectInfo({ editable = true }: ProjectInfoProps) {
  const params = useParams();
  const projectId = params.id as string;
  const { logo } = useGetProject(projectId);
  const { updateLogo, updateName, updateDescription } = useUpdateProject(projectId);
  
  const { currentProject, updateProjectField } = useProjectStore();
  const [state, setState] = useState<ProjectInfoState>({
    imageError: false,
    isUploading: false,
    showImageDialog: false,
    imageUrl: ""
  });

  const handlers: ProjectInfoHandlers = {
    handleImageError: () => {
      setState(prev => ({ ...prev, imageError: true }));
      updateLogo("");
    },
    handleImageUpload: async (event) => {
      const file = event.target.files?.[0];
      if (file) {
        setState(prev => ({ ...prev, isUploading: true }));
        try {
          const imageUrl = URL.createObjectURL(file);
          await updateLogo(imageUrl);
          setState(prev => ({ ...prev, imageUrl }));
          setState(prev => ({ ...prev, imageError: false }));
        } catch (error) {
          console.error('Error uploading logo:', error);
          handlers.handleImageError();
        } finally {
          setState(prev => ({ ...prev, isUploading: false }));
        }
      }
    },
    handleUrlSubmit: async (e) => {
      e.preventDefault();
      if (!state.imageUrl) return;
      
      setState(prev => ({ ...prev, isUploading: true }));
      try {
        await updateLogo(state.imageUrl);
        setState(prev => ({ ...prev, imageUrl: "" }));
      } catch (error) {
        console.error('Error setting logo URL:', error);
        handlers.handleImageError();
      } finally {
        setState(prev => ({ ...prev, isUploading: false }));
      }
    },
    handleNameChange: async (value) => {
      updateProjectField('name', value);
      await updateName(value);
    },
    handleDescriptionChange: async (value) => {
      updateProjectField('description', value);
      await updateDescription(value);
    }
  };

  return (
    <>
      <div className="flex items-center gap-4 mb-4 mt-4">
        <div 
          className={`relative w-16 h-16 rounded-lg overflow-hidden ${editable ? 'group cursor-pointer' : ''}`}
          onClick={() => editable && setState(prev => ({ ...prev, showImageDialog: true }))}
        >
          {logo && !state.imageError ? (
            <img 
              src={logo} 
              alt="Project" 
              className="w-full h-full object-cover"
              onError={handlers.handleImageError}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500" />
          )}
          
          {editable && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ImagePlus className="w-6 h-6 text-white" />
            </div>
          )}
        </div>
        <div>
          <input
            type="text"
            value={currentProject?.name || ''}
            onChange={(e) => editable && handlers.handleNameChange(e.target.value)}
            className="text-3xl font-bold bg-transparent border-none focus:outline-none w-full"
            readOnly={!editable}
          />
          <input
            type="text"
            value={currentProject?.description || ''}
            onChange={(e) => editable && handlers.handleDescriptionChange(e.target.value)}
            className="text-muted-foreground bg-transparent border-none focus:outline-none w-full"
            readOnly={!editable}
          />
        </div>
      </div>

      <Dialog 
        open={state.showImageDialog} 
        onOpenChange={(value) => setState(prev => ({ ...prev, showImageDialog: value }))}
      >
        <DialogContent className="w-full">
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
                  onChange={handlers.handleImageUpload}
                  className="hidden"
                  disabled={state.isUploading}
                />
              </label>
            </TabsContent>

            <TabsContent value="url">
              <form onSubmit={handlers.handleUrlSubmit} className="space-y-4">
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
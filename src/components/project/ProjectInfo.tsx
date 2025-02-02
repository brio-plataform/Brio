"use client"

import { ImagePlus } from "lucide-react";
import { useGetProject } from '@/hooks/useGetProject';
import { useUpdateProject } from '@/hooks/useUpdateProject';
import { useParams } from 'next/navigation';
import { useQueryState } from 'nuqs';
import { useState, useEffect } from 'react';

export function ProjectInfo() {
  const params = useParams();
  const projectId = params.id as string;
  const { name, description, logo } = useGetProject(projectId);
  const { updateName, updateDescription, updateLogo } = useUpdateProject(projectId);
  
  const [projectName, setProjectName] = useQueryState('name');
  const [projectDescription, setProjectDescription] = useQueryState('description');
  const [projectLogo, setProjectLogo] = useState("");
  const [imageError, setImageError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Sincroniza estados locais com dados do servidor
  useEffect(() => {
    if (name) setProjectName(name);
    if (description) setProjectDescription(description);
    if (logo) {
      setProjectLogo(logo);
      setImageError(false);
    }
  }, [name, description, logo, setProjectName, setProjectDescription]);

  // Define valores iniciais quando não houver dados
  useEffect(() => {
    if (!name && !projectName) setProjectName("New Project");
    if (!description && !projectDescription) setProjectDescription("New Project Description");
  }, [name, description, projectName, projectDescription]);

  const handleImageError = () => {
    setImageError(true);
    setProjectLogo("");
    updateLogo(""); // Limpa a URL no banco
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const imageUrl = URL.createObjectURL(file);
        await updateLogo(imageUrl);
        setProjectLogo(imageUrl);
        setImageError(false);
      } catch (error) {
        console.error('Error uploading logo:', error);
        handleImageError();
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleNameChange = async (value: string) => {
    setProjectName(value);
    await updateName(value);
  };

  const handleDescriptionChange = async (value: string) => {
    setProjectDescription(value);
    await updateDescription(value);
  };

  return (
    <div className="flex items-center gap-4 mb-4 mt-4">
      <div className="relative w-16 h-16 rounded-lg overflow-hidden group cursor-pointer">
        {projectLogo && !imageError ? (
          <img 
            src={projectLogo} 
            alt="Project" 
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500" />
        )}
        
        <label className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
          <ImagePlus className="w-6 h-6 text-white" />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            disabled={isUploading}
          />
        </label>
      </div>
      <div>
        <input
          type="text"
          value={projectName || ''}
          onChange={(e) => handleNameChange(e.target.value)}
          className="text-3xl font-bold bg-transparent border-none focus:outline-none w-full"
        />
        <input
          type="text"
          value={projectDescription || ''}
          onChange={(e) => handleDescriptionChange(e.target.value)}
          className="text-muted-foreground bg-transparent border-none focus:outline-none w-full"
        />
      </div>
    </div>
  );
} 
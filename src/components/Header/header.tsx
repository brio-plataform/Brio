"use client"

import { useQueryState } from 'nuqs'
import { useState, useEffect } from 'react'
import { useGetProject } from '@/hooks/useGetProject'
import { useUpdateProject } from '@/hooks/useUpdateProject'
import { useParams } from 'next/navigation'
import { HeaderTop } from './header-top'
import { HeaderCore } from './header-core'
import { HeaderBottom } from './header-bottom'
import { useProjectStore } from '@/store/useProjectStore'

interface Collaborator {
  id: string;
  name: string;
  avatar: string;
  role: string;
  status: 'online' | 'offline' | 'away';
}

export function Header() {
  const params = useParams();
  const projectId = params.id as string;
  
  const { 
    name: initialName, 
    description: initialDescription, 
    updatedAt,
    versions = [],
    wordCount: initialWordCount,
    citations: initialCitations,
    model: initialModel,
    visibility: initialVisibility,
    progress: initialProgress,
    type: initialType,
    project
  } = useGetProject(projectId);

  const { 
    updateName, 
    updateDescription, 
    updateContent,
    updateWordCount,
    updateModel,
    updateVisibility,
    updateProgress,
    updateType,
    isLoading: isSaving 
  } = useUpdateProject(projectId);

  const [projectName, setProjectName] = useQueryState('name', {
    defaultValue: "",
    parse: (value) => value || ""
  });
  
  const [projectDescription, setProjectDescription] = useQueryState('description', {
    defaultValue: "",
    parse: (value) => value || ""
  });
  
  const [documentType, setDocumentType] = useState<'article' | 'thesis' | 'book' | 'research'>(initialModel || 'article');
  const [visibility, setVisibility] = useState<'private' | 'public' | 'institutional'>(initialVisibility || 'private');
  const [progress, setProgress] = useState(initialProgress || 0);
  const [wordCount, setWordCount] = useState(initialWordCount || 0);
  const [citationCount, setCitationCount] = useState(initialCitations?.length || 0);
  const [autoSaveStatus, setAutoSaveStatus] = useState(isSaving ? "Salvando..." : "Salvo");
  const [lastEdited, setLastEdited] = useState<Date>(new Date());
  const [collaborators] = useState<Collaborator[]>([]);
  const [aiAssistant] = useState(false);
  const [currentVersion, setCurrentVersion] = useState<string>("1.0.0");

  const { setCurrentProject, saveProject } = useProjectStore();

  useEffect(() => {
    if (project) {
      setCurrentProject(project);
    }
  }, [project, setCurrentProject]);

  useEffect(() => {
    if (projectName === "" && initialName) setProjectName(initialName);
    if (projectDescription === "" && initialDescription) setProjectDescription(initialDescription);
    if (initialModel) setDocumentType(initialModel);
    if (initialVisibility) setVisibility(initialVisibility);
    if (initialProgress) setProgress(initialProgress);
    if (initialWordCount) setWordCount(initialWordCount);
    if (initialCitations) setCitationCount(initialCitations.length);
  }, [initialName, initialDescription, initialModel, initialVisibility, initialProgress, initialWordCount, initialCitations, setProjectName, setProjectDescription, projectName, projectDescription]);

  const handleModelChange = async (value: 'article' | 'thesis' | 'book' | 'research') => {
    setDocumentType(value);
    try {
      await updateModel(value);
    } catch (error) {
      console.error('Error updating model:', error);
      setDocumentType(documentType);
    }
  };

  const handleProgressChange = async (event: React.FormEvent<HTMLDivElement>) => {
    const newProgress = Number((event.target as HTMLProgressElement).value);
    setProgress(newProgress);
    try {
      await updateProgress(newProgress);
    } catch (error) {
      console.error('Error updating progress:', error);
      setProgress(progress);
    }
  };

  const handleButtonSelectChange = (value: string) => {
    handleModelChange(value as 'article' | 'thesis' | 'book' | 'research');
  };

  const handleAutoSave = async () => {
    setAutoSaveStatus("Salvando...");
    try {
      await saveProject({
        name: projectName,
        description: projectDescription,
        model: documentType,
        visibility: visibility,
        progress: progress,
        wordCount: wordCount,
        updatedAt: new Date().toISOString(),
      });

      setAutoSaveStatus("Salvo às " + new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Erro ao salvar:', error);
      setAutoSaveStatus("Erro ao salvar");
    }
  };

  useEffect(() => {
    if (updatedAt) {
      setLastEdited(new Date(updatedAt));
    }
  }, [updatedAt]);

  useEffect(() => {
    const latestVersion = versions[versions.length - 1];
    if (latestVersion) {
      setCurrentVersion(latestVersion.version);
    }
  }, [versions]);

  const handleVisibilityChange = async (value: 'private' | 'public' | 'institutional') => {
    setVisibility(value);
    try {
      await updateVisibility(value);
    } catch (error) {
      console.error('Error updating visibility:', error);
      setVisibility(visibility);
    }
  };

  return (
    <div className="flex flex-col border-b gap-2 pb-3 bg-background w-full sticky top-0 z-40">
      <HeaderTop 
        lastEdited={lastEdited}
        wordCount={wordCount}
        citationCount={citationCount}
        aiAssistant={aiAssistant}
        progress={progress}
        handleProgressChange={handleProgressChange}
      />
      
      <HeaderCore 
        projectName={projectName}
        projectDescription={projectDescription}
        documentType={documentType}
        visibility={visibility}
        autoSaveStatus={autoSaveStatus}
        handleButtonSelectChange={handleButtonSelectChange}
        handleVisibilityChange={handleVisibilityChange}
        handleAutoSave={handleAutoSave}
      />
      
      <HeaderBottom 
        currentVersion={currentVersion}
        collaborators={collaborators}
      />
    </div>
  )
}
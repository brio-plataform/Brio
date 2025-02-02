"use client"

import { useQueryState } from 'nuqs'
import { useState, useEffect } from 'react'
import { useGetProject } from '@/hooks/useGetProject'
import { useUpdateProject } from '@/hooks/useUpdateProject'
import { useParams } from 'next/navigation'
import { useEditorStore } from '@/store/useEditorStore'
import { HeaderTop } from './header-top'
import { HeaderCore } from './header-core'
import { HeaderBottom } from './header-bottom'

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
    banner,
    logo,
    wordCount: initialWordCount,
    citations: initialCitations,
    model: initialModel,
    visibility: initialVisibility,
    progress: initialProgress,
    type: initialType
  } = useGetProject(projectId);

  const { 
    updateName, 
    updateDescription, 
    updateContent,
    updateBanner,
    updateLogo,
    updateWordCount,
    updateModel,
    updateVisibility,
    updateProgress,
    updateType,
    isLoading: isSaving 
  } = useUpdateProject(projectId);

  // Usar useQueryState para nome e descrição com configuração de tipo
  const [projectName, setProjectName] = useQueryState('name', {
    defaultValue: "",
    parse: (value) => value || ""
  });
  
  const [projectDescription, setProjectDescription] = useQueryState('description', {
    defaultValue: "",
    parse: (value) => value || ""
  });
  
  // Outros estados locais
  const [documentType, setDocumentType] = useState<'article' | 'thesis' | 'book' | 'research'>(initialModel || 'article');
  const [visibility, setVisibility] = useState<'private' | 'public' | 'institutional'>(initialVisibility || 'private');
  const [progress, setProgress] = useState(initialProgress || 0);
  const [wordCount, setWordCount] = useState(initialWordCount || 0);
  const [citationCount, setCitationCount] = useState(initialCitations?.length || 0);

  // Update states when initial data changes - só usa API se não tiver na URL
  useEffect(() => {
    if (projectName === "" && initialName) setProjectName(initialName);
    if (projectDescription === "" && initialDescription) setProjectDescription(initialDescription);
    if (initialModel) setDocumentType(initialModel);
    if (initialVisibility) setVisibility(initialVisibility);
    if (initialProgress) setProgress(initialProgress);
    if (initialWordCount) setWordCount(initialWordCount);
    if (initialCitations) setCitationCount(initialCitations.length);
  }, [initialName, initialDescription, initialModel, initialVisibility, initialProgress, initialWordCount, initialCitations, setProjectName, setProjectDescription, projectName, projectDescription]);

  // Handle model type change
  const handleModelChange = async (value: 'article' | 'thesis' | 'book' | 'research') => {
    setDocumentType(value);
    try {
      await updateModel(value);
    } catch (error) {
      console.error('Error updating model:', error);
      setDocumentType(documentType); // Revert on error
    }
  };

  // Handle progress change with form event
  const handleProgressChange = async (event: React.FormEvent<HTMLDivElement>) => {
    // Get the value from the progress element
    const newProgress = Number((event.target as HTMLProgressElement).value);
    setProgress(newProgress);
    try {
      await updateProgress(newProgress);
    } catch (error) {
      console.error('Error updating progress:', error);
      setProgress(progress); // Revert on error
    }
  };

  // Modify the ButtonSelect onChange handler
  const handleButtonSelectChange = (value: string) => {
    handleModelChange(value as 'article' | 'thesis' | 'book' | 'research');
  };

  const [autoSaveStatus, setAutoSaveStatus] = useState(isSaving ? "Salvando..." : "Salvo");
  
  // Estados adicionais
  const [lastEdited, setLastEdited] = useState<Date>(new Date());
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [aiAssistant, setAiAssistant] = useState(false);
  const [currentVersion, setCurrentVersion] = useState<string>("1.0.0");
  const [hasChanges, setHasChanges] = useState(false);

  const [projectBanner, setProjectBanner] = useQueryState('banner', {
    defaultValue: banner || "",
    parse: (value) => value || banner || ""
  });

  const [projectLogo, setProjectLogo] = useQueryState('logo', {
    defaultValue: logo || "",
    parse: (value) => value || logo || ""
  });

  const handleAutoSave = async () => {
    setAutoSaveStatus("Salvando...");
    try {
      const projectContent = useEditorStore.getState().projectContent || '{}';
      
      await Promise.all([
        updateName(projectName),
        updateDescription(projectDescription),
        updateContent(JSON.parse(projectContent)),
        updateBanner(projectBanner),
        updateLogo(projectLogo),
        updateWordCount(wordCount),
        updateModel(documentType),
        updateVisibility(visibility),
        updateProgress(progress),
        updateType(initialType || 'institutional')
      ]);

      setAutoSaveStatus("Salvo às " + new Date().toLocaleTimeString());
      setHasChanges(false);
    } catch (error) {
      console.error('Erro ao salvar:', error);
      setAutoSaveStatus("Erro ao salvar");
    }
  };

  // Update lastEdited when project updates
  useEffect(() => {
    if (updatedAt) {
      setLastEdited(new Date(updatedAt));
    }
  }, [updatedAt]);

  // Update currentVersion when versions change
  useEffect(() => {
    const latestVersion = versions[versions.length - 1];
    if (latestVersion) {
      setCurrentVersion(latestVersion.version);
    }
  }, [versions]);

  // Handle visibility change
  const handleVisibilityChange = async (value: 'private' | 'public' | 'institutional') => {
    setVisibility(value);
    try {
      await updateVisibility(value);
    } catch (error) {
      console.error('Error updating visibility:', error);
      setVisibility(visibility); // Revert on error
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
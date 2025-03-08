"use client"

import { useState, useEffect } from 'react'
import { useGetProject } from '@/hooks/useGetProjectByID'
import { useUpdateProject } from '@/hooks/useUpdateProject'
import { useParams } from 'next/navigation'
import { HeaderTop } from './HeaderTop/header-top'
import { HeaderCore } from './HeaderCore/header-core'
import { HeaderBottom } from './HeaderBottom/header-bottom'
import { useProjectStore } from '@/store/useProjectStore'
import type { 
  HeaderProps, 
  HeaderState, 
  ProjectModel, 
  ProjectVisibility,
  HeaderCollaborator 
} from './types'

export function Header() {
  const params = useParams();
  const id = params.id as string;
  
  const { currentProject } = useProjectStore();
  
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
  } = useGetProject(id);

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
  } = useUpdateProject(id);

  const [documentType, setDocumentType] = useState<ProjectModel>(initialModel || 'article');
  const [visibility, setVisibility] = useState<ProjectVisibility>(initialVisibility || 'private');
  const [progress, setProgress] = useState(initialProgress || 0);
  const [wordCount, setWordCount] = useState(initialWordCount || 0);
  const [citationCount, setCitationCount] = useState(initialCitations?.length || 0);
  const [lastEdited, setLastEdited] = useState<Date>(new Date());
  const [collaborators] = useState<HeaderCollaborator[]>([]);
  const [aiAssistant] = useState(false);
  const [currentVersion, setCurrentVersion] = useState<string>("1.0.0");

  const { setCurrentProject, saveProject } = useProjectStore();

  useEffect(() => {
    if (project) {
      setCurrentProject(project);
    }
  }, [project, setCurrentProject]);

  useEffect(() => {
    if (initialModel) setDocumentType(initialModel);
    if (initialVisibility) setVisibility(initialVisibility);
    if (initialProgress) setProgress(initialProgress);
    if (initialWordCount) setWordCount(initialWordCount);
    if (initialCitations) setCitationCount(initialCitations.length);
  }, [initialModel, initialVisibility, initialProgress, initialWordCount, initialCitations, setDocumentType, setVisibility, setProgress, setWordCount, setCitationCount]);

  const handleModelChange = async (value: ProjectModel) => {
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
    handleModelChange(value as ProjectModel);
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

  const handleVisibilityChange = async (value: ProjectVisibility) => {
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
        projectName={currentProject?.name || ''}
        projectDescription={currentProject?.description || ''}
        documentType={documentType}
        visibility={visibility}
        handleButtonSelectChange={handleButtonSelectChange}
        handleVisibilityChange={handleVisibilityChange}
      />
      
      <HeaderBottom 
        currentVersion={currentVersion}
        collaborators={collaborators}
      />
    </div>
  )
}
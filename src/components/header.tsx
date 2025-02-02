"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ChevronDown,
  GitBranch,
  Tag,
  Search,
  Plus,
  Eye,
  GitFork,
  Users,
  MessageSquare,
  Save,
  Share,
  Settings,
  History,
  FileText,
  Download,
  Clock,
  Brain,
  Library,
  Quote,
  Lock,
  Globe,
  School,
  Building,
  Coffee,
  Activity,
  BarChart2
} from "lucide-react"
import { useQueryState } from 'nuqs'
import { useState, useEffect } from 'react'
import { ButtonSelect } from "@/components/ui/button-select"
import { useGetProject } from '@/hooks/useGetProject'
import { useUpdateProject } from '@/hooks/useUpdateProject'
import { useParams } from 'next/navigation'
import { useEditorStore } from '@/store/useEditorStore'

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
    content,
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
    updateCitations,
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

  // Handle word count change
  const handleWordCountChange = async (newCount: number) => {
    setWordCount(newCount);
    try {
      await updateWordCount(newCount);
    } catch (error) {
      console.error('Error updating word count:', error);
      setWordCount(wordCount); // Revert on error
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
      {/* Barra Superior - Informações Rápidas */}
      <div className="flex items-center justify-between px-4 py-1 bg-muted/30">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Última edição: {lastEdited.toLocaleTimeString()}
          </span>
          <span className="flex items-center gap-1">
            <FileText className="h-3 w-3" />
            {wordCount} palavras
          </span>
          <span className="flex items-center gap-1">
            <Quote className="h-3 w-3" />
            {citationCount} citações
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-xs">
            <Brain className="h-3 w-3 mr-1" />
            IA Assistente {aiAssistant ? 'Ativo' : 'Inativo'}
          </Button>
          <Progress 
            value={progress} 
            className="w-20 h-2" 
            onChange={handleProgressChange}
          />
          <span className="text-xs text-muted-foreground">{progress}% concluído</span>
        </div>
      </div>

      {/* Primeira Linha: Título e Controles Principais */}
      <div className="flex items-center justify-between px-6">
        <div className="flex flex-col gap-2 flex-1">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-6">
                <h1 className="text-2xl font-bold">{projectName || ''}</h1>
                <ButtonSelect
                  value={documentType}
                  onChange={handleButtonSelectChange}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {projectDescription || ''}
              </p>
            </div>
        </div>

        {/* Ações Principais */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{autoSaveStatus}</span>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                {visibility === 'private' ? <Lock className="h-4 w-4" /> : visibility === 'public' ? <Globe className="h-4 w-4" /> : <Building className="h-4 w-4" />}
                {visibility === 'private' ? 'Privado' : visibility === 'public' ? 'Público' : 'Institucional'}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleVisibilityChange('private')}>
                <Lock className="h-4 w-4 mr-2" /> Privado
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleVisibilityChange('public')}>
                <Globe className="h-4 w-4 mr-2" /> Público
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleVisibilityChange('institutional')}>
                <Building className="h-4 w-4 mr-2" /> Institucional
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          
          <Button variant="outline" size="sm" className="gap-2">
            <Share className="h-4 w-4" />
            Compartilhar
          </Button>
          
          <Button variant="default" size="sm" className="gap-2" onClick={handleAutoSave}>
            <Save className="h-4 w-4" />
            Salvar
          </Button>
        </div>
      </div>

      {/* Segunda Linha: Controles de Documento */}
      <div className="flex items-center justify-between px-6 gap-4">
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <GitBranch className="h-4 w-4" />
                v{currentVersion}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <History className="h-4 w-4 mr-2" /> Ver histórico
              </DropdownMenuItem>
              <DropdownMenuItem>
                <GitFork className="h-4 w-4 mr-2" /> Criar nova versão
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="sm" className="gap-2">
            <Tag className="h-4 w-4" />
            Tags
          </Button>

          <Button variant="ghost" size="sm" className="gap-2">
            <School className="h-4 w-4" />
            Instituição
          </Button>

          <Button variant="ghost" size="sm" className="gap-2">
            <Settings className="h-4 w-4" />
            Configurações
          </Button>
        </div>

        <div className="flex-1 max-w-lg">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar no documento..." className="pl-8" />
          </div>
        </div>
      </div>

      {/* Terceira Linha: Ferramentas Acadêmicas */}
      <div className="flex items-center justify-between px-6 gap-4">
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <Users className="h-4 w-4" />
                Colaboradores
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {collaborators.map(collaborator => (
                <DropdownMenuItem key={collaborator.id}>
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src={collaborator.avatar} />
                    <AvatarFallback>{collaborator.name[0]}</AvatarFallback>
                  </Avatar>
                  {collaborator.name} - {collaborator.role}
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem>
                <Plus className="h-4 w-4 mr-2" /> Adicionar colaborador
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="sm" className="gap-2">
            <Library className="h-4 w-4" />
            Bibliografia
          </Button>

          <Button variant="ghost" size="sm" className="gap-2">
            <Quote className="h-4 w-4" />
            Citações
          </Button>

          <Button variant="ghost" size="sm" className="gap-2">
            <BarChart2 className="h-4 w-4" />
            Estatísticas
          </Button>

          <Button variant="ghost" size="sm" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Comentários
          </Button>

          <Button variant="ghost" size="sm" className="gap-2">
            <Eye className="h-4 w-4" />
            Visualizar
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-2">
            <Coffee className="h-4 w-4" />
            Fazer pausa
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <Activity className="h-4 w-4" />
            Foco
          </Button>
        </div>
      </div>
    </div>
  )
}
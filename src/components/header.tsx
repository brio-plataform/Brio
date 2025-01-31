"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectValue, SelectTrigger, SelectItem, SelectLabel, SelectGroup, SelectContent } from "@/components/ui/select"
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
  Code,
  Eye,
  GitFork,
  Star,
  Users,
  Book,
  MessageSquare,
  Calendar,
  Save,
  Share,
  Settings,
  History,
  FileText,
  Download,
  Upload,
  Clock,
  Brain,
  Library,
  Quote,
  Lock,
  Globe,
  School,
  Building,
  Award,
  BookOpen,
  Bookmark,
  AlertCircle,
  CheckCircle,
  Coffee,
  Activity,
  BarChart2
} from "lucide-react"
import { useQueryState, parseAsString } from 'nuqs'
import { useState, useEffect } from 'react'
import { ButtonSelect } from "@/components/ui/button-select"

  // Adicione no início do arquivo
import axios from 'axios';
import { useEditorStore } from '@/store/useEditorStore';

interface Collaborator {
  id: string;
  name: string;
  avatar: string;
  role: string;
  status: 'online' | 'offline' | 'away';
}

interface Institution {
  id: string;
  name: string;
  type: 'university' | 'research' | 'company';
}

export function Header() {
  // Estados principais
  const [projectName, setProjectName] = useQueryState('name', parseAsString.withDefault("Novo Estudo"));
  const [projectDescription, setProjectDescription] = useQueryState('description', parseAsString.withDefault("Descrição do Estudo"));
  const [isEditing, setIsEditing] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState("Salvo");
  
  // Estados adicionais
  const [documentType, setDocumentType] = useState<'article' | 'thesis' | 'book' | 'research'>('article');
  const [visibility, setVisibility] = useState<'private' | 'public' | 'institutional'>('private');
  const [progress, setProgress] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [citationCount, setCitationCount] = useState(0);
  const [lastEdited, setLastEdited] = useState<Date>(new Date());
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [institution, setInstitution] = useState<Institution | null>(null);
  const [aiAssistant, setAiAssistant] = useState(false);
  const [currentVersion, setCurrentVersion] = useState("1.0.0");
  const [hasChanges, setHasChanges] = useState(false);
  const [projectId] = useState("1");

  const handleAutoSave = async () => {
    setAutoSaveStatus("Salvando...");
    try {
      const projectContent = useEditorStore.getState().projectContent;
      
      if (!projectContent) {
        throw new Error('Nenhum conteúdo para salvar');
      }
  
      // Atualizar diretamente no endpoint de projetos
      await axios.patch(`http://localhost:3001/projects/${projectId}`, {
        content: JSON.parse(projectContent),
        updatedAt: new Date().toISOString()
      });
  
      setAutoSaveStatus("Salvo às " + new Date().toLocaleTimeString());
      setHasChanges(false);
    } catch (error) {
      console.error('Erro ao salvar:', error);
      setAutoSaveStatus("Erro ao salvar");
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
          <Progress value={progress} className="w-20 h-2" />
          <span className="text-xs text-muted-foreground">{progress}% concluído</span>
        </div>
      </div>

      {/* Primeira Linha: Título e Controles Principais */}
      <div className="flex items-center justify-between px-6">
        <div className="flex flex-col gap-2 flex-1">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-6">
                <h1 className="text-2xl font-bold">{projectName}</h1>
                <ButtonSelect
                  value={documentType}
                  onChange={(value) => setDocumentType(value as 'article' | 'thesis' | 'book' | 'research')}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {projectDescription}
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
              <DropdownMenuItem onClick={() => setVisibility('private')}>
                <Lock className="h-4 w-4 mr-2" /> Privado
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setVisibility('public')}>
                <Globe className="h-4 w-4 mr-2" /> Público
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setVisibility('institutional')}>
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
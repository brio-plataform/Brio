export interface ProjectInfoState {
  imageError: boolean
  isUploading: boolean
  showImageDialog: boolean
  imageUrl: string
  logoImage: string
}

export interface ProjectInfoProps {
  editable?: boolean
  projectId: string
  initialData?: {
    logo?: string
    name?: string
    description?: string
  }
}

export interface ProjectInfoHandlers {
  handleImageError: () => void
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>
  handleUrlSubmit: (e: React.FormEvent) => Promise<void>
  handleNameChange: (value: string) => Promise<void>
  handleDescriptionChange: (value: string) => Promise<void>
} 
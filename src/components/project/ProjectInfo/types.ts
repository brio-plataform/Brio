export interface ProjectInfoState {
  imageError: boolean
  isUploading: boolean
  showImageDialog: boolean
  imageUrl: string
}

export interface ProjectInfoProps {
  editable?: boolean
}

export interface ProjectInfoHandlers {
  handleImageError: () => void
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>
  handleUrlSubmit: (e: React.FormEvent) => Promise<void>
  handleNameChange: (value: string) => Promise<void>
  handleDescriptionChange: (value: string) => Promise<void>
} 
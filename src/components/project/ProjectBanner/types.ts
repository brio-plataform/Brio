export interface ProjectBannerState {
  bannerImage: string
  bannerPosition: string
  isRepositioning: boolean
  imageError: boolean
  isUploading: boolean
  showImageDialog: boolean
  imageUrl: string
}

export interface ProjectBannerProps {
  editable?: boolean
} 
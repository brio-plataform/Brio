import { ReactNode } from "react"

// Props do Editor
export interface EditorProps {
  initialContent?: string | null
  editable?: boolean
}

// Tema do Editor
export interface EditorThemeColors {
  editor: {
    text: string
    background: string
  }
  tooltip: {
    text: string
    background: string
  }
}

export interface EditorTheme {
  colors: EditorThemeColors
  borderRadius: number
  fontFamily: string
}

// Blocos do Editor
export interface EditorBlock {
  id: string
  type: "paragraph" | "heading" | "bulletListItem" | "numberedListItem" | "image"
  props: {
    textAlignment?: "left" | "center" | "right" | "justify"
    level?: 1 | 2 | 3
    textColor?: "default" | string
    backgroundColor?: "default" | string
    start?: number
    name?: string
    url?: string
    caption?: string
    showPreview?: boolean
    previewWidth?: number
  }
  content: Array<{
    type: "text" | "link" | "image"
    text?: string
    styles?: {
      bold?: boolean
      italic?: boolean
      underline?: boolean
      code?: boolean
      textColor?: string
      backgroundColor?: string
    }
    href?: string
    url?: string
  }>
  children?: EditorBlock[]
}

// Estado do Editor
export interface EditorState {
  hasChanges: boolean
  defaultContent: EditorBlock[]
}

// Ações do Editor
export interface EditorActions {
  setEditorContent: (content: string) => void
  saveEditorContent: () => Promise<void>
} 
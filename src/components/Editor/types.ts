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
  content: Array<{
    type: "text" | "link" | "image"
    text?: string
    styles?: {
      bold?: boolean
      italic?: boolean
      underline?: boolean
      strike?: boolean
      code?: boolean
      textColor?: string
      backgroundColor?: string
    }
    href?: string
    url?: string
  }>
  props?: {
    textAlignment?: "left" | "center" | "right"
    level?: 1 | 2 | 3
    textColor?: "default" | string
    backgroundColor?: "default" | string
  }
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
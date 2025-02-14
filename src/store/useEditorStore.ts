import { create } from 'zustand';

interface EditorState {
  projectContent: string | null;
  setProjectContent: (content: string) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  projectContent: null,
  setProjectContent: (content) => set({ projectContent: content }),
}));
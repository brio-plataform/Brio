"use client";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useEffect, useState } from "react";
import { useProjectStore } from '@/store/useProjectStore';
import type { 
  EditorProps, 
  EditorTheme, 
  EditorBlock, 
  EditorState 
} from './types';

export default function Editor({ initialContent, editable = true }: EditorProps) {
  const { setEditorContent, saveEditorContent } = useProjectStore();
  const [state, setState] = useState<EditorState>({
    hasChanges: false,
    defaultContent: [{
      id: crypto.randomUUID(),
      type: "paragraph",
      props: {
        textColor: "default",
        backgroundColor: "default",
        textAlignment: "left"
      },
      content: [
        {
          type: "text",
          text: "Comece a escrever seu projeto aqui...",
          styles: {}
        }
      ],
      children: []
    }]
  });
  
  const customTheme: EditorTheme = {
    colors: {
      editor: {
        text: "white",
        background: "zinc-500",
      },
      tooltip: {
        text: "#FFFFFF",
        background: "zinc-500",
      }
    },
    borderRadius: 4,
    fontFamily: "Inter, sans-serif",
  };

  // Função para validar o conteúdo inicial
  const getValidContent = (content: any) => {
    try {
      if (typeof content === 'string') {
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } else if (Array.isArray(content) && content.length > 0) {
        return content;
      }
    } catch (error) {
      console.error('Error parsing initialContent:', error);
    }
    return state.defaultContent;
  };

  const editor = useCreateBlockNote({
    initialContent: getValidContent(initialContent)
  });

  useEffect(() => {
    if (!editor) return;

    const unsubscribe = editor.onEditorContentChange(() => {
      const content = JSON.stringify(editor.topLevelBlocks, null, 2);
      setEditorContent(content);
      setState(prev => ({ ...prev, hasChanges: true }));
    });

    return () => unsubscribe;
  }, [editor, setEditorContent]);

  // Auto-save otimizado
  useEffect(() => {
    const interval = setInterval(() => {
      if (state.hasChanges) {
        saveEditorContent();
        setState(prev => ({ ...prev, hasChanges: false }));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [state.hasChanges, saveEditorContent]);

  return <BlockNoteView editor={editor} editable={editable} theme={customTheme} />;
}
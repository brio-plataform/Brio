"use client";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView, Theme } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { PartialBlock } from "@blocknote/core";
import { useEffect, useState } from "react";
import { useProjectStore } from '@/store/useProjectStore';
import type { EditorProps, EditorTheme } from '@/types/types';

export default function Editor({ initialContent, editable = true }: EditorProps) {
  const { setEditorContent, saveEditorContent } = useProjectStore();
  const [hasChanges, setHasChanges] = useState(false);
  
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

  const defaultContent = [{
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
  }];

  const editor = useCreateBlockNote({
    initialContent: initialContent 
      ? (typeof initialContent === 'string' && initialContent.trim() 
          ? JSON.parse(initialContent)
          : defaultContent)
      : defaultContent
  });

  useEffect(() => {
    if (!editor) return;

    const unsubscribe = editor.onEditorContentChange(() => {
      const content = JSON.stringify(editor.topLevelBlocks, null, 2);
      setEditorContent(content);
      setHasChanges(true);
    });

    return () => unsubscribe;
  }, [editor]);

  // Auto-save otimizado
  useEffect(() => {
    const interval = setInterval(() => {
      if (hasChanges) {
        saveEditorContent();
        setHasChanges(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [hasChanges, saveEditorContent]);

  return <BlockNoteView editor={editor} editable={editable} theme={customTheme} />;
}
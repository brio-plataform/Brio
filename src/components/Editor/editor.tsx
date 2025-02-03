"use client";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView, Theme } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useEditorStore } from "@/store/useEditorStore";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useEffect } from "react";
import { useProjectStore } from '@/store/useProjectStore';

interface EditorProps {
  initialContent?: string | null;
  editable?: boolean;
}

export default function Editor({ initialContent, editable }: EditorProps) {
  const { setProjectContent } = useEditorStore();
  const { setEditorContent, saveEditorContent } = useProjectStore();
  
  const customTheme: Theme = {
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

  const editor = useCreateBlockNote({
    initialContent: initialContent 
      ? (Array.isArray(JSON.parse(initialContent)) 
          ? JSON.parse(initialContent) 
          : [{
              type: "paragraph",
              content: []
            }]) as PartialBlock[]
      : [{
          type: "paragraph",
          content: []
        }],
  });

  useEffect(() => {
    if (!editor) return;

    const unsubscribe = editor.onEditorContentChange(() => {
      const content = JSON.stringify(editor.topLevelBlocks, null, 2);
      setEditorContent(content);
    });

    return () => unsubscribe;
  }, [editor]);

  // Para auto-save
  useEffect(() => {
    const interval = setInterval(() => {
      saveEditorContent();
    }, 30000); // auto-save a cada 30 segundos

    return () => clearInterval(interval);
  }, []);

  return <BlockNoteView editor={editor} editable={editable} theme={customTheme} />;
}
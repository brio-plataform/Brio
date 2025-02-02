"use client";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView, Theme } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useEditorStore } from "@/store/useEditorStore";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useEffect } from "react";

interface EditorProps {
  initialContent?: string | null;
  editable?: boolean;
}

export default function Editor({ initialContent, editable }: EditorProps) {
  const { setProjectContent } = useEditorStore();
  
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
      setProjectContent(content);
    });

    return () => unsubscribe;
  }, [editor, setProjectContent]);

  return <BlockNoteView editor={editor} editable={editable} theme={customTheme} />;
}
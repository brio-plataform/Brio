"use client"; // Isso define o componente como Client Component

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView, Theme } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

interface EditorProps {
  onChange?: (content: string) => void;
  initialContent?: string;
  editable?: boolean;
}

export default function Editor({ onChange, initialContent, editable }: EditorProps) {
    // Definindo um tema customizado
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
  }
  // Cria uma instância do editor
  const editor = useCreateBlockNote({
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
  });

  // Renderiza o editor
  return <BlockNoteView editor={editor} editable={editable} theme={customTheme} />;
}
"use client"

import { Card, CardContent } from "./ui/card";
import { ProjectBanner } from "./project/ProjectBanner";
import { ProjectInfo } from "./project/ProjectInfo";

import "@blocknote/core/fonts/inter.css";
import { BlockNoteView, Theme } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";

// Definindo um tema customizado
const customTheme: Theme = {
  colors: {
    editor: {
      text: "white",
      background: "zinc-500",  // Cor de fundo principal
    },
    tooltip: {
      text: "#FFFFFF",
      background: "zinc-500",
    }
  },
  borderRadius: 4,
  fontFamily: "Inter, sans-serif",
}

export function NewProject() {
  // Creates a new editor instance.
  const editor = useCreateBlockNote();

  return (
    <div className="p-6 w-full">
      <ProjectBanner />

      <div className="mb-6">
        <ProjectInfo />
      </div>

      <div className="flex justify-center items-center pb-5 w-full">
        <Card className="w-full">
          <CardContent className="p-4 min-h-[300px] w-full">
            <BlockNoteView 
              editor={editor} 
              theme={customTheme}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
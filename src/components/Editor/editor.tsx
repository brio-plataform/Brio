"use client";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { defaultBlockSchema, BlockNoteSchema } from "@blocknote/core";
import { useEffect, useState } from "react";
import { useProjectStore } from '@/store/useProjectStore';
import type { 
  EditorProps, 
  EditorTheme, 
  EditorState 
} from './types';

interface ContentItem {
  type: "text" | "link" | "image";
  text?: string;
  styles?: {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    code?: boolean;
    textColor?: string;
    backgroundColor?: string;
  };
  href?: string;
  url?: string;
}

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
          styles: {
            bold: false,
            italic: false,
            underline: false,
            code: false,
            textColor: "default",
            backgroundColor: "default"
          }
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

  const getValidContent = (content: string | null | undefined) => {
    try {
      if (!content) {
        console.log('No content provided, using default');
        return state.defaultContent;
      }

      let parsedContent: any;
      
      // Handle string content
      if (typeof content === 'string') {
        try {
          parsedContent = JSON.parse(content);
        } catch (e) {
          console.error('Error parsing string content:', e);
          return state.defaultContent;
        }
      } else {
        parsedContent = content;
      }

      // Ensure we have an array
      if (!Array.isArray(parsedContent)) {
        console.log('Content is not an array, using default');
        return state.defaultContent;
      }

      // Map the content to ensure it has all required fields
      const validContent = parsedContent.map(block => {
        // Ensure block has required fields
        const validBlock = {
          id: String(block.id || crypto.randomUUID()),
          type: block.type || "paragraph",
          props: {
            textColor: block.props?.textColor || "default",
            backgroundColor: block.props?.backgroundColor || "default",
            textAlignment: block.props?.textAlignment || "left",
            level: (block.props?.level && Number.isInteger(block.props.level) && block.props.level >= 1 && block.props.level <= 3) 
              ? block.props.level as 1 | 2 | 3
              : 1
          },
          content: Array.isArray(block.content) ? block.content.map((cont: ContentItem) => {
            // Remove any unsupported styles
            const styles = cont.styles || {};
            const validStyles = {
              bold: styles.bold || false,
              italic: styles.italic || false,
              underline: styles.underline || false,
              code: styles.code || false,
              textColor: styles.textColor || "default",
              backgroundColor: styles.backgroundColor || "default"
            };

            return {
              type: cont.type || "text",
              text: cont.text || "",
              styles: validStyles,
              href: cont.href,
              url: cont.url
            };
          }) : [],
          children: Array.isArray(block.children) ? block.children : []
        };

        // Ensure content array is not empty
        if (validBlock.content.length === 0) {
          validBlock.content = [{
            type: "text",
            text: "",
            styles: {
              bold: false,
              italic: false,
              underline: false,
              code: false,
              textColor: "default",
              backgroundColor: "default"
            }
          }];
        }

        return validBlock;
      });

      // Ensure we have at least one block
      if (validContent.length === 0) {
        return state.defaultContent;
      }

      console.log('Validated content:', validContent);
      return validContent;
    } catch (error) {
      console.error('Error parsing initialContent:', error);
      return state.defaultContent;
    }
  };

  const editor = useCreateBlockNote({
    initialContent: [{
      id: crypto.randomUUID(),
      type: "paragraph",
      props: {
        textColor: "default",
        backgroundColor: "default",
        textAlignment: "left"
      },
      content: [{
        type: "text",
        text: initialContent ? JSON.parse(initialContent) : "Comece a escrever seu projeto aqui...",
        styles: {
          bold: false,
          italic: false,
          underline: false,
          code: false,
          textColor: "default",
          backgroundColor: "default"
        }
      }],
      children: []
    }]
  });

  useEffect(() => {
    if (!editor) return;

    const unsubscribe = editor.onEditorContentChange(() => {
      const content = editor.topLevelBlocks;
      console.log('Editor content changed:', content);
      setEditorContent(JSON.stringify(content));
      setState(prev => ({ ...prev, hasChanges: true }));
    });

    return () => unsubscribe;
  }, [editor, setEditorContent]);

  // Auto-save otimizado
  useEffect(() => {
    const interval = setInterval(() => {
      if (state.hasChanges) {
        console.log('Auto-saving content...');
        saveEditorContent();
        setState(prev => ({ ...prev, hasChanges: false }));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [state.hasChanges, saveEditorContent]);

  return <BlockNoteView editor={editor} editable={editable} theme={customTheme} />;
}
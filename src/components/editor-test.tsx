"use client"

import { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Checklist from '@editorjs/checklist';
import Code from '@editorjs/code';
import InlineCode from '@editorjs/inline-code';
import Image from '@editorjs/image';
import Table from '@editorjs/table';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import Warning from '@editorjs/warning';
import Delimiter from '@editorjs/delimiter';
import LinkTool from '@editorjs/link';
import Embed from '@editorjs/embed';

export default function Editor() {
  const editorRef = useRef<EditorJS | null>(null);
  const holderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!holderRef.current) return;

    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: holderRef.current,
        tools: {
          header: {
            class: Header as any, // Fix type mismatch
            config: {
              placeholder: 'Enter a header',
              levels: [1, 2, 3],
              defaultLevel: 1,
            },
          },
          paragraph: {
            inlineToolbar: true,
            config: {
              placeholder: 'Press "/" for commands',
            },
          },
          list: {
            class: List as any, // Fix type mismatch
            inlineToolbar: true,
            config: {
              defaultStyle: 'unordered',
            },
          },
          checklist: {
            class: Checklist as any, // Fix type mismatch
            inlineToolbar: true,
          },
          code: Code,
          inlineCode: InlineCode,
          image: {
            class: Image,
            config: {
              uploader: {
                uploadByFile(file: File) {
                  return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      resolve({
                        success: 1,
                        file: {
                          url: e.target?.result,
                        },
                      });
                    };
                    reader.readAsDataURL(file);
                  });
                },
              },
            },
          },
          table: {
            class: Table as any, // Fix type mismatch
            inlineToolbar: true,
          },
          quote: Quote,
          marker: Marker as any, // Fix type mismatch
          warning: Warning,
          delimiter: Delimiter,
          linkTool: LinkTool as any, // Fix type mismatch
          embed: {
            class: Embed as any, // Fix type mismatch
            config: {
              services: {
                youtube: true,
                codesandbox: true,
                codepen: true,
              },
            },
          },
        },
        placeholder: 'Press "/" for commands...',
        onReady: () => {
          console.log('Editor.js is ready to work!');
        },
        onChange: (api, event) => {
          console.log('Content changed');
        },
        autofocus: true,
        inlineToolbar: ['bold', 'italic', 'marker', 'inlineCode', 'link'],
      });
    }

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative">
      <div
        ref={holderRef}
        className="h-fit min-h-[200px] w-full rounded-lg shadow-sm p-8"
      />
    </div>
  );
}
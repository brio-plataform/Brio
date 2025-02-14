"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const documentTypes = [
  {
    value: 'article',
    label: "Artigo Científico",
    description: "Publicação científica com resultados de pesquisa original.",
  },
  {
    value: 'thesis',
    label: "Tese/Dissertação",
    description: "Trabalho acadêmico para obtenção de título.",
  },
  {
    value: 'book',
    label: "Livro",
    description: "Obra completa sobre um tema específico.",
  },
  {
    value: 'research',
    label: "Pesquisa",
    description: "Projeto de pesquisa em andamento.",
  },
];

interface ButtonSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function ButtonSelect({ value, onChange }: ButtonSelectProps) {
  const selectedType = documentTypes.find(type => type.value === value);

  return (
    <div className="inline-flex -space-x-px divide-x divide-primary-foreground/30 rounded-lg shadow-sm shadow-black/5 rtl:space-x-reverse">
      <Button className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10 bg-muted py-1 px-2 h-8">
        {selectedType?.label || "Selecione o tipo"}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10 bg-muted py-1 px-2 h-8"
            size="icon"
            aria-label="Opções"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="min-w-[220px]"
          side="bottom"
          sideOffset={4}
          align="start"
        >
          <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
            {documentTypes.map((type) => (
              <DropdownMenuRadioItem
                key={type.value}
                value={type.value}
                className="items-start [&>span]:pt-1.5"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">{type.label}</span>
                  <span className="text-xs text-muted-foreground">{type.description}</span>
                </div>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

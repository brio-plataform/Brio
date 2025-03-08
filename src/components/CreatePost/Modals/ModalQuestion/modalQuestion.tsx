"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { DialogHeader } from "@/components/ui/dialog"
import {
  HelpCircle,
  Vote,
  Users,
  X,
} from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import DatePickerRange from "@/components/ui/datePickerRange"
import { Label } from "@/components/ui/label"
import {
  QuestionType,
  PollOption,
  MAX_TITLE_LENGTH,
  CreatePostProps,
  CreatePostState,
} from '../../types'

export function ModalQuestion( {
}: CreatePostProps) {
  const initialState: CreatePostState = {
    postType: 'text',
    title: '',
    content: '',
    tags: [],
    currentTag: '',
    references: [],
    currentReference: '',
    referenceType: 'profile',
    isSubmitting: false,
    isUploadingMedia: false,
    isUploadingFile: false,
    showLinkModal: false,
    linkUrl: ''
  }

  const [state, setState] = useState<CreatePostState>(initialState)
  const [title, setTitle] = useState('')
  const [questionType, setQuestionType] = useState<QuestionType>('question');
  const [pollOptions, setPollOptions] = useState<PollOption[]>([
    { id: '1', text: '' },
    { id: '2', text: '' }
  ]);
  const [debateTopics, setDebateTopics] = useState<string[]>(['', '']);
  return (
<div className="space-y-6">
                  <DialogHeader>
                    <div className="flex flex-col space-y-4">
                      <RadioGroup 
                        defaultValue="question" 
                        className="grid grid-cols-3 gap-2"
                        onValueChange={(value) => setQuestionType(value as QuestionType)}
                      >
                        <div>
                          <RadioGroupItem value="question" id="question" className="peer sr-only" />
                          <Label
                            htmlFor="question"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <HelpCircle className="mb-2 h-6 w-6" />
                            <span className="text-sm font-medium">Pergunta</span>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem value="poll" id="poll" className="peer sr-only" />
                          <Label
                            htmlFor="poll"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <Vote className="mb-2 h-6 w-6" />
                            <span className="text-sm font-medium">Enquete</span>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem value="debate" id="debate" className="peer sr-only" />
                          <Label
                            htmlFor="debate"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <Users className="mb-2 h-6 w-6" />
                            <span className="text-sm font-medium">Debate</span>
                          </Label>
                        </div>
                      </RadioGroup>

                      <Input
                        placeholder={
                          questionType === 'question' 
                            ? "Sua pergunta aqui..." 
                            : questionType === 'poll' 
                            ? "Título da enquete..." 
                            : "Tema do debate..."
                        }
                        value={title}
                        onChange={(e) => setTitle(e.target.value.slice(0, MAX_TITLE_LENGTH))}
                        className="text-lg font-semibold"
                      />
                      
                      {questionType === 'question' && (
                        <>
                          <Textarea 
                            placeholder="Adicione mais contexto à sua pergunta..."
                            className="min-h-[100px]"
                            value={state.content}
                            onChange={(e) => setState(prev => ({ ...prev, content: e.target.value }))}
                          />
                          
                          <div className="space-y-4 border-t pt-4">
                            <div className="flex items-center justify-between">
                              <Label>Permitir respostas anônimas</Label>
                              <Switch />
                            </div>
                            <div className="flex items-center justify-between">
                              <Label>Notificar sobre novas respostas</Label>
                              <Switch defaultChecked />
                            </div>
                          </div>
                        </>
                      )}

                      {questionType === 'poll' && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            {pollOptions.map((option, index) => (
                              <div key={index} className="flex gap-2">
                                <Input
                                  placeholder={`Opção ${index + 1}`}
                                  value={option.text}
                                  onChange={(e) => {
                                    const newOptions = [...pollOptions];
                                    newOptions[index] = { ...option, text: e.target.value };
                                    setPollOptions(newOptions);
                                  }}
                                />
                                {index > 1 && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setPollOptions(pollOptions.filter((_, i) => i !== index))}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            ))}
                          </div>
                          
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setPollOptions([...pollOptions, { id: crypto.randomUUID(), text: '' }])}
                          >
                            Adicionar opção
                          </Button>

                          <div className="space-y-4 border-t pt-4">
                            <div className="flex items-center justify-between">
                              <Label>Permitir múltipla escolha</Label>
                              <Switch />
                            </div>
                            <div className="flex items-center justify-between">
                              <Label>Mostrar resultados em tempo real</Label>
                              <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <Label>Data limite para votação</Label>
                              <DatePickerRange />
                            </div>
                          </div>
                        </div>
                      )}

                      {questionType === 'debate' && (
                        <div className="space-y-4">
                          <Textarea 
                            placeholder="Descreva o contexto do debate..."
                            className="min-h-[100px]"
                            value={state.content}
                            onChange={(e) => setState(prev => ({ ...prev, content: e.target.value }))}
                          />
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Posição A</Label>
                              <Input 
                                placeholder="Ex: A favor"
                                value={debateTopics[0]}
                                onChange={(e) => {
                                  const newTopics = [...debateTopics];
                                  newTopics[0] = e.target.value;
                                  setDebateTopics(newTopics);
                                }}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Posição B</Label>
                              <Input 
                                placeholder="Ex: Contra"
                                value={debateTopics[1]}
                                onChange={(e) => {
                                  const newTopics = [...debateTopics];
                                  newTopics[1] = e.target.value;
                                  setDebateTopics(newTopics);
                                }}
                              />
                            </div>
                          </div>

                          <div className="space-y-4 border-t pt-4">
                            <div className="flex items-center justify-between">
                              <Label>Moderação ativa</Label>
                              <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <Label>Tempo limite para argumentos</Label>
                              <Input type="number" className="w-32" placeholder="5 min" />
                            </div>
                            <div className="flex items-center justify-between">
                              <Label>Duração do debate</Label>
                              <DatePickerRange />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </DialogHeader>
                </div>
  )
}

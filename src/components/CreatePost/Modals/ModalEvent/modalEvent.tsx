"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { DialogHeader } from "@/components/ui/dialog"
import {
  Globe,
  MapPin,
} from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import DatePickerRange from "@/components/ui/datePickerRange"
import { Label } from "@/components/ui/label"
import { DateRange } from "react-day-picker"
import {
  MAX_TITLE_LENGTH,
} from '../../types'

export function ModalEvent( ){
    const [title, setTitle] = useState('')
    const [eventDate, setEventDate] = useState<DateRange | undefined>();
  
    return (
      <div className="space-y-6">
                    <DialogHeader>
                      <div className="flex flex-col space-y-4">
                        <Input
                          placeholder="Nome do evento"
                          value={title}
                          onChange={(e) => setTitle(e.target.value.slice(0, MAX_TITLE_LENGTH))}
                          className="text-lg font-semibold"
                        />
  
                        <div className="space-y-2">
                          <Label>Data e Horário do Evento</Label>
                          <DatePickerRange 
                            value={eventDate}
                            onChange={setEventDate}
                            label="Selecione o período do evento"
                          />
                        </div>
  
                        <RadioGroup defaultValue="online" className="grid grid-cols-2 gap-2">
                          <div>
                            <RadioGroupItem value="online" id="online" className="peer sr-only" />
                            <Label
                              htmlFor="online"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <Globe className="mb-2 h-6 w-6" />
                              <span className="text-sm font-medium">Online</span>
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem value="presential" id="presential" className="peer sr-only" />
                            <Label
                              htmlFor="presential"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <MapPin className="mb-2 h-6 w-6" />
                              <span className="text-sm font-medium">Presencial</span>
                            </Label>
                          </div>
                        </RadioGroup>
  
                        <Textarea 
                          placeholder="Descrição do evento..."
                          className="min-h-[100px]"
                        />
  
                        <div className="space-y-4 border-t pt-4">
                          <div className="flex items-center justify-between">
                            <Label>Limite de participantes</Label>
                            <Input type="number" className="w-32" placeholder="Ilimitado" />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label>Requer inscrição</Label>
                            <Switch />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label>Evento privado</Label>
                            <Switch />
                          </div>
                        </div>
                      </div>
                    </DialogHeader>
                  </div>
    )
  }
"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useId, useState } from "react";
import { DateRange } from "react-day-picker";
import { Calendar } from "./calendar";

interface DatePickerRangeProps {
  onChange?: (date: DateRange | undefined) => void;
  value?: DateRange;
  label?: string;
}

export default function DatePickerRange({ onChange, value, label = "Date range picker" }: DatePickerRangeProps) {
  const id = useId();
  const [date, setDate] = useState<DateRange | undefined>(value);
  const [open, setOpen] = useState(false);

  const handleSelect = (newDate: DateRange | undefined) => {
    setDate(newDate);
    onChange?.(newDate);
  };

  return (
    <div>
      <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <Popover modal={true} open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id={id}
              variant={"outline"}
              className={cn(
                "group w-full justify-between bg-background px-3 font-normal outline-offset-0 hover:bg-background focus-visible:border-ring focus-visible:outline-[3px] focus-visible:outline-ring/20",
                !date && "text-muted-foreground",
              )}
            >
              <span className={cn("truncate", !date && "text-muted-foreground")}>
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  "Selecione um período"
                )}
              </span>
              <CalendarIcon
                size={16}
                strokeWidth={2}
                className="shrink-0 text-muted-foreground/80 transition-colors group-hover:text-foreground"
                aria-hidden="true"
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={handleSelect}
              numberOfMonths={2}
              disabled={false}
              fromDate={new Date()}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
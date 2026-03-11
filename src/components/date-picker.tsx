import { Popover, type PopoverTriggerProps } from "@base-ui/react/popover";
import { formatDate, isValid, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import { type DayPickerProps } from "react-day-picker";
import { cn } from "../lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Input, InputProps } from "./input";

export interface DatePickerProps extends InputProps {
  calendarProps: DayPickerProps;
  triggerProps?: PopoverTriggerProps;
  popoverProps?: Omit<Popover.Root.Props, "children">;
  format?: string;
}

export function DatePicker({
  calendarProps,
  triggerProps,
  popoverProps,
  className,
  value,
  defaultValue,
  onValueChange,
  format = "MM/dd/yyyy",
  placeholder = format.toLowerCase(),
  ...props
}: DatePickerProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const inputRef = useRef<HTMLInputElement>(null);
  const isControlled = value !== undefined;
  const inputValue = isControlled ? value : internalValue;
  const now = new Date();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const parsedDate = parse(inputValue, format, now);
  const date = isValid(parsedDate) ? parsedDate : undefined;

  function updateInternalValue(newValue: string) {
    if (!isControlled) {
      setInternalValue(newValue);
    }
  }

  function handleSelect(selected: Date | undefined) {
    const newValue = selected ? formatDate(selected, format) : "";
    updateInternalValue(newValue);
    onValueChange?.(newValue);
  }

  return (
    <Input
      ref={inputRef}
      className={cn("hover:bg-card", className)}
      onValueChange={(newValue, e) => {
        updateInternalValue(newValue.toString());
        onValueChange?.(newValue, e);
      }}
      value={inputValue}
      placeholder={placeholder}
      rightAdornment={
        <Popover.Root
          open={calendarOpen}
          onOpenChange={setCalendarOpen}
          {...popoverProps}
        >
          <Popover.Trigger
            render={
              <Button size="icon" variant="ghost" aria-label="Select date">
                <CalendarIcon className="size-4" />
              </Button>
            }
            {...triggerProps}
          />
          <Popover.Portal>
            <Popover.Positioner
              className="z-10 outline-none"
              sideOffset={8}
              anchor={inputRef}
            >
              <Popover.Popup
                aria-label="Calendar"
                className={cn(
                  "bg-background outline-border origin-(--transform-origin) overflow-hidden rounded-lg bg-clip-padding shadow-lg outline transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0",
                )}
              >
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleSelect}
                  defaultMonth={isValid(date) ? date : now}
                  autoFocus
                  {...calendarProps}
                />
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      }
      {...props}
    />
  );
}

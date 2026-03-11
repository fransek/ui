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
  calendarProps?: Omit<DayPickerProps, "mode" | "selected" | "onSelect">;
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
  const inputRef = useRef<HTMLInputElement>(null);
  const now = new Date();
  const [date, setDate] = useState<Date | undefined>(
    parseDateString(value ?? defaultValue, format, now),
  );

  function handleSelect(selected: Date | undefined) {
    const newValue = selected ? formatDate(selected, format) : "";
    setInputValue(inputRef.current, newValue);
  }

  return (
    <Input
      ref={inputRef}
      onValueChange={(newValue, e) => {
        setDate(parseDateString(newValue, format, now));
        onValueChange?.(newValue, e);
      }}
      value={value}
      defaultValue={defaultValue}
      className={cn("hover:bg-card", className)}
      placeholder={placeholder}
      rightAdornment={
        <Popover.Root {...popoverProps}>
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

export function setInputValue(input: HTMLInputElement | null, value: string) {
  if (!input) return;

  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    "value",
  )?.set;

  nativeInputValueSetter?.call(input, value);

  const event = new Event("input", { bubbles: true });
  input.dispatchEvent(event);
}

export function parseDateString(
  dateStr: string | number | readonly string[] | undefined,
  formatStr: string,
  referenceDate: Date,
) {
  if (!dateStr) return undefined;
  const parsedDate = parse(dateStr.toString(), formatStr, referenceDate);
  return isValid(parsedDate) ? parsedDate : undefined;
}

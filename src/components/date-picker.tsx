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

type DatePickerChangeEventDetails = Parameters<
  NonNullable<DatePickerProps["onValueChange"]>
>[1];
type DatePickerOnChangeEvent = Parameters<
  NonNullable<DatePickerProps["onChange"]>
>[0];

export function DatePicker({
  calendarProps,
  triggerProps,
  popoverProps,
  className,
  value,
  defaultValue,
  onChange,
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
  const parsedDate = parse(inputValue.toString(), format, now);
  const date = isValid(parsedDate) ? parsedDate : undefined;

  function updateInternalValue(newValue: string) {
    if (!isControlled) {
      setInternalValue(newValue);
    }
  }

  function createChangeEventDetails(
    event: Event,
  ): DatePickerChangeEventDetails {
    return {
      reason: "none",
      event,
      cancel: () => {},
      allowPropagation: () => {},
      isCanceled: false,
      isPropagationAllowed: false,
      trigger: inputRef.current ?? undefined,
    };
  }

  function handleSelect(selected: Date | undefined) {
    const newValue = selected ? formatDate(selected, format) : "";
    updateInternalValue(newValue);
    const changeEvent = new Event("change");
    onValueChange?.(newValue, createChangeEventDetails(changeEvent));
    onChange?.(changeEvent as unknown as DatePickerOnChangeEvent);
  }

  return (
    <Input
      ref={inputRef}
      className={cn("hover:bg-card", className)}
      onChange={onChange}
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

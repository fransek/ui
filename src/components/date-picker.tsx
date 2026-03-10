import { Popover, type PopoverTriggerProps } from "@base-ui/react/popover";
import { formatDate, isValid, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import { type DayPickerProps } from "react-day-picker";
import { FieldAttributes } from "../lib/types";
import { cn } from "../lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { FieldProps } from "./field";
import { Input } from "./input";

export interface DatePickerProps
  extends
    Omit<DayPickerProps, "mode" | "selected" | "onSelect">,
    Omit<
      PopoverTriggerProps,
      | "children"
      | "className"
      | "style"
      | "onSelect"
      | "hidden"
      | "disabled"
      | "role"
      | "value"
      | "defaultValue"
    >,
    FieldAttributes {
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  name?: string;
  fieldProps?: FieldProps;
  popoverProps?: Omit<Popover.Root.Props, "children">;
  format?: string;
}

export function DatePicker({
  label,
  isValidating,
  isValidatingMessage,
  errorMessage,
  description,
  infoPopover,
  fieldProps,
  value,
  defaultValue,
  onValueChange,
  disabled,
  readOnly,
  popoverProps,
  handle,
  payload,
  openOnHover,
  delay,
  closeDelay,
  autoFocus = true,
  format = "MM/dd/yyyy",
  placeholder = format.toLowerCase(),
  ...props
}: DatePickerProps) {
  const [internalDate, setInternalDate] = useState<Date | undefined>(
    defaultValue,
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const isControlled = value !== undefined;
  const date = isControlled ? value : internalDate;
  const now = new Date();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [input, setInput] = useState(date ? formatDate(date, format) : "");

  function updateInternalDate(newDate: Date | undefined) {
    if (!isControlled) {
      setInternalDate(newDate);
    }
  }

  function handleSelect(selected: Date | undefined) {
    updateInternalDate(selected);
    onValueChange?.(selected);
    setInput(selected ? formatDate(selected, format) : "");
  }

  const handleValueChange = (value: string) => {
    setInput(value);
    const selected = parse(value, format, now);
    if (isValid(selected)) {
      updateInternalDate(selected);
      onValueChange?.(selected);
    } else {
      updateInternalDate(undefined);
      onValueChange?.(undefined);
    }
  };

  return (
    <Input
      label={label}
      isValidating={isValidating}
      isValidatingMessage={isValidatingMessage}
      errorMessage={errorMessage}
      description={description}
      infoPopover={infoPopover}
      disabled={disabled}
      readOnly={readOnly}
      ref={inputRef}
      className={cn("hover:bg-card")}
      onValueChange={handleValueChange}
      value={input}
      placeholder={placeholder}
      fieldProps={fieldProps}
      rightAdornment={
        <Popover.Root
          open={calendarOpen}
          onOpenChange={setCalendarOpen}
          {...popoverProps}
        >
          <Popover.Trigger
            disabled={disabled || readOnly}
            aria-readonly={readOnly}
            data-validating={isValidating ? "" : undefined}
            handle={handle}
            payload={payload}
            openOnHover={openOnHover}
            delay={delay}
            closeDelay={closeDelay}
            render={
              <Button size="icon" variant="ghost" aria-label="Select date">
                <CalendarIcon className="size-4" />
              </Button>
            }
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
                  autoFocus={autoFocus}
                  defaultMonth={isValid(date) ? date : now}
                  {...props}
                />
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      }
    />
  );
}

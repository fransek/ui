import { Popover, type PopoverTriggerProps } from "@base-ui/react/popover";
import { formatDate, isValid, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import { cn } from "../lib/utils";
import { Button } from "./button";
import { Calendar, type CalendarProps } from "./calendar";
import { Input, type InputProps } from "./input";

type DatePickerOnValueChange = NonNullable<InputProps["onValueChange"]>;
type DatePickerOnValue = Parameters<DatePickerOnValueChange>[0];
type DatePickerOnValueDetails = Parameters<DatePickerOnValueChange>[1];

export interface DatePickerProps extends InputProps {
  triggerProps?: Omit<
    PopoverTriggerProps,
    | "children"
    | "className"
    | "style"
    | "disabled"
    | "aria-readonly"
    | "data-validating"
    | "render"
  >;
  popoverProps?: Omit<Popover.Root.Props, "children">;
  calendarProps?: Omit<CalendarProps, "mode" | "selected" | "onSelect">;
  format?: string;
}

export function DatePicker({
  label,
  isValidating,
  isValidatingMessage,
  errorMessage,
  description,
  infoPopover,
  value,
  defaultValue,
  onValueChange,
  rightAdornment,
  disabled,
  readOnly,
  popoverProps,
  triggerProps,
  autoFocus = true,
  format = "MM/dd/yyyy",
  placeholder = format.toLowerCase(),
  calendarProps,
  className,
  ...props
}: DatePickerProps) {
  const [internalValue, setInternalValue] = useState(
    String(defaultValue ?? ""),
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const isControlled = value !== undefined;
  const inputValue = isControlled ? value : internalValue;
  const inputValueAsString =
    typeof inputValue === "string" ? inputValue : String(inputValue ?? "");
  const now = new Date();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const parsedDate = parse(inputValueAsString, format, now);
  const date = isValid(parsedDate) ? parsedDate : undefined;

  function updateInternalValue(newValue: DatePickerOnValue) {
    if (!isControlled) {
      setInternalValue(String(newValue));
    }
  }

  function handleSelect(selected: Date | undefined) {
    const newValue = selected ? formatDate(selected, format) : "";
    updateInternalValue(newValue);
    onValueChange?.(newValue, {
      reason: "none",
      event: new Event("change"),
      cancel: () => {},
      allowPropagation: () => {},
      isCanceled: false,
      isPropagationAllowed: true,
      trigger: inputRef.current,
    } as DatePickerOnValueDetails);
  }

  const handleValueChange = (
    newValue: DatePickerOnValue,
    eventDetails: DatePickerOnValueDetails,
  ) => {
    updateInternalValue(newValue);
    onValueChange?.(newValue, eventDetails);
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
      className={cn("hover:bg-card", className)}
      onValueChange={handleValueChange}
      value={inputValue}
      placeholder={placeholder}
      {...props}
      rightAdornment={
        rightAdornment ?? (
          <Popover.Root
            open={calendarOpen}
            onOpenChange={setCalendarOpen}
            {...popoverProps}
          >
            <Popover.Trigger
              disabled={disabled || readOnly}
              aria-readonly={readOnly}
              data-validating={isValidating ? "" : undefined}
              {...triggerProps}
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
                    {...calendarProps}
                  />
                </Popover.Popup>
              </Popover.Positioner>
            </Popover.Portal>
          </Popover.Root>
        )
      }
    />
  );
}

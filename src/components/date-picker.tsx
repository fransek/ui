import { Popover, type PopoverTriggerProps } from "@base-ui/react/popover";
import { formatDate, isValid, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import { cnBaseUI, mergeRefs } from "../lib/utils";
import { Button } from "./button";
import { Calendar, CalendarProps } from "./calendar";
import { Input, InputProps } from "./input";

export interface DatePickerProps extends InputProps {
  calendarProps?: Omit<CalendarProps, "mode" | "selected" | "onSelect">;
  popoverTriggerProps?: PopoverTriggerProps;
  popoverProps?: Omit<Popover.Root.Props, "children">;
  format?: string;
}

export function DatePicker(props: DatePickerProps) {
  const {
    calendarProps,
    popoverTriggerProps,
    popoverProps,
    className,
    value,
    defaultValue,
    onValueChange,
    format = "MM/dd/yyyy",
    placeholder = format.toUpperCase(),
    disabled,
    readOnly,
    invalid,
    ref,
    ...restProps
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const now = new Date();
  const [internalDate, setInternalDate] = useState<Date | undefined>(
    parseDateString(value ?? defaultValue, format, now),
  );
  const isControlled = value !== undefined;
  const date = isControlled
    ? parseDateString(value, format, now)
    : internalDate;

  function handleSelect(selected: Date | undefined) {
    const newValue = selected ? formatDate(selected, format) : "";
    setInputValue(inputRef.current, newValue);
  }

  return (
    <Input
      ref={mergeRefs(ref, inputRef)}
      onValueChange={(newValue, e) => {
        if (!isControlled) {
          setInternalDate(parseDateString(newValue, format, now));
        }
        onValueChange?.(newValue, e);
      }}
      value={value}
      defaultValue={defaultValue}
      className={cnBaseUI(
        "hover:bg-card disabled:text-muted-foreground",
        className,
      )}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      invalid={invalid}
      rightAdornment={
        <Popover.Root {...popoverProps}>
          <Popover.Trigger
            render={
              <Button
                size="icon"
                variant="ghost"
                aria-label="Select date"
                disabled={disabled || readOnly}
              >
                <CalendarIcon className="size-4" />
              </Button>
            }
            {...popoverTriggerProps}
          />
          <Popover.Portal>
            <Popover.Positioner
              className="z-10 outline-none"
              sideOffset={8}
              anchor={inputRef}
            >
              <Popover.Popup
                aria-label="Calendar"
                className={cnBaseUI(
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
      {...restProps}
    />
  );
}

function setInputValue(input: HTMLInputElement | null, value: string) {
  if (!input) return;

  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    "value",
  )?.set;

  nativeInputValueSetter?.call(input, value);

  const event = new Event("input", { bubbles: true });
  input.dispatchEvent(event);
}

function parseDateString(
  dateStr: string | number | readonly string[] | undefined,
  formatStr: string,
  referenceDate: Date,
) {
  if (!dateStr) return undefined;
  const parsedDate = parse(dateStr.toString(), formatStr, referenceDate);
  return isValid(parsedDate) ? parsedDate : undefined;
}

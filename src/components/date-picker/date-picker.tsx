import * as BaseUI from "@base-ui/react/popover";
import { formatDate, isValid, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import { mergeProps, tw, useMergeRefs } from "../../lib/utils";
import { Button } from "../button";
import { Calendar, CalendarProps } from "../calendar";
import { Input, InputProps } from "../input";

export interface DatePickerProps extends InputProps {
  calendarProps?: Omit<CalendarProps, "mode" | "selected" | "onSelect">;
  popoverTriggerProps?: BaseUI.PopoverTriggerProps;
  popoverProps?: Omit<BaseUI.Popover.Root.Props, "children">;
  format?: string;
}

export function DatePicker(props: DatePickerProps) {
  const {
    calendarProps,
    popoverTriggerProps,
    popoverProps: { onOpenChange, ...popoverProps } = {},
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
  const mergedRef = useMergeRefs(ref, inputRef);
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
      ref={mergedRef}
      onValueChange={(newValue, e) => {
        if (!isControlled) {
          setInternalDate(parseDateString(newValue, format, now));
        }
        onValueChange?.(newValue, e);
      }}
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      invalid={invalid}
      rightAdornment={
        <BaseUI.Popover.Root
          onOpenChange={(open, e) => {
            onOpenChange?.(open, e);
            if (!open) {
              inputRef.current?.focus();
              inputRef.current?.blur();
            }
          }}
          {...popoverProps}
        >
          <BaseUI.Popover.Trigger
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
          <BaseUI.Popover.Portal>
            <BaseUI.Popover.Positioner
              className="z-10 outline-none"
              sideOffset={8}
              anchor={inputRef}
            >
              <BaseUI.Popover.Popup
                aria-label="Calendar"
                className="popup popup-transition overflow-hidden"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleSelect}
                  defaultMonth={isValid(date) ? date : now}
                  autoFocus
                  {...calendarProps}
                />
              </BaseUI.Popover.Popup>
            </BaseUI.Popover.Positioner>
          </BaseUI.Popover.Portal>
        </BaseUI.Popover.Root>
      }
      {...mergeProps(restProps, {
        className: tw("disabled:text-muted-fg"),
      })}
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

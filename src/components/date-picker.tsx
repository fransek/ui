import { Popover, type PopoverTriggerProps } from "@base-ui/react/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import React from "react";
import { type DayPickerProps } from "react-day-picker";
import { FieldAttributes } from "../lib/types";
import { cn } from "../lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Field, FieldControl, FieldProps } from "./field";
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
  format?: (date: Date) => string;
  disabled?: boolean;
  readOnly?: boolean;
  name?: string;
  fieldProps?: FieldProps;
  popoverProps?: Omit<Popover.Root.Props, "children">;
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
  placeholder = "Pick a date",
  format = (date) =>
    date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  disabled,
  readOnly,
  name,
  popoverProps,
  nativeButton,
  handle,
  payload,
  openOnHover,
  delay,
  closeDelay,
  render,
  autoFocus = true,
  ...props
}: DatePickerProps) {
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(
    defaultValue,
  );
  const isControlled = value !== undefined;
  const date = isControlled ? value : internalDate;
  const hasCustomTriggerRender = render !== undefined;
  const [inputValue, setInputValue] = React.useState(
    date ? formatDateInputValue(date) : "",
  );

  React.useEffect(() => {
    setInputValue(date ? formatDateInputValue(date) : "");
  }, [date]);

  function handleSelect(selected: Date | undefined) {
    if (!isControlled) {
      setInternalDate(selected);
    }
    onValueChange?.(selected);
  }

  function handleInputChange(nextInputValue: string) {
    setInputValue(nextInputValue);

    if (!nextInputValue) {
      handleSelect(undefined);
      return;
    }

    const parsedDate = parseDateInputValue(nextInputValue);
    if (parsedDate) {
      handleSelect(parsedDate);
    }
  }

  return (
    <Field
      label={label}
      isValidating={isValidating}
      isValidatingMessage={isValidatingMessage}
      errorMessage={errorMessage}
      description={description}
      infoPopover={infoPopover}
      {...fieldProps}
    >
      <Popover.Root {...popoverProps}>
        <FieldControl
          render={
            <Input
              className={cn(
                "hover:bg-card [appearance:textfield] [-moz-appearance:textfield] [&::-webkit-calendar-picker-indicator]:hidden",
                !date && "text-muted-foreground",
              )}
              type="date"
              aria-haspopup="dialog"
              aria-valuetext={date ? format(date) : undefined}
              value={inputValue}
              onChange={(event) => handleInputChange(event.target.value)}
              placeholder={placeholder}
              name={name}
              disabled={disabled}
              readOnly={readOnly}
              data-validating={isValidating ? "" : undefined}
              rightAdornment={
                <Popover.Trigger
                  disabled={disabled || readOnly}
                  aria-label="Open calendar"
                  nativeButton={hasCustomTriggerRender ? nativeButton : true}
                  handle={handle}
                  payload={payload}
                  openOnHover={openOnHover}
                  delay={delay}
                  closeDelay={closeDelay}
                  render={
                    render ??
                    (({ className: triggerClassName, ...triggerProps }) => (
                      <Button
                        {...triggerProps}
                        type="button"
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "size-6 rounded-md p-0",
                          triggerClassName,
                        )}
                      >
                        <CalendarIcon className="size-4" />
                      </Button>
                    ))
                  }
                />
              }
            />
          }
        />
        <Popover.Portal>
          <Popover.Positioner className="z-10 outline-none" sideOffset={8}>
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
                {...props}
              />
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    </Field>
  );
}

function formatDateInputValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function parseDateInputValue(inputValue: string) {
  const parts = inputValue.split("-");
  if (parts.length !== 3) {
    return undefined;
  }

  const [year, month, day] = parts.map(Number);

  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day) ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    return undefined;
  }

  const parsedDate = new Date(year, month - 1, day);
  const isValidDate =
    parsedDate.getFullYear() === year &&
    parsedDate.getMonth() === month - 1 &&
    parsedDate.getDate() === day;

  return isValidDate ? parsedDate : undefined;
}

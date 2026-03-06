import { Field as BaseField } from "@base-ui/react/field";
import { Popover } from "@base-ui/react/popover";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { type DayPickerProps } from "react-day-picker";
import { FieldAttributes } from "../lib/types";
import { cn } from "../lib/utils";
import { Calendar } from "./calendar";
import { Field, FieldProps } from "./field";

export interface DatePickerProps
  extends
    Omit<DayPickerProps, "mode" | "selected" | "onSelect">,
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
  fieldProps,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Pick a date",
  format = (date) => date.toLocaleDateString(),
  disabled,
  readOnly,
  name,
  className,
  popoverProps,
  ...calendarProps
}: DatePickerProps) {
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(
    defaultValue,
  );
  const isControlled = value !== undefined;
  const date = isControlled ? value : internalDate;

  function handleSelect(selected: Date | undefined) {
    if (!isControlled) {
      setInternalDate(selected);
    }
    onValueChange?.(selected);
  }

  return (
    <Field
      label={label}
      isValidating={isValidating}
      isValidatingMessage={isValidatingMessage}
      errorMessage={errorMessage}
      description={description}
      {...fieldProps}
    >
      <Popover.Root {...popoverProps}>
        <BaseField.Control
          render={
            <Popover.Trigger
              className={cn(
                "data-invalid:not-focus:border-error-foreground data-validating:not-data-invalid:animate-validating hover:bg-card focus-visible:border-highlight focus:inset-shadow-muted/50 flex min-w-[212px] items-center justify-between gap-3 rounded-lg border p-2 text-base transition-colors outline-none select-none focus:inset-shadow-sm",
                !date && "text-muted-foreground",
                className,
              )}
              disabled={disabled || readOnly}
              aria-readonly={readOnly}
              data-validating={isValidating ? "" : undefined}
            >
              {date ? format(date) : placeholder}
              <CalendarIcon className="size-4 shrink-0 opacity-50" />
            </Popover.Trigger>
          }
        />
        <Popover.Portal>
          <Popover.Positioner className="z-10 outline-none" sideOffset={8}>
            <Popover.Popup
              className={cn(
                "bg-background outline-border origin-(--transform-origin) overflow-hidden rounded-lg bg-clip-padding shadow-lg outline transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0",
              )}
            >
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleSelect}
                {...calendarProps}
              />
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
        {name && (
          <input
            type="hidden"
            name={name}
            value={date ? date.toISOString() : ""}
            readOnly
          />
        )}
      </Popover.Root>
    </Field>
  );
}

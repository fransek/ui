import { Popover, type PopoverTriggerProps } from "@base-ui/react/popover";
import React from "react";
import { type DateRange, type DayPickerProps } from "react-day-picker";
import { FieldAttributes } from "../lib/types";
import { cn } from "../lib/utils";
import { Calendar } from "./calendar";
import { Field, FieldControl, FieldProps } from "./field";
import { Input } from "./input";

export interface DateRangePickerProps
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
  value?: DateRange;
  defaultValue?: DateRange;
  onValueChange?: (range: DateRange | undefined) => void;
  placeholder?: string;
  format?: (range: DateRange) => string;
  disabled?: boolean;
  readOnly?: boolean;
  name?: string;
  fieldProps?: FieldProps;
  popoverProps?: Omit<Popover.Root.Props, "children">;
}

export function DateRangePicker({
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
  placeholder = "Pick a date range",
  format = (range) => {
    if (!range.from) {
      return "";
    }

    const from = range.from.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    if (!range.to) {
      return from;
    }

    const to = range.to.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    return `${from} - ${to}`;
  },
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
}: DateRangePickerProps) {
  const [internalRange, setInternalRange] = React.useState<
    DateRange | undefined
  >(defaultValue);
  const isControlled = value !== undefined;
  const range = isControlled ? value : internalRange;
  const hasCustomTriggerRender = render !== undefined;

  function handleSelect(selected: DateRange | undefined) {
    if (!isControlled) {
      setInternalRange(selected);
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
      infoPopover={infoPopover}
      {...fieldProps}
    >
      <Popover.Root {...popoverProps}>
        <FieldControl
          render={
            <Popover.Trigger
              disabled={disabled || readOnly}
              aria-readonly={readOnly}
              data-validating={isValidating ? "" : undefined}
              nativeButton={hasCustomTriggerRender ? nativeButton : false}
              handle={handle}
              payload={payload}
              openOnHover={openOnHover}
              delay={delay}
              closeDelay={closeDelay}
              render={
                render ??
                (({ className: triggerClassName, ...triggerProps }) => (
                  <Input
                    {...triggerProps}
                    className={cn(
                      "hover:bg-card cursor-default",
                      !range?.from && "text-muted-foreground",
                      triggerClassName,
                    )}
                    type="text"
                    role="combobox"
                    aria-haspopup="dialog"
                    value={range?.from ? format(range) : ""}
                    placeholder={placeholder}
                    readOnly
                  />
                ))
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
                mode="range"
                selected={range}
                onSelect={handleSelect}
                autoFocus={autoFocus}
                {...props}
              />
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
        {name && (
          <>
            <input
              type="hidden"
              name={`${name}[from]`}
              value={range?.from ? range.from.toISOString() : ""}
              readOnly
            />
            <input
              type="hidden"
              name={`${name}[to]`}
              value={range?.to ? range.to.toISOString() : ""}
              readOnly
            />
          </>
        )}
      </Popover.Root>
    </Field>
  );
}

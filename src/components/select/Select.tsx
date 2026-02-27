"use client";

import {
  Select as BaseSelect,
  SelectRootProps as BaseSelectProps,
} from "@base-ui/react/select";
import { Check, ChevronsUpDown } from "lucide-react";
import React from "react";
import { cn } from "../../lib/utils";
import { BasicFieldProps, Field, FieldProps } from "../field/Field";

export interface SelectProps<T> extends BaseSelectProps<T>, BasicFieldProps {
  className?: string;
  fieldProps?: FieldProps;
  placeholder?: React.ReactNode;
}

export function Select<T>({
  label,
  isValidating,
  isValidatingMessage,
  errorMessage,
  className,
  description,
  fieldProps,
  items,
  placeholder,
  ...props
}: SelectProps<T>) {
  const invalid = !!errorMessage;

  return (
    <Field
      label={label}
      isValidating={isValidating}
      isValidatingMessage={isValidatingMessage}
      errorMessage={errorMessage}
      description={description}
      {...fieldProps}
    >
      <BaseSelect.Root items={items} {...props}>
        <BaseSelect.Trigger
          className={cn(
            "bg-background hover:bg-card data-popup-open:bg-card focus-visible:outline-highlight flex min-w-40 items-center justify-between gap-3 rounded-lg border p-2 text-base transition-colors select-none focus-visible:outline focus-visible:-outline-offset-1",
            invalid
              ? "border-error-foreground"
              : isValidating && "animate-validating",
            className,
          )}
        >
          <BaseSelect.Value
            className="data-placeholder:opacity-60"
            placeholder={placeholder}
          />
          <BaseSelect.Icon className="flex">
            <ChevronsUpDown className="size-4" />
          </BaseSelect.Icon>
        </BaseSelect.Trigger>
        <BaseSelect.Portal>
          <BaseSelect.Positioner
            className="z-10 outline-none select-none"
            sideOffset={8}
          >
            <BaseSelect.Popup className="group bg-background outline-border min-w-(--anchor-width) origin-(--transform-origin) rounded-lg bg-clip-padding shadow-lg outline transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 data-[side=none]:min-w-[calc(var(--anchor-width)+1.25rem)] data-[side=none]:data-ending-style:transition-none data-[side=none]:data-starting-style:scale-100 data-[side=none]:data-starting-style:opacity-100 data-[side=none]:data-starting-style:transition-none">
              <BaseSelect.ScrollUpArrow className="bg-background top-0 z-1 flex h-4 w-full cursor-default items-center justify-center rounded-lg text-center text-xs before:absolute before:left-0 before:h-full before:w-full before:content-[''] data-[side=none]:before:-top-full" />
              <BaseSelect.List className="relative max-h-(--available-height) scroll-py-6 overflow-y-auto py-1">
                {Array.isArray(items) &&
                  items.map(({ label, value }) => (
                    <BaseSelect.Item
                      key={label}
                      value={value}
                      className="data-highlighted:before:bg-primary data-highlighted:text-on-primary grid cursor-default grid-cols-[0.75rem_1fr] items-center gap-2 py-2 pr-4 pl-2.5 text-sm leading-4 outline-none select-none group-data-[side=none]:pr-12 group-data-[side=none]:text-base group-data-[side=none]:leading-4 data-highlighted:relative data-highlighted:z-0 data-highlighted:before:absolute data-highlighted:before:inset-x-1 data-highlighted:before:inset-y-0 data-highlighted:before:z-[-1] data-highlighted:before:rounded-sm pointer-coarse:py-2.5 pointer-coarse:text-[0.925rem]"
                    >
                      <BaseSelect.ItemIndicator className="col-start-1">
                        <Check className="size-3" />
                      </BaseSelect.ItemIndicator>
                      <BaseSelect.ItemText className="col-start-2">
                        {label}
                      </BaseSelect.ItemText>
                    </BaseSelect.Item>
                  ))}
              </BaseSelect.List>
              <BaseSelect.ScrollDownArrow className="bg-background bottom-0 z-1 flex h-4 w-full cursor-default items-center justify-center rounded-lg text-center text-xs before:absolute before:left-0 before:h-full before:w-full before:content-[''] data-[side=none]:before:-bottom-full" />
            </BaseSelect.Popup>
          </BaseSelect.Positioner>
        </BaseSelect.Portal>
      </BaseSelect.Root>
    </Field>
  );
}

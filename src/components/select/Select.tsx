"use client";

import {
  Select as BaseSelect,
  SelectRootProps as BaseSelectProps,
  SelectIconProps,
  SelectItemIndicatorProps,
  SelectItemProps,
  SelectItemTextProps,
  SelectListProps,
  SelectPopupProps,
  SelectPortalProps,
  SelectPositionerProps,
  SelectScrollDownArrowProps,
  SelectScrollUpArrowProps,
  SelectTriggerProps,
  SelectValueProps,
} from "@base-ui/react/select";
import { Check, ChevronsUpDown } from "lucide-react";
import React from "react";
import { BasicFieldProps, cn } from "../../lib/utils";
import { Field, FieldProps } from "../field/Field";

export interface SelectProps<T> extends BaseSelectProps<T>, BasicFieldProps {
  className?: string;
  placeholder?: React.ReactNode;
  fieldProps?: FieldProps;
  triggerProps?: SelectTriggerProps;
  valueProps?: SelectValueProps;
  selectIconProps?: SelectIconProps;
  iconProps?: React.ComponentPropsWithoutRef<"svg">;
  portalProps?: SelectPortalProps;
  positionerProps?: SelectPositionerProps;
  popupProps?: SelectPopupProps;
  scrollUpArrowProps?: SelectScrollUpArrowProps;
  listProps?: SelectListProps;
  itemProps?: SelectItemProps;
  itemIndicatorProps?: SelectItemIndicatorProps;
  checkIconProps?: React.ComponentPropsWithoutRef<"svg">;
  itemTextProps?: SelectItemTextProps;
  scrollDownArrowProps?: SelectScrollDownArrowProps;
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
  triggerProps: { className: triggerClassName, ...triggerProps } = {},
  valueProps: { className: valueClassName, ...valueProps } = {},
  selectIconProps: { className: selectIconClassName, ...selectIconProps } = {},
  iconProps: { className: iconClassName, ...iconProps } = {},
  portalProps,
  positionerProps: { className: positionerClassName, ...positionerProps } = {},
  popupProps: { className: popupClassName, ...popupProps } = {},
  scrollUpArrowProps: {
    className: scrollUpArrowClassName,
    ...scrollUpArrowProps
  } = {},
  listProps: { className: listClassName, ...listProps } = {},
  itemProps: { className: itemClassName, ...itemProps } = {},
  itemIndicatorProps: {
    className: itemIndicatorClassName,
    ...itemIndicatorProps
  } = {},
  checkIconProps: { className: checkIconClassName, ...checkIconProps } = {},
  itemTextProps: { className: itemTextClassName, ...itemTextProps } = {},
  scrollDownArrowProps: {
    className: scrollDownArrowClassName,
    ...scrollDownArrowProps
  } = {},
  ...props
}: SelectProps<T>) {
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
            "data-invalid:not-focus:border-error-foreground data-validating:not-data-invalid:animate-validating bg-background hover:bg-card data-popup-open:bg-card focus-visible:border-highlight flex min-w-40 items-center justify-between gap-3 rounded-lg border p-2 text-base transition-colors outline-none select-none",
            className,
            triggerClassName,
          )}
          data-validating={isValidating ? "" : undefined}
          {...triggerProps}
        >
          <BaseSelect.Value
            className={cn("data-placeholder:opacity-60", valueClassName)}
            placeholder={placeholder}
            {...valueProps}
          />
          <BaseSelect.Icon
            className={cn("flex", selectIconClassName)}
            {...selectIconProps}
          >
            <ChevronsUpDown
              className={cn("size-4", iconClassName)}
              {...iconProps}
            />
          </BaseSelect.Icon>
        </BaseSelect.Trigger>
        <BaseSelect.Portal {...portalProps}>
          <BaseSelect.Positioner
            className={cn("z-10 outline-none select-none", positionerClassName)}
            sideOffset={8}
            {...positionerProps}
          >
            <BaseSelect.Popup
              className={cn(
                "group bg-background outline-border min-w-(--anchor-width) origin-(--transform-origin) rounded-lg bg-clip-padding shadow-lg outline transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 data-[side=none]:min-w-[calc(var(--anchor-width)+1.25rem)] data-[side=none]:data-ending-style:transition-none data-[side=none]:data-starting-style:scale-100 data-[side=none]:data-starting-style:opacity-100 data-[side=none]:data-starting-style:transition-none",
                popupClassName,
              )}
              {...popupProps}
            >
              <BaseSelect.ScrollUpArrow
                className={cn(
                  "bg-background top-0 z-1 flex h-4 w-full cursor-default items-center justify-center rounded-lg text-center text-xs before:absolute before:left-0 before:h-full before:w-full before:content-[''] data-[side=none]:before:-top-full",
                  scrollUpArrowClassName,
                )}
                {...scrollUpArrowProps}
              />
              <BaseSelect.List
                className={cn(
                  "relative max-h-(--available-height) scroll-py-6 overflow-y-auto py-1",
                  listClassName,
                )}
                {...listProps}
              >
                {Array.isArray(items) &&
                  items.map(({ label, value }) => (
                    <BaseSelect.Item
                      key={label}
                      value={value}
                      className={cn(
                        "data-highlighted:before:bg-primary data-highlighted:text-on-primary grid cursor-default grid-cols-[0.75rem_1fr] items-center gap-2 py-2 pr-4 pl-2.5 text-sm leading-4 outline-none select-none group-data-[side=none]:pr-12 group-data-[side=none]:text-base group-data-[side=none]:leading-4 data-highlighted:relative data-highlighted:z-0 data-highlighted:before:absolute data-highlighted:before:inset-x-1 data-highlighted:before:inset-y-0 data-highlighted:before:z-[-1] data-highlighted:before:rounded-sm pointer-coarse:py-2.5 pointer-coarse:text-[0.925rem]",
                        itemClassName,
                      )}
                      {...itemProps}
                    >
                      <BaseSelect.ItemIndicator
                        className={cn("col-start-1", itemIndicatorClassName)}
                        {...itemIndicatorProps}
                      >
                        <Check
                          className={cn("size-3", checkIconClassName)}
                          {...checkIconProps}
                        />
                      </BaseSelect.ItemIndicator>
                      <BaseSelect.ItemText
                        className={cn("col-start-2", itemTextClassName)}
                        {...itemTextProps}
                      >
                        {label}
                      </BaseSelect.ItemText>
                    </BaseSelect.Item>
                  ))}
              </BaseSelect.List>
              <BaseSelect.ScrollDownArrow
                className={cn(
                  "bg-background bottom-0 z-1 flex h-4 w-full cursor-default items-center justify-center rounded-lg text-center text-xs before:absolute before:left-0 before:h-full before:w-full before:content-[''] data-[side=none]:before:-bottom-full",
                  scrollDownArrowClassName,
                )}
                {...scrollDownArrowProps}
              />
            </BaseSelect.Popup>
          </BaseSelect.Positioner>
        </BaseSelect.Portal>
      </BaseSelect.Root>
    </Field>
  );
}

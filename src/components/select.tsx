import {
  Select as BaseSelect,
  SelectIconProps,
  SelectItemIndicatorProps,
  SelectItemProps,
  SelectItemTextProps,
  SelectListProps,
  SelectPopupProps,
  SelectPortalProps,
  SelectPositionerProps,
  SelectRootProps,
  SelectScrollDownArrowProps,
  SelectScrollUpArrowProps,
  SelectTriggerProps,
  SelectValueProps,
} from "@base-ui/react/select";
import { Check, ChevronsUpDown } from "lucide-react";
import React from "react";
import { FieldAttributes } from "../lib/types";
import { cn, cnBaseUI } from "../lib/utils";
import { Field, FieldProps } from "./field";

export interface SelectProps<T>
  extends
    Omit<SelectTriggerProps, "value">,
    SelectRootProps<T>,
    FieldAttributes {
  placeholder?: React.ReactNode;
  triggerDisabled?: SelectTriggerProps["disabled"];
  triggerId?: SelectTriggerProps["id"];
  triggerName?: SelectTriggerProps["name"];
  triggerValue?: SelectTriggerProps["value"];
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
  invalid,
  className,
  description,
  infoPopover,
  fieldProps,
  items,
  placeholder,
  actionsRef,
  autoComplete,
  defaultOpen,
  defaultValue,
  disabled,
  highlightItemOnHover,
  id,
  inputRef,
  isItemEqualToValue,
  itemToStringLabel,
  itemToStringValue,
  modal,
  multiple,
  name,
  onOpenChange,
  onOpenChangeComplete,
  onValueChange,
  open,
  readOnly,
  required,
  value,
  triggerDisabled,
  triggerId,
  triggerName,
  triggerValue,
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
      infoPopover={infoPopover}
      invalid={invalid}
      {...fieldProps}
    >
      <BaseSelect.Root
        items={items}
        actionsRef={actionsRef}
        autoComplete={autoComplete}
        defaultOpen={defaultOpen}
        defaultValue={defaultValue}
        disabled={disabled}
        highlightItemOnHover={highlightItemOnHover}
        id={id}
        inputRef={inputRef}
        isItemEqualToValue={isItemEqualToValue}
        itemToStringLabel={itemToStringLabel}
        itemToStringValue={itemToStringValue}
        modal={modal}
        multiple={multiple}
        name={name}
        onOpenChange={onOpenChange}
        onOpenChangeComplete={onOpenChangeComplete}
        onValueChange={onValueChange}
        open={open}
        readOnly={readOnly}
        required={required}
        value={value}
      >
        <BaseSelect.Trigger
          className={cnBaseUI(
            "outline-highlight focus-visible:focus-outline data-invalid:border-error-foreground data-validating:not-data-invalid:animate-validating hover:bg-card data-popup-open:bg-card flex min-w-40 items-center justify-between gap-3 rounded-lg border p-2 text-base transition-colors outline-none select-none",
            className,
          )}
          data-validating={isValidating ? "" : undefined}
          disabled={triggerDisabled}
          id={triggerId}
          name={triggerName}
          value={triggerValue}
          {...props}
        >
          <BaseSelect.Value
            className={cnBaseUI("data-placeholder:opacity-60", valueClassName)}
            placeholder={placeholder}
            {...valueProps}
          />
          <BaseSelect.Icon
            className={cnBaseUI("flex", selectIconClassName)}
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
            className={cnBaseUI(
              "z-10 outline-none select-none",
              positionerClassName,
            )}
            sideOffset={8}
            {...positionerProps}
          >
            <BaseSelect.Popup
              className={cnBaseUI(
                "group bg-background outline-border min-w-(--anchor-width) origin-(--transform-origin) rounded-lg bg-clip-padding shadow-lg outline transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 data-[side=none]:min-w-[calc(var(--anchor-width)+1.25rem)] data-[side=none]:data-ending-style:transition-none data-[side=none]:data-starting-style:scale-100 data-[side=none]:data-starting-style:opacity-100 data-[side=none]:data-starting-style:transition-none",
                popupClassName,
              )}
              {...popupProps}
            >
              <BaseSelect.ScrollUpArrow
                className={cnBaseUI(
                  "bg-background top-0 z-1 flex h-4 w-full cursor-default items-center justify-center rounded-lg text-center text-xs before:absolute before:left-0 before:h-full before:w-full before:content-[''] data-[side=none]:before:-top-full",
                  scrollUpArrowClassName,
                )}
                {...scrollUpArrowProps}
              />
              <BaseSelect.List
                className={cnBaseUI(
                  "relative max-h-(--available-height) scroll-py-6 overflow-y-auto py-1",
                  listClassName,
                )}
                {...listProps}
              >
                {Array.isArray(items) &&
                  items.map(({ label, value }) => (
                    <BaseSelect.Item
                      key={String(value)}
                      value={value}
                      className={cnBaseUI(
                        "data-highlighted:before:bg-primary data-highlighted:text-on-primary grid cursor-default grid-cols-[0.75rem_1fr] items-center gap-2 py-2 pr-4 pl-2.5 text-sm leading-4 outline-none select-none group-data-[side=none]:pr-12 group-data-[side=none]:text-base group-data-[side=none]:leading-4 data-highlighted:relative data-highlighted:z-0 data-highlighted:before:absolute data-highlighted:before:inset-x-1 data-highlighted:before:inset-y-0 data-highlighted:before:z-[-1] data-highlighted:before:rounded-sm pointer-coarse:py-2.5 pointer-coarse:text-[0.925rem]",
                        itemClassName,
                      )}
                      {...itemProps}
                    >
                      <BaseSelect.ItemIndicator
                        className={cnBaseUI(
                          "col-start-1",
                          itemIndicatorClassName,
                        )}
                        {...itemIndicatorProps}
                      >
                        <Check
                          className={cn("size-3", checkIconClassName)}
                          {...checkIconProps}
                        />
                      </BaseSelect.ItemIndicator>
                      <BaseSelect.ItemText
                        className={cnBaseUI("col-start-2", itemTextClassName)}
                        {...itemTextProps}
                      >
                        {label}
                      </BaseSelect.ItemText>
                    </BaseSelect.Item>
                  ))}
              </BaseSelect.List>
              <BaseSelect.ScrollDownArrow
                className={cnBaseUI(
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

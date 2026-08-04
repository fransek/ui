import {
  Select as BaseUISelect,
  SelectGroupLabelProps,
  SelectGroupProps,
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
import { mergeProps, tw } from "../lib/utils";
import { Field, FieldProps } from "./field";

/**
 * The data structure accepted by the `items` prop, re-exported from Base UI's
 * `Select.Root`. One of:
 * - a flat array of `{ label, value }` items,
 * - an array of groups (objects with a `label` heading and their own `items`),
 * - a `Record` mapping each value to its label.
 */
export type SelectItems<T = unknown> = SelectRootProps<T>["items"];

interface RenderItem {
  label: React.ReactNode;
  value: unknown;
}

interface RenderGroup {
  /** Heading rendered above the group's items. */
  label?: React.ReactNode;
  items: readonly RenderItem[];
}

/**
 * Base UI's `items` accepts a flat array of `{ label, value }` items or an array
 * of groups (objects with an `items` array). Groups aren't rendered by Base UI
 * itself, so detect them and render a `Select.Group` with a `Select.GroupLabel`
 * heading (read from the group's `label`).
 */
function isGroupedItems(items: unknown): items is readonly RenderGroup[] {
  return (
    Array.isArray(items) &&
    items.length > 0 &&
    typeof items[0] === "object" &&
    items[0] != null &&
    "items" in items[0]
  );
}

export interface SelectProps<T, Multiple extends boolean | undefined = false>
  extends
    Omit<SelectTriggerProps, "value">,
    SelectRootProps<T, Multiple>,
    FieldAttributes {
  groupProps?: SelectGroupProps;
  groupLabelProps?: SelectGroupLabelProps;
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

export function Select<T, Multiple extends boolean | undefined = false>(
  props: SelectProps<T, Multiple>,
) {
  const {
    label,
    isValidating,
    isValidatingMessage,
    errorMessage,
    invalid,
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
    valueProps,
    selectIconProps,
    iconProps,
    portalProps,
    positionerProps,
    popupProps,
    scrollUpArrowProps,
    listProps,
    groupProps,
    groupLabelProps,
    itemProps,
    itemIndicatorProps,
    checkIconProps,
    itemTextProps,
    scrollDownArrowProps,
    ...restProps
  } = props;

  const renderItem = (item: RenderItem) => (
    <BaseUISelect.Item
      key={String(item.value)}
      value={item.value}
      {...mergeProps(itemProps, {
        className: tw(
          "data-highlighted:before:bg-primary data-highlighted:text-on-primary relative z-0 flex cursor-default items-center gap-3 py-2 pr-2.5 pl-2.5 text-sm leading-4 outline-none select-none group-data-[side=none]:text-base group-data-[side=none]:leading-4 before:absolute before:inset-x-1 before:inset-y-0 before:z-[-1] before:rounded-sm pointer-coarse:py-2.5 pointer-coarse:text-[0.925rem]",
        ),
      })}
    >
      <BaseUISelect.ItemText
        {...mergeProps(itemTextProps, { className: tw("flex-1") })}
      >
        {item.label}
      </BaseUISelect.ItemText>
      <BaseUISelect.ItemIndicator
        {...mergeProps(itemIndicatorProps, { className: tw("flex") })}
      >
        <Check {...mergeProps(checkIconProps, { className: tw("size-4") })} />
      </BaseUISelect.ItemIndicator>
    </BaseUISelect.Item>
  );

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
      <BaseUISelect.Root
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
        <BaseUISelect.Trigger
          data-validating={isValidating ? "" : undefined}
          disabled={triggerDisabled}
          id={triggerId}
          name={triggerName}
          value={triggerValue}
          {...mergeProps(restProps, {
            className: tw(
              "bg-field outline-highlight focus-visible:focus-outline data-invalid:border-danger-fg data-validating:not-data-invalid:animate-validating hover:bg-card data-popup-open:bg-card flex min-w-40 items-center justify-between gap-3 rounded-lg border p-2 text-base shadow transition-colors outline-none select-none",
            ),
          })}
        >
          <BaseUISelect.Value
            placeholder={placeholder}
            {...mergeProps(valueProps, {
              className: tw("data-placeholder:opacity-60"),
            })}
          />
          <BaseUISelect.Icon
            {...mergeProps(selectIconProps, { className: tw("flex") })}
          >
            <ChevronsUpDown
              {...mergeProps(iconProps, { className: tw("size-4") })}
            />
          </BaseUISelect.Icon>
        </BaseUISelect.Trigger>
        <BaseUISelect.Portal {...portalProps}>
          <BaseUISelect.Positioner
            sideOffset={8}
            {...mergeProps(positionerProps, {
              className: tw("z-10 outline-none select-none"),
            })}
          >
            <BaseUISelect.Popup
              {...mergeProps(popupProps, {
                className: tw(
                  "group bg-background outline-border w-(--anchor-width) origin-(--transform-origin) rounded-lg bg-clip-padding shadow-lg outline transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 data-[side=none]:data-ending-style:transition-none data-[side=none]:data-starting-style:scale-100 data-[side=none]:data-starting-style:opacity-100 data-[side=none]:data-starting-style:transition-none",
                ),
              })}
            >
              <BaseUISelect.ScrollUpArrow
                {...mergeProps(scrollUpArrowProps, {
                  className: tw(
                    "bg-background top-0 z-1 flex h-4 w-full cursor-default items-center justify-center rounded-lg text-center text-xs before:absolute before:left-0 before:h-full before:w-full before:content-[''] data-[side=none]:before:-top-full",
                  ),
                })}
              />
              <BaseUISelect.List
                {...mergeProps(listProps, {
                  className: tw(
                    "relative max-h-(--available-height) scroll-py-6 overflow-y-auto py-1",
                  ),
                })}
              >
                {isGroupedItems(items)
                  ? items.map((group, index) => (
                      <BaseUISelect.Group
                        key={index}
                        {...mergeProps(groupProps, {
                          className: tw("not-last:mb-2"),
                        })}
                      >
                        <BaseUISelect.GroupLabel
                          {...mergeProps(groupLabelProps, {
                            className: tw(
                              "text-muted-fg px-2.5 py-1 text-xs font-medium",
                            ),
                          })}
                        >
                          {group.label}
                        </BaseUISelect.GroupLabel>
                        {group.items.map(renderItem)}
                      </BaseUISelect.Group>
                    ))
                  : Array.isArray(items)
                    ? (items as readonly RenderItem[]).map(renderItem)
                    : items != null
                      ? Object.entries(items).map(([value, itemLabel]) =>
                          renderItem({ value, label: itemLabel }),
                        )
                      : null}
              </BaseUISelect.List>
              <BaseUISelect.ScrollDownArrow
                {...mergeProps(scrollDownArrowProps, {
                  className: tw(
                    "bg-background bottom-0 z-1 flex h-4 w-full cursor-default items-center justify-center rounded-lg text-center text-xs before:absolute before:left-0 before:h-full before:w-full before:content-[''] data-[side=none]:before:-bottom-full",
                  ),
                })}
              />
            </BaseUISelect.Popup>
          </BaseUISelect.Positioner>
        </BaseUISelect.Portal>
      </BaseUISelect.Root>
    </Field>
  );
}

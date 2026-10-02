import * as BaseUI from "@base-ui/react/combobox";
import { Check, ChevronsUpDown, X } from "lucide-react";
import React from "react";
import { FieldAttributes } from "../../lib/types";
import { cn, mergeProps, tw } from "../../lib/utils";
import { Button } from "../button";
import { chipStyles } from "../chip";
import { CloseButtonProps } from "../close-button";
import { Field, FieldProps } from "../field";

/** A group of items rendered under a shared `label` heading. */
export interface ComboboxGroup<T = unknown> {
  /** Heading rendered above the group's items. */
  label?: React.ReactNode;
  items: readonly T[];
}

/**
 * The data structure accepted by the `items` prop. One of:
 * - a flat array of items (strings, or `{ label, value }` objects),
 * - an array of groups (objects with a `label` heading and their own `items`),
 * - a `Record` mapping each value to its label.
 */
export type ComboboxItems<T = unknown> =
  readonly T[] | readonly ComboboxGroup<T>[] | Record<string, React.ReactNode>;

interface LabeledItem {
  label: React.ReactNode;
  value: unknown;
}

/**
 * Base UI resolves `{ label, value }` items automatically — matching the query
 * against `label`, filling the input with it, and submitting `value` — so
 * detect the shape to know which part to render inside items and chips.
 */
function isLabeledItem(item: unknown): item is LabeledItem {
  return typeof item === "object" && item != null && "label" in item;
}

function getItemLabel(item: unknown): React.ReactNode {
  return isLabeledItem(item) ? item.label : String(item);
}

/**
 * Groups are objects carrying their own `items` array. Base UI filters within
 * them but doesn't render the headings itself, so they need a `Group` with a
 * `GroupLabel` wrapper around the group's `Collection`.
 */
function isGroupedItems(items: unknown): items is readonly ComboboxGroup[] {
  return (
    Array.isArray(items) &&
    items.length > 0 &&
    typeof items[0] === "object" &&
    items[0] != null &&
    "items" in items[0]
  );
}

/**
 * Base UI's `items` only accepts arrays, so expand the `Record` shorthand
 * (shared with `Select`) into the equivalent flat list of labeled items.
 */
function normalizeItems<T>(
  items: ComboboxItems<T> | undefined,
): readonly T[] | undefined {
  if (items == null || Array.isArray(items)) {
    return items as readonly T[] | undefined;
  }
  return Object.entries(items).map(([value, label]) => ({
    value,
    label,
  })) as unknown as readonly T[];
}

export interface ComboboxProps<
  T = unknown,
  Multiple extends boolean | undefined = false,
>
  extends
    Omit<
      BaseUI.ComboboxInputProps,
      "children" | "value" | "defaultValue" | "autoComplete" | "multiple"
    >,
    Omit<BaseUI.ComboboxRootProps<T, Multiple>, "children" | "items">,
    FieldAttributes {
  /**
   * The items to choose from. A flat array, an array of groups, or a `Record`
   * mapping each value to its label. The selected value is the item itself.
   */
  items?: ComboboxItems<T>;
  /**
   * Rendered inside the popup when no item matches the query. Announced
   * politely to screen readers. Defaults to "No results found."
   */
  emptyMessage?: React.ReactNode;
  /**
   * A status message rendered above the list, announced politely to screen
   * readers. Useful for conveying the state of an asynchronously loaded list.
   */
  status?: React.ReactNode;
  /** Whether to render a button that clears the selection. Defaults to `true`. */
  clearable?: boolean;
  /** Rendered inside the input, before the text. */
  leftAdornment?: React.ReactNode;
  fieldProps?: FieldProps;
  inputGroupProps?: BaseUI.ComboboxInputGroupProps;
  chipsProps?: BaseUI.ComboboxChipsProps;
  chipProps?: BaseUI.ComboboxChipProps;
  chipRemoveProps?: BaseUI.ComboboxChipRemoveProps;
  clearProps?: BaseUI.ComboboxClearProps;
  clearButtonProps?: CloseButtonProps;
  triggerProps?: BaseUI.ComboboxTriggerProps;
  portalProps?: BaseUI.ComboboxPortalProps;
  positionerProps?: BaseUI.ComboboxPositionerProps;
  popupProps?: BaseUI.ComboboxPopupProps;
  statusProps?: BaseUI.ComboboxStatusProps;
  emptyProps?: BaseUI.ComboboxEmptyProps;
  listProps?: BaseUI.ComboboxListProps;
  groupProps?: BaseUI.ComboboxGroupProps;
  groupLabelProps?: BaseUI.ComboboxGroupLabelProps;
  collectionProps?: Omit<BaseUI.ComboboxCollectionProps, "children">;
  itemProps?: BaseUI.ComboboxItemProps;
  itemIndicatorProps?: BaseUI.ComboboxItemIndicatorProps;
  checkIconProps?: React.ComponentPropsWithoutRef<"svg">;
}

export function Combobox<
  T = unknown,
  Multiple extends boolean | undefined = false,
>(props: ComboboxProps<T, Multiple>) {
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
    emptyMessage = "No results found.",
    status,
    clearable = true,
    leftAdornment,
    placeholder,
    actionsRef,
    autoComplete,
    autoHighlight,
    defaultInputValue,
    defaultOpen,
    defaultValue,
    disabled,
    filter,
    filteredItems,
    form,
    grid,
    highlightItemOnHover,
    id,
    inline,
    inputRef,
    inputValue,
    isItemEqualToValue,
    itemToStringLabel,
    itemToStringValue,
    limit,
    locale,
    loopFocus,
    modal,
    multiple,
    name,
    onInputValueChange,
    onItemHighlighted,
    onOpenChange,
    onOpenChangeComplete,
    onValueChange,
    open,
    openOnInputClick,
    readOnly,
    required,
    value,
    virtualized,
    inputGroupProps,
    chipsProps,
    chipProps,
    chipRemoveProps,
    clearProps,
    clearButtonProps,
    triggerProps,
    portalProps,
    positionerProps,
    popupProps,
    statusProps,
    emptyProps,
    listProps,
    groupProps,
    groupLabelProps,
    collectionProps,
    itemProps,
    itemIndicatorProps,
    checkIconProps,
    ...restProps
  } = props;

  const normalizedItems = normalizeItems(items);
  const grouped = isGroupedItems(normalizedItems);

  const renderInput = (className: string, hidePlaceholder = false) => (
    <BaseUI.Combobox.Input
      placeholder={hidePlaceholder ? undefined : placeholder}
      {...mergeProps(restProps, {
        className: cn(
          "placeholder:text-muted-fg min-w-0 flex-1 bg-transparent outline-none",
          className,
        ),
      })}
    />
  );

  const renderChip = (item: T, index: number) => {
    const itemLabel = getItemLabel(item);
    return (
      <BaseUI.Combobox.Chip
        key={index}
        {...mergeProps(chipProps, {
          className: chipStyles({
            variant: "muted",
            size: "sm",
            removable: true,
            extend: tw(
              "outline-highlight data-highlighted:focus-outline outline-none",
            ),
          }),
        })}
      >
        {itemLabel}
        <BaseUI.Combobox.ChipRemove
          aria-label={
            typeof itemLabel === "string" ? `Remove ${itemLabel}` : "Remove"
          }
          {...mergeProps(chipRemoveProps, {
            className: tw(
              "flex cursor-pointer items-center justify-center rounded-full p-0.5 opacity-70 transition-[opacity,background-color] hover:bg-current/15 hover:opacity-100 data-disabled:cursor-not-allowed data-disabled:hover:bg-transparent",
            ),
          })}
        >
          <X className="size-3.5" aria-hidden />
        </BaseUI.Combobox.ChipRemove>
      </BaseUI.Combobox.Chip>
    );
  };

  const renderItem = (item: T, index: number) => (
    <BaseUI.Combobox.Item
      key={index}
      value={item}
      {...mergeProps(itemProps, {
        className: tw(
          "data-highlighted:before:bg-primary data-highlighted:text-on-primary relative z-0 flex cursor-default items-center gap-3 px-2.5 py-2 leading-4 outline-none select-none before:absolute before:inset-x-1 before:inset-y-0 before:z-[-1] before:rounded-sm pointer-coarse:py-2.5 pointer-coarse:text-[0.925rem]",
        ),
      })}
    >
      <span className="flex-1">{getItemLabel(item)}</span>
      <BaseUI.Combobox.ItemIndicator
        {...mergeProps(itemIndicatorProps, { className: tw("flex") })}
      >
        <Check {...mergeProps(checkIconProps, { className: tw("size-4") })} />
      </BaseUI.Combobox.ItemIndicator>
    </BaseUI.Combobox.Item>
  );

  const renderGroup = (group: ComboboxGroup<T>, index: number) => (
    <BaseUI.Combobox.Group
      key={index}
      items={group.items}
      {...mergeProps(groupProps, { className: tw("not-last:mb-2") })}
    >
      <BaseUI.Combobox.GroupLabel
        {...mergeProps(groupLabelProps, {
          className: tw("text-muted-fg px-2.5 py-1 text-xs font-medium"),
        })}
      >
        {group.label}
      </BaseUI.Combobox.GroupLabel>
      <BaseUI.Combobox.Collection {...collectionProps}>
        {renderItem}
      </BaseUI.Combobox.Collection>
    </BaseUI.Combobox.Group>
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
      <BaseUI.Combobox.Root
        items={normalizedItems}
        actionsRef={actionsRef}
        autoComplete={autoComplete}
        autoHighlight={autoHighlight}
        defaultInputValue={defaultInputValue}
        defaultOpen={defaultOpen}
        defaultValue={defaultValue}
        disabled={disabled}
        filter={filter}
        filteredItems={filteredItems}
        form={form}
        grid={grid}
        highlightItemOnHover={highlightItemOnHover}
        id={id}
        inline={inline}
        inputRef={inputRef}
        inputValue={inputValue}
        isItemEqualToValue={isItemEqualToValue}
        itemToStringLabel={itemToStringLabel}
        itemToStringValue={itemToStringValue}
        limit={limit}
        locale={locale}
        loopFocus={loopFocus}
        modal={modal}
        multiple={multiple}
        name={name}
        onInputValueChange={onInputValueChange}
        onItemHighlighted={onItemHighlighted}
        onOpenChange={onOpenChange}
        onOpenChangeComplete={onOpenChangeComplete}
        onValueChange={onValueChange}
        open={open}
        openOnInputClick={openOnInputClick}
        readOnly={readOnly}
        required={required}
        value={value}
        virtualized={virtualized}
      >
        <BaseUI.Combobox.InputGroup
          data-validating={isValidating ? "" : undefined}
          {...mergeProps(inputGroupProps, {
            className: tw(
              "bg-field data-invalid:border-danger-fg data-validating:not-data-invalid:animate-validating outline-highlight has-[input:focus-visible]:focus-outline flex w-full min-w-40 items-center gap-1 rounded-lg border pr-2 shadow transition-colors data-disabled:opacity-60",
            ),
          })}
        >
          {leftAdornment && (
            <span className="text-muted-fg flex items-center pl-2">
              {leftAdornment}
            </span>
          )}
          {multiple ? (
            <BaseUI.Combobox.Chips
              {...mergeProps(chipsProps, {
                className: tw(
                  "flex flex-1 flex-wrap items-center gap-1 py-1 pl-1.5",
                ),
              })}
            >
              <BaseUI.Combobox.Value>
                {(selected: readonly T[]) => (
                  <>
                    {selected.map(renderChip)}
                    {renderInput(tw("min-w-16 px-1 py-1"), selected.length > 0)}
                  </>
                )}
              </BaseUI.Combobox.Value>
            </BaseUI.Combobox.Chips>
          ) : (
            renderInput(tw("p-2"))
          )}
          {clearable && (
            <BaseUI.Combobox.Clear
              render={
                <Button
                  aria-label="Clear"
                  size="icon"
                  variant="ghost"
                  {...clearButtonProps}
                >
                  <X className="size-3.5" />
                </Button>
              }
              {...clearProps}
            />
          )}
          <BaseUI.Combobox.Trigger
            aria-label="Open popup"
            render={<Button size="icon" variant="ghost" />}
            {...triggerProps}
          >
            <ChevronsUpDown className="size-4" />
          </BaseUI.Combobox.Trigger>
        </BaseUI.Combobox.InputGroup>
        <BaseUI.Combobox.Portal {...portalProps}>
          <BaseUI.Combobox.Positioner
            sideOffset={8}
            {...mergeProps(positionerProps, {
              className: tw("z-10 outline-none select-none"),
            })}
          >
            <BaseUI.Combobox.Popup
              {...mergeProps(popupProps, {
                className: tw(
                  "bg-background outline-border scrollbar-track-background scrollbar-thumb-muted max-h-[min(24rem,var(--available-height))] w-(--anchor-width) origin-(--transform-origin) overflow-y-auto rounded-lg bg-clip-padding py-1 shadow-lg outline transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0",
                ),
              })}
            >
              <BaseUI.Combobox.Status
                {...mergeProps(statusProps, {
                  className: tw(
                    "text-muted-fg px-2.5 py-2 text-sm empty:m-0 empty:p-0",
                  ),
                })}
              >
                {status}
              </BaseUI.Combobox.Status>
              <BaseUI.Combobox.Empty
                {...mergeProps(emptyProps, {
                  className: tw(
                    "text-muted-fg px-2.5 py-2 text-sm empty:m-0 empty:p-0",
                  ),
                })}
              >
                {emptyMessage}
              </BaseUI.Combobox.Empty>
              <BaseUI.Combobox.List
                {...mergeProps(listProps, { className: tw("relative") })}
              >
                {grouped ? renderGroup : renderItem}
              </BaseUI.Combobox.List>
            </BaseUI.Combobox.Popup>
          </BaseUI.Combobox.Positioner>
        </BaseUI.Combobox.Portal>
      </BaseUI.Combobox.Root>
    </Field>
  );
}

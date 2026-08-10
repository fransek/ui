import {
  AutocompleteClearProps,
  AutocompleteCollectionProps,
  AutocompleteEmptyProps,
  AutocompleteGroupLabelProps,
  AutocompleteGroupProps,
  AutocompleteInputProps,
  AutocompleteItemProps,
  AutocompleteListProps,
  AutocompletePopupProps,
  AutocompletePortalProps,
  AutocompletePositionerProps,
  AutocompleteRootProps,
  AutocompleteStatusProps,
  Autocomplete as BaseUIAutocomplete,
} from "@base-ui/react/autocomplete";
import { X } from "lucide-react";
import React from "react";
import { FieldAttributes } from "../lib/types";
import { cn, mergeProps, tw } from "../lib/utils";
import { Button } from "./button";
import { CloseButtonProps } from "./close-button";
import { Field, fieldControlStyles, FieldProps } from "./field";

/** A group of items rendered under a shared `label` heading. */
export interface AutocompleteGroup<T = unknown> {
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
export type AutocompleteItems<T = unknown> =
  | readonly T[]
  | readonly AutocompleteGroup<T>[]
  | Record<string, React.ReactNode>;

interface LabeledItem {
  label: React.ReactNode;
  value: unknown;
}

/**
 * Base UI resolves `{ label, value }` items automatically — matching the query
 * against `label` and submitting `value` — so detect the shape to know which
 * part to render inside the item.
 */
function isLabeledItem(item: unknown): item is LabeledItem {
  return typeof item === "object" && item != null && "label" in item;
}

/**
 * Groups are objects carrying their own `items` array. Base UI filters within
 * them but doesn't render the headings itself, so they need a `Group` with a
 * `GroupLabel` wrapper around the group's `Collection`.
 */
function isGroupedItems(items: unknown): items is readonly AutocompleteGroup[] {
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
  items: AutocompleteItems<T> | undefined,
): readonly T[] | undefined {
  if (items == null || Array.isArray(items)) {
    return items as readonly T[] | undefined;
  }
  return Object.entries(items).map(([value, label]) => ({
    value,
    label,
  })) as unknown as readonly T[];
}

export interface AutocompleteProps<T = unknown>
  extends
    Omit<AutocompleteInputProps, "children">,
    Omit<AutocompleteRootProps<T>, "children" | "items">,
    FieldAttributes {
  /**
   * The items to search through. A flat array, an array of groups, or a
   * `Record` mapping each value to its label.
   */
  items?: AutocompleteItems<T>;
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
  /** Whether to render a button that clears the input. Defaults to `true`. */
  clearable?: boolean;
  /** Rendered inside the input, before the text. */
  leftAdornment?: React.ReactNode;
  /** Rendered inside the input, after the text. */
  rightAdornment?: React.ReactNode;
  fieldProps?: FieldProps;
  clearProps?: AutocompleteClearProps;
  clearButtonProps?: CloseButtonProps;
  portalProps?: AutocompletePortalProps;
  positionerProps?: AutocompletePositionerProps;
  popupProps?: AutocompletePopupProps;
  statusProps?: AutocompleteStatusProps;
  emptyProps?: AutocompleteEmptyProps;
  listProps?: AutocompleteListProps;
  groupProps?: AutocompleteGroupProps;
  groupLabelProps?: AutocompleteGroupLabelProps;
  collectionProps?: Omit<AutocompleteCollectionProps, "children">;
  itemProps?: AutocompleteItemProps;
}

export function Autocomplete<T = unknown>(props: AutocompleteProps<T>) {
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
    rightAdornment,
    actionsRef,
    autoHighlight,
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
    itemToStringValue,
    keepHighlight,
    limit,
    locale,
    loopFocus,
    modal,
    mode,
    name,
    onItemHighlighted,
    onOpenChange,
    onOpenChangeComplete,
    onValueChange,
    open,
    openOnInputClick,
    readOnly,
    required,
    submitOnItemClick,
    value,
    virtualized,
    clearProps,
    clearButtonProps,
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
    ...restProps
  } = props;

  const normalizedItems = normalizeItems(items);
  const grouped = isGroupedItems(normalizedItems);

  const hasLeftAdornment = leftAdornment != null;
  const hasRightAdornment = rightAdornment != null;
  const rightSlotCount = Number(hasRightAdornment) + Number(clearable);

  const renderItem = (item: T, index: number) => (
    <BaseUIAutocomplete.Item
      key={index}
      value={item}
      {...mergeProps(itemProps, {
        className: tw(
          "data-highlighted:before:bg-primary data-highlighted:text-on-primary relative z-0 flex cursor-default items-center gap-3 px-2.5 py-2 leading-4 outline-none select-none before:absolute before:inset-x-1 before:inset-y-0 before:z-[-1] before:rounded-sm pointer-coarse:py-2.5 pointer-coarse:text-[0.925rem]",
        ),
      })}
    >
      {isLabeledItem(item) ? item.label : String(item)}
    </BaseUIAutocomplete.Item>
  );

  const renderGroup = (group: AutocompleteGroup<T>, index: number) => (
    <BaseUIAutocomplete.Group
      key={index}
      items={group.items}
      {...mergeProps(groupProps, { className: tw("not-last:mb-2") })}
    >
      <BaseUIAutocomplete.GroupLabel
        {...mergeProps(groupLabelProps, {
          className: tw("text-muted-fg px-2.5 py-1 text-xs font-medium"),
        })}
      >
        {group.label}
      </BaseUIAutocomplete.GroupLabel>
      <BaseUIAutocomplete.Collection {...collectionProps}>
        {renderItem}
      </BaseUIAutocomplete.Collection>
    </BaseUIAutocomplete.Group>
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
      <BaseUIAutocomplete.Root
        items={normalizedItems}
        actionsRef={actionsRef}
        autoHighlight={autoHighlight}
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
        itemToStringValue={itemToStringValue}
        keepHighlight={keepHighlight}
        limit={limit}
        locale={locale}
        loopFocus={loopFocus}
        modal={modal}
        mode={mode}
        name={name}
        onItemHighlighted={onItemHighlighted}
        onOpenChange={onOpenChange}
        onOpenChangeComplete={onOpenChangeComplete}
        onValueChange={onValueChange}
        open={open}
        openOnInputClick={openOnInputClick}
        readOnly={readOnly}
        required={required}
        submitOnItemClick={submitOnItemClick}
        value={value}
        virtualized={virtualized}
      >
        <div className="relative w-full">
          {leftAdornment && (
            <span className="text-muted-fg absolute inset-y-0 left-0 z-10 flex items-center pl-2">
              {leftAdornment}
            </span>
          )}
          <BaseUIAutocomplete.Input
            data-validating={isValidating ? "" : undefined}
            {...mergeProps(restProps, {
              className: cn(
                fieldControlStyles,
                hasLeftAdornment && "pl-10",
                rightSlotCount === 1 && "pr-10",
                rightSlotCount > 1 && "pr-18",
              ),
            })}
          />
          <span className="absolute inset-y-0 right-0 z-10 flex items-center gap-1 pr-2">
            {clearable && (
              <BaseUIAutocomplete.Clear
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
            {rightAdornment && (
              <span className="text-muted-fg flex items-center">
                {rightAdornment}
              </span>
            )}
          </span>
        </div>
        <BaseUIAutocomplete.Portal {...portalProps}>
          <BaseUIAutocomplete.Positioner
            sideOffset={8}
            {...mergeProps(positionerProps, {
              className: tw("z-10 outline-none select-none"),
            })}
          >
            <BaseUIAutocomplete.Popup
              {...mergeProps(popupProps, {
                className: tw(
                  "bg-background outline-border scrollbar-track-background scrollbar-thumb-muted max-h-[min(24rem,var(--available-height))] w-(--anchor-width) origin-(--transform-origin) overflow-y-auto rounded-lg bg-clip-padding py-1 shadow-lg outline transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0",
                ),
              })}
            >
              <BaseUIAutocomplete.Status
                {...mergeProps(statusProps, {
                  className: tw(
                    "text-muted-fg px-2.5 py-2 text-sm empty:m-0 empty:p-0",
                  ),
                })}
              >
                {status}
              </BaseUIAutocomplete.Status>
              <BaseUIAutocomplete.Empty
                {...mergeProps(emptyProps, {
                  className: tw(
                    "text-muted-fg px-2.5 py-2 text-sm empty:m-0 empty:p-0",
                  ),
                })}
              >
                {emptyMessage}
              </BaseUIAutocomplete.Empty>
              <BaseUIAutocomplete.List
                {...mergeProps(listProps, { className: tw("relative") })}
              >
                {grouped ? renderGroup : renderItem}
              </BaseUIAutocomplete.List>
            </BaseUIAutocomplete.Popup>
          </BaseUIAutocomplete.Positioner>
        </BaseUIAutocomplete.Portal>
      </BaseUIAutocomplete.Root>
    </Field>
  );
}

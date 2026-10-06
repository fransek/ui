import * as BaseUI from "@base-ui/react/autocomplete";
import { X } from "lucide-react";
import React from "react";
import {
  getItemKey,
  getItemLabel,
  isGroupedItems,
  ListboxGroup,
  listboxGroupLabelStyles,
  listboxGroupStyles,
  ListboxItems,
  listboxItemStyles,
  listboxMessageStyles,
  listboxPopupStyles,
  listboxPositionerStyles,
  useNormalizedItems,
} from "../../lib/listbox";
import { FieldAttributes } from "../../lib/types";
import { cn, mergeProps, tw } from "../../lib/utils";
import { Button, ButtonProps } from "../button";
import { Field, fieldControlStyles, FieldProps } from "../field";

/** A group of items rendered under a shared `label` heading. */
export type AutocompleteGroup<T = unknown> = ListboxGroup<T>;

/**
 * The data structure accepted by the `items` prop. One of:
 * - a flat array of items (strings, or `{ label, value }` objects),
 * - an array of groups (objects with a `label` heading and their own `items`),
 * - a `Record` mapping each value to its label.
 */
export type AutocompleteItems<T = unknown> = ListboxItems<T>;

export interface AutocompleteProps<T = unknown>
  extends
    Omit<BaseUI.AutocompleteInputProps, "children">,
    Omit<BaseUI.AutocompleteRootProps<T>, "children" | "items">,
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
  clearProps?: BaseUI.AutocompleteClearProps;
  clearButtonProps?: ButtonProps;
  portalProps?: BaseUI.AutocompletePortalProps;
  positionerProps?: BaseUI.AutocompletePositionerProps;
  popupProps?: BaseUI.AutocompletePopupProps;
  statusProps?: BaseUI.AutocompleteStatusProps;
  emptyProps?: BaseUI.AutocompleteEmptyProps;
  listProps?: BaseUI.AutocompleteListProps;
  groupProps?: BaseUI.AutocompleteGroupProps;
  groupLabelProps?: BaseUI.AutocompleteGroupLabelProps;
  collectionProps?: Omit<BaseUI.AutocompleteCollectionProps, "children">;
  itemProps?: BaseUI.AutocompleteItemProps;
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

  const normalizedItems = useNormalizedItems(items);
  const grouped = isGroupedItems(normalizedItems);

  const hasLeftAdornment = leftAdornment != null;
  const hasRightAdornment = rightAdornment != null;
  const rightSlotCount = Number(hasRightAdornment) + Number(clearable);

  const renderItem = (item: T, index: number) => (
    <BaseUI.Autocomplete.Item
      key={getItemKey(item, index, itemToStringValue)}
      value={item}
      {...mergeProps(itemProps, { className: listboxItemStyles })}
    >
      {getItemLabel(item, itemToStringValue)}
    </BaseUI.Autocomplete.Item>
  );

  const renderGroup = (group: AutocompleteGroup<T>, index: number) => (
    <BaseUI.Autocomplete.Group
      key={index}
      items={group.items}
      {...mergeProps(groupProps, { className: listboxGroupStyles })}
    >
      <BaseUI.Autocomplete.GroupLabel
        {...mergeProps(groupLabelProps, { className: listboxGroupLabelStyles })}
      >
        {group.label}
      </BaseUI.Autocomplete.GroupLabel>
      <BaseUI.Autocomplete.Collection {...collectionProps}>
        {renderItem}
      </BaseUI.Autocomplete.Collection>
    </BaseUI.Autocomplete.Group>
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
      <BaseUI.Autocomplete.Root
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
          <BaseUI.Autocomplete.Input
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
              <BaseUI.Autocomplete.Clear
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
        <BaseUI.Autocomplete.Portal {...portalProps}>
          <BaseUI.Autocomplete.Positioner
            sideOffset={8}
            {...mergeProps(positionerProps, {
              className: listboxPositionerStyles,
            })}
          >
            <BaseUI.Autocomplete.Popup
              {...mergeProps(popupProps, { className: listboxPopupStyles })}
            >
              <BaseUI.Autocomplete.Status
                {...mergeProps(statusProps, {
                  className: listboxMessageStyles,
                })}
              >
                {status}
              </BaseUI.Autocomplete.Status>
              <BaseUI.Autocomplete.Empty
                {...mergeProps(emptyProps, {
                  className: listboxMessageStyles,
                })}
              >
                {emptyMessage}
              </BaseUI.Autocomplete.Empty>
              <BaseUI.Autocomplete.List
                {...mergeProps(listProps, { className: tw("relative") })}
              >
                {grouped ? renderGroup : renderItem}
              </BaseUI.Autocomplete.List>
            </BaseUI.Autocomplete.Popup>
          </BaseUI.Autocomplete.Positioner>
        </BaseUI.Autocomplete.Portal>
      </BaseUI.Autocomplete.Root>
    </Field>
  );
}

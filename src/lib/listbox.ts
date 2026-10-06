import React from "react";
import { tw } from "./utils";

/*
 * Item handling and popup styles shared by the filterable listbox components
 * (`Autocomplete`, `Combobox`), whose Base UI primitives take the same `items`
 * shapes and render the same popup anatomy.
 */

/** A group of items rendered under a shared `label` heading. */
export interface ListboxGroup<T = unknown> {
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
export type ListboxItems<T = unknown> =
  readonly T[] | readonly ListboxGroup<T>[] | Record<string, React.ReactNode>;

interface LabeledItem {
  label: React.ReactNode;
  value: unknown;
}

/**
 * Base UI resolves `{ label, value }` items automatically — matching the query
 * against `label`, filling the input with it, and submitting `value` — so
 * detect the shape to know which part to render.
 */
export function isLabeledItem(item: unknown): item is LabeledItem {
  return typeof item === "object" && item != null && "label" in item;
}

/**
 * The content rendered for an item: its `label`, else the caller's string
 * conversion, else the item itself stringified.
 */
export function getItemLabel<T>(
  item: T,
  itemToString?: (item: T) => string,
): React.ReactNode {
  if (isLabeledItem(item)) return item.label;
  return itemToString ? itemToString(item) : String(item);
}

/**
 * A stable React key identifying the item by value rather than position, so
 * instances aren't reused for different items as the list filters or the
 * selection changes. Falls back to the index for objects with no derivable
 * identity.
 */
export function getItemKey<T>(
  item: T,
  index: number,
  itemToStringValue?: (item: T) => string,
): React.Key {
  if (itemToStringValue) return itemToStringValue(item);
  if (isLabeledItem(item)) return String(item.value);
  if (typeof item !== "object" || item == null) return String(item);
  return index;
}

function isGroup(item: unknown): item is ListboxGroup {
  return (
    typeof item === "object" &&
    item != null &&
    "items" in item &&
    Array.isArray(item.items) &&
    !("value" in item)
  );
}

/**
 * Groups are objects carrying their own `items` array (and no `value`, which
 * would make them a selectable item). Base UI filters within them but doesn't
 * render the headings itself, so they need a `Group` with a `GroupLabel`
 * wrapper around the group's `Collection`.
 */
export function isGroupedItems(
  items: unknown,
): items is readonly ListboxGroup[] {
  return Array.isArray(items) && items.length > 0 && items.every(isGroup);
}

/**
 * Base UI's `items` only accepts arrays, so expand the `Record` shorthand
 * (shared with `Select`) into the equivalent flat list of labeled items.
 * Memoized on `items` so the generated objects keep their identity across
 * renders.
 */
export function useNormalizedItems<T>(
  items: ListboxItems<T> | undefined,
): readonly T[] | undefined {
  return React.useMemo(() => {
    if (items == null || Array.isArray(items)) {
      return items as readonly T[] | undefined;
    }
    return Object.entries(items).map(([value, label]) => ({
      value,
      label,
    })) as unknown as readonly T[];
  }, [items]);
}

/**
 * Item equality for the `Record` shorthand: its items are generated objects,
 * so an inline `Record` (a new object every render) yields new items each
 * time. Compare them by `value` so the selection keeps matching.
 */
export function isLabeledItemEqual(item: unknown, value: unknown): boolean {
  return isLabeledItem(item) && isLabeledItem(value)
    ? Object.is(item.value, value.value)
    : Object.is(item, value);
}

export const listboxPopupStyles = tw(
  "popup popup-transition scrollbar-track-background scrollbar-thumb-muted max-h-[min(24rem,var(--available-height))] w-(--anchor-width) overflow-y-auto py-1",
);

/** Shared by the popup's `Status` and `Empty` messages. */
export const listboxMessageStyles = tw(
  "text-muted-fg px-2.5 py-2 text-sm empty:m-0 empty:p-0",
);

export const listboxItemStyles = tw(
  "data-highlighted:before:bg-primary data-highlighted:text-on-primary relative z-0 flex cursor-default items-center gap-3 px-2.5 py-2 leading-4 outline-none select-none before:absolute before:inset-x-1 before:inset-y-0 before:z-[-1] before:rounded-sm pointer-coarse:py-2.5 pointer-coarse:text-[0.925rem]",
);

export const listboxGroupStyles = tw("not-last:mb-2");

export const listboxGroupLabelStyles = tw(
  "text-muted-fg px-2.5 py-1 text-xs font-medium",
);

export const listboxPositionerStyles = tw("z-10 outline-none select-none");

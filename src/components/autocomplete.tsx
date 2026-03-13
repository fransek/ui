import {
  Autocomplete as BaseUIAutocomplete,
  AutocompleteEmptyProps,
  AutocompleteInputProps,
  AutocompleteItemProps,
  AutocompleteListProps,
  AutocompletePopupProps,
  AutocompletePortalProps,
  AutocompletePositionerProps,
  AutocompleteRootProps,
} from "@base-ui/react/autocomplete";
import { ChevronsUpDown } from "lucide-react";
import React from "react";
import { FieldAttributes } from "../lib/types";
import { cn, cnBaseUI } from "../lib/utils";
import { Field, FieldProps } from "./field";

export interface AutocompleteItem {
  label: string;
  value: string;
}

export interface AutocompleteProps
  extends Omit<AutocompleteRootProps<AutocompleteItem>, "children">,
    FieldAttributes {
  className?: string;
  placeholder?: string;
  fieldProps?: FieldProps;
  inputProps?: AutocompleteInputProps;
  portalProps?: AutocompletePortalProps;
  positionerProps?: AutocompletePositionerProps;
  popupProps?: AutocompletePopupProps;
  listProps?: AutocompleteListProps;
  itemProps?: AutocompleteItemProps;
  emptyProps?: AutocompleteEmptyProps;
  iconProps?: React.ComponentPropsWithoutRef<"svg">;
  emptyMessage?: React.ReactNode;
}

export function Autocomplete(props: AutocompleteProps) {
  const {
    label,
    isValidating,
    isValidatingMessage,
    errorMessage,
    invalid,
    description,
    infoPopover,
    fieldProps,
    className,
    placeholder,
    items,
    inputProps: { className: inputClassName, ...inputProps } = {},
    portalProps,
    positionerProps: { className: positionerClassName, ...positionerProps } = {},
    popupProps: { className: popupClassName, ...popupProps } = {},
    listProps: { className: listClassName, ...listProps } = {},
    itemProps: { className: itemClassName, ...itemProps } = {},
    emptyProps: { className: emptyClassName, ...emptyProps } = {},
    iconProps: { className: iconClassName, ...iconProps } = {},
    emptyMessage = "No results found.",
    ...restProps
  } = props;

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
      <BaseUIAutocomplete.Root items={items} {...restProps}>
        <div className="relative">
          <BaseUIAutocomplete.Input
            className={cnBaseUI(
              "data-invalid:border-error-foreground data-validating:not-data-invalid:animate-validating outline-highlight focus-visible:focus-outline placeholder:text-muted-foreground w-full min-w-40 rounded-lg border p-2 pr-10 transition-colors",
              className,
              inputClassName,
            )}
            data-validating={isValidating ? "" : undefined}
            placeholder={placeholder}
            {...inputProps}
          />
          <BaseUIAutocomplete.Icon className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronsUpDown
              className={cn("text-muted-foreground size-4", iconClassName)}
              {...iconProps}
            />
          </BaseUIAutocomplete.Icon>
        </div>
        <BaseUIAutocomplete.Portal {...portalProps}>
          <BaseUIAutocomplete.Positioner
            className={cnBaseUI("z-10 outline-none select-none", positionerClassName)}
            sideOffset={8}
            {...positionerProps}
          >
            <BaseUIAutocomplete.Popup
              className={cnBaseUI(
                "bg-background outline-border min-w-(--anchor-width) origin-(--transform-origin) rounded-lg bg-clip-padding shadow-lg outline transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0",
                popupClassName,
              )}
              {...popupProps}
            >
              <BaseUIAutocomplete.List
                className={cnBaseUI(
                  "relative max-h-(--available-height) overflow-y-auto py-1",
                  listClassName,
                )}
                {...listProps}
              >
                {items?.map((item) => (
                  <BaseUIAutocomplete.Item
                    key={item.value}
                    value={item}
                    className={cnBaseUI(
                      "data-highlighted:before:bg-primary data-highlighted:text-on-primary relative z-0 cursor-default py-2 pr-4 pl-2.5 text-sm leading-4 outline-none select-none data-highlighted:before:absolute data-highlighted:before:inset-x-1 data-highlighted:before:inset-y-0 data-highlighted:before:z-[-1] data-highlighted:before:rounded-sm pointer-coarse:py-2.5 pointer-coarse:text-[0.925rem]",
                      itemClassName,
                    )}
                    {...itemProps}
                  >
                    {item.label}
                  </BaseUIAutocomplete.Item>
                ))}
              </BaseUIAutocomplete.List>
              <BaseUIAutocomplete.Empty
                className={cnBaseUI(
                  "text-muted-foreground px-3 py-2 text-sm",
                  emptyClassName,
                )}
                {...emptyProps}
              >
                {emptyMessage}
              </BaseUIAutocomplete.Empty>
            </BaseUIAutocomplete.Popup>
          </BaseUIAutocomplete.Positioner>
        </BaseUIAutocomplete.Portal>
      </BaseUIAutocomplete.Root>
    </Field>
  );
}

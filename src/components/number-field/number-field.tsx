import * as BaseUI from "@base-ui/react/number-field";
import { Minus, Plus } from "lucide-react";
import React from "react";
import { FieldAttributes } from "../../lib/types";
import { mergeProps, tw } from "../../lib/utils";
import { Field, FieldProps } from "../field";

export interface NumberFieldProps
  extends BaseUI.NumberFieldRootProps, FieldAttributes {
  fieldProps?: FieldProps;
  inputProps?: BaseUI.NumberField.Input.Props;
  decrementProps?: BaseUI.NumberField.Decrement.Props;
  incrementProps?: BaseUI.NumberField.Increment.Props;
}

export function NumberField(props: NumberFieldProps) {
  const {
    label,
    isValidating,
    isValidatingMessage,
    errorMessage,
    description,
    infoPopover,
    fieldProps,
    inputProps,
    decrementProps,
    incrementProps,
    invalid,
    disabled,
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
      <BaseUI.NumberField.Root
        disabled={disabled}
        {...mergeProps(restProps, { className: tw("w-full min-w-40") })}
      >
        <BaseUI.NumberField.Group
          className="data-invalid:border-danger-fg data-validating:not-data-invalid:animate-validating has-[input:focus-visible]:focus-outline flex items-stretch overflow-hidden rounded-lg border shadow-sm transition-colors data-disabled:cursor-not-allowed data-disabled:opacity-60"
          data-validating={isValidating ? "" : undefined}
        >
          <BaseUI.NumberField.Decrement
            {...mergeProps(decrementProps, {
              className: tw(
                "text-foreground hover:bg-hover active:bg-active data-disabled:text-muted-fg flex items-center justify-center border-r px-2.5 transition-colors select-none data-disabled:pointer-events-none",
              ),
            })}
          >
            <Minus className="size-4" />
          </BaseUI.NumberField.Decrement>
          <BaseUI.NumberField.Input
            {...mergeProps(inputProps, {
              className: tw(
                "bg-field placeholder:text-muted-fg w-full min-w-0 p-2 text-center tabular-nums outline-none",
              ),
            })}
          />
          <BaseUI.NumberField.Increment
            {...mergeProps(incrementProps, {
              className: tw(
                "text-foreground hover:bg-hover active:bg-active data-disabled:text-muted-fg flex items-center justify-center border-l px-2.5 transition-colors select-none data-disabled:pointer-events-none",
              ),
            })}
          >
            <Plus className="size-4" />
          </BaseUI.NumberField.Increment>
        </BaseUI.NumberField.Group>
      </BaseUI.NumberField.Root>
    </Field>
  );
}

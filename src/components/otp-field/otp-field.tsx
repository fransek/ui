import * as BaseUI from "@base-ui/react/otp-field";
import React from "react";
import { FieldAttributes } from "../../lib/types";
import { mergeProps, tw } from "../../lib/utils";
import { Field, FieldProps } from "../field";

export interface OTPFieldProps
  extends BaseUI.OTPFieldRootProps, FieldAttributes {
  fieldProps?: FieldProps;
  /** Props forwarded to every slot input. */
  inputProps?: BaseUI.OTPFieldInputProps;
  /**
   * Insert a separator after every `groupSize` slots, e.g. `3` renders a
   * six-digit code as `123-456`. Ignored when `children` is given.
   */
  groupSize?: number;
}

/**
 * An input for one-time passwords and verification codes, rendered as one
 * slot per character. Renders `length` slots by default; pass `children`
 * built from `OTPFieldInput` and `OTPFieldSeparator` for a custom layout.
 */
export function OTPField(props: OTPFieldProps) {
  const {
    label,
    isValidating,
    isValidatingMessage,
    errorMessage,
    description,
    infoPopover,
    fieldProps,
    inputProps,
    groupSize,
    invalid,
    disabled,
    children,
    ...restProps
  } = props;

  const slots = Array.from({ length: restProps.length }, (_, index) => (
    <React.Fragment key={index}>
      {groupSize && index > 0 && index % groupSize === 0 ? (
        <OTPFieldSeparator />
      ) : null}
      <OTPFieldInput
        data-validating={isValidating ? "" : undefined}
        {...inputProps}
      />
    </React.Fragment>
  ));

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
      <BaseUI.OTPField.Root
        disabled={disabled}
        {...mergeProps(restProps, { className: tw("flex items-center gap-2") })}
      >
        {children ?? slots}
      </BaseUI.OTPField.Root>
    </Field>
  );
}

export type OTPFieldInputProps = BaseUI.OTPFieldInputProps;

/** A single character slot of an `OTPField`. */
export function OTPFieldInput(props: OTPFieldInputProps) {
  return (
    <BaseUI.OTPField.Input
      {...mergeProps(props, {
        className: tw(
          "bg-field data-invalid:border-danger-fg data-validating:not-data-invalid:animate-validating focus-visible:focus-outline size-10 min-w-0 rounded-lg border text-center text-lg tabular-nums shadow-sm transition-colors data-disabled:cursor-not-allowed data-disabled:opacity-60",
        ),
      })}
    />
  );
}

export type OTPFieldSeparatorProps = React.ComponentProps<
  typeof BaseUI.OTPField.Separator
>;

/** A visual divider between groups of `OTPField` slots. */
export function OTPFieldSeparator(props: OTPFieldSeparatorProps) {
  return (
    <BaseUI.OTPField.Separator
      {...mergeProps(props, {
        className: tw("bg-muted-fg h-0.5 w-2.5 shrink-0 rounded-full"),
      })}
    />
  );
}

OTPField.Input = OTPFieldInput;
OTPField.Separator = OTPFieldSeparator;

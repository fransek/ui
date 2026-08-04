/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export interface FieldAttributes {
  label?: React.ReactNode;
  invalid?: boolean;
  errorMessage?: React.ReactNode;
  isValidating?: boolean;
  isValidatingMessage?: React.ReactNode;
  description?: React.ReactNode;
  infoPopover?: React.ReactNode;
}

export type ClassName<T> =
  string | ((state: T) => string | undefined) | undefined;

export type Style<T> =
  | React.CSSProperties
  | ((state: T) => React.CSSProperties | undefined)
  | undefined;

export type ComponentProps = {
  [x: string]: any;
  className?: ClassName<any>;
  style?: Style<any>;
  ref?: React.Ref<any>;
};

export type DefaultProps<P extends ComponentProps | undefined> = NoInfer<
  Partial<NonNullable<P>> & { [x: `${string}-${string}`]: any }
>;

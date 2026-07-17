import {
  Radio as BaseUIRadio,
  RadioIndicatorProps,
  RadioRootProps,
} from "@base-ui/react/radio";
import * as React from "react";
import { cnBaseUI } from "../lib/utils";
import { useFieldContext } from "./field";

export interface RadioProps extends RadioRootProps {
  label?: React.ReactNode;
  indicatorProps?: RadioIndicatorProps;
}

export function Radio(props: RadioProps) {
  const {
    label,
    indicatorProps: { className: indicatorClassName, ...indicatorProps } = {},
    ...restProps
  } = props;

  const id = React.useId();
  const { isValidating } = useFieldContext();

  return (
    <label className="flex items-center gap-2" id={id}>
      <BaseUIRadio.Root
        className={cnBaseUI(
          "bg-field data-validating:not-data-invalid:animate-validating outline-highlight focus-visible:focus-outline data-checked:border-primary-fg data-invalid:border-danger-fg flex size-5 items-center justify-center rounded-full border shadow",
        )}
        aria-labelledby={id}
        data-validating={isValidating ? "" : undefined}
        {...restProps}
      >
        <BaseUIRadio.Indicator
          className={cnBaseUI(
            "before:bg-primary data-invalid:before:bg-danger flex before:size-3 before:rounded-full data-unchecked:hidden",
            indicatorClassName,
          )}
          {...indicatorProps}
        />
      </BaseUIRadio.Root>
      {label}
    </label>
  );
}

export function IconRadio(props: RadioProps) {
  const { label, children, ...restProps } = props;

  const id = React.useId();
  const { isValidating } = useFieldContext();

  return (
    <label
      className="text-foreground flex flex-col items-center gap-1 text-sm"
      id={id}
    >
      <BaseUIRadio.Root
        className={cnBaseUI(
          "hover:border-muted-fg bg-field hover:text-foreground data-validating:not-data-invalid:animate-validating outline-highlight focus-visible:focus-outline text-muted-fg data-checked:text-on-primary data-checked:border-primary data-checked:bg-primary data-invalid:border-danger-fg flex w-full flex-col items-center justify-center gap-2 rounded-lg border p-2 shadow transition-colors",
        )}
        aria-labelledby={id}
        data-validating={isValidating ? "" : undefined}
        {...restProps}
      >
        {children}
      </BaseUIRadio.Root>
      {label}
    </label>
  );
}

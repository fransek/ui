import {
  Fieldset as BaseUIFieldset,
  FieldsetLegendProps,
  FieldsetRootProps,
} from "@base-ui/react/fieldset";
import React from "react";
import { cnBaseUI } from "../lib/utils";

export interface FieldsetProps extends FieldsetRootProps {
  legend?: React.ReactNode;
  legendProps?: FieldsetLegendProps;
}

export function Fieldset(props: FieldsetProps) {
  const {
    legend,
    legendProps: {
      className: legendClassName,
      render: legendRender,
      ...legendProps
    } = {},
    className,
    children,
    ...restProps
  } = props;

  const hasLegend = legend != null;

  return (
    <BaseUIFieldset.Root
      className={cnBaseUI(
        "relative flex w-full flex-col gap-4 rounded-lg border p-4",
        hasLegend && "pt-6",
        className,
      )}
      {...restProps}
    >
      {hasLegend && (
        <BaseUIFieldset.Legend
          render={legendRender}
          className={cnBaseUI(
            "text-body bg-background absolute -top-2.5 left-3 px-1 text-sm",
            legendClassName,
          )}
          {...legendProps}
        >
          {legend}
        </BaseUIFieldset.Legend>
      )}
      {children}
    </BaseUIFieldset.Root>
  );
}

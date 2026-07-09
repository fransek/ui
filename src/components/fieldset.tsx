import {
  Fieldset as BaseUIFieldset,
  FieldsetLegendProps,
  FieldsetRootProps,
} from "@base-ui/react/fieldset";
import React from "react";
import { cn, cnBaseUI } from "../lib/utils";

export interface FieldsetProps extends FieldsetRootProps {
  legend?: React.ReactNode;
  legendProps?: FieldsetLegendProps;
  contentProps?: React.ComponentProps<"div">;
}

export function Fieldset(props: FieldsetProps) {
  const {
    legend,
    legendProps: {
      className: legendClassName,
      render: legendRender,
      ...legendProps
    } = {},
    contentProps: { className: contentClassName, ...contentProps } = {},
    className,
    children,
    ...restProps
  } = props;

  const hasLegend = legend != null;

  return (
    <BaseUIFieldset.Root
      className={cnBaseUI("gap-4 rounded-lg border p-4", className)}
      {...restProps}
    >
      {hasLegend && (
        <BaseUIFieldset.Legend
          render={legendRender ?? <legend />}
          className={cnBaseUI("text-body text-sm", legendClassName)}
          {...legendProps}
        >
          {legend}
        </BaseUIFieldset.Legend>
      )}
      <div
        className={cn("flex flex-col gap-4", contentClassName)}
        {...contentProps}
      >
        {children}
      </div>
    </BaseUIFieldset.Root>
  );
}

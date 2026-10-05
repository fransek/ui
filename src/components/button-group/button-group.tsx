import * as BaseUI from "@base-ui/react/use-render";
import React from "react";
import { cn, mergeProps, tw } from "../../lib/utils";
import type { ButtonSize } from "../button";

export type ButtonGroupOrientation = keyof typeof orientationStyles;
export type ButtonGroupSize = Exclude<ButtonSize, "icon">;

export interface ButtonGroupProps extends BaseUI.useRender
  .ComponentProps<"div"> {
  orientation?: ButtonGroupOrientation;
  /** Default size for the buttons in the group. A button's own `size` wins. */
  size?: ButtonGroupSize;
}

interface ButtonGroupContextValue {
  size?: ButtonGroupSize;
}

const ButtonGroupContext = React.createContext<ButtonGroupContextValue>({});

export function useButtonGroupContext() {
  return React.useContext(ButtonGroupContext);
}

/**
 * Joins adjacent buttons into a single segmented control. Children lose their
 * own rounding and share borders; only the outer corners stay rounded.
 */
export function ButtonGroup(props: ButtonGroupProps) {
  const { render, orientation = "horizontal", size, ...restProps } = props;

  const contextValue = React.useMemo(() => ({ size }), [size]);

  const element = BaseUI.useRender({
    defaultTagName: "div",
    render,
    props: {
      role: "group",
      "data-button-group": "",
      "data-orientation": orientation,
      ...mergeProps(restProps, {
        className: buttonGroupStyles({ orientation }),
      }),
    },
  });

  return (
    <ButtonGroupContext.Provider value={contextValue}>
      {element}
    </ButtonGroupContext.Provider>
  );
}

const baseButtonGroupStyles = tw(
  "*:border-muted dark:*:border-border inline-flex *:relative *:rounded-none *:border *:focus-visible:z-10",
);

const orientationStyles = {
  horizontal: tw(
    "flex-row *:not-last:border-r-0 *:first:rounded-l-lg *:last:rounded-r-lg",
  ),
  vertical: tw(
    "flex-col *:not-last:border-b-0 *:first:rounded-t-lg *:last:rounded-b-lg",
  ),
};

export const buttonGroupStyles = ({
  orientation = "horizontal",
  extend,
}: {
  orientation?: ButtonGroupOrientation;
  extend?: string;
}) => cn(baseButtonGroupStyles, orientationStyles[orientation], extend);

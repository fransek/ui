import {
  ScrollArea as BaseUIScrollArea,
  ScrollAreaContentProps,
  ScrollAreaCornerProps,
  ScrollAreaRootProps,
  ScrollAreaScrollbarProps,
  ScrollAreaThumbProps,
  ScrollAreaViewportProps,
} from "@base-ui/react/scroll-area";
import React from "react";
import { cnBaseUI } from "../lib/utils";

export interface ScrollAreaProps extends ScrollAreaRootProps {
  viewportProps?: ScrollAreaViewportProps;
  contentProps?: ScrollAreaContentProps;
  scrollbarProps?: ScrollAreaScrollbarProps;
  thumbProps?: ScrollAreaThumbProps;
  cornerProps?: ScrollAreaCornerProps;
  /**
   * Which scrollbars to render.
   * @default "vertical"
   */
  orientation?: "vertical" | "horizontal" | "both";
}

export function ScrollArea(props: ScrollAreaProps) {
  const {
    children,
    orientation = "vertical",
    viewportProps: { className: viewportClassName, ...viewportProps } = {},
    contentProps: { className: contentClassName, ...contentProps } = {},
    scrollbarProps: { className: scrollbarClassName, ...scrollbarProps } = {},
    thumbProps: { className: thumbClassName, ...thumbProps } = {},
    cornerProps: { className: cornerClassName, ...cornerProps } = {},
    ...restProps
  } = props;

  const orientations =
    orientation === "both"
      ? (["vertical", "horizontal"] as const)
      : [orientation];

  return (
    <BaseUIScrollArea.Root {...restProps}>
      <BaseUIScrollArea.Viewport
        className={cnBaseUI(
          "focus-visible:focus-outline outline-highlight h-full",
          viewportClassName,
        )}
        {...viewportProps}
      >
        <BaseUIScrollArea.Content
          className={cnBaseUI(
            orientations.includes("vertical") && "data-has-overflow-y:pr-2",
            orientations.includes("horizontal") && "data-has-overflow-x:pb-2",
            contentClassName,
          )}
          {...contentProps}
        >
          {children}
        </BaseUIScrollArea.Content>
      </BaseUIScrollArea.Viewport>
      {orientations.map((scrollbarOrientation) => (
        <BaseUIScrollArea.Scrollbar
          key={scrollbarOrientation}
          orientation={scrollbarOrientation}
          className={cnBaseUI(
            "bg-contrast/10 pointer-events-none m-1 flex rounded-full opacity-0 transition-opacity data-hovering:pointer-events-auto data-hovering:opacity-100 data-scrolling:pointer-events-auto data-scrolling:opacity-100 data-scrolling:duration-0 data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:items-center data-[orientation=vertical]:w-2 data-[orientation=vertical]:justify-center",
            scrollbarClassName,
          )}
          {...scrollbarProps}
        >
          <BaseUIScrollArea.Thumb
            className={cnBaseUI(
              "bg-contrast/50 rounded-full data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
              thumbClassName,
            )}
            {...thumbProps}
          />
        </BaseUIScrollArea.Scrollbar>
      ))}
      {orientation === "both" && (
        <BaseUIScrollArea.Corner
          className={cnBaseUI(cornerClassName)}
          {...cornerProps}
        />
      )}
    </BaseUIScrollArea.Root>
  );
}

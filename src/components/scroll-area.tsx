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
  /**
   * Whether to render a horizontal scrollbar in addition to the vertical
   * one.
   * @default false
   */
  horizontalScrollbar?: boolean;
  viewportProps?: ScrollAreaViewportProps;
  contentProps?: ScrollAreaContentProps;
  scrollbarProps?: ScrollAreaScrollbarProps;
  thumbProps?: ScrollAreaThumbProps;
  cornerProps?: ScrollAreaCornerProps;
}

export function ScrollArea(props: ScrollAreaProps) {
  const {
    children,
    className,
    horizontalScrollbar,
    viewportProps: { className: viewportClassName, ...viewportProps } = {},
    contentProps: { className: contentClassName, ...contentProps } = {},
    scrollbarProps: { className: scrollbarClassName, ...scrollbarProps } = {},
    thumbProps: { className: thumbClassName, ...thumbProps } = {},
    cornerProps,
    ...restProps
  } = props;

  return (
    <BaseUIScrollArea.Root
      className={cnBaseUI("overflow-hidden", className)}
      {...restProps}
    >
      <BaseUIScrollArea.Viewport
        className={cnBaseUI(
          "h-full touch-auto overscroll-contain",
          viewportClassName,
        )}
        {...viewportProps}
      >
        <BaseUIScrollArea.Content
          className={cnBaseUI(contentClassName)}
          {...contentProps}
        >
          {children}
        </BaseUIScrollArea.Content>
      </BaseUIScrollArea.Viewport>
      <BaseUIScrollArea.Scrollbar
        className={cnBaseUI(scrollbarStyles, scrollbarClassName)}
        {...scrollbarProps}
      >
        <BaseUIScrollArea.Thumb
          className={cnBaseUI(
            "bg-muted-foreground rounded-full",
            thumbClassName,
          )}
          {...thumbProps}
        />
      </BaseUIScrollArea.Scrollbar>
      {horizontalScrollbar && (
        <BaseUIScrollArea.Scrollbar
          orientation="horizontal"
          className={cnBaseUI(scrollbarStyles, scrollbarClassName)}
          {...scrollbarProps}
        >
          <BaseUIScrollArea.Thumb
            className={cnBaseUI(
              "bg-muted-foreground rounded-full",
              thumbClassName,
            )}
            {...thumbProps}
          />
        </BaseUIScrollArea.Scrollbar>
      )}
      {horizontalScrollbar && <BaseUIScrollArea.Corner {...cornerProps} />}
    </BaseUIScrollArea.Root>
  );
}

const scrollbarStyles =
  "relative flex touch-none rounded-full bg-border opacity-0 transition-opacity duration-150 ease-[ease] select-none pointer-events-none before:absolute before:content-[''] data-[orientation=vertical]:m-1 data-[orientation=vertical]:w-1.5 data-[orientation=vertical]:before:left-1/2 data-[orientation=vertical]:before:h-full data-[orientation=vertical]:before:w-5 data-[orientation=vertical]:before:-translate-x-1/2 data-[orientation=horizontal]:m-1 data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:before:-bottom-2 data-[orientation=horizontal]:before:left-0 data-[orientation=horizontal]:before:h-5 data-[orientation=horizontal]:before:w-full data-[hovering]:pointer-events-auto data-[hovering]:opacity-100 data-[hovering]:delay-0 data-[scrolling]:pointer-events-auto data-[scrolling]:opacity-100 data-[scrolling]:duration-0";

import * as BaseUI from "@base-ui/react/use-render";
import React from "react";
import { cn, mergeProps, tw } from "../../lib/utils";

export interface SkeletonProps extends BaseUI.useRender.ComponentProps<"div"> {
  /**
   * The placeholder's shape. `text` is one line tall at the current font
   * size, `circle` suits avatars and icons. Defaults to "rectangle".
   */
  shape?: SkeletonShape;
  /**
   * Whether the placeholder is shown. When false, `children` render as is.
   * When true, `children` stay in the layout but are hidden, so the
   * placeholder takes their size. Defaults to true.
   */
  loading?: boolean;
}

/**
 * A loading placeholder. It is hidden from assistive technology, so mark the
 * region that is loading with `aria-busy` (and a status message if needed).
 */
export function Skeleton(props: SkeletonProps) {
  const {
    render,
    shape = "rectangle",
    loading = true,
    children,
    ...restProps
  } = props;

  const element = BaseUI.useRender({
    defaultTagName: "div",
    render,
    props: {
      "aria-hidden": true,
      "data-shape": shape,
      ...mergeProps(restProps, {
        className: skeletonStyles({ shape, hasChildren: children != null }),
      }),
      children,
    },
  });

  return loading ? element : children;
}

export interface SkeletonTextProps extends React.ComponentProps<"div"> {
  /** Number of lines to render. The last one is shorter. Defaults to 3. */
  lines?: number;
}

/** A block of `text` skeletons that stands in for a paragraph. */
export function SkeletonText(props: SkeletonTextProps) {
  const { lines = 3, ...restProps } = props;

  return (
    <div
      aria-hidden
      {...mergeProps(restProps, { className: tw("flex flex-col") })}
    >
      {Array.from({ length: lines }, (_, index) => (
        <Skeleton
          key={index}
          shape="text"
          className={cn(lines > 1 && index === lines - 1 && "w-3/5")}
        />
      ))}
    </div>
  );
}

const baseSkeletonStyles = tw(
  "bg-track block animate-pulse motion-reduce:animate-none",
);

const shapeStyles = {
  rectangle: tw("rounded-md"),
  circle: tw("aspect-square rounded-full"),
  // One line box tall in total, like the text it stands in for.
  text: tw("my-[calc((1lh-1em)/2)] h-[1em] w-full rounded-sm"),
};

export const skeletonStyles = ({
  shape = "rectangle",
  hasChildren = false,
  extend,
}: {
  shape?: SkeletonShape;
  hasChildren?: boolean;
  extend?: string;
} = {}) =>
  cn(
    baseSkeletonStyles,
    shapeStyles[shape],
    hasChildren && "w-fit text-transparent *:invisible",
    extend,
  );

export type SkeletonShape = keyof typeof shapeStyles;

Skeleton.Text = SkeletonText;

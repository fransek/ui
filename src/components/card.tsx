import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { X } from "lucide-react";
import React from "react";
import { cn, cnBaseUI } from "../lib/utils";
import { Button, ButtonProps } from "./button";

export type CardProps = useRender.ComponentProps<"div">;

export function Card(props: CardProps) {
  const { render, className, ...restProps } = props;

  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(
      { className: cardStyles({ extend: className }) },
      restProps,
    ),
  });
}

export const cardStyles = ({ extend }: { extend?: string } = {}) =>
  cn("card relative flex flex-col overflow-hidden p-0", extend);

export type CardImageProps = useRender.ComponentProps<"img">;

export function CardImage(props: CardImageProps) {
  const { render, className, ...restProps } = props;

  return useRender({
    defaultTagName: "img",
    render,
    props: mergeProps<"img">(
      { className: cn("w-full object-cover", className) },
      restProps,
    ),
  });
}

export interface CardCloseProps extends ButtonProps {
  iconProps?: React.ComponentProps<typeof X>;
}

export function CardClose(props: CardCloseProps) {
  const {
    className,
    iconProps: { className: iconClassName, ...iconProps } = {},
    children,
    ...restProps
  } = props;

  return (
    <Button
      className={cnBaseUI("absolute top-2 right-2 rounded-full", className)}
      variant="ghost"
      size="icon"
      aria-label="Close"
      {...restProps}
    >
      {children ?? (
        <X
          className={cn("text-muted-fg size-4", iconClassName)}
          {...iconProps}
        />
      )}
    </Button>
  );
}

export type CardContentProps = useRender.ComponentProps<"div">;

export function CardContent(props: CardContentProps) {
  const { render, className, ...restProps } = props;

  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(
      { className: cn("flex flex-col gap-4 p-4", className) },
      restProps,
    ),
  });
}

export type CardHeaderProps = useRender.ComponentProps<"header">;

export function CardHeader(props: CardHeaderProps) {
  const { render, ...restProps } = props;

  return useRender({ defaultTagName: "header", render, props: restProps });
}

export type CardTitleProps = useRender.ComponentProps<"h2">;

export function CardTitle(props: CardTitleProps) {
  const { render, className, ...restProps } = props;

  return useRender({
    defaultTagName: "h2",
    render,
    props: mergeProps<"h2">(
      { className: cn("heading-md text-foreground", className) },
      restProps,
    ),
  });
}

export type CardBodyProps = useRender.ComponentProps<"div">;

export function CardBody(props: CardBodyProps) {
  const { render, className, ...restProps } = props;

  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">({ className: cn("flex-1", className) }, restProps),
  });
}

export type CardDescriptionProps = useRender.ComponentProps<"p">;

export function CardDescription(props: CardDescriptionProps) {
  const { render, className, ...restProps } = props;

  return useRender({
    defaultTagName: "p",
    render,
    props: mergeProps<"p">(
      { className: cn("body-sm text-body", className) },
      restProps,
    ),
  });
}

export type CardFooterProps = useRender.ComponentProps<"footer">;

export function CardFooter(props: CardFooterProps) {
  const { render, className, ...restProps } = props;

  return useRender({
    defaultTagName: "footer",
    render,
    props: mergeProps<"footer">(
      { className: cn("flex justify-end gap-2", className) },
      restProps,
    ),
  });
}

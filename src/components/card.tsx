import * as BaseUI from "@base-ui/react/use-render";
import React from "react";
import { mergeProps, tw } from "../lib/utils";
import { CloseButton, CloseButtonProps } from "./close-button";

export type CardProps = BaseUI.useRender.ComponentProps<"div">;

export function Card(props: CardProps) {
  const { render, ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "div",
    render,
    props: mergeProps(restProps, {
      className: tw("card relative flex flex-col overflow-hidden p-0"),
    }),
  });
}

export type CardImageProps = BaseUI.useRender.ComponentProps<"img">;

export function CardImage(props: CardImageProps) {
  const { render, ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "img",
    render,
    props: mergeProps(restProps, { className: tw("w-full object-cover") }),
  });
}

export function CardClose(props: CloseButtonProps) {
  return <CloseButton position="top-right" {...props} />;
}

export type CardContentProps = BaseUI.useRender.ComponentProps<"div">;

export function CardContent(props: CardContentProps) {
  const { render, ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "div",
    render,
    props: mergeProps(restProps, { className: tw("flex flex-col gap-4 p-4") }),
  });
}

export type CardHeaderProps = BaseUI.useRender.ComponentProps<"div">;

export function CardHeader(props: CardHeaderProps) {
  const { render, ...restProps } = props;

  return BaseUI.useRender({ defaultTagName: "div", render, props: restProps });
}

export type CardTitleProps = BaseUI.useRender.ComponentProps<"h2">;

export function CardTitle(props: CardTitleProps) {
  const { render, ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "h2",
    render,
    props: mergeProps(restProps, {
      className: tw("heading-md text-foreground"),
    }),
  });
}

export type CardBodyProps = BaseUI.useRender.ComponentProps<"div">;

export function CardBody(props: CardBodyProps) {
  const { render, ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "div",
    render,
    props: mergeProps(restProps, { className: tw("flex-1") }),
  });
}

export type CardDescriptionProps = BaseUI.useRender.ComponentProps<"p">;

export function CardDescription(props: CardDescriptionProps) {
  const { render, ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "p",
    render,
    props: mergeProps(restProps, { className: tw("body-sm text-body") }),
  });
}

export type CardFooterProps = BaseUI.useRender.ComponentProps<"div">;

export function CardFooter(props: CardFooterProps) {
  const { render, ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "div",
    render,
    props: mergeProps(restProps, { className: tw("flex justify-end gap-2") }),
  });
}

Card.Image = CardImage;
Card.Close = CardClose;
Card.Content = CardContent;
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Body = CardBody;
Card.Description = CardDescription;
Card.Footer = CardFooter;

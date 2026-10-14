import * as BaseUIButton from "@base-ui/react/button";
import * as BaseUI from "@base-ui/react/use-render";
import React from "react";
import { mergeProps, tw } from "../../lib/utils";

export type ListProps = BaseUI.useRender.ComponentProps<"ul">;

export function List(props: ListProps) {
  const { render, ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "ul",
    render,
    props: mergeProps(restProps, {
      className: tw("divide-border flex w-full flex-col divide-y"),
    }),
  });
}

export type ListItemProps = BaseUI.useRender.ComponentProps<"li">;

// An item holding a `ListItemButton` or `ListItemLink` drops its own padding:
// the action fills the row and carries the padding instead, so the whole row
// is clickable.
export function ListItem(props: ListItemProps) {
  const { render, ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "li",
    render,
    props: mergeProps(restProps, {
      className: tw(
        "flex items-center justify-between gap-2 px-4 py-2 has-[>[data-list-item-action]]:p-0",
      ),
    }),
  });
}

// Shared by `ListItemButton` and `ListItemLink`: the action fills its row.
export const listItemActionStyles = tw(
  "hover:bg-hover active:bg-active focus-visible:focus-outline flex w-full cursor-pointer items-center justify-between gap-2 px-4 py-2 text-left transition-colors focus-visible:-outline-offset-2 data-disabled:cursor-not-allowed data-disabled:opacity-60 data-disabled:hover:bg-transparent data-disabled:active:bg-transparent",
);

export type ListItemButtonProps = BaseUIButton.ButtonProps;

export function ListItemButton(props: ListItemButtonProps) {
  return (
    <BaseUIButton.Button
      data-list-item-action=""
      {...mergeProps(props, { className: listItemActionStyles })}
    />
  );
}

export type ListItemLinkProps = BaseUI.useRender.ComponentProps<"a">;

export function ListItemLink(props: ListItemLinkProps) {
  const { render, ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "a",
    render,
    props: {
      "data-list-item-action": "",
      ...mergeProps(restProps, { className: listItemActionStyles }),
    },
  });
}

export type ListItemContentProps = BaseUI.useRender.ComponentProps<"div">;

export function ListItemContent(props: ListItemContentProps) {
  const { render, ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "div",
    render,
    props: mergeProps(restProps, {
      className: tw("flex min-w-0 flex-1 flex-col"),
    }),
  });
}

export type ListItemTitleProps = BaseUI.useRender.ComponentProps<"div">;

export function ListItemTitle(props: ListItemTitleProps) {
  const { render, ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "div",
    render,
    props: mergeProps(restProps, {
      className: tw("heading-xs text-foreground"),
    }),
  });
}

export type ListItemDescriptionProps = BaseUI.useRender.ComponentProps<"div">;

export function ListItemDescription(props: ListItemDescriptionProps) {
  const { render, ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "div",
    render,
    props: mergeProps(restProps, { className: tw("body-sm text-body") }),
  });
}

List.Item = ListItem;
List.ItemButton = ListItemButton;
List.ItemLink = ListItemLink;
List.ItemContent = ListItemContent;
List.ItemTitle = ListItemTitle;
List.ItemDescription = ListItemDescription;

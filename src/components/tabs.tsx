import {
  Tabs as BaseUITabs,
  TabsIndicatorProps as BaseUITabsIndicatorProps,
  TabsListProps as BaseUITabsListProps,
  TabsPanelProps as BaseUITabsPanelProps,
  TabsRootProps as BaseUITabsRootProps,
  TabsTabProps as BaseUITabsTabProps,
} from "@base-ui/react/tabs";
import React from "react";
import { mergeProps, tw } from "../lib/utils";

export type TabsProps = BaseUITabsRootProps;

export function Tabs(props: TabsProps) {
  return (
    <BaseUITabs.Root {...mergeProps(props, { className: tw("w-full") })} />
  );
}

export interface TabsListProps extends BaseUITabsListProps {
  /** Props forwarded to the active-tab `Indicator`. */
  indicatorProps?: BaseUITabsIndicatorProps;
}

export function TabsList(props: TabsListProps) {
  const { children, indicatorProps, ...restProps } = props;

  return (
    <BaseUITabs.List
      {...mergeProps(restProps, {
        className: tw("relative z-1 -mb-px flex gap-1"),
      })}
    >
      {children}
      <TabsIndicator {...indicatorProps} />
    </BaseUITabs.List>
  );
}

export type TabsIndicatorProps = BaseUITabsIndicatorProps;

export function TabsIndicator(props: TabsIndicatorProps) {
  return (
    <BaseUITabs.Indicator
      {...mergeProps(props, {
        className: tw(
          "border-primary-fg absolute top-0 left-0 -z-1 h-full w-(--active-tab-width) translate-x-(--active-tab-left) border-b-2 transition-[translate,width] duration-150 ease-in-out",
        ),
      })}
    />
  );
}

export type TabsTabProps = BaseUITabsTabProps;

export function TabsTab(props: TabsTabProps) {
  return (
    <BaseUITabs.Tab
      {...mergeProps(props, {
        className: tw(
          "data-disabled:text-muted-fg font-inherit text-body hover:text-primary-fg outline-highlight focus-visible:focus-outline data-active:text-primary-fg flex h-[calc(2rem+1px)] items-center justify-center rounded bg-transparent px-2 py-0 leading-5 font-normal break-keep whitespace-nowrap transition-colors outline-none select-none",
        ),
      })}
    />
  );
}

export type TabsPanelProps = BaseUITabsPanelProps;

export function TabsPanel(props: TabsPanelProps) {
  return (
    <BaseUITabs.Panel
      {...mergeProps(props, {
        className: tw(
          "text-foreground outline-highlight focus-visible:focus-outline flex w-full items-center justify-center p-4 text-center outline-none [[hidden]]:hidden",
        ),
      })}
    />
  );
}

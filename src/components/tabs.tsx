import {
  Tabs as BaseUITabs,
  TabsIndicatorProps as BaseUITabsIndicatorProps,
  TabsListProps as BaseUITabsListProps,
  TabsPanelProps as BaseUITabsPanelProps,
  TabsRootProps as BaseUITabsRootProps,
  TabsTabProps as BaseUITabsTabProps,
} from "@base-ui/react/tabs";
import React from "react";
import { cnBaseUI } from "../lib/utils";

export type TabsProps = BaseUITabsRootProps;

export function Tabs(props: TabsProps) {
  const { className, ...restProps } = props;
  return (
    <BaseUITabs.Root className={cnBaseUI("w-full", className)} {...restProps} />
  );
}

export interface TabsListProps extends BaseUITabsListProps {
  /** Props forwarded to the active-tab `Indicator`. */
  indicatorProps?: BaseUITabsIndicatorProps;
}

export function TabsList(props: TabsListProps) {
  const { children, className, indicatorProps, ...restProps } = props;

  return (
    <BaseUITabs.List
      className={cnBaseUI("relative z-1 -mb-px flex gap-1", className)}
      {...restProps}
    >
      {children}
      <TabsIndicator {...indicatorProps} />
    </BaseUITabs.List>
  );
}

export type TabsIndicatorProps = BaseUITabsIndicatorProps;

export function TabsIndicator(props: TabsIndicatorProps) {
  const { className, ...restProps } = props;
  return (
    <BaseUITabs.Indicator
      className={cnBaseUI(
        "border-primary-foreground absolute top-0 left-0 -z-1 h-full w-(--active-tab-width) translate-x-(--active-tab-left) border-b-2 transition-[translate,width] duration-150 ease-in-out",
        className,
      )}
      {...restProps}
    />
  );
}

export type TabsTabProps = BaseUITabsTabProps;

export function TabsTab(props: TabsTabProps) {
  const { className, ...restProps } = props;
  return (
    <BaseUITabs.Tab
      className={cnBaseUI(
        "data-disabled:text-muted-foreground font-inherit text-body hover:text-primary-foreground outline-highlight focus-visible:focus-outline data-active:text-primary-foreground flex h-[calc(2rem+1px)] items-center justify-center rounded bg-transparent px-2 py-0 leading-5 font-normal break-keep whitespace-nowrap transition-colors outline-none select-none",
        className,
      )}
      {...restProps}
    />
  );
}

export type TabsPanelProps = BaseUITabsPanelProps;

export function TabsPanel(props: TabsPanelProps) {
  const { className, ...restProps } = props;
  return (
    <BaseUITabs.Panel
      className={cnBaseUI(
        "text-foreground outline-highlight focus-visible:focus-outline flex w-full items-center justify-center p-4 text-center outline-none [[hidden]]:hidden",
        className,
      )}
      {...restProps}
    />
  );
}

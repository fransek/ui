import * as BaseUI from "@base-ui/react/tabs";
import React from "react";
import { mergeProps, tw } from "../../lib/utils";

export type TabsProps = BaseUI.TabsRootProps;

export function Tabs(props: TabsProps) {
  return (
    <BaseUI.Tabs.Root
      {...mergeProps(props, {
        className: tw("w-full data-[orientation=vertical]:flex"),
      })}
    />
  );
}

export interface TabsListProps extends BaseUI.TabsListProps {
  /** Props forwarded to the active-tab `Indicator`. */
  indicatorProps?: BaseUI.TabsIndicatorProps;
}

export function TabsList(props: TabsListProps) {
  const { children, indicatorProps, ...restProps } = props;

  return (
    <BaseUI.Tabs.List
      {...mergeProps(restProps, {
        className: tw(
          "relative z-1 -mb-px flex gap-1 data-[orientation=vertical]:-mr-px data-[orientation=vertical]:mb-0 data-[orientation=vertical]:shrink-0 data-[orientation=vertical]:flex-col",
        ),
      })}
    >
      {children}
      <TabsIndicator {...indicatorProps} />
    </BaseUI.Tabs.List>
  );
}

export type TabsIndicatorProps = BaseUI.TabsIndicatorProps;

export function TabsIndicator(props: TabsIndicatorProps) {
  return (
    <BaseUI.Tabs.Indicator
      {...mergeProps(props, {
        className: tw(
          "border-primary-fg absolute top-0 left-0 -z-1 h-full w-(--active-tab-width) translate-x-(--active-tab-left) border-b-2 transition-[translate,width,height] duration-150 ease-in-out data-[orientation=vertical]:h-(--active-tab-height) data-[orientation=vertical]:w-full data-[orientation=vertical]:translate-x-0 data-[orientation=vertical]:translate-y-(--active-tab-top) data-[orientation=vertical]:border-r-2 data-[orientation=vertical]:border-b-0",
        ),
      })}
    />
  );
}

export type TabsTabProps = BaseUI.TabsTabProps;

export function TabsTab(props: TabsTabProps) {
  return (
    <BaseUI.Tabs.Tab
      {...mergeProps(props, {
        className: tw(
          "data-disabled:text-muted-fg text-body hover:text-primary-fg focus-visible:focus-outline data-active:text-primary-fg flex h-[calc(2rem+1px)] items-center justify-center rounded-sm bg-transparent px-2 py-0 leading-5 font-normal break-keep whitespace-nowrap transition-colors outline-none select-none data-[orientation=vertical]:justify-start",
        ),
      })}
    />
  );
}

export type TabsPanelProps = BaseUI.TabsPanelProps;

export function TabsPanel(props: TabsPanelProps) {
  return (
    <BaseUI.Tabs.Panel
      {...mergeProps(props, {
        className: tw(
          "text-foreground focus-visible:focus-outline flex w-full items-center justify-center p-4 text-center outline-none [[hidden]]:hidden",
        ),
      })}
    />
  );
}

Tabs.List = TabsList;
Tabs.Indicator = TabsIndicator;
Tabs.Tab = TabsTab;
Tabs.Panel = TabsPanel;

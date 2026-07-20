import type { Meta, StoryObj } from "@storybook/react-vite";
import { Contact, Home, Info, PanelLeft, Settings } from "lucide-react";
import React from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarPanel,
  SidebarTrigger,
} from "../components/sidebar";

const navItems = [
  { icon: <Home className="size-4 shrink-0" />, label: "Home" },
  { icon: <Info className="size-4 shrink-0" />, label: "About" },
  { icon: <Contact className="size-4 shrink-0" />, label: "Contact" },
];

const meta = {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  render: (args) => (
    <Sidebar {...args} className="h-[420px] w-full">
      <SidebarPanel>
        <SidebarHeader>
          <PanelLeft className="text-primary size-5 shrink-0" />
          <span className="heading-sm truncate">Acme</span>
        </SidebarHeader>
        <SidebarContent>
          {navItems.map(({ icon, label }) => (
            <SidebarItem key={label} icon={icon}>
              {label}
            </SidebarItem>
          ))}
        </SidebarContent>
        <SidebarFooter>
          <SidebarItem icon={<Settings className="size-4 shrink-0" />}>
            Settings
          </SidebarItem>
        </SidebarFooter>
      </SidebarPanel>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <header className="flex items-center gap-2">
          <SidebarTrigger />
          <h1 className="heading-sm">Dashboard</h1>
        </header>
        <p className="body-sm text-body">
          The sidebar sits in the layout next to this content. Toggle it to
          collapse to an icon rail — the main content reflows, with no overlay
          or backdrop.
        </p>
      </div>
    </Sidebar>
  ),
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const DefaultCollapsed: Story = {
  args: {
    defaultOpen: false,
  },
};

export const CustomWidth: Story = {
  args: {
    width: "20rem",
    collapsedWidth: "3.5rem",
  },
};

export const Toggle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const panel = canvasElement.querySelector("aside")!;
    const trigger = canvas.getByRole("button", { name: "Collapse sidebar" });

    // Expanded: labels are visible.
    expect(canvas.getByText("Home")).toBeInTheDocument();
    expect(panel).toHaveAttribute("data-open");

    // Collapse to the rail.
    await userEvent.click(trigger);

    await waitFor(() => {
      expect(panel).toHaveAttribute("data-collapsed");
    });

    // Labels are hidden, but items keep an accessible name via aria-label.
    expect(canvas.queryByText("Home")).not.toBeInTheDocument();
    expect(canvas.getByRole("button", { name: "Home" })).toBeInTheDocument();
    expect(
      canvas.getByRole("button", { name: "Expand sidebar" }),
    ).toBeInTheDocument();
  },
};

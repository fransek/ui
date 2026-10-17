import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ChartLine,
  ChevronRight,
  FileText,
  Folder,
  House,
  Inbox,
  Settings,
  Users,
} from "lucide-react";
import React from "react";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";
import { Avatar } from "../avatar";
import { Collapsible } from "../collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProps,
  SidebarProvider,
  SidebarProviderProps,
  SidebarSeparator,
  SidebarTrigger,
} from "./sidebar";

const navigation = [
  { label: "Home", icon: House, active: true },
  { label: "Inbox", icon: Inbox, badge: 12 },
  { label: "Analytics", icon: ChartLine },
  { label: "Team", icon: Users },
];

const projects = [
  { label: "Design system", icon: Folder },
  { label: "Documentation", icon: FileText },
];

function AppSidebar(props: SidebarProps) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" tooltip="Acme Inc.">
              <span className="primary flex size-8 shrink-0 items-center justify-center rounded-lg font-semibold">
                A
              </span>
              <span className="flex flex-col">
                <span className="font-semibold">Acme Inc.</span>
                <span className="text-muted-fg text-xs">Enterprise</span>
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup label="Platform">
          <SidebarMenu>
            {navigation.map(({ label, icon: Icon, active, badge }) => (
              <SidebarMenuItem key={label}>
                <SidebarMenuButton
                  active={active}
                  tooltip={label}
                  render={<a href="#" />}
                >
                  <Icon />
                  <span>{label}</span>
                  {badge && <SidebarMenuBadge>{badge}</SidebarMenuBadge>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup label="Projects">
          <SidebarMenu>
            {projects.map(({ label, icon: Icon }) => (
              <SidebarMenuItem key={label}>
                <SidebarMenuButton tooltip={label} render={<a href="#" />}>
                  <Icon />
                  <span>{label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings" render={<a href="#" />}>
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

function Page({ title = "Home" }: { title?: string }) {
  return (
    <SidebarInset>
      <header className="flex h-14 items-center gap-2 border-b px-4">
        <SidebarTrigger />
        <h1 className="heading-xs">{title}</h1>
      </header>
      <div className="flex flex-col gap-4 p-4">
        {new Array(3).fill(null).map((_, index) => (
          <div key={index} className="card h-32 rounded-xl" />
        ))}
      </div>
    </SidebarInset>
  );
}

type StoryArgs = SidebarProviderProps & Pick<SidebarProps, "collapsible">;

const meta = {
  title: "Components/Sidebar",
  component: SidebarProvider,
  args: {
    // The drawer only replaces the sidebar on small screens; the stories
    // keep it beside the content so they read the same at any width.
    breakpoint: false,
    collapsible: "offcanvas",
  },
  argTypes: {
    collapsible: {
      control: "inline-radio",
      options: ["offcanvas", "icon", "none"],
    },
  },
  render: ({ collapsible, ...args }) => (
    <SidebarProvider {...args}>
      <AppSidebar collapsible={collapsible} />
      <Page />
    </SidebarProvider>
  ),
  decorators: [
    // The example links point nowhere; keep clicks on them from navigating
    // the story frame. React events bubble out of the mobile drawer's portal
    // too.
    (Story) => (
      <div
        className="contents"
        onClick={(event) => {
          if ((event.target as Element).closest("a")) {
            event.preventDefault();
          }
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const sidebar = canvas.getByRole("complementary", { name: "Sidebar" });
    const trigger = canvas.getByRole("button", { name: "Toggle sidebar" });

    await expect(sidebar).toHaveAttribute("data-state", "expanded");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(canvas.getByRole("link", { name: "Home" })).toHaveAttribute(
      "aria-current",
      "page",
    );

    await userEvent.click(trigger);
    await expect(sidebar).toHaveAttribute("data-state", "collapsed");
    await expect(sidebar).toHaveAttribute("inert");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");

    await userEvent.click(trigger);
    await expect(sidebar).toHaveAttribute("data-state", "expanded");
  },
};

export const IconCollapsible: Story = {
  args: {
    collapsible: "icon",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const sidebar = canvas.getByRole("complementary", { name: "Sidebar" });

    await userEvent.click(
      canvas.getByRole("button", { name: "Toggle sidebar" }),
    );
    await expect(sidebar).toHaveAttribute("data-collapsed", "icon");
    await expect(sidebar).not.toHaveAttribute("inert");

    // Collapsed to icons, the label moves into a tooltip.
    await userEvent.hover(canvas.getByRole("link", { name: /Inbox/ }));
    await waitFor(() => expect(screen.getAllByText("Inbox")).toHaveLength(2));
  },
};

export const KeyboardShortcut: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const sidebar = canvas.getByRole("complementary", { name: "Sidebar" });

    await userEvent.keyboard("{Control>}b{/Control}");
    await expect(sidebar).toHaveAttribute("data-state", "collapsed");
    await userEvent.keyboard("{Control>}b{/Control}");
    await expect(sidebar).toHaveAttribute("data-state", "expanded");
  },
};

export const RightSide: Story = {
  render: ({ collapsible, ...args }) => (
    <SidebarProvider {...args}>
      <Page />
      <AppSidebar side="right" collapsible={collapsible} />
    </SidebarProvider>
  ),
};

export const NestedMenu: Story = {
  render: (args) => (
    <SidebarProvider {...args}>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup label="Documentation">
            <SidebarMenu>
              {[
                {
                  label: "Getting started",
                  items: ["Installation", "Theming"],
                },
                {
                  label: "Components",
                  items: ["Button", "Sidebar", "Tooltip"],
                },
              ].map(({ label, items }) => (
                <Collapsible
                  key={label}
                  defaultOpen
                  render={<SidebarMenuItem />}
                  className="min-w-0"
                  contentProps={{ className: "p-0" }}
                  trigger={
                    <SidebarMenuButton className="group/trigger">
                      <span>{label}</span>
                      <ChevronRight className="ml-auto transition-transform group-data-panel-open/trigger:rotate-90" />
                    </SidebarMenuButton>
                  }
                >
                  <SidebarMenuSub>
                    {items.map((item) => (
                      <SidebarMenuSubItem key={item}>
                        <SidebarMenuSubButton
                          href="#"
                          active={item === "Sidebar"}
                        >
                          <span>{item}</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <Page title="Sidebar" />
    </SidebarProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Components" });

    await expect(canvas.getByRole("link", { name: "Sidebar" })).toBeVisible();
    await userEvent.click(trigger);
    await waitFor(() =>
      expect(canvas.queryByRole("link", { name: "Sidebar" })).toBeNull(),
    );
  },
};

export const WithUser: Story = {
  render: ({ collapsible, ...args }) => (
    <SidebarProvider {...args}>
      <Sidebar collapsible={collapsible}>
        <SidebarContent>
          <SidebarGroup label="Platform">
            <SidebarMenu>
              {navigation.map(({ label, icon: Icon, active }) => (
                <SidebarMenuItem key={label}>
                  <SidebarMenuButton
                    active={active}
                    tooltip={label}
                    render={<a href="#" />}
                  >
                    <Icon />
                    <span>{label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" tooltip="Jane Doe">
                <Avatar size="sm" alt="Jane Doe" />
                <span className="flex flex-col">
                  <span className="font-medium">Jane Doe</span>
                  <span className="text-muted-fg text-xs">jane@acme.com</span>
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <Page />
    </SidebarProvider>
  ),
  args: {
    collapsible: "icon",
  },
};

export const Mobile: Story = {
  args: {
    breakpoint: "2xl",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(
      canvas.getByRole("button", { name: "Toggle sidebar" }),
    );
    const drawer = await screen.findByRole("dialog", { name: "Sidebar" });
    await expect(
      within(drawer).getByRole("link", { name: "Home" }),
    ).toBeVisible();

    // Following a link closes the drawer.
    await userEvent.click(within(drawer).getByRole("link", { name: "Team" }));
    await waitFor(() =>
      expect(screen.queryByRole("dialog", { name: "Sidebar" })).toBeNull(),
    );
  },
};

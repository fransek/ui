import type { Meta, StoryObj } from "@storybook/react-vite";
import { Home, Slash } from "lucide-react";
import React from "react";
import { expect, screen, waitFor } from "storybook/test";
import { Button } from "../button";
import { Menu } from "../menu";
import { Breadcrumb } from "./breadcrumb";

const meta = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  render: (args) => (
    <Breadcrumb {...args}>
      <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="#">Components</Breadcrumb.Item>
      <Breadcrumb.Item current>Breadcrumb</Breadcrumb.Item>
    </Breadcrumb>
  ),
  tags: ["autodocs"],
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("navigation")).toHaveAccessibleName(
      "Breadcrumb",
    );
    await expect(canvas.getAllByRole("listitem")).toHaveLength(3);
    await expect(canvas.getAllByRole("link")).toHaveLength(2);
    await expect(canvas.getByText("Breadcrumb")).toHaveAttribute(
      "aria-current",
      "page",
    );
  },
};

/**
 * Pass `separator` to replace the default chevron.
 */
export const CustomSeparator: Story = {
  args: {
    separator: <Slash className="-rotate-12" />,
  },
  render: (args) => (
    <Breadcrumb {...args}>
      <Breadcrumb.Item href="#" aria-label="Home">
        <Home className="size-4" />
      </Breadcrumb.Item>
      <Breadcrumb.Item href="#">Settings</Breadcrumb.Item>
      <Breadcrumb.Item current>Profile</Breadcrumb.Item>
    </Breadcrumb>
  ),
};

/**
 * Collapse middle items behind a `Menu` whose trigger is a labelled `Button`
 * wrapping `Breadcrumb.Ellipsis`.
 */
export const Collapsed: Story = {
  render: (args) => (
    <Breadcrumb {...args}>
      <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
      <Breadcrumb.Item>
        <Menu
          trigger={
            <Button
              size="icon"
              variant="ghost"
              aria-label="Show hidden pages"
              className="p-0"
            >
              <Breadcrumb.Ellipsis />
            </Button>
          }
        >
          <Menu.LinkItem href="#">Documentation</Menu.LinkItem>
          <Menu.LinkItem href="#">Components</Menu.LinkItem>
        </Menu>
      </Breadcrumb.Item>
      <Breadcrumb.Item href="#">Navigation</Breadcrumb.Item>
      <Breadcrumb.Item current>Breadcrumb</Breadcrumb.Item>
    </Breadcrumb>
  ),
  play: async ({ canvas, canvasElement, userEvent }) => {
    await expect(canvas.getByText("Breadcrumb")).toHaveAttribute(
      "aria-current",
      "page",
    );
    await expect(
      canvasElement.querySelectorAll('[aria-current="page"]'),
    ).toHaveLength(1);
    await userEvent.click(
      canvas.getByRole("button", { name: "Show hidden pages" }),
    );
    const item = await screen.findByRole("menuitem", {
      name: "Documentation",
    });
    await waitFor(() => expect(item).toBeVisible());
  },
};

/**
 * Without a `Menu`, `Breadcrumb.Ellipsis` is static. Its visually hidden
 * `label` (default `"More pages"`) tells assistive technology that pages were
 * left out.
 */
export const CollapsedStatic: Story = {
  render: (args) => (
    <Breadcrumb {...args}>
      <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
      <Breadcrumb.Item>
        <Breadcrumb.Ellipsis />
      </Breadcrumb.Item>
      <Breadcrumb.Item current>Breadcrumb</Breadcrumb.Item>
    </Breadcrumb>
  ),
  play: async ({ canvas, canvasElement }) => {
    const items = canvas.getAllByRole("listitem");
    await expect(items[1]).toHaveTextContent("More pages");
    await expect(
      canvasElement.querySelectorAll('[aria-current="page"]'),
    ).toHaveLength(1);
    await expect(canvas.getByText("Breadcrumb")).toHaveAttribute(
      "aria-current",
      "page",
    );
  },
};

/**
 * An item can be both a link and the current page.
 */
export const CurrentLink: Story = {
  render: (args) => (
    <Breadcrumb {...args}>
      <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="#" current>
        Breadcrumb
      </Breadcrumb.Item>
    </Breadcrumb>
  ),
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("link", { name: "Breadcrumb" }),
    ).toHaveAttribute("aria-current", "page");
  },
};

/**
 * Pass `render` to `Breadcrumb.Item` to use a router's link component.
 */
export const RouterLink: Story = {
  render: (args) => {
    const RouterLink = (props: React.ComponentProps<"a"> & { to: string }) => {
      const { to, ...rest } = props;
      return <a href={to} data-router-link {...rest} />;
    };

    return (
      <Breadcrumb {...args}>
        <Breadcrumb.Item render={<RouterLink to="#" />}>Home</Breadcrumb.Item>
        <Breadcrumb.Item current>Dashboard</Breadcrumb.Item>
      </Breadcrumb>
    );
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link", { name: "Home" })).toHaveAttribute(
      "data-router-link",
    );
  },
};

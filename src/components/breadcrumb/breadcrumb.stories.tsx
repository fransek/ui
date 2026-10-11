import type { Meta, StoryObj } from "@storybook/react-vite";
import { Home, Slash } from "lucide-react";
import React from "react";
import { expect, screen, waitFor } from "storybook/test";
import { Menu } from "../menu";
import { Breadcrumb } from "./breadcrumb";

const meta = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  render: (args) => (
    <Breadcrumb {...args}>
      <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="#">Components</Breadcrumb.Item>
      <Breadcrumb.Item>Breadcrumb</Breadcrumb.Item>
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
      <Breadcrumb.Item>Profile</Breadcrumb.Item>
    </Breadcrumb>
  ),
};

/**
 * Collapse middle items into a `Breadcrumb.Ellipsis`, and pass it as the
 * `trigger` of a `Menu` to reveal them.
 */
export const Collapsed: Story = {
  render: (args) => (
    <Breadcrumb {...args}>
      <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
      <Menu trigger={<Breadcrumb.Ellipsis label="Show hidden pages" />}>
        <Menu.LinkItem href="#">Documentation</Menu.LinkItem>
        <Menu.LinkItem href="#">Components</Menu.LinkItem>
      </Menu>
      <Breadcrumb.Item href="#">Navigation</Breadcrumb.Item>
      <Breadcrumb.Item>Breadcrumb</Breadcrumb.Item>
    </Breadcrumb>
  ),
  play: async ({ canvas, userEvent }) => {
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
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
      </Breadcrumb>
    );
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link", { name: "Home" })).toHaveAttribute(
      "data-router-link",
    );
  },
};

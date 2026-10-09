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
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">Components</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
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
 * Pass `children` to `Breadcrumb.Separator` to replace the default chevron.
 */
export const CustomSeparator: Story = {
  render: (args) => (
    <Breadcrumb {...args}>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#" aria-label="Home">
            <Home className="size-4" />
          </Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator>
          <Slash className="-rotate-12" />
        </Breadcrumb.Separator>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">Settings</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator>
          <Slash className="-rotate-12" />
        </Breadcrumb.Separator>
        <Breadcrumb.Item>
          <Breadcrumb.Page>Profile</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb>
  ),
};

/**
 * Collapse middle items into a `Breadcrumb.Ellipsis`, and render it as a
 * `Menu` trigger to reveal them.
 */
export const Collapsed: Story = {
  render: (args) => (
    <Breadcrumb {...args}>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Menu
            trigger={
              <Breadcrumb.Ellipsis
                label="Show hidden pages"
                render={<button type="button" />}
                className="hover:bg-hover hover:text-foreground focus-visible:focus-outline data-popup-open:bg-active rounded-md transition-colors outline-none"
              />
            }
          >
            <Menu.LinkItem href="#">Documentation</Menu.LinkItem>
            <Menu.LinkItem href="#">Components</Menu.LinkItem>
          </Menu>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">Navigation</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
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
 * Pass `render` to `Breadcrumb.Link` to use a router's link component.
 */
export const RouterLink: Story = {
  render: (args) => {
    const RouterLink = (props: React.ComponentProps<"a"> & { to: string }) => {
      const { to, ...rest } = props;
      return <a href={to} data-router-link {...rest} />;
    };

    return (
      <Breadcrumb {...args}>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link render={<RouterLink to="#" />}>
              Home
            </Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Page>Dashboard</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    );
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link", { name: "Home" })).toHaveAttribute(
      "data-router-link",
    );
  },
};

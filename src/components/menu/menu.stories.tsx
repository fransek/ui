import type { Meta, StoryObj } from "@storybook/react-vite";
import { Trash } from "lucide-react";
import React from "react";
import { expect, screen } from "storybook/test";
import { Button } from "../button";
import { Menu } from "./menu";

const meta = {
  title: "Components/Menu",
  render: (args) => (
    <Menu {...args} trigger={<Button variant="outline">Open menu</Button>}>
      <Menu.Item>New file</Menu.Item>
      <Menu.Item>Open file</Menu.Item>
      <Menu.Submenu trigger="Export as">
        <Menu.Item>PDF</Menu.Item>
        <Menu.Item>PNG</Menu.Item>
        <Menu.Item>SVG</Menu.Item>
      </Menu.Submenu>
      <Menu.Item variant="danger">
        <Trash className="size-4" />
        Delete
      </Menu.Item>
      <Menu.Separator />
      <Menu.Item disabled>Print</Menu.Item>
    </Menu>
  ),
  component: Menu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

/**
 * Set `openOnHover` to open the menu as soon as the trigger is hovered.
 */
export const OpenOnHover: Story = {
  args: {
    openOnHover: true,
  },
};

/**
 * Set `disabled` on the menu to ignore all user interaction with it.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

/**
 * Wrap related items in a `Menu.Group` and give it a `label` heading.
 */
export const Grouped: Story = {
  render: (args) => (
    <Menu {...args} trigger={<Button variant="outline">Open menu</Button>}>
      <Menu.Group label="Document">
        <Menu.Item>New file</Menu.Item>
        <Menu.Item>Open file</Menu.Item>
      </Menu.Group>
      <Menu.Group label="Share">
        <Menu.Item>Invite people</Menu.Item>
        <Menu.Item>Copy link</Menu.Item>
      </Menu.Group>
    </Menu>
  ),
};

/**
 * `Menu.CheckboxItem` toggles a value and keeps the menu open by default.
 */
export const CheckboxItems: Story = {
  render: (args) => (
    <Menu {...args} trigger={<Button variant="outline">View</Button>}>
      <Menu.CheckboxItem defaultChecked>Sidebar</Menu.CheckboxItem>
      <Menu.CheckboxItem>Minimap</Menu.CheckboxItem>
      <Menu.CheckboxItem>Breadcrumbs</Menu.CheckboxItem>
    </Menu>
  ),
};

/**
 * `Menu.RadioItem` selects a single value out of a `Menu.RadioGroup`.
 */
export const RadioItems: Story = {
  render: (args) => (
    <Menu {...args} trigger={<Button variant="outline">Sort by</Button>}>
      <Menu.RadioGroup defaultValue="name">
        <Menu.RadioItem value="name">Name</Menu.RadioItem>
        <Menu.RadioItem value="size">Size</Menu.RadioItem>
        <Menu.RadioItem value="modified">Last modified</Menu.RadioItem>
      </Menu.RadioGroup>
    </Menu>
  ),
};

/**
 * Set `variant="danger"` on any kind of item, or on a `Menu.Submenu`, to mark
 * a destructive action.
 */
export const Danger: Story = {
  render: (args) => (
    <Menu {...args} trigger={<Button variant="outline">Account</Button>}>
      <Menu.Item>Edit profile</Menu.Item>
      <Menu.Submenu trigger="Remove data" variant="danger">
        <Menu.Item variant="danger">Clear history</Menu.Item>
        <Menu.Item variant="danger">Clear cache</Menu.Item>
      </Menu.Submenu>
      <Menu.Separator />
      <Menu.LinkItem variant="danger" href="#delete-account">
        <Trash className="size-4" />
        Delete account
      </Menu.LinkItem>
      <Menu.Item variant="danger" disabled>
        Delete organization
      </Menu.Item>
    </Menu>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Account" }));
    const items = [
      await screen.findByRole("menuitem", { name: "Remove data" }),
      screen.getByRole("menuitem", { name: "Delete account" }),
      screen.getByRole("menuitem", { name: "Delete organization" }),
    ];
    for (const item of items) {
      await expect(item).not.toHaveAttribute("variant");
      await expect(item).toHaveClass("text-danger-fg");
    }
    await expect(
      screen.getByRole("menuitem", { name: "Edit profile" }),
    ).not.toHaveClass("text-danger-fg");
  },
};

/**
 * `Menu.LinkItem` renders an anchor that navigates instead of running a handler.
 */
export const LinkItems: Story = {
  render: (args) => (
    <Menu {...args} trigger={<Button variant="outline">Resources</Button>}>
      <Menu.LinkItem href="https://base-ui.com" target="_blank">
        Base UI
      </Menu.LinkItem>
      <Menu.LinkItem href="https://tailwindcss.com" target="_blank">
        Tailwind CSS
      </Menu.LinkItem>
    </Menu>
  ),
};

export const DetachedTrigger: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    return (
      <>
        <Button ref={buttonRef} variant="outline" onClick={() => setOpen(true)}>
          Open detached
        </Button>
        <Menu
          {...args}
          open={open}
          onOpenChange={setOpen}
          positionerProps={{ anchor: buttonRef }}
        >
          <Menu.Item>Detached item</Menu.Item>
        </Menu>
      </>
    );
  },
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getAllByRole("button")).toHaveLength(1);
    await userEvent.click(
      canvas.getByRole("button", { name: "Open detached" }),
    );
    await expect(
      await screen.findByRole("menuitem", { name: "Detached item" }),
    ).toBeInTheDocument();
  },
};

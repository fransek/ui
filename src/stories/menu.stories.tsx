import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Button } from "../components/button";
import {
  Menu,
  MenuCheckboxItem,
  MenuGroup,
  MenuItem,
  MenuLinkItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuSubmenu,
} from "../components/menu";

const meta = {
  title: "Components/Menu",
  render: (args) => (
    <Menu {...args} trigger={<Button variant="outline">Open menu</Button>}>
      <MenuItem>New file</MenuItem>
      <MenuItem>Open file</MenuItem>
      <MenuSubmenu trigger="Export as">
        <MenuItem>PDF</MenuItem>
        <MenuItem>PNG</MenuItem>
        <MenuItem>SVG</MenuItem>
      </MenuSubmenu>
      <MenuSeparator />
      <MenuItem disabled>Print</MenuItem>
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
 * Wrap related items in a `MenuGroup` and give it a `label` heading.
 */
export const Grouped: Story = {
  render: (args) => (
    <Menu {...args} trigger={<Button variant="outline">Open menu</Button>}>
      <MenuGroup label="Document">
        <MenuItem>New file</MenuItem>
        <MenuItem>Open file</MenuItem>
      </MenuGroup>
      <MenuGroup label="Share">
        <MenuItem>Invite people</MenuItem>
        <MenuItem>Copy link</MenuItem>
      </MenuGroup>
    </Menu>
  ),
};

/**
 * `MenuCheckboxItem` toggles a value and keeps the menu open by default.
 */
export const CheckboxItems: Story = {
  render: (args) => (
    <Menu {...args} trigger={<Button variant="outline">View</Button>}>
      <MenuCheckboxItem defaultChecked>Sidebar</MenuCheckboxItem>
      <MenuCheckboxItem>Minimap</MenuCheckboxItem>
      <MenuCheckboxItem>Breadcrumbs</MenuCheckboxItem>
    </Menu>
  ),
};

/**
 * `MenuRadioItem` selects a single value out of a `MenuRadioGroup`.
 */
export const RadioItems: Story = {
  render: (args) => (
    <Menu {...args} trigger={<Button variant="outline">Sort by</Button>}>
      <MenuRadioGroup defaultValue="name">
        <MenuRadioItem value="name">Name</MenuRadioItem>
        <MenuRadioItem value="size">Size</MenuRadioItem>
        <MenuRadioItem value="modified">Last modified</MenuRadioItem>
      </MenuRadioGroup>
    </Menu>
  ),
};

/**
 * `MenuLinkItem` renders an anchor that navigates instead of running a handler.
 */
export const LinkItems: Story = {
  render: (args) => (
    <Menu {...args} trigger={<Button variant="outline">Resources</Button>}>
      <MenuLinkItem href="https://base-ui.com" target="_blank">
        Base UI
      </MenuLinkItem>
      <MenuLinkItem href="https://tailwindcss.com" target="_blank">
        Tailwind CSS
      </MenuLinkItem>
    </Menu>
  ),
};

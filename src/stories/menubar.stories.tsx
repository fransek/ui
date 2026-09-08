import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import {
  Menu,
  MenuCheckboxItem,
  MenuItem,
  MenuSeparator,
  MenuSubmenu,
} from "../components/menu";
import { Menubar, MenubarTrigger } from "../components/menubar";

const meta = {
  title: "Components/Menubar",
  render: (args) => (
    <Menubar {...args}>
      <Menu trigger={<MenubarTrigger>File</MenubarTrigger>}>
        <MenuItem>New</MenuItem>
        <MenuItem>Open</MenuItem>
        <MenuItem>Save</MenuItem>
        <MenuSubmenu trigger="Export as">
          <MenuItem>PDF</MenuItem>
          <MenuItem>PNG</MenuItem>
          <MenuItem>SVG</MenuItem>
        </MenuSubmenu>
        <MenuSeparator />
        <MenuItem>Print</MenuItem>
      </Menu>
      <Menu trigger={<MenubarTrigger>Edit</MenubarTrigger>}>
        <MenuItem>Cut</MenuItem>
        <MenuItem>Copy</MenuItem>
        <MenuItem>Paste</MenuItem>
      </Menu>
      <Menu trigger={<MenubarTrigger>View</MenubarTrigger>}>
        <MenuCheckboxItem defaultChecked>Sidebar</MenuCheckboxItem>
        <MenuCheckboxItem>Minimap</MenuCheckboxItem>
      </Menu>
      <Menu disabled trigger={<MenubarTrigger>Help</MenubarTrigger>} />
    </Menubar>
  ),
  component: Menubar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Menubar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

/**
 * Set `orientation` to `"vertical"` to stack the menus and navigate them with
 * the up and down arrow keys.
 */
export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
};

/**
 * Set `disabled` on the menubar to ignore all user interaction with it.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

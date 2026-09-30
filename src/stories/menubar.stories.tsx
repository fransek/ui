import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Menu } from "../components/menu";
import { Menubar } from "../components/menubar";

const meta = {
  title: "Components/Menubar",
  render: (args) => (
    <Menubar {...args}>
      <Menu trigger={<Menubar.Trigger>File</Menubar.Trigger>}>
        <Menu.Item>New</Menu.Item>
        <Menu.Item>Open</Menu.Item>
        <Menu.Item>Save</Menu.Item>
        <Menu.Submenu trigger="Export as">
          <Menu.Item>PDF</Menu.Item>
          <Menu.Item>PNG</Menu.Item>
          <Menu.Item>SVG</Menu.Item>
        </Menu.Submenu>
        <Menu.Separator />
        <Menu.Item>Print</Menu.Item>
      </Menu>
      <Menu trigger={<Menubar.Trigger>Edit</Menubar.Trigger>}>
        <Menu.Item>Cut</Menu.Item>
        <Menu.Item>Copy</Menu.Item>
        <Menu.Item>Paste</Menu.Item>
      </Menu>
      <Menu trigger={<Menubar.Trigger>View</Menubar.Trigger>}>
        <Menu.CheckboxItem defaultChecked>Sidebar</Menu.CheckboxItem>
        <Menu.CheckboxItem>Minimap</Menu.CheckboxItem>
      </Menu>
      <Menu disabled trigger={<Menubar.Trigger>Help</Menubar.Trigger>} />
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

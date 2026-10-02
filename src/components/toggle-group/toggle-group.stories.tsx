import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Monitor,
  Moon,
  Sun,
  Underline,
} from "lucide-react";
import React from "react";
import { expect, fn } from "storybook/test";
import { ToggleGroup } from "./toggle-group";

const meta = {
  title: "Components/ToggleGroup",
  component: ToggleGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    defaultValue: ["left"],
    onValueChange: fn(),
    orientation: "horizontal",
    multiple: false,
  },
  argTypes: {
    orientation: {
      control: { type: "radio" },
      options: ["horizontal", "vertical"],
    },
  },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroup.Item value="left">
        <AlignLeft className="size-4" />
        Left
      </ToggleGroup.Item>
      <ToggleGroup.Item value="center">
        <AlignCenter className="size-4" />
        Center
      </ToggleGroup.Item>
      <ToggleGroup.Item value="right">
        <AlignRight className="size-4" />
        Right
      </ToggleGroup.Item>
    </ToggleGroup>
  ),
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const left = canvas.getByRole("button", { name: "Left" });
    const center = canvas.getByRole("button", { name: "Center" });
    await expect(left).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(center);
    await expect(center).toHaveAttribute("aria-pressed", "true");
    await expect(left).toHaveAttribute("aria-pressed", "false");
    await expect(args.onValueChange).toHaveBeenCalledWith(
      ["center"],
      expect.anything(),
    );
  },
};

export const Multiple: Story = {
  args: {
    multiple: true,
    defaultValue: ["bold"],
  },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroup.Item value="bold" size="icon" aria-label="Bold">
        <Bold className="size-4" />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="italic" size="icon" aria-label="Italic">
        <Italic className="size-4" />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="underline" size="icon" aria-label="Underline">
        <Underline className="size-4" />
      </ToggleGroup.Item>
    </ToggleGroup>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Italic" }));
    await expect(canvas.getByRole("button", { name: "Bold" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect(
      canvas.getByRole("button", { name: "Italic" }),
    ).toHaveAttribute("aria-pressed", "true");
  },
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
  render: (args) => (
    <ToggleGroup {...args} defaultValue={["system"]}>
      <ToggleGroup.Item value="system">
        <Monitor className="size-4" />
        System
      </ToggleGroup.Item>
      <ToggleGroup.Item value="light">
        <Sun className="size-4" />
        Light
      </ToggleGroup.Item>
      <ToggleGroup.Item value="dark">
        <Moon className="size-4" />
        Dark
      </ToggleGroup.Item>
    </ToggleGroup>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Center" }));
    await expect(
      canvas.getByRole("button", { name: "Center" }),
    ).toHaveAttribute("aria-pressed", "false");
    await expect(args.onValueChange).not.toHaveBeenCalled();
  },
};

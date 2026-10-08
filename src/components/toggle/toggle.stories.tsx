import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bold, Heart, HeartOff } from "lucide-react";
import React from "react";
import { expect, fn } from "storybook/test";
import { Toggle } from "./toggle";

const meta = {
  title: "Components/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    children: "Toggle",
    onPressedChange: fn(),
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const toggle = canvas.getByRole("button", { name: "Toggle" });
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
    await expect(args.onPressedChange).toHaveBeenCalledWith(
      true,
      expect.anything(),
    );
  },
};

export const DefaultPressed: Story = {
  args: {
    defaultPressed: true,
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Toggle {...args} size="sm">
        Small
      </Toggle>
      <Toggle {...args} size="md">
        Medium
      </Toggle>
      <Toggle {...args} size="lg">
        Large
      </Toggle>
      <Toggle {...args} size="icon" aria-label="Bold">
        <Bold className="size-4" />
      </Toggle>
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Heart className="size-4" />
        Favorite
      </>
    ),
  },
};

export const RenderProps: Story = {
  args: {
    size: "icon",
    "aria-label": "Favorite",
    children: ({ pressed }) => (
      <>
        {pressed ? (
          <Heart className="size-5" />
        ) : (
          <HeartOff className="size-5" />
        )}
      </>
    ),
  },
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole("button", { name: "Favorite" });
    await expect(toggle.querySelector(".lucide-heart-off")).not.toBeNull();
    await userEvent.click(toggle);
    await expect(toggle.querySelector(".lucide-heart")).not.toBeNull();
    await expect(toggle.querySelector(".lucide-heart-off")).toBeNull();
    await userEvent.click(toggle);
    await expect(toggle.querySelector(".lucide-heart-off")).not.toBeNull();
  },
};

export const Variant: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Toggle {...args} variant="outline">
        Outline
      </Toggle>
      <Toggle
        {...args}
        variant={({ pressed }) => (pressed ? "success" : "outline")}
      >
        By state
      </Toggle>
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    const fixed = canvas.getByRole("button", { name: "Outline" });
    await expect(fixed).toHaveClass("border");
    await userEvent.click(fixed);
    await expect(fixed).toHaveClass("border");

    const byState = canvas.getByRole("button", { name: "By state" });
    await expect(byState).toHaveClass("border");
    await expect(byState).not.toHaveClass("success");
    await userEvent.click(byState);
    await expect(byState).toHaveClass("success");
    await expect(byState).not.toHaveClass("border");
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ args, canvas, userEvent }) => {
    const toggle = canvas.getByRole("button", { name: "Toggle" });
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
    await expect(args.onPressedChange).not.toHaveBeenCalled();
  },
};

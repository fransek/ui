import type { Meta, StoryObj } from "@storybook/react-vite";
import { CircleCheckBig } from "lucide-react";
import React from "react";
import { Button } from "../components/button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    disabled: { control: "boolean" },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
  args: {
    children: "Button",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    variant: "primary",
    size: "md",
  },
};

export const IconButton: Story = {
  args: {
    variant: "success",
    size: "md",
    children: (
      <>
        <CircleCheckBig className="h-5 w-5" />
        Icon
      </>
    ),
  },
};

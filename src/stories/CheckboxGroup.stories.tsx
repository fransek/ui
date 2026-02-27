import type { Meta, StoryObj } from "@storybook/react-vite";

import React from "react";
import { CheckboxGroup } from "../components/checkbox-group/CheckboxGroup";
import { Checkbox } from "../components/checkbox/Checkbox";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/CheckboxGroup",
  component: CheckboxGroup,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    label: { control: "text" },
    errorMessage: { control: "text" },
    isValidatingMessage: { control: "text" },
    description: { control: "text" },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
  args: {
    label: "Select your favorite fruits",
    description: "Please select your favorite fruits.",
    isValidating: false,
    isValidatingMessage: "Validating...",
    children: (
      <>
        <Checkbox label="Banana" value="banana" />
        <Checkbox label="Apple" value="apple" />
        <Checkbox label="Orange" value="orange" />
      </>
    ),
  },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Basic: Story = {
  args: {},
};

export const Error: Story = {
  args: {
    errorMessage: "You must select at least one fruit.",
  },
};

export const Validating: Story = {
  args: {
    isValidating: true,
  },
};

import type { Meta, StoryObj } from "@storybook/react-vite";

import React from "react";
import { Checkbox } from "../components/checkbox";
import { CheckboxGroup } from "../components/checkbox-group";

const meta = {
  title: "Components/CheckboxGroup",
  component: CheckboxGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    errorMessage: { control: "text" },
    isValidatingMessage: { control: "text" },
    description: { control: "text" },
  },
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

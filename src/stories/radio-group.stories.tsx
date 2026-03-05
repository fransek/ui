import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Radio } from "../components/radio";
import { RadioGroup } from "../components/radio-group";

const meta = {
  title: "RadioGroup",
  component: RadioGroup,
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
    label: "Fruit",
    description: "Select your favorite fruit from the list.",
    isValidating: false,
    isValidatingMessage: "Validating...",
    children: (
      <>
        <Radio value="apple" label="Apple" />
        <Radio value="banana" label="Banana" />
        <Radio value="orange" label="Orange" />
      </>
    ),
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export const Error: Story = {
  args: {
    errorMessage: "This field is required.",
  },
};

export const Validating: Story = {
  args: {
    isValidating: true,
  },
};

import type { Meta, StoryObj } from "@storybook/react-vite";

import { Checkbox } from "../components/checkbox";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
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
    label: "Accept Terms and Conditions",
    description: "Please accept the terms and conditions to proceed.",
    isValidating: false,
    isValidatingMessage: "Validating...",
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export const Error: Story = {
  args: {
    errorMessage: "You must accept the terms and conditions.",
  },
};

export const Validating: Story = {
  args: {
    isValidating: true,
    defaultChecked: true,
  },
};

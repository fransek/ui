import type { Meta, StoryObj } from "@storybook/react-vite";

import { Textarea } from "../components/textarea";

const meta = {
  title: "Components/Fields/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    errorMessage: { control: "text" },
    isValidatingMessage: { control: "text" },
    description: { control: "text" },
    infoPopover: { control: "text" },
    invalid: { control: "boolean" },
  },
  args: {
    label: "Bio",
    description: "Tell us a little about yourself.",
    placeholder: "Enter your bio",
    isValidating: false,
    isValidatingMessage: "Validating...",
    infoPopover:
      "Your bio should be a brief introduction about yourself. It can include your interests, background, and anything you'd like to share.",
    rows: 4,
    className: "min-w-[20rem]",
    maxLength: 150,
  },
} satisfies Meta<typeof Textarea>;

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

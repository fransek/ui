import type { Meta, StoryObj } from "@storybook/react-vite";
import { Switch } from "../components/switch";

const meta = {
  title: "Components/Fields/Switch",
  component: Switch,
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
    label: "Enable notifications",
    description: "Receive updates about your account activity.",
    isValidating: false,
    isValidatingMessage: "Validating...",
    infoPopover:
      "Notifications are sent to the email address associated with your account.",
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Error: Story = {
  args: {
    errorMessage: "Notifications could not be enabled.",
  },
};

export const Validating: Story = {
  args: {
    isValidating: true,
    defaultChecked: true,
  },
};

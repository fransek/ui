import type { Meta, StoryObj } from "@storybook/react-vite";
import { Radio } from "../components/radio";

const meta = {
  title: "Radio",
  component: Radio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    disabled: { control: "boolean" },
  },
  args: {
    label: "Option",
    value: "option",
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

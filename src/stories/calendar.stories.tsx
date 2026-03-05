import type { Meta, StoryObj } from "@storybook/react-vite";
import { Calendar } from "../components/calendar";

const startMonth = new Date();
const endMonth = new Date();
endMonth.setFullYear(startMonth.getFullYear() + 10);

const meta = {
  title: "Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
  },
  args: {
    captionLayout: "label",
    mode: "single",
    className: "border rounded-lg",
    startMonth,
    endMonth,
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: {},
};

export const Range: Story = {
  args: {
    mode: "range",
    captionLayout: "dropdown",
  },
};

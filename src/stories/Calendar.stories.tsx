import type { Meta, StoryObj } from "@storybook/react-vite";
import { Calendar } from "../components/calendar";

const startMonth = new Date();
const endMonth = new Date();
endMonth.setFullYear(startMonth.getFullYear() + 10);

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Calendar",
  component: Calendar,
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
    captionLayout: "label",
    mode: "single",
    className: "border rounded-lg",
    startMonth,
    endMonth,
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Single: Story = {
  args: {},
};

export const Range: Story = {
  args: {
    mode: "range",
    captionLayout: "dropdown",
  },
};

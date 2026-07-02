import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text as TextComponent } from "./text";

const meta = {
  title: "Theme/Text",
  component: TextComponent,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof TextComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {};

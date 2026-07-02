import type { Meta, StoryObj } from "@storybook/react-vite";
import { Typography as TypographyComponent } from "./typography";

const meta = {
  title: "Theme/Typography",
  component: TypographyComponent,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof TypographyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Typography: Story = {};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tag } from "lucide-react";
import React from "react";
import { expect, fn } from "storybook/test";
import { Chip, ChipVariant } from "../components/chip";

const variants: ChipVariant[] = [
  "primary",
  "secondary",
  "success",
  "success-subtle",
  "warning",
  "warning-subtle",
  "danger",
  "danger-subtle",
  "muted",
  "outline",
] as const;

const meta = {
  title: "Components/Chip",
  component: Chip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
  },
  args: {
    children: "Chip",
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      {variants.map((variant) => (
        <Chip key={variant} {...args} variant={variant}>
          {variant}
        </Chip>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Chip {...args} size="sm">
        Small
      </Chip>
      <Chip {...args} size="md">
        Medium
      </Chip>
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    icon: <Tag />,
    children: "Tagged",
  },
};

export const Removable: Story = {
  args: {
    children: "React",
    onRemove: fn(),
  },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Remove React" }));
    await expect(args.onRemove).toHaveBeenCalledOnce();
  },
};

export const RemovableList: Story = {
  render: (args) => {
    const [tags, setTags] = React.useState([
      "React",
      "TypeScript",
      "Tailwind",
      "Base UI",
    ]);

    return (
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Chip
            key={tag}
            {...args}
            onRemove={() => setTags((prev) => prev.filter((t) => t !== tag))}
          >
            {tag}
          </Chip>
        ))}
      </div>
    );
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: "Remove TypeScript" }),
    );
    await expect(canvas.queryByText("TypeScript")).not.toBeInTheDocument();
    await expect(canvas.getByText("React")).toBeInTheDocument();
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
    onRemove: fn(),
  },
  play: async ({ args, canvas }) => {
    await expect(
      canvas.getByRole("button", { name: "Remove Disabled" }),
    ).toBeDisabled();
    await expect(args.onRemove).not.toHaveBeenCalled();
  },
};

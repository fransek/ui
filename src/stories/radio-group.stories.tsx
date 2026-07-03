import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Radio } from "../components/radio";
import { RadioGroup } from "../components/radio-group";

const meta = {
  title: "Components/Fields/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## Anatomy

\`\`\`jsx
import { RadioGroup, Radio } from "@fransek/ui";

<RadioGroup label="..." value={value} onValueChange={setValue}>
  <Radio value="a" label="A" />
  <Radio value="b" label="B" />
</RadioGroup>;
\`\`\`
`,
      },
    },
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
    label: "Fruit",
    description: "Select your favorite fruit from the list.",
    isValidating: false,
    isValidatingMessage: "Validating...",
    infoPopover:
      "Fruits are a great source of vitamins and minerals. Choose wisely!",
  },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="apple" label="Apple" />
      <Radio value="banana" label="Banana" />
      <Radio value="orange" label="Orange" />
    </RadioGroup>
  ),
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

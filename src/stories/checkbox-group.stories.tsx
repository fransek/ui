import type { Meta, StoryObj } from "@storybook/react-vite";

import React from "react";
import { Checkbox } from "../components/checkbox";
import { CheckboxGroup } from "../components/checkbox-group";

const meta = {
  title: "Components/Fields/CheckboxGroup",
  component: CheckboxGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## Anatomy

\`\`\`tsx
import { CheckboxGroup, Checkbox } from "@fransek/ui";

<CheckboxGroup label="...">
  <Checkbox value="a" label="A" />
  <Checkbox value="b" label="B" />
</CheckboxGroup>;
\`\`\`

- **\`CheckboxGroup\`** – the root. Wraps the shared \`Field\` (rendering
  \`label\`/\`description\`/\`errorMessage\`/\`infoPopover\`) around a
  \`Fieldset.Root\` and Base UI's \`CheckboxGroup\`. \`children\` are the
  individual options.
- **\`Checkbox\`** – a single option, placed inside \`CheckboxGroup\` as
  \`children\`.
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
    label: "Select your favorite fruits",
    description: "Please select your favorite fruits.",
    isValidating: false,
    isValidatingMessage: "Validating...",
    infoPopover:
      "Fruits are a great source of vitamins and minerals. Choose wisely!",
  },
  render: (args) => (
    <CheckboxGroup {...args}>
      <Checkbox label="Banana" value="banana" />
      <Checkbox label="Apple" value="apple" />
      <Checkbox label="Orange" value="orange" />
    </CheckboxGroup>
  ),
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export const Error: Story = {
  args: {
    errorMessage: "You must select at least one fruit.",
  },
};

export const Validating: Story = {
  args: {
    isValidating: true,
  },
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Button } from "../components/button";
import {
  Popover,
  PopoverClose,
  PopoverDescription,
  PopoverTitle,
} from "../components/popover";

const meta = {
  title: "Components/Popover",
  render: (args) => (
    <Popover
      {...args}
      trigger={<Button variant="outline">Open Popover</Button>}
    >
      <PopoverTitle className="mb-2">Popover content</PopoverTitle>
      <PopoverDescription className="mb-4">
        This popover can contain contextual information or actions.
      </PopoverDescription>
      <div className="flex justify-end">
        <PopoverClose render={<Button size="sm">Close</Button>} />
      </div>
    </Popover>
  ),
  component: Popover,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## Anatomy

\`\`\`tsx
import { Popover, PopoverTitle, PopoverDescription, PopoverClose } from "@fransek/ui";

<Popover trigger={<button>Open</button>} arrow>
  <PopoverTitle>...</PopoverTitle>
  <PopoverDescription>...</PopoverDescription>
  <PopoverClose />
</Popover>;
\`\`\`

- **\`Popover\`** – the root. Wraps Base UI's \`Popover.Root\`, \`Popover.Trigger\`
  (rendered from the \`trigger\` prop), \`Popover.Portal\`,
  \`Popover.Positioner\`, and \`Popover.Popup\`. Set \`arrow\` to render a
  \`Popover.Arrow\` (using \`ArrowSvg\`) pointing at the trigger. \`children\` is
  rendered inside the popup.
- **\`PopoverTitle\`** – wraps \`Popover.Title\`.
- **\`PopoverDescription\`** – wraps \`Popover.Description\`.
- **\`PopoverClose\`** – wraps \`Popover.Close\`. Pass \`render\` to use a custom
  trigger element, such as a \`Button\`.
`,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const WithArrow: Story = {
  args: {
    arrow: true,
  },
};

export const Modal: Story = {
  args: {
    modal: true,
  },
};

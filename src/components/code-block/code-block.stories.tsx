import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, fn, spyOn, waitFor } from "storybook/test";
import { CodeBlock } from "./code-block";

const meta = {
  title: "Components/CodeBlock",
  component: CodeBlock,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

const tsxCode = `import { Button } from "@fransek/ui/button";

export function App() {
  const [count, setCount] = React.useState(0);

  return (
    <Button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </Button>
  );
}`;

export const Basic: Story = {
  args: { code: tsxCode, language: "tsx" },
  render: (args) => (
    <CodeBlock {...args}>
      <CodeBlock.Content />
    </CodeBlock>
  ),
  play: async ({ canvasElement }) => {
    await waitFor(() =>
      expect(canvasElement.querySelector("pre")).toHaveAttribute(
        "data-highlighted",
      ),
    );
    const pre = canvasElement.querySelector("pre")!;
    await expect(pre).toHaveTextContent('import { Button } from "@fransek/ui');
    await expect(pre.querySelectorAll("[data-line]")).toHaveLength(
      tsxCode.split("\n").length,
    );
  },
};

const onCopied = fn();

export const WithHeader: Story = {
  args: { code: tsxCode, language: "tsx" },
  render: (args) => (
    <CodeBlock {...args}>
      <CodeBlock.Header>
        <CodeBlock.Title>app.tsx</CodeBlock.Title>
        <CodeBlock.Actions>
          <CodeBlock.CopyButton onCopied={onCopied} />
        </CodeBlock.Actions>
      </CodeBlock.Header>
      <CodeBlock.Content />
    </CodeBlock>
  ),
  play: async ({ canvas, userEvent }) => {
    const writeText = spyOn(navigator.clipboard, "writeText").mockResolvedValue(
      undefined,
    );
    await userEvent.click(canvas.getByRole("button", { name: "Copy code" }));
    await expect(writeText).toHaveBeenCalledWith(tsxCode);
    await expect(onCopied).toHaveBeenCalledWith(tsxCode);
    await expect(
      await canvas.findByRole("button", { name: "Copied" }),
    ).toBeInTheDocument();
    writeText.mockRestore();
  },
};

export const LineNumbers: Story = {
  args: { code: tsxCode, language: "tsx" },
  render: (args) => (
    <CodeBlock {...args}>
      <CodeBlock.Header>
        <CodeBlock.Title>app.tsx</CodeBlock.Title>
        <CodeBlock.CopyButton />
      </CodeBlock.Header>
      <CodeBlock.Content showLineNumbers highlightLines={[4, 7]} />
    </CodeBlock>
  ),
  play: async ({ canvasElement }) => {
    const highlighted = canvasElement.querySelectorAll<HTMLElement>(
      "[data-highlighted-line]",
    );
    await expect([...highlighted].map((el) => el.dataset.line)).toEqual([
      "4",
      "7",
    ]);
  },
};

const cssCode = `.button {
  background: var(--color-primary);

  &:hover {
    background: var(--color-primary-hover);
  }
}`;

const bashCode = `pnpm add @fransek/ui shiki`;

export const Languages: Story = {
  args: { code: "" },
  render: () => (
    <div className="flex flex-col gap-4">
      <CodeBlock code={bashCode} language="bash">
        <CodeBlock.Header>
          <CodeBlock.Title>Terminal</CodeBlock.Title>
          <CodeBlock.CopyButton />
        </CodeBlock.Header>
        <CodeBlock.Content />
      </CodeBlock>
      <CodeBlock code={cssCode} language="css">
        <CodeBlock.Header>
          <CodeBlock.Title>button.css</CodeBlock.Title>
          <CodeBlock.CopyButton />
        </CodeBlock.Header>
        <CodeBlock.Content />
      </CodeBlock>
      <CodeBlock code={`{\n  "name": "@fransek/ui"\n}`} language="json">
        <CodeBlock.Content />
      </CodeBlock>
    </div>
  ),
};

export const CustomThemes: Story = {
  args: {
    code: tsxCode,
    language: "tsx",
    themes: { light: "catppuccin-latte", dark: "catppuccin-mocha" },
  },
  render: (args) => (
    <CodeBlock {...args}>
      <CodeBlock.Content />
    </CodeBlock>
  ),
};

export const UnknownLanguage: Story = {
  args: { code: "some plain text\non two lines", language: "not-a-language" },
  render: (args) => (
    <CodeBlock {...args}>
      <CodeBlock.Content />
    </CodeBlock>
  ),
  play: async ({ canvasElement }) => {
    const pre = canvasElement.querySelector("pre")!;
    await expect(pre).toHaveTextContent("some plain text");
    await expect(pre.querySelectorAll("[data-line]")).toHaveLength(2);
  },
};

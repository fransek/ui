import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect } from "storybook/test";
import { mergeRefs, useMergeRefs } from "../lib/utils";

/**
 * Not a component story — this exercises the ref-identity guarantee that
 * `useMergeRefs` exists for, which needs real renders to observe.
 */
function RefProbe({ stable }: { stable: boolean }) {
  const [renders, rerender] = React.useReducer((n: number) => n + 1, 0);
  const attachments = React.useRef(0);
  const objectRef = React.useRef<HTMLSpanElement>(null);
  const callbackRef = React.useCallback((node: HTMLSpanElement | null) => {
    if (node) {
      attachments.current += 1;
    }
  }, []);

  // Called unconditionally, then only used by the stable variant, so the
  // comparison stays within the rules of hooks.
  const stableRef = useMergeRefs(callbackRef, objectRef);
  const ref = stable ? stableRef : mergeRefs(callbackRef, objectRef);

  return (
    <div className="flex flex-col items-start gap-2">
      <span ref={ref}>Target</span>
      <output data-testid="attachments">{attachments.current}</output>
      <button onClick={rerender}>Re-render ({renders})</button>
    </div>
  );
}

const meta = {
  title: "Utils/useMergeRefs",
  component: RefProbe,
  parameters: { layout: "centered" },
  // Test-only: keep it out of the component sidebar and docs.
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof RefProbe>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A merged ref keeps its identity, so React attaches the element once. */
export const KeepsRefIdentity: Story = {
  args: { stable: true },
  play: async ({ canvas, userEvent }) => {
    const rerender = canvas.getByRole("button");
    await userEvent.click(rerender);
    await userEvent.click(rerender);

    await expect(canvas.getByText("Re-render (2)")).toBeInTheDocument();
    await expect(canvas.getByTestId("attachments")).toHaveTextContent("1");
  },
};

/** What `mergeRefs` alone does: React reattaches on every commit. */
export const PlainMergeRefsReattaches: Story = {
  args: { stable: false },
  play: async ({ canvas, userEvent }) => {
    const rerender = canvas.getByRole("button");
    await userEvent.click(rerender);
    await userEvent.click(rerender);

    await expect(canvas.getByText("Re-render (2)")).toBeInTheDocument();
    // The count is read while rendering, so it trails the commit that is
    // attaching the ref right now — the point is only that it left 1 behind.
    await expect(canvas.getByTestId("attachments")).not.toHaveTextContent("1");
  },
};

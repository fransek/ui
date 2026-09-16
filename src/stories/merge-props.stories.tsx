import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect } from "storybook/test";
import { mergeProps, useMergeProps, useMergeRefs } from "../lib/utils";

// `mergeProps` is written against prop bags that carry an index signature, the
// way a component's own `*Props` interface does.
type ProbeProps = React.ComponentProps<"input"> & { [x: string]: unknown };

/**
 * Not a component story — these exercise the ref guarantees of `lib/utils`,
 * which need real renders to observe: a merged ref keeps its identity, so
 * React attaches the element once instead of on every commit.
 */
function RefProbe({ merge }: { merge: "refs" | "props" | "none" }) {
  const [renders, rerender] = React.useReducer((n: number) => n + 1, 0);
  const attachments = React.useRef(0);
  const objectRef = React.useRef<HTMLInputElement>(null);
  const callbackRef = React.useCallback((node: HTMLInputElement | null) => {
    if (node) {
      attachments.current += 1;
    }
  }, []);

  // Both hooks are called unconditionally, so picking between the variants
  // below stays within the rules of hooks.
  const mergedRef = useMergeRefs(callbackRef, objectRef);
  const mergedProps = useMergeProps<ProbeProps>(
    { ref: callbackRef },
    { ref: objectRef },
  );
  const spreadProps = mergeProps<ProbeProps>({ ref: callbackRef }, {});

  return (
    <div className="flex flex-col items-start gap-2">
      {merge === "refs" && <input ref={mergedRef} readOnly />}
      {merge === "props" && <input {...mergedProps} readOnly />}
      {merge === "none" && <input {...spreadProps} readOnly />}
      <output data-testid="attachments">{attachments.current}</output>
      <output data-testid="object-ref">
        {objectRef.current ? "attached" : "detached"}
      </output>
      <button onClick={rerender}>Re-render ({renders})</button>
    </div>
  );
}

const meta = {
  title: "Utils/Merging props",
  component: RefProbe,
  parameters: { layout: "centered" },
  // Test-only: keep it out of the component sidebar and docs.
  tags: ["!dev", "!autodocs"],
} satisfies Meta<typeof RefProbe>;

export default meta;
type Story = StoryObj<typeof meta>;

const rerenderTwice: NonNullable<Story["play"]> = async ({
  canvas,
  userEvent,
}) => {
  const rerender = canvas.getByRole("button");
  await userEvent.click(rerender);
  await userEvent.click(rerender);
  await expect(canvas.getByText("Re-render (2)")).toBeInTheDocument();
};

/** `useMergeRefs` reaches both refs and holds its identity across renders. */
export const UseMergeRefsKeepsIdentity: Story = {
  args: { merge: "refs" },
  play: async (context) => {
    await rerenderTwice(context);

    await expect(context.canvas.getByTestId("attachments")).toHaveTextContent(
      "1",
    );
    await expect(context.canvas.getByTestId("object-ref")).toHaveTextContent(
      "attached",
    );
  },
};

/** `useMergeProps` does the same for a ref on either side of the merge. */
export const UseMergePropsKeepsIdentity: Story = {
  args: { merge: "props" },
  play: async (context) => {
    await rerenderTwice(context);

    await expect(context.canvas.getByTestId("attachments")).toHaveTextContent(
      "1",
    );
    await expect(context.canvas.getByTestId("object-ref")).toHaveTextContent(
      "attached",
    );
  },
};

/** `mergeProps` spreads a lone ref untouched, so it is stable too. */
export const MergePropsSpreadsRef: Story = {
  args: { merge: "none" },
  play: async (context) => {
    await rerenderTwice(context);

    await expect(context.canvas.getByTestId("attachments")).toHaveTextContent(
      "1",
    );
  },
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, fn } from "storybook/test";
import { getPaginationItems, Pagination } from "./pagination";

const meta = {
  title: "Components/Pagination",
  component: Pagination,
  args: {
    pageCount: 10,
    onPageChange: fn(),
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await expect(canvas.getByRole("navigation")).toHaveAccessibleName(
      "Pagination",
    );
    const previous = canvas.getByRole("button", { name: "Previous page" });
    await expect(previous).toHaveAttribute("data-disabled");
    await expect(
      canvas.getByRole("button", { name: "Page 1" }),
    ).toHaveAttribute("aria-current", "page");

    await userEvent.click(canvas.getByRole("button", { name: "Next page" }));
    await expect(args.onPageChange).toHaveBeenLastCalledWith(2);
    await expect(
      canvas.getByRole("button", { name: "Page 2" }),
    ).toHaveAttribute("aria-current", "page");
    await expect(previous).not.toHaveAttribute("data-disabled");

    await userEvent.click(canvas.getByRole("button", { name: "Page 10" }));
    await expect(args.onPageChange).toHaveBeenLastCalledWith(10);
    await expect(
      canvas.getByRole("button", { name: "Next page" }),
    ).toHaveAttribute("data-disabled");
  },
};

export const Controlled: Story = {
  args: { pageCount: 50 },
  render: (args) => {
    const [page, setPage] = React.useState(25);

    return (
      <div className="flex flex-col items-start gap-2">
        <Pagination
          {...args}
          page={page}
          onPageChange={(next) => {
            setPage(next);
            args.onPageChange?.(next);
          }}
        />
        <p className="body-sm text-muted-fg">
          Page {page} of {args.pageCount}
        </p>
      </div>
    );
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Page 26" }));
    await expect(canvas.getByText("Page 26 of 50")).toBeVisible();
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col items-start gap-4">
      {(["sm", "md", "lg"] as const).map((size) => (
        <Pagination key={size} {...args} size={size} defaultPage={5} />
      ))}
    </div>
  ),
};

export const SiblingAndBoundaryCount: Story = {
  args: { pageCount: 30, defaultPage: 15, siblingCount: 2, boundaryCount: 2 },
};

export const Items: Story = {
  tags: ["!autodocs", "!dev"],
  play: async () => {
    const items = (page: number, pageCount = 10) =>
      getPaginationItems({ page, pageCount });

    // Few enough pages to show them all.
    await expect(items(1, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    // The item count stays at seven wherever the current page is.
    await expect(items(1)).toEqual([1, 2, 3, 4, 5, "ellipsis", 10]);
    await expect(items(4)).toEqual([1, 2, 3, 4, 5, "ellipsis", 10]);
    await expect(items(5)).toEqual([1, "ellipsis", 4, 5, 6, "ellipsis", 10]);
    await expect(items(7)).toEqual([1, "ellipsis", 6, 7, 8, 9, 10]);
    await expect(items(10)).toEqual([1, "ellipsis", 6, 7, 8, 9, 10]);
    await expect(
      getPaginationItems({
        page: 15,
        pageCount: 30,
        siblingCount: 2,
        boundaryCount: 2,
      }),
    ).toEqual([1, 2, "ellipsis", 13, 14, 15, 16, 17, "ellipsis", 29, 30]);
  },
};

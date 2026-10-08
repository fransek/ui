import type { Meta, StoryObj } from "@storybook/react-vite";
import { MoreHorizontal } from "lucide-react";
import React from "react";
import { expect } from "storybook/test";
import { Button } from "../button";
import { Checkbox } from "../checkbox";
import { Chip, ChipVariant } from "../chip";
import { Pagination } from "../pagination";
import { Table, TableSortDirection } from "./table";

const meta = {
  title: "Components/Table",
  component: Table,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

type Status = "Paid" | "Pending" | "Overdue";

interface Invoice {
  id: string;
  customer: string;
  status: Status;
  amount: number;
}

const invoices: Invoice[] = [
  { id: "INV-001", customer: "Acme Corp", status: "Paid", amount: 250 },
  { id: "INV-002", customer: "Globex", status: "Pending", amount: 1200 },
  { id: "INV-003", customer: "Initech", status: "Overdue", amount: 340 },
  { id: "INV-004", customer: "Umbrella", status: "Paid", amount: 875.5 },
  { id: "INV-005", customer: "Hooli", status: "Pending", amount: 90 },
];

const statusVariants: Record<Status, ChipVariant> = {
  Paid: "success-subtle",
  Pending: "warning-subtle",
  Overdue: "danger-subtle",
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const total = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);

function InvoiceRows({ rows = invoices }: { rows?: Invoice[] }) {
  return rows.map((invoice) => (
    <Table.Row key={invoice.id}>
      <Table.Cell className="font-medium">{invoice.id}</Table.Cell>
      <Table.Cell>{invoice.customer}</Table.Cell>
      <Table.Cell>
        <Chip size="sm" variant={statusVariants[invoice.status]}>
          {invoice.status}
        </Chip>
      </Table.Cell>
      <Table.Cell className="text-right tabular-nums">
        {currency.format(invoice.amount)}
      </Table.Cell>
    </Table.Row>
  ));
}

function InvoiceHeader() {
  return (
    <Table.Header>
      <Table.Row>
        <Table.Head>Invoice</Table.Head>
        <Table.Head>Customer</Table.Head>
        <Table.Head>Status</Table.Head>
        <Table.Head className="text-right">Amount</Table.Head>
      </Table.Row>
    </Table.Header>
  );
}

export const Basic: Story = {
  render: (args) => (
    <Table {...args}>
      <Table.Caption>A list of recent invoices.</Table.Caption>
      <InvoiceHeader />
      <Table.Body>
        <InvoiceRows />
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.Cell colSpan={3}>Total</Table.Cell>
          <Table.Cell className="text-right tabular-nums">
            {currency.format(total)}
          </Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table>
  ),
  play: async ({ canvas }) => {
    const table = canvas.getByRole("table", {
      name: "A list of recent invoices.",
    });
    await expect(table).toBeVisible();
    await expect(canvas.getAllByRole("columnheader")).toHaveLength(4);
    // Header row, five body rows and the footer row.
    await expect(canvas.getAllByRole("row")).toHaveLength(7);
  },
};

export const Striped: Story = {
  args: { striped: true },
  render: Basic.render,
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {(["sm", "md", "lg"] as const).map((size) => (
        <Table key={size} size={size}>
          <Table.Caption>Size: {size}</Table.Caption>
          <InvoiceHeader />
          <Table.Body>
            <InvoiceRows rows={invoices.slice(0, 3)} />
          </Table.Body>
        </Table>
      ))}
    </div>
  ),
};

export const InCard: Story = {
  render: () => (
    <div className="card p-0">
      <Table>
        <InvoiceHeader />
        <Table.Body>
          <InvoiceRows />
        </Table.Body>
      </Table>
    </div>
  ),
};

export const Sortable: Story = {
  render: () => {
    const [sort, setSort] = React.useState<{
      key: keyof Invoice;
      direction: Exclude<TableSortDirection, "none">;
    }>({ key: "id", direction: "ascending" });

    const sorted = [...invoices].sort((a, b) => {
      const order = a[sort.key] < b[sort.key] ? -1 : 1;
      return sort.direction === "ascending" ? order : -order;
    });

    const headProps = (key: keyof Invoice) => ({
      sortDirection:
        sort.key === key ? sort.direction : ("none" as TableSortDirection),
      onSort: () =>
        setSort((prev) => ({
          key,
          direction:
            prev.key === key && prev.direction === "ascending"
              ? "descending"
              : "ascending",
        })),
    });

    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Head {...headProps("id")}>Invoice</Table.Head>
            <Table.Head {...headProps("customer")}>Customer</Table.Head>
            <Table.Head {...headProps("status")}>Status</Table.Head>
            <Table.Head {...headProps("amount")} className="text-right">
              Amount
            </Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <InvoiceRows rows={sorted} />
        </Table.Body>
      </Table>
    );
  },
  play: async ({ canvas, userEvent }) => {
    const amountHeader = canvas.getByRole("columnheader", { name: "Amount" });
    await expect(amountHeader).toHaveAttribute("aria-sort", "none");

    await userEvent.click(canvas.getByRole("button", { name: "Amount" }));
    await expect(amountHeader).toHaveAttribute("aria-sort", "ascending");
    await expect(canvas.getAllByRole("row")[1]).toHaveTextContent("INV-005");

    await userEvent.click(canvas.getByRole("button", { name: "Amount" }));
    await expect(amountHeader).toHaveAttribute("aria-sort", "descending");
    await expect(canvas.getAllByRole("row")[1]).toHaveTextContent("INV-002");
  },
};

export const Selectable: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<Set<string>>(new Set());
    const allSelected = selected.size === invoices.length;

    const toggle = (id: string, checked: boolean) =>
      setSelected((prev) => {
        const next = new Set(prev);
        if (checked) {
          next.add(id);
        } else {
          next.delete(id);
        }
        return next;
      });

    return (
      <Table>
        <Table.Caption>{selected.size} selected</Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.Head className="w-0">
              <Checkbox
                label={<span className="sr-only">Select all</span>}
                checked={allSelected}
                indeterminate={selected.size > 0 && !allSelected}
                onCheckedChange={(checked) =>
                  setSelected(
                    new Set(checked ? invoices.map(({ id }) => id) : []),
                  )
                }
              />
            </Table.Head>
            <Table.Head>Invoice</Table.Head>
            <Table.Head>Customer</Table.Head>
            <Table.Head className="text-right">Amount</Table.Head>
            <Table.Head className="w-0">
              <span className="sr-only">Actions</span>
            </Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {invoices.map((invoice) => (
            <Table.Row key={invoice.id} selected={selected.has(invoice.id)}>
              <Table.Cell>
                <Checkbox
                  label={<span className="sr-only">Select {invoice.id}</span>}
                  checked={selected.has(invoice.id)}
                  onCheckedChange={(checked) => toggle(invoice.id, checked)}
                />
              </Table.Cell>
              <Table.Cell className="font-medium">{invoice.id}</Table.Cell>
              <Table.Cell>{invoice.customer}</Table.Cell>
              <Table.Cell className="text-right tabular-nums">
                {currency.format(invoice.amount)}
              </Table.Cell>
              <Table.Cell>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={`Actions for ${invoice.id}`}
                >
                  <MoreHorizontal className="size-4" />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole("checkbox", { name: "Select INV-002" }),
    );
    await expect(canvas.getByText("1 selected")).toBeVisible();
    await expect(canvas.getAllByRole("row")[2]).toHaveAttribute(
      "data-selected",
    );

    await userEvent.click(canvas.getByRole("checkbox", { name: "Select all" }));
    await expect(canvas.getByText("5 selected")).toBeVisible();
  },
};

export const StickyHeader: Story = {
  render: () => {
    const rows = Array.from({ length: 4 }, (_, page) =>
      invoices.map((invoice, index) => ({
        ...invoice,
        id: `INV-${String(page * invoices.length + index + 1).padStart(3, "0")}`,
      })),
    ).flat();

    return (
      <Table containerProps={{ className: "max-h-72 rounded-lg border" }}>
        <Table.Header sticky>
          <Table.Row>
            <Table.Head>Invoice</Table.Head>
            <Table.Head>Customer</Table.Head>
            <Table.Head>Status</Table.Head>
            <Table.Head className="text-right">Amount</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <InvoiceRows rows={rows} />
        </Table.Body>
      </Table>
    );
  },
};

export const Paginated: Story = {
  render: () => {
    // Not a multiple of the five sample invoices, so pages don't repeat.
    const pageSize = 8;
    const rows = Array.from({ length: 95 }, (_, index) => ({
      ...invoices[index % invoices.length],
      id: `INV-${String(index + 1).padStart(3, "0")}`,
    }));
    const pageCount = Math.ceil(rows.length / pageSize);
    const [page, setPage] = React.useState(1);
    const start = (page - 1) * pageSize;
    const end = Math.min(start + pageSize, rows.length);

    return (
      <div className="flex flex-col gap-3">
        <Table>
          <InvoiceHeader />
          <Table.Body>
            <InvoiceRows rows={rows.slice(start, end)} />
          </Table.Body>
        </Table>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="body-sm text-muted-fg">
            Showing {start + 1}–{end} of {rows.length}
          </p>
          <Pagination
            size="sm"
            page={page}
            pageCount={pageCount}
            onPageChange={setPage}
          />
        </div>
      </div>
    );
  },
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText("Showing 1–8 of 95")).toBeVisible();

    await userEvent.click(canvas.getByRole("button", { name: "Page 12" }));
    await expect(canvas.getByText("Showing 89–95 of 95")).toBeVisible();
    // Header row plus the seven invoices on the last page.
    await expect(canvas.getAllByRole("row")).toHaveLength(8);
    await expect(canvas.getAllByRole("row")[1]).toHaveTextContent("INV-089");
  },
};

export const HorizontalScroll: Story = {
  render: () => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return (
      <Table containerProps={{ className: "max-w-xl rounded-lg border" }}>
        <Table.Header sticky>
          <Table.Row>
            <Table.Head sticky="start">Customer</Table.Head>
            {months.map((month) => (
              <Table.Head key={month} className="text-right">
                {month}
              </Table.Head>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {invoices.map((invoice, row) => (
            <Table.Row key={invoice.id} selected={row === 1}>
              <Table.Cell sticky="start" className="font-medium">
                {invoice.customer}
              </Table.Cell>
              {months.map((month, column) => (
                <Table.Cell key={month} className="text-right tabular-nums">
                  {currency.format(invoice.amount * ((column % 4) + 1))}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  },
  play: async ({ canvas }) => {
    const firstColumn = canvas.getByRole("cell", { name: "Acme Corp" });
    await expect(firstColumn).toHaveAttribute("data-sticky", "start");
    await expect(getComputedStyle(firstColumn).position).toBe("sticky");

    const container = canvas.getByRole("table").parentElement!;
    await expect(container.scrollWidth).toBeGreaterThan(container.clientWidth);
  },
};

export const Empty: Story = {
  render: () => (
    <Table>
      <InvoiceHeader />
      <Table.Body>
        <Table.Empty colSpan={4}>No invoices yet.</Table.Empty>
      </Table.Body>
    </Table>
  ),
  play: async ({ canvas }) => {
    const cell = canvas.getByRole("cell", { name: "No invoices yet." });
    await expect(cell).toHaveAttribute("colspan", "4");
  },
};

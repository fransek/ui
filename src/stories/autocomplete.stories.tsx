import type { Meta, StoryObj } from "@storybook/react-vite";

import { Search } from "lucide-react";
import React from "react";
import { Autocomplete, AutocompleteProps } from "../components/autocomplete";
import { Spinner } from "../components/spinner";

const meta = {
  title: "Components/Fields/Autocomplete",
  component: Autocomplete,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    errorMessage: { control: "text" },
    isValidatingMessage: { control: "text" },
    description: { control: "text" },
    infoPopover: { control: "text" },
    emptyMessage: { control: "text" },
    invalid: { control: "boolean" },
    clearable: { control: "boolean" },
  },
  args: {
    label: "Fruit",
    description: "Start typing to search for a fruit.",
    placeholder: "Search fruits",
    isValidating: false,
    isValidatingMessage: "Validating...",
    infoPopover:
      "Fruits are a great source of vitamins and minerals. Choose wisely!",
    items: [
      { label: "🍎 Apple", value: "apple" },
      { label: "🍌 Banana", value: "banana" },
      { label: "🍒 Cherry", value: "cherry" },
      { label: "🍇 Grape", value: "grape" },
      { label: "🥭 Mango", value: "mango" },
      { label: "🍊 Orange", value: "orange" },
      { label: "🍓 Strawberry", value: "strawberry" },
    ],
  },
} satisfies Meta<typeof Autocomplete>;

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

/**
 * Items can also be plain strings — the string itself is matched against the
 * query and submitted as the value.
 */
export const StringItems: Story = {
  args: {
    label: "Language",
    description: "Start typing to search for a language.",
    placeholder: "Search languages",
    infoPopover: undefined,
    items: ["Go", "JavaScript", "Python", "Rust", "TypeScript", "Zig"],
  },
};

/**
 * Pass an array of groups (each with a `label` heading and its own `items`) to
 * render grouped results. Filtering applies within each group, and empty groups
 * are hidden automatically.
 */
export const Grouped: Story = {
  args: {
    label: "Produce",
    description: "Start typing to search for a produce.",
    placeholder: "Search produce",
    infoPopover: "Produce includes fruits and vegetables. Choose wisely!",
    items: [
      {
        label: "Fruits",
        items: [
          { label: "🍎 Apple", value: "apple" },
          { label: "🍌 Banana", value: "banana" },
          { label: "🍊 Orange", value: "orange" },
        ],
      },
      {
        label: "Vegetables",
        items: [
          { label: "🥕 Carrot", value: "carrot" },
          { label: "🥦 Broccoli", value: "broccoli" },
          { label: "🥬 Spinach", value: "spinach" },
        ],
      },
    ],
  },
};

/**
 * Pass a `Record` that maps each value to its label as a shorthand for a flat
 * list of items.
 */
export const RecordItems: Story = {
  args: {
    items: {
      apple: "🍎 Apple",
      banana: "🍌 Banana",
      orange: "🍊 Orange",
    },
  },
};

export const WithLeftAdornment: Story = {
  args: {
    label: "Search",
    description: undefined,
    infoPopover: undefined,
    leftAdornment: <Search className="size-5" />,
  },
};

/**
 * `emptyMessage` is rendered when nothing matches the query, and announced
 * politely to screen readers.
 */
export const CustomEmptyMessage: Story = {
  args: {
    emptyMessage: "No fruit by that name. Try something juicier.",
  },
};

/**
 * Set `openOnInputClick` to reveal the full list as soon as the input is
 * clicked, rather than waiting for the user to type.
 */
export const OpenOnInputClick: Story = {
  args: {
    openOnInputClick: true,
  },
};

const ALL_USERS = [
  { label: "Ada Lovelace", value: "ada" },
  { label: "Alan Turing", value: "alan" },
  { label: "Grace Hopper", value: "grace" },
  { label: "Katherine Johnson", value: "katherine" },
];

function AsyncAutocomplete(args: AutocompleteProps) {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<typeof ALL_USERS>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!query) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const id = setTimeout(() => {
      setResults(
        ALL_USERS.filter((user) =>
          user.label.toLowerCase().includes(query.toLowerCase()),
        ),
      );
      setLoading(false);
    }, 500);
    return () => clearTimeout(id);
  }, [query]);

  return (
    <Autocomplete
      {...args}
      // Filtering happens on the server, so keep every returned item.
      filter={null}
      items={results}
      value={query}
      onValueChange={setQuery}
      emptyMessage={loading ? null : "No users found."}
      status={
        loading ? (
          <span className="flex items-center gap-2">
            <Spinner size="sm" variant="muted" />
            Searching...
          </span>
        ) : null
      }
    />
  );
}

/**
 * Drive the list from a remote source by disabling the built-in filter
 * (`filter={null}`) and feeding fetched items in through `items`. Use `status`
 * to announce loading progress to screen readers.
 */
export const Async: Story = {
  args: {
    label: "User",
    description: "Start typing to search for a user.",
    placeholder: "Search users",
    infoPopover: undefined,
    items: [],
  },
  render: (args) => <AsyncAutocomplete {...args} />,
};

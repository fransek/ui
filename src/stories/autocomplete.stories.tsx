import type { Meta, StoryObj } from "@storybook/react-vite";

import { Autocomplete } from "../components/autocomplete";

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
    invalid: { control: "boolean" },
    emptyMessage: { control: "text" },
    placeholder: { control: "text" },
  },
  args: {
    label: "Country",
    description: "Search and select your country.",
    placeholder: "Type to search countries",
    openOnInputClick: true,
    isValidating: false,
    isValidatingMessage: "Searching...",
    infoPopover:
      "Start typing to filter options. Use arrow keys to navigate and Enter to select.",
    items: [
      { label: "Argentina", value: "ar" },
      { label: "Brazil", value: "br" },
      { label: "Canada", value: "ca" },
      { label: "France", value: "fr" },
      { label: "Germany", value: "de" },
      { label: "Japan", value: "jp" },
      { label: "Sweden", value: "se" },
      { label: "United States", value: "us" },
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
    errorMessage: "Please select a country.",
  },
};

export const Validating: Story = {
  args: {
    isValidating: true,
  },
};

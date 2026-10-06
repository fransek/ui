import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview, ReactRenderer } from "@storybook/react-vite";
import React from "react";
import "../src/stories/assets/storybook.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      options: {
        dark: { name: "Dark", value: "#0a0a0a" },
        light: { name: "Light", value: "#F7F9F2" },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
  decorators: [
    withThemeByClassName<ReactRenderer>({
      themes: {
        light: "",
        dark: "dark",
      },
      defaultTheme: "dark",
    }),
    // Centered stories shrink to their content; `width` gives the story a
    // fixed width instead (capped to the viewport) for content that fills it.
    (Story, { parameters }) =>
      parameters.width ? (
        <div
          style={{ width: `min(${parameters.width}px, calc(100vw - 2rem))` }}
        >
          <Story />
        </div>
      ) : (
        <Story />
      ),
  ],
};

export default preview;

import type { Preview } from "@storybook/react";
import "../src/style/globals.css";
import "../src/style/reset.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "dark",
      values: [
        {
          name: "dark",
          value: "#000000",
        },
      ],
    },
    docs: {
      theme: {
        base: "dark",
        appBg: "#000000",
        appContentBg: "#333333",
        appBorderColor: "lime",
        textColor: "#FFFFFF",
        barTextColor: "#FFFFFF",
        barSelectedColor: "lime",
        barBg: "#333333",
        colorSecondary: "#A3E635",
      },
    },
  },
};

export default preview;

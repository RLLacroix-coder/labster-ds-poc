import type { Preview } from "@storybook/react";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "Smoke (neutral.smoke)",
      values: [
        { name: "White (neutral.white)", value: "#FFFFFF" },
        { name: "Smoke (neutral.smoke)", value: "#F5F6F8" },
        { name: "Dark (neutral.grey-6)", value: "#0E2946" },
      ],
    },
    docs: {
      toc: true,
    },
  },
  tags: ["autodocs"],
};

export default preview;

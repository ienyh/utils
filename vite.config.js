import path from "path";
import { defineConfig } from "vite";

/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "index.ts"),
      name: "utils",
    },
  },
});

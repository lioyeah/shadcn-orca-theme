import externalGlobals from "rollup-plugin-external-globals";
import { defineConfig } from "vite";

export default defineConfig({
  // Theme CSS is built by scripts/build-theme-css.cjs into dist/ — do not copy stale public/shadcn.css.
  publicDir: false,
  build: {
    minify: false,
    lib: {
      entry: "src/main.ts",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["valtio"],
    },
  },
  plugins: [externalGlobals({ valtio: "Valtio" })],
});

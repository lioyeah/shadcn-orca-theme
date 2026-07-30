import { defineConfig } from "vite";

export default defineConfig({
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
});

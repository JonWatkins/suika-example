import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    base: "/suika-example",
    build: {
      outDir: "./dist",
    },
    esbuild: {
      jsxFactory: "h",
      jsxFragment: "Fragment",
    },
  };
});

import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    base: "/suika-example",
    build: {
      outDir: "./docs",
    },
    esbuild: {
      jsxFactory: "h",
      jsxFragment: "Fragment",
    },
  };
});

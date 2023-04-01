import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    build: {
      outDir: "./docs",
    },
    esbuild: {
      jsxFactory: "h",
      jsxFragment: "Fragment",
      jsxInject: `import { h, Fragment } from 'suika'`,
    },
  };
});

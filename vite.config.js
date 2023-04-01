import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    esbuild: {
      jsxFactory: "h",
      jsxFragment: "Fragment",
      jsxInject: `import { h, Fragment } from 'suika'`,
    },
  };
});

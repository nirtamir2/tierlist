import { defineConfig } from "@solidjs/start/config";
import { codeInspectorPlugin } from "code-inspector-plugin";
import solidSvg from "vite-plugin-solid-svg";

export default defineConfig({
  ssr: true,
  vite: {
    plugins: [
      codeInspectorPlugin({
        bundler: "vite",
      }),
      solidSvg(),
    ],
  },
  server: {
    preset: "vercel",
  },
});

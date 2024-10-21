import { defineConfig } from "@solidjs/start/config";
import { codeInspectorPlugin } from "code-inspector-plugin";
import solidSvg from "vite-plugin-solid-svg";

export default defineConfig({
  ssr: true,
  vite: {
    ssr: { external: ["drizzle-orm"] },
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

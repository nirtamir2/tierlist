import { defineConfig } from "@solidjs/start/config";
import solidSvg from "vite-plugin-solid-svg";

export default defineConfig({
  ssr: true,
  vite: {
    plugins: [solidSvg()],
  },
  server: {
    preset: "vercel",
  },
});

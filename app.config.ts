import { prpcVite } from "@solid-mediakit/prpc-plugin";
import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  ssr: true,
  vite: {
    plugins: [prpcVite()],
  },
  server: {
    preset: "vercel",
  },
});

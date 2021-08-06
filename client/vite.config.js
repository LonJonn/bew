import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    proxy: {
      "/ws": {
        target: "http://localhost:3000/ws",
        ws: true,
      },
    },
  },
  build: {
    outDir: "../public",
  },
});

import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const manifestForPlugin = {
  registerType: "prompt",
  includeAssets: ["favicon.ico", "apple-touc-icon.png", "masked-icon.png"],
  manifest: {
    name: "Octadock",
    short_name: "Octadock",
    description: "An app that builds your application and docs it to github.",
    icons: [
      {
        src: "./public/logo-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "./public/logo-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "favicon",
      },
    ],
    theme_color: "#181818",
    background_color: "#e8eac2",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
};

export default defineConfig({
  plugins: [react(), tailwindcss(), VitePWA(manifestForPlugin as any)],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
});

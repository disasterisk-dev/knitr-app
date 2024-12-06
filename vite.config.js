import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["knitr.svg", "knitr-180.png"],
      manifest: {
        name: "Knitr",
        short_name: "Knitr",
        description: "A knitting project management app",
        theme_color: "#D46B80",
        icons: [
          {
            src: "knitr-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "knitr-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});

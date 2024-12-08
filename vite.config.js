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
        icon: [
          {
            purpose: "maskable",
            sizes: "1861.8181818181818x1861.8181818181818",
            src: "maskable_icon.png",
            type: "image/png",
          },
          {
            purpose: "maskable",
            sizes: "48x48",
            src: "maskable_icon_x48.png",
            type: "image/png",
          },
          {
            purpose: "maskable",
            sizes: "72x72",
            src: "maskable_icon_x72.png",
            type: "image/png",
          },
          {
            purpose: "maskable",
            sizes: "96x96",
            src: "maskable_icon_x96.png",
            type: "image/png",
          },
          {
            purpose: "maskable",
            sizes: "128x128",
            src: "maskable_icon_x128.png",
            type: "image/png",
          },
          {
            purpose: "maskable",
            sizes: "192x192",
            src: "maskable_icon_x192.png",
            type: "image/png",
          },
          {
            purpose: "maskable",
            sizes: "384x384",
            src: "maskable_icon_x384.png",
            type: "image/png",
          },
          {
            purpose: "maskable",
            sizes: "512x512",
            src: "maskable_icon_x512.png",
            type: "image/png",
          },
          {
            purpose: "apple touch icon",
            src: "maskable_icon_x180.png",
            sizes: "180x180",
            type: "image/png",
          },
        ],
        theme_color: "#D46B80",
        background_color: "#FDFDFD",
        display: "standalone",
        scope: "/",
        start_url: "/",
        orientation: "portrait",
      },
    }),
  ],
});

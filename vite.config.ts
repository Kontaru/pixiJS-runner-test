import { defineConfig } from "vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { qrcode } from 'vite-plugin-qrcode';

export default defineConfig({
  plugins: [basicSsl(), qrcode()],
  optimizeDeps: {
    exclude: ["@zappar/mediarecorder"]
  },
  server: {
    host: true,
  },
});

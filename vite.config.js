import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    port: 3000,
    open: true,
    proxy: {
      // Proxy Firebase emulator requests
      "/google.firestore.v1.Firestore": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
      "/identitytoolkit.googleapis.com": {
        target: "http://localhost:9099",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  // Ensure proper handling of environment variables
  define: {
    "process.env": process.env,
  },
});

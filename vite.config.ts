// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
// import path from "path";

// // https://vitejs.dev/config/
// export default defineConfig(({ mode }) => ({
//   server: {
//     host: "::",
//     port: 8080,
//   },

// }));

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()], // ← REQUIRED for React + JSX

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // ← This makes "@/..." work
    },
  },

  server: {
    host: "::",
    port: 8080,
  },
}));

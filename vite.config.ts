/// <reference types="vitest" />
import path from "path";
import { defineConfig } from "vite";
import tailwindcss from 'tailwindcss';

module.exports = defineConfig({
  base: "./",
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'), // Point to your app's entry point HTML
    }
  },
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
  test: {
  
  }
});

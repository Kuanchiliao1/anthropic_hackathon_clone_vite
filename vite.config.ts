/// <reference types="vitest" />
import path from "path";
import { defineConfig } from "vite";
import tailwindcss from 'tailwindcss';

module.exports = defineConfig({
  base: "./",
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'index.html'),
        mainquests: path.resolve(__dirname, 'mainquests.html'),
      }, // Point to your app's entry point HTML
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

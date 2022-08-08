import { defineConfig } from 'vite'
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [eslintPlugin()],
  // prevent vite from obscuring rust errors
  clearScreen: false,
  // Tauri expects a fixed port, fail if that port is not available
  server: {
    port: 3000,
    strictPort: true,
  },
  esbuild: {
     jsx: "transform",
     jsxFactory: "m",
     jsxFragment: "'['",
   },
  // to make use of `TAURI_PLATFORM`, `TAURI_ARCH`, `TAURI_FAMILY`,
  // `TAURI_PLATFORM_VERSION`, `TAURI_PLATFORM_TYPE` and `TAURI_DEBUG`
  // env variables
  envPrefix: ['VITE_', 'TAURI_'],
  build: {
    rollupOptions:{
      input:['index.html']
    },
    // Tauri supports es2021
    target: ['es2021', 'chrome97', 'safari13'],
    // don't minify for debug builds
    minify: process.env.TAURI_DEBUG ? false :'esbuild',
    // produce sourcemaps for debug builds
    sourcemap: !!process.env.TAURI_DEBUG,
  },
  test: {
    // include: ['./src-mithril/*/__tests__/*.spec.js'],
    globals: true,
    environment: 'jsdom',
    root:"src-mithril",
    setupFiles: ['__tests__/setup.ts'],
    transformMode: {
      web: [/.[tj]sx$/],
    }
  }
})

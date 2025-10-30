import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// Vite configuration file. This config enables Vue support and sets up
// sensible defaults for development and production builds. The base
// property can be customised if you intend to deploy under a sub-path.
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});
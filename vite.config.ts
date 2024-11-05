import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  server: {
    port: 3000,
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
  },
});

import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    dedupe: ['@tldraw/store'], // Ensures only one version is bundled
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://legendary-space-goldfish-wrx44wj57r9c54rp-8000.app.github.dev',
        changeOrigin: true,
        secure: true
      }
    }
  }
});

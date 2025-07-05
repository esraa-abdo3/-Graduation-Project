import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/chat-api': {
        target: 'https://child-amd9ewetewc6aygz.polandcentral-01.azurewebsites.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/chat-api/, ''),
      },
    },
  },
  optimizeDeps: {
    include: ['@emoji-mart/react'], 
  },
});




import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Generate sourcemaps for better debugging
    sourcemap: true,
    // Optimize chunks
    chunkSizeWarningLimit: 1000,
  },
  server: {
    // Configure CORS for development
    cors: true,
    // Configure proxy for API requests in development
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      }
    }
  },
})

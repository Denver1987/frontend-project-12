import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5104,
    proxy: {
      // Проксируем запросы к API
      '/api': {
        target: 'http://localhost:5101',
      },
      // Проксируем WebSocket соединения
      '/socket.io': {
        target: 'ws://localhost:5101',
        ws: true,
        rewriteWsOrigin: true,
      },
    },
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        //target: 'http://localhost:5000',
        target: 'https://e23ac840-5b8c-4294-b469-5db839b31678-dev.e1-us-east-azure.choreoapis.dev/sinhalakaroke/sinhala-karaoke-app-ug/v1.0',
        changeOrigin: true
      }
    }
  }
})

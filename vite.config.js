import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.MOV', '**/*.mov', '**/*.mp4', '**/*.webm'],
  server: {
    port: 3000,
    open: false
  }
})

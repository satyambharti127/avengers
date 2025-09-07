import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build:{
outDir:'../backend/static'
  },
   server: {
    proxy: {
      '/getinitialobject': {
        target: 'http://localhost:8000', // Your backend API server
        changeOrigin: true,
      },
       '/create': {
        target: 'http://localhost:8000', // Your backend API server
        changeOrigin: true,
      },
      '/tuneObject': {
        target: 'http://localhost:8000', // Your backend API server
        changeOrigin: true,
      },
       '/items': {
        target: 'http://localhost:8000', // Your backend API server
        changeOrigin: true,
      },
    },
}})



/* 
  },*/


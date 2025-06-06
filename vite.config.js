import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    open: true,
    host:true,
  },
  build: {
    sourcemap: true,
  },
  plugins: [react(),],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData:` 
            @import "/src/const/const.scss";
        `

      },
    },
  },
})

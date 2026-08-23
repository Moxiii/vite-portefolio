import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,

    allowedHosts: true,

    watch: {
      usePolling: true,
      interval: 100,
    },
  },
  build: {
    sourcemap: true,
  },
  resolve: {
    alias: [
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src/components'),
      },
      { find: '@const', replacement: path.resolve(__dirname, 'src/const') },
      { find: '@src', replacement: path.resolve(__dirname, 'src') },
      { find: '@screen', replacement: path.resolve(__dirname, 'src/Screens') },
      { find: '@hook', replacement: path.resolve(__dirname, 'src/Hook') },
    ],
  },
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: ` 
            @import "/src/const/const.scss";
        `,
      },
    },
  },
})

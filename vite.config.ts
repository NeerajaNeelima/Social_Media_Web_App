import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Specify the output directory
    target: 'esnext', // Specify the target for the build (e.g., esnext, es2015)
    minify: 'terser', // Minify the output using Terser
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
})

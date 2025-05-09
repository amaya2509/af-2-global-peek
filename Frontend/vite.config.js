import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import glsl from 'vite-plugin-glsl'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    glsl()
  ],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './src/__tests__/setup.js',
  }
});

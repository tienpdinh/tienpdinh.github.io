import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import content from './plugins/content'

export default defineConfig({
  plugins: [react(), content()],
  build: {
    outDir: 'dist',
  },
  ssgOptions: {
    // `/about` -> `/about/index.html`, matching the trailing-slash URLs the
    // site has always served.
    dirStyle: 'nested',
    script: 'async',
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import content from './plugins/content'

// Windows drives mounted into WSL don't deliver inotify events, so the file
// watcher silently never fires and HMR looks broken. Poll when we're on one.
const onWindowsMount = process.cwd().startsWith('/mnt/')

export default defineConfig({
  plugins: [react(), content()],
  build: {
    outDir: 'dist',
  },
  server: {
    watch: onWindowsMount ? { usePolling: true, interval: 300 } : undefined,
  },
  ssgOptions: {
    // `/about` -> `/about/index.html`, matching the trailing-slash URLs the
    // site has always served.
    dirStyle: 'nested',
    script: 'async',
  },
})

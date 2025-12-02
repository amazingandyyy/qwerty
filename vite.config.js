import { defineConfig } from 'vite'

export default defineConfig(({ command }) => ({
  // Set base path for GitHub Pages deployment
  // For repo: github.com/amazingandyyy/qwerty
  base: command === 'build' ? '/qwerty/' : '/',

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split node_modules into vendor chunk
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        }
      }
    }
  }
}))

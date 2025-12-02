import { defineConfig } from 'vite'

export default defineConfig({
  // Set base path for GitHub Pages deployment
  // For repo: github.com/amazingandyyy/qwerty
  base: process.env.NODE_ENV === 'production' ? '/qwerty/' : '/',

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
})

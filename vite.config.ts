import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url';

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // Optimize chunks
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['framer-motion', 'lucide-react', 'class-variance-authority', 'clsx', 'tailwind-merge'],
          'vendor-data': ['@tanstack/react-query', 'zustand', 'zod', 'date-fns'],
          'vendor-charts': ['recharts']
        }
      }
    },
    // Target modern browsers for smaller bundles
    target: 'es2020',
    // Increase chunk size warning limit temporarily while we optimize
    chunkSizeWarningLimit: 1000,
    // Enable source maps for better debugging
    sourcemap: mode === 'development',
    // Minification settings
    minify: 'esbuild',
    cssMinify: true
  },
  // Development optimizations
  server: {
    host: true, // Allow external connections
    port: 5173,
    hmr: {
      overlay: false
    }
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      'zustand',
      'framer-motion',
      'lucide-react'
    ],
    exclude: ['recharts'] // Lazy load heavy charts
  },
  // Add esbuild configuration to ignore TypeScript errors in development
  esbuild: mode === 'development' ? {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  } : undefined
}))
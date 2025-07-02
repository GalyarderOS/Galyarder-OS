import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { fileURLToPath, URL } from 'url';
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        '/src/assets/logo.png', 
        'apple-touch-icon.png', 
        'masked-icon.svg',
        'favicon.ico',
        'apple-touch-icon-180x180.png',
        'pwa-192x192.png',
        'pwa-512x512.png'
      ],
      manifest: {
        name: 'GalyarderOS - Personal Civilization System',
        short_name: 'GalyarderOS',
        description: 'AI-Powered Personal Civilization System - Master productivity, finance, health, relationships, and legacy.',
        theme_color: '#8b5cf6',
        background_color: '#0f172a',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: '/',
        start_url: '/',
        id: 'galyarderos-pwa',
        categories: ['productivity', 'lifestyle', 'utilities', 'business', 'health'],
        lang: 'en',
        dir: 'ltr',
        display_override: ['window-controls-overlay', 'standalone', 'minimal-ui'],
        edge_side_panel: {
          preferred_width: 400
        },
        icons: [
          {
            src: '/pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/apple-touch-icon-180x180.png',
            sizes: '180x180',
            type: 'image/png',
            purpose: 'any'
          }
        ],
        screenshots: [
          {
            src: '/screenshot-mobile-1.png',
            sizes: '390x844',
            type: 'image/png',
            form_factor: 'narrow',
            label: 'GalyarderOS Dashboard'
          },
          {
            src: '/screenshot-mobile-2.png',
            sizes: '390x844',
            type: 'image/png',
            form_factor: 'narrow',
            label: 'Consciousness Overview'
          },
          {
            src: '/screenshot-desktop-1.png',
            sizes: '1920x1080',
            type: 'image/png',
            form_factor: 'wide',
            label: 'Desktop Experience'
          }
        ],
        shortcuts: [
          {
            name: 'Dashboard',
            short_name: 'Dashboard',
            description: 'Open main dashboard',
            url: '/app/dashboard',
            icons: [{ src: '/shortcut-dashboard.png', sizes: '96x96' }]
          },
          {
            name: 'AI Assistant',
            short_name: 'AI',
            description: 'Open AI Assistant',
            url: '/app/ai-assistant',
            icons: [{ src: '/shortcut-ai.png', sizes: '96x96' }]
          },
          {
            name: 'Consciousness',
            short_name: 'Consciousness',
            description: 'View consciousness analytics',
            url: '/app/consciousness',
            icons: [{ src: '/shortcut-consciousness.png', sizes: '96x96' }]
          },
          {
            name: 'Quick Add',
            short_name: 'Add',
            description: 'Quick add task or note',
            url: '/app/quick-add',
            icons: [{ src: '/shortcut-add.png', sizes: '96x96' }]
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/_/, /\/[^/?]+\.[^/]+$/],
        maximumFileSizeToCacheInBytes: 5000000, // 5MB
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
          // Google Fonts
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts-stylesheets',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              }
            }
          },
          // Google Fonts webfonts
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              }
            }
          },
          // API calls
          {
            urlPattern: /^https:\/\/api\..*\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 // 1 day
              },
              networkTimeoutSeconds: 10
            }
          },
          // Images
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          },
          // Static resources
          {
            urlPattern: /\.(?:js|css|woff2)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
              }
            }
          }
        ]
      },
      // Development options
      devOptions: {
        enabled: mode === 'development',
        type: 'module',
        navigateFallback: 'index.html'
      }
    }),
    // Bundle analyzer - only in analysis mode
    ...(process.env.ANALYZE ? [visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    })] : [])
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
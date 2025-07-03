import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AnimatePresence } from 'framer-motion'
import { useAppStore } from './lib/store'
import { initMobileOptimizations } from './lib/mobile-utils'
import { Layout } from './components/layout/Layout'
import { LandingPage } from './pages/LandingPage'
import { Dashboard } from './modules/dashboard/Dashboard'
import { Productivity } from './modules/productivity/Productivity'
import { Consciousness } from './modules/consciousness/Consciousness'

// Initialize query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
})

export default function App() {
  const { user } = useAppStore()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize mobile optimizations
        initMobileOptimizations()
        
        setIsInitialized(true)
      } catch (error) {
        console.error('Failed to initialize app:', error)
        setIsInitialized(true) // Still show the app even if some features fail
      }
    }

    initializeApp()
  }, [])

  // Show loading state while initializing
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/70">Initializing GalyarderOS...</p>
        </div>
      </div>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <AnimatePresence mode="wait">
            <Routes>
              {/* Landing page for non-authenticated users */}
              <Route 
                path="/" 
                element={!user ? <LandingPage /> : <Navigate to="/app/dashboard" replace />} 
              />
              
              {/* Protected app routes */}
              <Route 
                path="/app/*" 
                element={
                  user ? (
                    <Layout>
                      <Routes>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="productivity" element={<Productivity />} />
                        <Route path="consciousness" element={<Consciousness />} />
                        <Route path="ai-assistant" element={<div className="p-6"><h1 className="text-2xl font-bold text-white">AI Assistant</h1><p className="text-white/70">Advanced AI features coming soon...</p></div>} />
                        <Route path="analytics" element={<div className="p-6"><h1 className="text-2xl font-bold text-white">Analytics</h1><p className="text-white/70">Data insights coming soon...</p></div>} />
                        <Route path="settings" element={<div className="p-6"><h1 className="text-2xl font-bold text-white">Settings</h1><p className="text-white/70">Configuration options coming soon...</p></div>} />
                        <Route path="*" element={<Navigate to="/app/dashboard" replace />} />
                      </Routes>
                    </Layout>
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />
              
              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </div>
      </Router>
    </QueryClientProvider>
  )
}
import { useEffect, Suspense } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { AuthLayout } from './components/AuthLayout'
import { LandingPage } from './pages/LandingPage'
import { RegisterPage } from './pages/RegisterPage'
import { LoginPage } from './pages/LoginPage'
import { AnimationDemo } from './pages/AnimationDemo'
import { Settings } from './pages/Settings'
import { useAppStore } from './lib/store'
import { useKeyboardShortcuts } from './lib/hooks/useKeyboardShortcuts'
import { initializeTheme } from './lib/theme'
import { lazy } from 'react'

// Lazy load all modules for code splitting
const Dashboard = lazy(() => import('./modules/dashboard/pages/Dashboard').then(m => ({ default: m.Dashboard })))
const WelcomeScreen = lazy(() => import('./modules/dashboard/pages/WelcomeScreen').then(m => ({ default: m.WelcomeScreen })))
const AIAssistant = lazy(() => import('./modules/aiassistant/pages/AIAssistant').then(m => ({ default: m.AIAssistant })))
const ChronoCopilot = lazy(() => import('./modules/chronocopilot/pages/ChronoCopilot').then(m => ({ default: m.ChronoCopilot })))
const FinanceHub = lazy(() => import('./modules/financehub/pages/FinanceHub').then(m => ({ default: m.FinanceHub })))
const HealthForge = lazy(() => import('./modules/healthforge/pages/HealthForge').then(m => ({ default: m.HealthForge })))
const ProductivityMatrix = lazy(() => import('./modules/productivitymatrix/pages/ProductivityMatrix').then(m => ({ default: m.ProductivityMatrix })))
const CareerCommand = lazy(() => import('./modules/careercommand/pages/CareerCommand').then(m => ({ default: m.CareerCommand })))
const MindGuard = lazy(() => import('./modules/mindguard/pages/MindGuard').then(m => ({ default: m.MindGuard })))
const SystemLogs = lazy(() => import('./modules/systemlogs/pages/SystemLogs').then(m => ({ default: m.SystemLogs })))
const RelationshipsForge = lazy(() => import('./modules/relationshipsforge/pages/RelationshipsForge').then(m => ({ default: m.RelationshipsForge })))
const LegacyBuilder = lazy(() => import('./modules/legacybuilder/pages/LegacyBuilder').then(m => ({ default: m.LegacyBuilder })))
const KnowledgeArsenal = lazy(() => import('./modules/knowledgearsenal/pages/KnowledgeArsenal').then(m => ({ default: m.KnowledgeArsenal })))
const NetworkNexus = lazy(() => import('./modules/networknexus/pages/NetworkNexus').then(m => ({ default: m.NetworkNexus })))
const CommunicationConsole = lazy(() => import('./modules/communicationconsole/pages/CommunicationConsole').then(m => ({ default: m.CommunicationConsole })))
const PrivacyVault = lazy(() => import('./modules/privacyvault/pages/PrivacyVault').then(m => ({ default: m.PrivacyVault })))
const Calendar = lazy(() => import('./modules/calendar/pages/Calendar').then(m => ({ default: m.Calendar })))
const Files = lazy(() => import('./modules/files/pages/Files').then(m => ({ default: m.Files })))
const Calculator = lazy(() => import('./modules/calculator/pages/Calculator').then(m => ({ default: m.Calculator })))
const AppDrawer = lazy(() => import('./modules/appdrawer/pages/AppDrawer').then(m => ({ default: m.AppDrawer })))

// Advanced Modules
const EnvironmentArchitect = lazy(() => import('./modules/environmentarchitect/pages/EnvironmentArchitect').then(m => ({ default: m.EnvironmentArchitect })))
const SleepArchitect = lazy(() => import('./modules/sleeparchitect/pages/SleepArchitect').then(m => ({ default: m.SleepArchitect })))
const SpiritualForge = lazy(() => import('./modules/spiritualforge/pages/SpiritualForge').then(m => ({ default: m.SpiritualForge })))
const MetaMemory = lazy(() => import('./modules/metamemory/pages/MetaMemory').then(m => ({ default: m.MetaMemory })))
const OpsCenter = lazy(() => import('./modules/opscenter/pages/OpsCenter').then(m => ({ default: m.OpsCenter })))
const FamilyMatrix = lazy(() => import('./modules/familymatrix/pages/FamilyMatrix').then(m => ({ default: m.FamilyMatrix })))
const DigitalSovereigntyVault = lazy(() => import('./modules/digitalsovereigntyvault/pages/DigitalSovereigntyVault').then(m => ({ default: m.DigitalSovereigntyVault })))
const WorldIntelligence = lazy(() => import('./modules/worldintelligence/pages/WorldIntelligence').then(m => ({ default: m.WorldIntelligence })))
const SystemKernel = lazy(() => import('./modules/systemkernel/pages/SystemKernel').then(m => ({ default: m.SystemKernel })))

// Loading component for Suspense
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-slate-900">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
      <div className="text-slate-300 text-sm">Loading module...</div>
    </div>
  </div>
)

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, hasCompletedWelcome } = useAppStore()
  
  // Initialize keyboard shortcuts and theme system
  useKeyboardShortcuts()
  
  // Initialize theme system
  useEffect(() => {
    initializeTheme()
  }, [])

  useEffect(() => {
    // If user is not logged in and trying to access protected routes
    if (!user && !['/login', '/register', '/', '/animation-demo'].includes(location.pathname)) {
      navigate('/')
      return
    }

    // If user is logged in
    if (user) {
      // If user hasn't completed welcome and not on welcome page
      if (!hasCompletedWelcome && location.pathname !== '/welcome') {
        navigate('/welcome')
        return
      }
      
      // If user has completed welcome and is on welcome page
      if (hasCompletedWelcome && location.pathname === '/welcome') {
        navigate('/app/dashboard')
        return
      }

      // If user is on landing/auth pages, redirect to app
      if (['/login', '/register', '/'].includes(location.pathname) && hasCompletedWelcome) {
        navigate('/app/dashboard')
        return
      }
    }
  }, [user, hasCompletedWelcome, location.pathname, navigate])

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={
        <AuthLayout>
          <LandingPage />
        </AuthLayout>
      } />
      <Route path="/register" element={
        <AuthLayout>
          <RegisterPage />
        </AuthLayout>
      } />
      <Route path="/login" element={
        <AuthLayout>
          <LoginPage />
        </AuthLayout>
      } />
      <Route path="/animation-demo" element={
        <AuthLayout>
          <AnimationDemo />
        </AuthLayout>
      } />

      {/* Welcome Flow */}
      <Route path="/welcome" element={
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <WelcomeScreen />
          </Suspense>
        </Layout>
      } />

      {/* Protected App Routes */}
      <Route path="/app/dashboard" element={
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <Dashboard />
          </Suspense>
        </Layout>
      } />
      <Route path="/app/ai-assistant" element={
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <AIAssistant />
          </Suspense>
        </Layout>
      } />
      <Route path="/app/chrono-copilot" element={
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <ChronoCopilot />
          </Suspense>
        </Layout>
      } />
      <Route path="/app/finance-hub" element={
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <FinanceHub />
          </Suspense>
        </Layout>
      } />
      <Route path="/app/health-forge" element={
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <HealthForge />
          </Suspense>
        </Layout>
      } />
      <Route path="/app/productivity-matrix" element={
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <ProductivityMatrix />
          </Suspense>
        </Layout>
      } />
      <Route path="/app/career-command" element={
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <CareerCommand />
          </Suspense>
        </Layout>
      } />
      <Route path="/app/mind-guard" element={
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <MindGuard />
          </Suspense>
        </Layout>
      } />
      <Route path="/app/system-logs" element={
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <SystemLogs />
          </Suspense>
        </Layout>
      } />
      <Route path="/app/relationships-forge" element={
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <RelationshipsForge />
          </Suspense>
        </Layout>
      } />
      <Route path="/app/legacy-builder" element={
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <LegacyBuilder />
          </Suspense>
        </Layout>
      } />
      
      {/* Existing New Module Routes */}
      <Route path="/app/knowledge-arsenal" element={
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <KnowledgeArsenal />
          </Suspense>
        </Layout>
      } />
      <Route path="/app/network-nexus" element={
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <NetworkNexus />
          </Suspense>
        </Layout>
      } />
      <Route path="/app/communication-console" element={
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <CommunicationConsole />
          </Suspense>
        </Layout>
      } />
      <Route path="/app/privacy-vault" element={
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <PrivacyVault />
          </Suspense>
        </Layout>
      } />
      <Route path="/app/calendar" element={
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <Calendar />
          </Suspense>
        </Layout>
      } />
      <Route path="/app/files" element={
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <Files />
          </Suspense>
        </Layout>
      } />
      <Route path="/app/calculator" element={
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <Calculator />
          </Suspense>
        </Layout>
      } />
      
      {/* App Drawer */}
      <Route path="/app/app-drawer" element={
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <AppDrawer />
          </Suspense>
        </Layout>
      } />
      
      {/* Advanced Module Routes */}
      <Route path="/app/environment-architect" element={
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <EnvironmentArchitect />
          </Suspense>
        </Layout>
      } />
      <Route path="/app/sleep-architect" element={
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <SleepArchitect />
          </Suspense>
        </Layout>
      } />
      <Route path="/app/spiritual-forge" element={
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <SpiritualForge />
          </Suspense>
        </Layout>
      } />
      <Route path="/app/meta-memory" element={
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <MetaMemory />
          </Suspense>
        </Layout>
      } />
      <Route path="/app/ops-center" element={
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <OpsCenter />
          </Suspense>
        </Layout>
      } />
      <Route path="/app/family-matrix" element={
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <FamilyMatrix />
          </Suspense>
        </Layout>
      } />
      <Route path="/app/digital-sovereignty" element={
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <DigitalSovereigntyVault />
          </Suspense>
        </Layout>
      } />
      <Route path="/app/world-intelligence" element={
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <WorldIntelligence />
          </Suspense>
        </Layout>
      } />
      
      {/* System Kernel */}
      <Route path="/app/system-kernel" element={
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <SystemKernel />
          </Suspense>
        </Layout>
      } />
      
      <Route path="/app/settings" element={
        <Layout>
          <Settings />
        </Layout>
      } />
    </Routes>
  )
}

export default App
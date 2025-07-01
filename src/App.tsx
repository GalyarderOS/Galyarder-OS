import { useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { AuthLayout } from './components/AuthLayout'
import { LandingPage } from './pages/LandingPage'
import { RegisterPage } from './pages/RegisterPage'
import { LoginPage } from './pages/LoginPage'
import { AnimationDemo } from './pages/AnimationDemo'
import { Dashboard } from './modules/dashboard/pages/Dashboard'
import { WelcomeScreen } from './modules/dashboard/pages/WelcomeScreen'
import { AIAssistant } from './modules/aiassistant/pages/AIAssistant'
import { ChronoCopilot } from './modules/chronocopilot/pages/ChronoCopilot'
import { FinanceHub } from './modules/financehub/pages/FinanceHub'
import { HealthForge } from './modules/healthforge/pages/HealthForge'
import { ProductivityMatrix } from './modules/productivitymatrix/pages/ProductivityMatrix'
import { CareerCommand } from './modules/careercommand/pages/CareerCommand'
import { MindGuard } from './modules/mindguard/pages/MindGuard'
import { SystemLogs } from './modules/systemlogs/pages/SystemLogs'
import { RelationshipsForge } from './modules/relationshipsforge/pages/RelationshipsForge'
import { LegacyBuilder } from './modules/legacybuilder/pages/LegacyBuilder'
import { KnowledgeArsenal } from './modules/knowledgearsenal/pages/KnowledgeArsenal'
import { NetworkNexus } from './modules/networknexus/pages/NetworkNexus'
import { CommunicationConsole } from './modules/communicationconsole/pages/CommunicationConsole'
import { PrivacyVault } from './modules/privacyvault/pages/PrivacyVault'
import { Calendar } from './modules/calendar/pages/Calendar'
import { Files } from './modules/files/pages/Files'
import { Calculator } from './modules/calculator/pages/Calculator'
import { Settings } from './pages/Settings'
import { AppDrawer } from './modules/appdrawer/pages/AppDrawer'

// New Advanced Modules
import { EnvironmentArchitect } from './modules/environmentarchitect/pages/EnvironmentArchitect'
import { SleepArchitect } from './modules/sleeparchitect/pages/SleepArchitect'
import { SpiritualForge } from './modules/spiritualforge/pages/SpiritualForge'
import { MetaMemory } from './modules/metamemory/pages/MetaMemory'
import { OpsCenter } from './modules/opscenter/pages/OpsCenter'
import { FamilyMatrix } from './modules/familymatrix/pages/FamilyMatrix'
import { DigitalSovereigntyVault } from './modules/digitalsovereigntyvault/pages/DigitalSovereigntyVault'
import { WorldIntelligence } from './modules/worldintelligence/pages/WorldIntelligence'
import { SystemKernel } from './modules/systemkernel/pages/SystemKernel'

import { useAppStore } from './lib/store'
import { useKeyboardShortcuts } from './lib/hooks/useKeyboardShortcuts'

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, hasCompletedWelcome } = useAppStore()
  
  // Initialize keyboard shortcuts
  useKeyboardShortcuts()

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
          <WelcomeScreen />
        </Layout>
      } />

      {/* Protected App Routes */}
      <Route path="/app/dashboard" element={
        <Layout>
          <Dashboard />
        </Layout>
      } />
      <Route path="/app/ai-assistant" element={
        <Layout>
          <AIAssistant />
        </Layout>
      } />
      <Route path="/app/chrono-copilot" element={
        <Layout>
          <ChronoCopilot />
        </Layout>
      } />
      <Route path="/app/finance-hub" element={
        <Layout>
          <FinanceHub />
        </Layout>
      } />
      <Route path="/app/health-forge" element={
        <Layout>
          <HealthForge />
        </Layout>
      } />
      <Route path="/app/productivity-matrix" element={
        <Layout>
          <ProductivityMatrix />
        </Layout>
      } />
      <Route path="/app/career-command" element={
        <Layout>
          <CareerCommand />
        </Layout>
      } />
      <Route path="/app/mind-guard" element={
        <Layout>
          <MindGuard />
        </Layout>
      } />
      <Route path="/app/system-logs" element={
        <Layout>
          <SystemLogs />
        </Layout>
      } />
      <Route path="/app/relationships-forge" element={
        <Layout>
          <RelationshipsForge />
        </Layout>
      } />
      <Route path="/app/legacy-builder" element={
        <Layout>
          <LegacyBuilder />
        </Layout>
      } />
      
      {/* Existing New Module Routes */}
      <Route path="/app/knowledge-arsenal" element={
        <Layout>
          <KnowledgeArsenal />
        </Layout>
      } />
      <Route path="/app/network-nexus" element={
        <Layout>
          <NetworkNexus />
        </Layout>
      } />
      <Route path="/app/communication-console" element={
        <Layout>
          <CommunicationConsole />
        </Layout>
      } />
      <Route path="/app/privacy-vault" element={
        <Layout>
          <PrivacyVault />
        </Layout>
      } />
      <Route path="/app/calendar" element={
        <Layout>
          <Calendar />
        </Layout>
      } />
      <Route path="/app/files" element={
        <Layout>
          <Files />
        </Layout>
      } />
      <Route path="/app/calculator" element={
        <Layout>
          <Calculator />
        </Layout>
      } />
      
      {/* App Drawer */}
      <Route path="/app/app-drawer" element={
        <Layout>
          <AppDrawer />
        </Layout>
      } />
      
      {/* Advanced Module Routes */}
      <Route path="/app/environment-architect" element={
        <Layout>
          <EnvironmentArchitect />
        </Layout>
      } />
      <Route path="/app/sleep-architect" element={
        <Layout>
          <SleepArchitect />
        </Layout>
      } />
      <Route path="/app/spiritual-forge" element={
        <Layout>
          <SpiritualForge />
        </Layout>
      } />
      <Route path="/app/meta-memory" element={
        <Layout>
          <MetaMemory />
        </Layout>
      } />
      <Route path="/app/ops-center" element={
        <Layout>
          <OpsCenter />
        </Layout>
      } />
      <Route path="/app/family-matrix" element={
        <Layout>
          <FamilyMatrix />
        </Layout>
      } />
      <Route path="/app/digital-sovereignty" element={
        <Layout>
          <DigitalSovereigntyVault />
        </Layout>
      } />
      <Route path="/app/world-intelligence" element={
        <Layout>
          <WorldIntelligence />
        </Layout>
      } />
      
      {/* System Kernel */}
      <Route path="/app/system-kernel" element={
        <Layout>
          <SystemKernel />
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
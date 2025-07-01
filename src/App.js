import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { AuthLayout } from './components/AuthLayout';
import { LandingPage } from './pages/LandingPage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { AnimationDemo } from './pages/AnimationDemo';
import { Dashboard } from './modules/dashboard/pages/Dashboard';
import { WelcomeScreen } from './modules/dashboard/pages/WelcomeScreen';
import { AIAssistant } from './modules/aiassistant/pages/AIAssistant';
import { ChronoCopilot } from './modules/chronocopilot/pages/ChronoCopilot';
import { FinanceHub } from './modules/financehub/pages/FinanceHub';
import { HealthForge } from './modules/healthforge/pages/HealthForge';
import { ProductivityMatrix } from './modules/productivitymatrix/pages/ProductivityMatrix';
import { CareerCommand } from './modules/careercommand/pages/CareerCommand';
import { MindGuard } from './modules/mindguard/pages/MindGuard';
import { SystemLogs } from './modules/systemlogs/pages/SystemLogs';
import { RelationshipsForge } from './modules/relationshipsforge/pages/RelationshipsForge';
import { LegacyBuilder } from './modules/legacybuilder/pages/LegacyBuilder';
import { KnowledgeArsenal } from './modules/knowledgearsenal/pages/KnowledgeArsenal';
import { NetworkNexus } from './modules/networknexus/pages/NetworkNexus';
import { CommunicationConsole } from './modules/communicationconsole/pages/CommunicationConsole';
import { PrivacyVault } from './modules/privacyvault/pages/PrivacyVault';
import { Calendar } from './modules/calendar/pages/Calendar';
import { Files } from './modules/files/pages/Files';
import { Calculator } from './modules/calculator/pages/Calculator';
import { Settings } from './pages/Settings';
import { AppDrawer } from './modules/appdrawer/pages/AppDrawer';
// New Advanced Modules
import { EnvironmentArchitect } from './modules/environmentarchitect/pages/EnvironmentArchitect';
import { SleepArchitect } from './modules/sleeparchitect/pages/SleepArchitect';
import { SpiritualForge } from './modules/spiritualforge/pages/SpiritualForge';
import { MetaMemory } from './modules/metamemory/pages/MetaMemory';
import { OpsCenter } from './modules/opscenter/pages/OpsCenter';
import { FamilyMatrix } from './modules/familymatrix/pages/FamilyMatrix';
import { DigitalSovereigntyVault } from './modules/digitalsovereigntyvault/pages/DigitalSovereigntyVault';
import { WorldIntelligence } from './modules/worldintelligence/pages/WorldIntelligence';
import { SystemKernel } from './modules/systemkernel/pages/SystemKernel';
import { useAppStore } from './lib/store';
import { useKeyboardShortcuts } from './lib/hooks/useKeyboardShortcuts';
function App() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, hasCompletedWelcome } = useAppStore();
    // Initialize keyboard shortcuts
    useKeyboardShortcuts();
    useEffect(() => {
        // If user is not logged in and trying to access protected routes
        if (!user && !['/login', '/register', '/', '/animation-demo'].includes(location.pathname)) {
            navigate('/');
            return;
        }
        // If user is logged in
        if (user) {
            // If user hasn't completed welcome and not on welcome page
            if (!hasCompletedWelcome && location.pathname !== '/welcome') {
                navigate('/welcome');
                return;
            }
            // If user has completed welcome and is on welcome page
            if (hasCompletedWelcome && location.pathname === '/welcome') {
                navigate('/app/dashboard');
                return;
            }
            // If user is on landing/auth pages, redirect to app
            if (['/login', '/register', '/'].includes(location.pathname) && hasCompletedWelcome) {
                navigate('/app/dashboard');
                return;
            }
        }
    }, [user, hasCompletedWelcome, location.pathname, navigate]);
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(AuthLayout, { children: _jsx(LandingPage, {}) }) }), _jsx(Route, { path: "/register", element: _jsx(AuthLayout, { children: _jsx(RegisterPage, {}) }) }), _jsx(Route, { path: "/login", element: _jsx(AuthLayout, { children: _jsx(LoginPage, {}) }) }), _jsx(Route, { path: "/animation-demo", element: _jsx(AuthLayout, { children: _jsx(AnimationDemo, {}) }) }), _jsx(Route, { path: "/welcome", element: _jsx(Layout, { children: _jsx(WelcomeScreen, {}) }) }), _jsx(Route, { path: "/app/dashboard", element: _jsx(Layout, { children: _jsx(Dashboard, {}) }) }), _jsx(Route, { path: "/app/ai-assistant", element: _jsx(Layout, { children: _jsx(AIAssistant, {}) }) }), _jsx(Route, { path: "/app/chrono-copilot", element: _jsx(Layout, { children: _jsx(ChronoCopilot, {}) }) }), _jsx(Route, { path: "/app/finance-hub", element: _jsx(Layout, { children: _jsx(FinanceHub, {}) }) }), _jsx(Route, { path: "/app/health-forge", element: _jsx(Layout, { children: _jsx(HealthForge, {}) }) }), _jsx(Route, { path: "/app/productivity-matrix", element: _jsx(Layout, { children: _jsx(ProductivityMatrix, {}) }) }), _jsx(Route, { path: "/app/career-command", element: _jsx(Layout, { children: _jsx(CareerCommand, {}) }) }), _jsx(Route, { path: "/app/mind-guard", element: _jsx(Layout, { children: _jsx(MindGuard, {}) }) }), _jsx(Route, { path: "/app/system-logs", element: _jsx(Layout, { children: _jsx(SystemLogs, {}) }) }), _jsx(Route, { path: "/app/relationships-forge", element: _jsx(Layout, { children: _jsx(RelationshipsForge, {}) }) }), _jsx(Route, { path: "/app/legacy-builder", element: _jsx(Layout, { children: _jsx(LegacyBuilder, {}) }) }), _jsx(Route, { path: "/app/knowledge-arsenal", element: _jsx(Layout, { children: _jsx(KnowledgeArsenal, {}) }) }), _jsx(Route, { path: "/app/network-nexus", element: _jsx(Layout, { children: _jsx(NetworkNexus, {}) }) }), _jsx(Route, { path: "/app/communication-console", element: _jsx(Layout, { children: _jsx(CommunicationConsole, {}) }) }), _jsx(Route, { path: "/app/privacy-vault", element: _jsx(Layout, { children: _jsx(PrivacyVault, {}) }) }), _jsx(Route, { path: "/app/calendar", element: _jsx(Layout, { children: _jsx(Calendar, {}) }) }), _jsx(Route, { path: "/app/files", element: _jsx(Layout, { children: _jsx(Files, {}) }) }), _jsx(Route, { path: "/app/calculator", element: _jsx(Layout, { children: _jsx(Calculator, {}) }) }), _jsx(Route, { path: "/app/app-drawer", element: _jsx(Layout, { children: _jsx(AppDrawer, {}) }) }), _jsx(Route, { path: "/app/environment-architect", element: _jsx(Layout, { children: _jsx(EnvironmentArchitect, {}) }) }), _jsx(Route, { path: "/app/sleep-architect", element: _jsx(Layout, { children: _jsx(SleepArchitect, {}) }) }), _jsx(Route, { path: "/app/spiritual-forge", element: _jsx(Layout, { children: _jsx(SpiritualForge, {}) }) }), _jsx(Route, { path: "/app/meta-memory", element: _jsx(Layout, { children: _jsx(MetaMemory, {}) }) }), _jsx(Route, { path: "/app/ops-center", element: _jsx(Layout, { children: _jsx(OpsCenter, {}) }) }), _jsx(Route, { path: "/app/family-matrix", element: _jsx(Layout, { children: _jsx(FamilyMatrix, {}) }) }), _jsx(Route, { path: "/app/digital-sovereignty", element: _jsx(Layout, { children: _jsx(DigitalSovereigntyVault, {}) }) }), _jsx(Route, { path: "/app/world-intelligence", element: _jsx(Layout, { children: _jsx(WorldIntelligence, {}) }) }), _jsx(Route, { path: "/app/system-kernel", element: _jsx(Layout, { children: _jsx(SystemKernel, {}) }) }), _jsx(Route, { path: "/app/settings", element: _jsx(Layout, { children: _jsx(Settings, {}) }) })] }));
}
export default App;

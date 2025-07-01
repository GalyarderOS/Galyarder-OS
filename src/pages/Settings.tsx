import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings as SettingsIcon, 
  User, 
  Shield, 
  Bell, 
  Palette, 
  Globe, 
  Database,
  Smartphone,
  Wifi,
  Battery,
  Volume2,
  Monitor,
  Moon,
  Sun,
  Check,
  ChevronRight,
  Search,
  Bot,
  Key,
  Command,
  Zap,
  Lock,
  RefreshCw,
  AlertTriangle,
  ExternalLink
} from 'lucide-react'
import { useAppStore } from '../lib/store'
import { useSettingsStore } from '../lib/stores/useSettingsStore'
import { AppearanceSettings } from '../modules/settings/components/appearance/AppearanceSettings'
import { AccountSettings } from '../modules/settings/components/account/AccountSettings'
import { NotificationSettings } from '../modules/settings/components/notifications/NotificationSettings'
import { SystemSettings } from '../modules/settings/components/system/SystemSettings'
import { IntegrationSettings } from '../modules/settings/components/integrations/IntegrationSettings'
import { CommandSettings } from '../modules/settings/components/commands/CommandSettings'
import { SecuritySettings } from '../modules/settings/components/security/SecuritySettings'

export function Settings() {
  const { user, theme, setTheme } = useAppStore()
  const [activeSection, setActiveSection] = useState('appearance')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Array<{section: string, label: string}>>([])

  const settingsSections = [
    {
      id: 'appearance',
      title: 'Appearance',
      icon: Palette,
      description: 'Customize your interface'
    },
    {
      id: 'account',
      title: 'Account',
      icon: User,
      description: 'Manage your profile and preferences'
    },
    {
      id: 'security',
      title: 'Security & Privacy',
      icon: Shield,
      description: 'Control your security settings'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      description: 'Configure alerts and updates'
    },
    {
      id: 'system',
      title: 'System',
      icon: Monitor,
      description: 'System preferences and performance'
    },
    {
      id: 'integrations',
      title: 'AI & Integrations',
      icon: Bot,
      description: 'Connect external services and AI providers'
    },
    {
      id: 'commands',
      title: 'Commands & Shortcuts',
      icon: Command,
      description: 'Customize commands and keyboard shortcuts'
    }
  ]

  // Search functionality
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const results: Array<{section: string, label: string}> = [];
    
    // Search in appearance settings
    ['Theme', 'Color scheme', 'Accent color', 'Animations', 'Sidebar', 'Display'].forEach(label => {
      if (label.toLowerCase().includes(searchQuery.toLowerCase())) {
        results.push({ section: 'appearance', label });
      }
    });
    
    // Search in account settings
    ['Profile', 'Email', 'Password', 'Avatar', 'Name', 'Preferences'].forEach(label => {
      if (label.toLowerCase().includes(searchQuery.toLowerCase())) {
        results.push({ section: 'account', label });
      }
    });
    
    // Search in security settings
    ['Two-factor', 'Authentication', 'Privacy', 'Data', 'Encryption', 'Backup'].forEach(label => {
      if (label.toLowerCase().includes(searchQuery.toLowerCase())) {
        results.push({ section: 'security', label });
      }
    });
    
    // Search in notification settings
    ['Email notifications', 'Push notifications', 'Alerts', 'Reminders', 'Updates'].forEach(label => {
      if (label.toLowerCase().includes(searchQuery.toLowerCase())) {
        results.push({ section: 'notifications', label });
      }
    });
    
    // Search in system settings
    ['Performance', 'Storage', 'Memory', 'CPU', 'Network', 'Battery'].forEach(label => {
      if (label.toLowerCase().includes(searchQuery.toLowerCase())) {
        results.push({ section: 'system', label });
      }
    });
    
    // Search in integrations settings
    ['OpenAI', 'Gemini', 'Claude', 'Notion', 'API keys', 'Connections'].forEach(label => {
      if (label.toLowerCase().includes(searchQuery.toLowerCase())) {
        results.push({ section: 'integrations', label });
      }
    });
    
    // Search in commands settings
    ['Shortcuts', 'Commands', 'Keyboard', 'Hotkeys', 'Quick actions'].forEach(label => {
      if (label.toLowerCase().includes(searchQuery.toLowerCase())) {
        results.push({ section: 'commands', label });
      }
    });
    
    setSearchResults(results);
  }, [searchQuery]);

  const renderContent = () => {
    switch (activeSection) {
      case 'appearance':
        return <AppearanceSettings />;
      case 'account':
        return <AccountSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'system':
        return <SystemSettings />;
      case 'integrations':
        return <IntegrationSettings />;
      case 'commands':
        return <CommandSettings />;
      default:
        return (
          <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6">
            <h3 className="text-lg font-medium text-white mb-4">
              {settingsSections.find(s => s.id === activeSection)?.title}
            </h3>
            <p className="text-slate-400">Settings for this section are coming soon.</p>
          </div>
        );
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-2">
            <SettingsIcon className="w-8 h-8 text-slate-400" />
            <h1 className="text-3xl font-bold text-white">Settings</h1>
          </div>
          <p className="text-slate-400">Manage your account preferences and integrations</p>
        </motion.div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search settings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="mt-2 max-w-md bg-slate-800 border border-slate-700 rounded-lg shadow-lg overflow-hidden">
              <div className="p-2">
                {searchResults.map((result, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-3 py-2 hover:bg-slate-700 rounded-md transition-colors"
                    onClick={() => {
                      setActiveSection(result.section);
                      setSearchQuery('');
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      {settingsSections.find(s => s.id === result.section)?.icon && (
                        <div className="w-4 h-4 text-slate-400">
                          {result.section === 'appearance' ? <Palette size={16} /> : 
                           result.section === 'account' ? <User size={16} /> :
                           result.section === 'security' ? <Shield size={16} /> :
                           result.section === 'notifications' ? <Bell size={16} /> :
                           result.section === 'system' ? <Monitor size={16} /> :
                           result.section === 'integrations' ? <Bot size={16} /> :
                           <Command size={16} />}
                        </div>
                      )}
                      <span className="text-white">{result.label}</span>
                    </div>
                    <p className="text-xs text-slate-400 ml-6">
                      in {settingsSections.find(s => s.id === result.section)?.title}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-4">
              <nav className="space-y-2">
                {settingsSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all ${
                      activeSection === section.id
                        ? 'bg-purple-600/20 text-purple-300 border border-purple-600/30'
                        : 'text-slate-300 hover:bg-slate-700/30 hover:text-white'
                    }`}
                  >
                    <section.icon className="w-5 h-5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{section.title}</p>
                      <p className="text-xs opacity-70">{section.description}</p>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            {renderContent()}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
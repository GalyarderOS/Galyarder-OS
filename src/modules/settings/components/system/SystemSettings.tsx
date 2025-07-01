import { useState } from 'react'
import { motion } from 'framer-motion'
import { Monitor, Wifi, Battery, Database, RefreshCw, Trash2, Download, Upload, HardDrive, Volume2, Zap } from 'lucide-react'

export function SystemSettings() {
  const [storageUsage, setStorageUsage] = useState({
    total: 5000, // MB
    used: 2100,   // MB
    breakdown: [
      { category: 'System Data', size: 850, color: 'bg-blue-500' },
      { category: 'User Files', size: 620, color: 'bg-purple-500' },
      { category: 'Cache', size: 430, color: 'bg-emerald-500' },
      { category: 'Other', size: 200, color: 'bg-amber-500' }
    ]
  })
  
  const [performanceMode, setPerformanceMode] = useState<'balanced' | 'performance' | 'battery'>('balanced')
  const [autoUpdate, setAutoUpdate] = useState(true)
  const [dataSync, setDataSync] = useState(true)
  const [offlineMode, setOfflineMode] = useState(false)
  const [clearingCache, setClearingCache] = useState(false)

  const handleClearCache = () => {
    setClearingCache(true)
    
    // Simulate cache clearing
    setTimeout(() => {
      setStorageUsage(prev => ({
        ...prev,
        used: prev.used - prev.breakdown.find(b => b.category === 'Cache')?.size || 0,
        breakdown: prev.breakdown.map(b => 
          b.category === 'Cache' ? { ...b, size: 0 } : b
        )
      }))
      setClearingCache(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {/* System Status */}
      <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6">
        <h3 className="text-lg font-medium text-white mb-4 flex items-center space-x-2">
          <Monitor className="w-5 h-5 text-emerald-400" />
          <span>System Status</span>
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-700/30 rounded-lg p-3 text-center">
            <Wifi className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-white">Connected</p>
            <p className="text-xs text-slate-400">WiFi</p>
          </div>
          
          <div className="bg-slate-700/30 rounded-lg p-3 text-center">
            <Battery className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-white">100%</p>
            <p className="text-xs text-slate-400">Battery</p>
          </div>
          
          <div className="bg-slate-700/30 rounded-lg p-3 text-center">
            <Volume2 className="w-5 h-5 text-blue-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-white">75%</p>
            <p className="text-xs text-slate-400">Volume</p>
          </div>
          
          <div className="bg-slate-700/30 rounded-lg p-3 text-center">
            <Database className="w-5 h-5 text-purple-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-white">{(storageUsage.used / 1000).toFixed(1)} GB</p>
            <p className="text-xs text-slate-400">Storage Used</p>
          </div>
        </div>
      </div>

      {/* Performance */}
      <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6">
        <h3 className="text-lg font-medium text-white mb-4">Performance</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-slate-300 mb-3">Performance Mode</h4>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setPerformanceMode('battery')}
                className={`p-3 rounded-lg text-center transition-all ${
                  performanceMode === 'battery'
                    ? 'bg-emerald-600/20 border border-emerald-600/30 text-emerald-400'
                    : 'bg-slate-700/50 hover:bg-slate-700 text-slate-300'
                }`}
              >
                <Battery className="w-5 h-5 mx-auto mb-1" />
                <span className="text-sm">Battery Saver</span>
              </button>
              
              <button
                onClick={() => setPerformanceMode('balanced')}
                className={`p-3 rounded-lg text-center transition-all ${
                  performanceMode === 'balanced'
                    ? 'bg-blue-600/20 border border-blue-600/30 text-blue-400'
                    : 'bg-slate-700/50 hover:bg-slate-700 text-slate-300'
                }`}
              >
                <RefreshCw className="w-5 h-5 mx-auto mb-1" />
                <span className="text-sm">Balanced</span>
              </button>
              
              <button
                onClick={() => setPerformanceMode('performance')}
                className={`p-3 rounded-lg text-center transition-all ${
                  performanceMode === 'performance'
                    ? 'bg-purple-600/20 border border-purple-600/30 text-purple-400'
                    : 'bg-slate-700/50 hover:bg-slate-700 text-slate-300'
                }`}
              >
                <Zap className="w-5 h-5 mx-auto mb-1" />
                <span className="text-sm">Performance</span>
              </button>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-300">CPU Usage</span>
              <span className="text-white">23%</span>
            </div>
            <div className="bg-slate-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full" style={{ width: '23%' }} />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-300">Memory Usage</span>
              <span className="text-white">45%</span>
            </div>
            <div className="bg-slate-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full" style={{ width: '45%' }} />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-300">Network Activity</span>
              <span className="text-white">12%</span>
            </div>
            <div className="bg-slate-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-500 to-purple-400 h-2 rounded-full" style={{ width: '12%' }} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Storage */}
      <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6">
        <h3 className="text-lg font-medium text-white mb-4 flex items-center space-x-2">
          <HardDrive className="w-5 h-5 text-blue-400" />
          <span>Storage</span>
        </h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-300">Storage Usage</span>
              <span className="text-white">{storageUsage.used} MB / {storageUsage.total} MB</span>
            </div>
            <div className="bg-slate-700 rounded-full h-3 overflow-hidden">
              <div className="flex h-full">
                {storageUsage.breakdown.map((item, index) => (
                  <div 
                    key={index}
                    className={`h-full ${item.color}`} 
                    style={{ width: `${(item.size / storageUsage.total) * 100}%` }}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-3">
              {storageUsage.breakdown.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="text-xs text-slate-300">{item.category}: {item.size} MB</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleClearCache}
              disabled={clearingCache || storageUsage.breakdown.find(b => b.category === 'Cache')?.size === 0}
              className="flex items-center space-x-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed rounded-lg text-white transition-colors"
            >
              {clearingCache ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Clearing...</span>
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  <span>Clear Cache</span>
                </>
              )}
            </button>
            
            <button className="flex items-center space-x-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors">
              <Download className="w-4 h-4" />
              <span>Export Data</span>
            </button>
            
            <button className="flex items-center space-x-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors">
              <Upload className="w-4 h-4" />
              <span>Import Data</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* System Preferences */}
      <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6">
        <h3 className="text-lg font-medium text-white mb-4">System Preferences</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Automatic Updates</p>
              <p className="text-xs text-slate-400">Keep GalyarderOS up to date automatically</p>
            </div>
            <button 
              onClick={() => setAutoUpdate(!autoUpdate)}
              className={`w-12 h-6 ${autoUpdate ? 'bg-blue-600' : 'bg-slate-600'} rounded-full relative transition-colors`}
            >
              <div 
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  autoUpdate ? 'right-0.5' : 'left-0.5'
                }`} 
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Data Synchronization</p>
              <p className="text-xs text-slate-400">Sync your data across devices</p>
            </div>
            <button 
              onClick={() => setDataSync(!dataSync)}
              className={`w-12 h-6 ${dataSync ? 'bg-blue-600' : 'bg-slate-600'} rounded-full relative transition-colors`}
            >
              <div 
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  dataSync ? 'right-0.5' : 'left-0.5'
                }`} 
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Offline Mode</p>
              <p className="text-xs text-slate-400">Work without internet connection</p>
            </div>
            <button 
              onClick={() => setOfflineMode(!offlineMode)}
              className={`w-12 h-6 ${offlineMode ? 'bg-blue-600' : 'bg-slate-600'} rounded-full relative transition-colors`}
            >
              <div 
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  offlineMode ? 'right-0.5' : 'left-0.5'
                }`} 
              />
            </button>
          </div>
          
          <div className="pt-2">
            <button className="flex items-center space-x-2 px-4 py-2 bg-red-600/20 text-red-400 hover:bg-red-600/30 rounded-lg transition-colors">
              <RefreshCw className="w-4 h-4" />
              <span>Reset to Factory Settings</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* System Information */}
      <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6">
        <h3 className="text-lg font-medium text-white mb-4">System Information</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-slate-400">Version</span>
            <span className="text-sm text-white">GalyarderOS 1.0.0</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-slate-400">Build</span>
            <span className="text-sm text-white">2024.06.15.1</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-slate-400">Last Updated</span>
            <span className="text-sm text-white">June 15, 2024</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-slate-400">Platform</span>
            <span className="text-sm text-white">Web (PWA)</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-slate-400">Device ID</span>
            <span className="text-sm text-white">GOS-WEB-1234567890</span>
          </div>
        </div>
      </div>
    </div>
  )
}
import { useState } from 'react'
import { motion } from 'framer-motion'
import { HardDrive, Cpu, MemoryStick, Wifi, Database, Shield, Settings, RefreshCw } from 'lucide-react'

export function SystemSettings() {
  const [systemInfo, setSystemInfo] = useState({
    cpu: {
      usage: 45,
      cores: 8,
      frequency: '2.8 GHz'
    },
    memory: {
      total: 16,
      used: 8.2,
      available: 7.8,
      breakdown: [
        { category: 'System', size: 2.1 },
        { category: 'Applications', size: 4.8 },
        { category: 'Cache', size: 1.3 }
      ]
    },
    storage: {
      total: 512,
      used: 298,
      available: 214,
      breakdown: [
        { category: 'System', size: 45 },
        { category: 'Applications', size: 128 },
        { category: 'Documents', size: 85 },
        { category: 'Cache', size: 40 }
      ]
    },
    network: {
      status: 'connected',
      speed: '1 Gbps',
      latency: '12ms'
    }
  })

  const [isOptimizing, setIsOptimizing] = useState(false)

  const optimizeSystem = async () => {
    setIsOptimizing(true)
    
    // Simulate optimization process
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Update system info with optimized values
    setSystemInfo(prev => ({
      ...prev,
             memory: {
         ...prev.memory,
         used: prev.memory.used - (prev.memory.breakdown.find((b: any) => b.category === 'Cache')?.size || 0),
         available: prev.memory.available + (prev.memory.breakdown.find((b: any) => b.category === 'Cache')?.size || 0),
         breakdown: prev.memory.breakdown.map(item => 
           item.category === 'Cache' ? { ...item, size: 0.2 } : item
         )
       },
      storage: {
        ...prev.storage,
        used: prev.storage.used - 25,
        available: prev.storage.available + 25,
        breakdown: prev.storage.breakdown.map(item => 
          item.category === 'Cache' ? { ...item, size: 15 } : item
        )
      }
    }))
    
    setIsOptimizing(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">System Settings</h2>
          <p className="text-slate-400">Monitor and optimize system performance</p>
        </div>
        <button
          onClick={optimizeSystem}
          disabled={isOptimizing}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isOptimizing ? 'animate-spin' : ''}`} />
          {isOptimizing ? 'Optimizing...' : 'Optimize System'}
        </button>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center gap-3 mb-3">
            <Cpu className="w-6 h-6 text-blue-400" />
            <h3 className="font-semibold text-white">CPU</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Usage</span>
              <span className="text-white">{systemInfo.cpu.usage}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${systemInfo.cpu.usage}%` }}
              />
            </div>
            <div className="text-xs text-slate-400">
              {systemInfo.cpu.cores} cores • {systemInfo.cpu.frequency}
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center gap-3 mb-3">
            <MemoryStick className="w-6 h-6 text-green-400" />
            <h3 className="font-semibold text-white">Memory</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Used</span>
              <span className="text-white">{systemInfo.memory.used.toFixed(1)} GB</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(systemInfo.memory.used / systemInfo.memory.total) * 100}%` }}
              />
            </div>
            <div className="text-xs text-slate-400">
              {systemInfo.memory.available.toFixed(1)} GB available
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center gap-3 mb-3">
            <HardDrive className="w-6 h-6 text-purple-400" />
            <h3 className="font-semibold text-white">Storage</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Used</span>
              <span className="text-white">{systemInfo.storage.used} GB</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(systemInfo.storage.used / systemInfo.storage.total) * 100}%` }}
              />
            </div>
            <div className="text-xs text-slate-400">
              {systemInfo.storage.available} GB available
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center gap-3 mb-3">
            <Wifi className="w-6 h-6 text-yellow-400" />
            <h3 className="font-semibold text-white">Network</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm text-white capitalize">{systemInfo.network.status}</span>
            </div>
            <div className="text-xs text-slate-400">
              {systemInfo.network.speed} • {systemInfo.network.latency}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Breakdowns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Memory Breakdown */}
        <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <MemoryStick className="w-5 h-5 text-green-400" />
            Memory Usage
          </h3>
          <div className="space-y-3">
            {systemInfo.memory.breakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-slate-300">{item.category}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(item.size / systemInfo.memory.total) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-white w-12 text-right">{item.size.toFixed(1)} GB</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Storage Breakdown */}
        <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-purple-400" />
            Storage Usage
          </h3>
          <div className="space-y-3">
            {systemInfo.storage.breakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-slate-300">{item.category}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${(item.size / systemInfo.storage.total) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-white w-12 text-right">{item.size} GB</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Actions */}
      <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-400" />
          System Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors text-left">
            <Database className="w-6 h-6 text-blue-400 mb-2" />
            <h4 className="font-medium text-white mb-1">Clear Cache</h4>
            <p className="text-sm text-slate-400">Free up system memory</p>
          </button>

          <button className="p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors text-left">
            <Shield className="w-6 h-6 text-green-400 mb-2" />
            <h4 className="font-medium text-white mb-1">Security Scan</h4>
            <p className="text-sm text-slate-400">Check for vulnerabilities</p>
          </button>

          <button className="p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors text-left">
            <RefreshCw className="w-6 h-6 text-purple-400 mb-2" />
            <h4 className="font-medium text-white mb-1">Update System</h4>
            <p className="text-sm text-slate-400">Check for updates</p>
          </button>
        </div>
      </div>
    </div>
  )
}
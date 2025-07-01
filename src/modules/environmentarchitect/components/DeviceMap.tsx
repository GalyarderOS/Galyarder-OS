import { motion } from 'framer-motion'
import { Smartphone, Wifi, Battery, AlertCircle } from 'lucide-react'
import { useEnvironmentStore } from '../store/environmentStore'

export function DeviceMap() {
  const { devices } = useEnvironmentStore()

  const getDeviceIcon = (type: string) => {
    const icons = {
      lighting: '💡',
      climate: '🌡️',
      audio: '🔊',
      display: '📺',
      security: '🔒',
      other: '⚙️'
    }
    return icons[type as keyof typeof icons] || '⚙️'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-emerald-400'
      case 'offline': return 'text-slate-400'
      case 'error': return 'text-red-400'
      default: return 'text-slate-400'
    }
  }

  const onlineDevices = devices.filter(d => d.status === 'online').length
  const offlineDevices = devices.filter(d => d.status === 'offline').length
  const errorDevices = devices.filter(d => d.status === 'error').length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <Smartphone className="w-5 h-5 text-emerald-400" />
        <h3 className="text-xl font-semibold text-white">Device Map</h3>
      </div>

      {/* Device Status Overview */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <Wifi className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-white">{onlineDevices}</p>
          <p className="text-xs text-slate-400">Online</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <Battery className="w-5 h-5 text-slate-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-white">{offlineDevices}</p>
          <p className="text-xs text-slate-400">Offline</p>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
          <AlertCircle className="w-5 h-5 text-red-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-white">{errorDevices}</p>
          <p className="text-xs text-slate-400">Errors</p>
        </div>
      </div>

      {/* Device List */}
      <div className="space-y-3">
        {devices.map((device, index) => (
          <motion.div
            key={device.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <span className="text-lg">{getDeviceIcon(device.type)}</span>
              <div>
                <p className="text-sm font-medium text-white">{device.name}</p>
                <p className="text-xs text-slate-400">{device.location} • {device.type}</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className={`text-sm font-medium ${getStatusColor(device.status)}`}>
                {device.status}
              </div>
              <p className="text-xs text-slate-400">
                {new Date(device.lastUpdated).toLocaleTimeString()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-3 bg-emerald-600/20 rounded-lg">
        <p className="text-sm text-emerald-300">
          🔗 {onlineDevices} devices connected and responding to environment changes.
        </p>
      </div>
    </motion.div>
  )
}
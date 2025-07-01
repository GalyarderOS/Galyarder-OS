import { useState } from 'react'
import { motion } from 'framer-motion'
import { Palette, Monitor, Moon, Sun, Check, Smartphone, Laptop, Tablet } from 'lucide-react'
import { useAppStore } from '../../../../lib/store'

export function AppearanceSettings() {
  const { theme, setTheme } = useAppStore()
  const [accentColor, setAccentColor] = useState('blue')
  const [animationsEnabled, setAnimationsEnabled] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [sidebarAutoHide, setSidebarAutoHide] = useState(false)
  const [fontScale, setFontScale] = useState(100)
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')

  const accentColors = [
    { name: 'Blue', value: 'blue', color: 'bg-blue-500' },
    { name: 'Purple', value: 'purple', color: 'bg-purple-500' },
    { name: 'Emerald', value: 'emerald', color: 'bg-emerald-500' },
    { name: 'Amber', value: 'amber', color: 'bg-amber-500' },
    { name: 'Pink', value: 'pink', color: 'bg-pink-500' },
    { name: 'Indigo', value: 'indigo', color: 'bg-indigo-500' },
    { name: 'Red', value: 'red', color: 'bg-red-500' },
    { name: 'Cyan', value: 'cyan', color: 'bg-cyan-500' }
  ]

  return (
    <div className="space-y-6">
      {/* Theme Selection */}
      <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6">
        <h3 className="text-lg font-medium text-white mb-4 flex items-center space-x-2">
          <Palette className="w-5 h-5 text-purple-400" />
          <span>Theme</span>
        </h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-slate-300 mb-3">Color Scheme</h4>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setTheme('dark')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  theme === 'dark' 
                    ? 'border-purple-500 bg-purple-500/10' 
                    : 'border-slate-600 hover:border-slate-500'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                    <Moon className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-white">Dark</p>
                    <p className="text-xs text-slate-400">Easy on the eyes</p>
                  </div>
                  {theme === 'dark' && (
                    <Check className="w-4 h-4 text-purple-400 ml-auto" />
                  )}
                </div>
              </button>
              
              <button
                onClick={() => setTheme('light')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  theme === 'light' 
                    ? 'border-purple-500 bg-purple-500/10' 
                    : 'border-slate-600 hover:border-slate-500'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <Sun className="w-4 h-4 text-slate-900" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-white">Light</p>
                    <p className="text-xs text-slate-400">Classic bright theme</p>
                  </div>
                  {theme === 'light' && (
                    <Check className="w-4 h-4 text-purple-400 ml-auto" />
                  )}
                </div>
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-slate-300 mb-3">Accent Color</h4>
            <div className="flex flex-wrap gap-3">
              {accentColors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setAccentColor(color.value)}
                  className={`w-8 h-8 rounded-full ${color.color} ring-2 ring-offset-2 ring-offset-slate-800 ${
                    accentColor === color.value ? 'ring-white' : 'ring-transparent hover:ring-white/20'
                  } transition-all`}
                  title={color.name}
                />
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-slate-300 mb-3">Font Size</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Smaller</span>
                <span>Default</span>
                <span>Larger</span>
              </div>
              <input
                type="range"
                min="80"
                max="120"
                step="5"
                value={fontScale}
                onChange={(e) => setFontScale(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-right text-xs text-slate-400">
                {fontScale}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Display Settings */}
      <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6">
        <h3 className="text-lg font-medium text-white mb-4 flex items-center space-x-2">
          <Monitor className="w-5 h-5 text-blue-400" />
          <span>Display</span>
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Sidebar Auto-hide</p>
              <p className="text-xs text-slate-400">Hide sidebar when not in use</p>
            </div>
            <button 
              onClick={() => setSidebarAutoHide(!sidebarAutoHide)}
              className={`w-12 h-6 ${sidebarAutoHide ? 'bg-purple-600' : 'bg-slate-600'} rounded-full relative transition-colors`}
            >
              <div 
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  sidebarAutoHide ? 'right-0.5' : 'left-0.5'
                }`} 
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Animations</p>
              <p className="text-xs text-slate-400">Enable smooth transitions</p>
            </div>
            <button 
              onClick={() => setAnimationsEnabled(!animationsEnabled)}
              className={`w-12 h-6 ${animationsEnabled ? 'bg-purple-600' : 'bg-slate-600'} rounded-full relative transition-colors`}
            >
              <div 
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  animationsEnabled ? 'right-0.5' : 'left-0.5'
                }`} 
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Reduced Motion</p>
              <p className="text-xs text-slate-400">Minimize animations for accessibility</p>
            </div>
            <button 
              onClick={() => setReducedMotion(!reducedMotion)}
              className={`w-12 h-6 ${reducedMotion ? 'bg-purple-600' : 'bg-slate-600'} rounded-full relative transition-colors`}
            >
              <div 
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  reducedMotion ? 'right-0.5' : 'left-0.5'
                }`} 
              />
            </button>
          </div>
        </div>
      </div>
      
      {/* Responsive Preview */}
      <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6">
        <h3 className="text-lg font-medium text-white mb-4 flex items-center space-x-2">
          <Smartphone className="w-5 h-5 text-emerald-400" />
          <span>Responsive Preview</span>
        </h3>
        
        <div className="space-y-4">
          <div className="flex justify-center space-x-4 mb-4">
            <button
              onClick={() => setDevicePreview('desktop')}
              className={`p-3 rounded-lg flex flex-col items-center space-y-2 ${
                devicePreview === 'desktop' 
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30' 
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              <Laptop className="w-6 h-6" />
              <span className="text-xs">Desktop</span>
            </button>
            
            <button
              onClick={() => setDevicePreview('tablet')}
              className={`p-3 rounded-lg flex flex-col items-center space-y-2 ${
                devicePreview === 'tablet' 
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30' 
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              <Tablet className="w-6 h-6" />
              <span className="text-xs">Tablet</span>
            </button>
            
            <button
              onClick={() => setDevicePreview('mobile')}
              className={`p-3 rounded-lg flex flex-col items-center space-y-2 ${
                devicePreview === 'mobile' 
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30' 
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              <Smartphone className="w-6 h-6" />
              <span className="text-xs">Mobile</span>
            </button>
          </div>
          
          <div className="flex justify-center">
            <div 
              className={`bg-slate-900 border-2 border-slate-700 rounded-lg overflow-hidden transition-all ${
                devicePreview === 'desktop' ? 'w-full aspect-video max-w-2xl' :
                devicePreview === 'tablet' ? 'w-80 h-[28rem]' :
                'w-60 h-[30rem]'
              }`}
            >
              <div className="w-full h-6 bg-slate-800 flex items-center px-2">
                <div className="flex space-x-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                </div>
              </div>
              <div className="p-4 text-center flex flex-col items-center justify-center h-[calc(100%-1.5rem)]">
                <div className="w-12 h-12 bg-slate-800 rounded-full mb-2"></div>
                <div className="h-4 bg-slate-800 rounded w-32 mb-2"></div>
                <div className="h-3 bg-slate-800 rounded w-48 mb-4"></div>
                <div className="grid grid-cols-2 gap-2 w-full">
                  <div className="h-20 bg-slate-800 rounded"></div>
                  <div className="h-20 bg-slate-800 rounded"></div>
                  <div className="h-20 bg-slate-800 rounded"></div>
                  <div className="h-20 bg-slate-800 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Bot, Shield, Zap, Target, Brain, Command } from 'lucide-react'
import { useAppStore } from '../lib/store'
import logo from '../assets/logo.png'

export function LoginPage() {
  const navigate = useNavigate()
  const { setUser, hasCompletedWelcome } = useAppStore()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Mock successful login
      const user = {
        id: '1',
        name: 'Alex Chen',
        email: formData.email,
        avatar: formData.email.includes('@gmail.com') 
          ? `https://ui-avatars.com/api/?name=${encodeURIComponent('Alex Chen')}&background=4285f4&color=fff&size=150`
          : 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
      }

      setUser(user)
      
      // Redirect based on welcome completion status
      if (hasCompletedWelcome) {
        navigate('/')
      } else {
        navigate('/welcome')
      }
    } catch (error) {
      console.error('Login error:', error)
      setErrors({ general: 'Invalid email or password' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleDemoAccess = () => {
    setFormData({
      email: 'demo@galyarderos.com',
      password: 'demo123456'
    })
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24 bg-slate-950 relative overflow-hidden">
        {/* Background animation */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_50%)]"></div>
          
          {/* Animated grid */}
          <div className="absolute inset-0">
            <div className="h-full w-full bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.15]"></div>
          </div>
          
          {/* Floating orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-600/5 blur-3xl"
            animate={{ 
              x: [0, 10, 0],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-600/5 blur-3xl"
            animate={{ 
              x: [0, -10, 0],
              y: [0, 10, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        <div className="mx-auto w-full max-w-sm lg:w-96 relative z-10">
          {/* Header */}
          <div className="mb-8">
            <Link 
              to="/"
              className="inline-flex items-center space-x-2 text-slate-400 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to home</span>
            </Link>
            
            <div className="flex items-center space-x-3 mb-6">
              <img src={logo} alt="GalyarderOS Logo" className="w-10 h-10" />
              <span className="text-white font-semibold text-xl">GalyarderOS</span>
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-slate-400">
              Your insights and systems await
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Error */}
            {errors.general && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <p className="text-red-400 text-sm">{errors.general}</p>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg bg-slate-800/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.email ? 'border-red-500' : 'border-slate-600'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`block w-full pl-10 pr-10 py-3 border rounded-lg bg-slate-800/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.password ? 'border-red-500' : 'border-slate-600'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-300" />
                  ) : (
                    <Eye className="h-5 w-5 text-slate-400 hover:text-slate-300" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-600 rounded bg-slate-800"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Forgot your password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Enter My OS'
              )}
            </button>

            {/* Register Link */}
            <div className="text-center">
              <p className="text-slate-400">
                Don't have an account?{' '}
                <Link to="/register" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Create one now
                </Link>
              </p>
            </div>
          </form>

          {/* Demo Access */}
          <div className="mt-8 p-4 bg-slate-800/30 rounded-lg border border-slate-700">
            <h4 className="text-sm font-medium text-slate-300 mb-2 flex items-center space-x-2">
              <Command className="w-4 h-4 text-blue-400" />
              <span>Try Demo OS</span>
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Launch GalyarderOS instantly with a pre-configured demo account
            </p>
            <button
              onClick={handleDemoAccess}
              className="w-full py-2 px-3 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 hover:text-blue-300 border border-blue-600/20 rounded-md text-sm transition-colors"
            >
              Launch Demo OS
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800">
          <div className="absolute inset-0 bg-black/20" />
          
          {/* Animated grid pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full bg-[linear-gradient(white_1px,transparent_1px),linear-gradient(to_right,white_1px,transparent_1px)] bg-[size:32px_32px]"></div>
          </div>
          
          {/* Floating elements */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/5 rounded-lg backdrop-blur-md"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-white/5 rounded-lg backdrop-blur-md"
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -5, 0]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <div className="relative h-full flex flex-col justify-center items-center p-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Welcome Back to Your OS
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-md">
                Continue optimizing your life with AI-powered insights and intelligent automation
              </p>
              
              {/* OS Status Panel */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto mb-8 border border-white/10">
                <h3 className="text-white font-semibold mb-4 flex items-center justify-center space-x-2">
                  <Bot className="w-5 h-5 text-blue-300" />
                  <span>Life System Status</span>
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Brain className="w-4 h-4 text-purple-300" />
                      <span className="text-white text-sm">AI Insights</span>
                    </div>
                    <span className="text-green-300 text-sm">8 new insights</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-blue-300" />
                      <span className="text-white text-sm">Goals Progress</span>
                    </div>
                    <span className="text-blue-300 text-sm">75% complete</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-emerald-300" />
                      <span className="text-white text-sm">System Security</span>
                    </div>
                    <span className="text-emerald-300 text-sm">Protected</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-amber-300" />
                      <span className="text-white text-sm">Module Activity</span>
                    </div>
                    <span className="text-amber-300 text-sm">High</span>
                  </div>
                </div>
              </div>
              
              <p className="text-blue-200 text-sm">
                Your personal civilization system is ready and waiting for you
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
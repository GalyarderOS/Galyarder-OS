import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import logo from '../../assets/logo.png'

export function HeroSection() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const videoRef = useRef<HTMLIFrameElement>(null)
  
  // Handle video play
  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.src += "&autoplay=1"
      setIsVideoPlaying(true)
    }
  }

  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-slate-950 opacity-90"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
        
        {/* Animated grid */}
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-4 opacity-10">
          {Array.from({ length: 144 }).map((_, i) => (
            <motion.div
              key={i}
              className="bg-blue-500/20 rounded-full"
              initial={{ opacity: 0.1 }}
              animate={{ 
                opacity: [0.1, 0.2, 0.1],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                delay: i * 0.01 % 2
              }}
            />
          ))}
        </div>
        
        {/* Floating orbs */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20,
                delay: 0.2 
              }}
              className="relative"
            >
              <img src={logo} alt="GalyarderOS Logo" className="w-24 h-24" />
              <motion.div 
                className="absolute inset-0 rounded-full bg-blue-500/20 blur-md"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Command Your Life Like a{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              System
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            GalyarderOS is the world's first AI-powered Life Operating System.
            <br className="hidden md:block" />
            <span className="text-blue-400 font-medium">Design. Execute. Optimize.</span> Every area of life.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Link
              to="/register"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/20"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <button 
              onClick={handlePlayVideo}
              className="px-8 py-4 border border-slate-600 hover:border-slate-500 text-white rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Demo Video */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative max-w-5xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20 border border-slate-800/80"
        >
          {!isVideoPlaying ? (
            <div 
              className="absolute inset-0 flex items-center justify-center cursor-pointer bg-gradient-to-br from-slate-900/90 to-slate-800/90"
              onClick={handlePlayVideo}
            >
              <div className="w-20 h-20 rounded-full bg-blue-600/90 flex items-center justify-center">
                <Play className="w-8 h-8 text-white ml-1" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-50"></div>
            </div>
          ) : null}
          <iframe 
            ref={videoRef}
            src="https://www.youtube.com/embed/Fiy_4KpJlkM"
            title="GalyarderOS Demo"
            className="w-full aspect-video rounded-xl shadow-xl ring-1 ring-muted/20"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </motion.div>
        
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto"
        >
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
            <div className="text-3xl font-bold text-white">27+</div>
            <div className="text-slate-400 text-sm">Integrated Modules</div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
            <div className="text-3xl font-bold text-white">AI</div>
            <div className="text-slate-400 text-sm">Powered Insights</div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
            <div className="text-3xl font-bold text-white">100%</div>
            <div className="text-slate-400 text-sm">Data Sovereignty</div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
            <div className="text-3xl font-bold text-white">∞</div>
            <div className="text-slate-400 text-sm">Potential</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
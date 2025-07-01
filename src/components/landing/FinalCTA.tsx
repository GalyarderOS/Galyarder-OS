import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronRight, Shield, Check, Users, Star } from 'lucide-react'

export function FinalCTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-slate-950 opacity-90"></div>
        
        {/* Animated pulse */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Grid lines */}
        <div className="absolute inset-0">
          <div className="h-full w-full bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(to_right,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.15]"></div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Build Your{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Personal Civilization?
            </span>
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Start optimizing your life with clarity, AI, and total control. Join the revolution of data-driven life optimization.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/20"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <a
              href="#features"
              className="px-8 py-4 border border-slate-600 hover:border-slate-500 text-white rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
            >
              <span>Explore the System</span>
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
          
          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 opacity-70">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-emerald-400" />
              <span className="text-slate-300 text-sm">Secure & Private</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5 text-emerald-400" />
              <span className="text-slate-300 text-sm">14-Day Money Back</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-emerald-400" />
              <span className="text-slate-300 text-sm">10,000+ Users</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-emerald-400" />
              <span className="text-slate-300 text-sm">4.9/5 Rating</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
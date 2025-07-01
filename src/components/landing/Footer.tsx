import { Link } from 'react-router-dom'
import { ExternalLink, Shield } from 'lucide-react'
import logo from '../../assets/logo.png'

export function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-950/80 backdrop-blur border-t border-slate-800/30 text-sm text-slate-400 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Column 1: Logo and Tagline */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img src={logo} alt="GalyarderOS Logo" className="w-8 h-8" />
              <span className="text-white font-semibold text-xl">GalyarderOS</span>
            </div>
            <p className="text-slate-400 mb-4">
              The world's first AI-powered Personal Civilization System. 
              <br />
              Master life by design, powered by data.
            </p>
            
            {/* Copyright text */}
            <p className="text-sm text-slate-500">
              © 2025 GalyarderOS. All rights reserved.
            </p>
            
            {/* Small badge */}
            <div className="mt-4 inline-flex items-center space-x-2 px-3 py-1 bg-slate-800 rounded-full">
              <Shield className="w-3 h-3 text-slate-400" />
              <span className="text-xs text-slate-400">Built with Sovereignty</span>
            </div>
          </div>
          
          {/* Column 2: Link Groups */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-semibold mb-3">Product</h4>
                  <ul className="space-y-2">
                    <li><a href="#features" className="hover:text-white transition-colors">Modules</a></li>
                    <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Roadmap</a></li>
                    <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold mb-3">Documentation</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="hover:text-white transition-colors">Docs</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-semibold mb-3">Community</h4>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="hover:text-white transition-colors flex items-center space-x-1">
                        <span>Discord</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-white transition-colors flex items-center space-x-1">
                        <span>Twitter</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </li>
                    <li><a href="#" className="hover:text-white transition-colors">Forum</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold mb-3">Support</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Column 3: Empty space for alignment */}
          <div className="flex flex-col justify-end">
            {/* Intentionally left empty for alignment */}
          </div>
        </div>
        
        {/* Legal Links at the bottom */}
        <div className="mt-8 flex flex-wrap justify-center space-x-4">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <span className="text-slate-600">|</span>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <span className="text-slate-600">|</span>
          <a href="#" className="hover:text-white transition-colors">Data Policy</a>
          <span className="text-slate-600">|</span>
          <a href="#" className="hover:text-white transition-colors">Cookies</a>
        </div>
      </div>
    </footer>
  )
}
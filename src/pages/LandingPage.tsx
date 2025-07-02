import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  Check, 
  Star, 
  Sparkles, 
  Brain, 
  Shield, 
  Zap, 
  Target,
  ChevronRight // Added ChevronRight for the "Explore All Modules" button
} from 'lucide-react'
import { useTranslation } from '../lib/i18n'
import { Navbar } from '../components/landing/Navbar'
import { HeroSection } from '../components/landing/HeroSection'
// Removed ModulesShowcase import as its content will be embedded directly
// import { ModulesShowcase } from '../components/landing/ModulesShowcase' 
import { AISection } from '../components/landing/AISection'
import { PricingPlans } from '../components/landing/PricingPlans'
import { TestimonialSlider } from '../components/landing/TestimonialSlider'
import { InspirationSection } from '../components/landing/InspirationSection'
import { FinalCTA } from '../components/landing/FinalCTA'
import { Footer } from '../components/landing/Footer'

// Import module data and icon map directly
import { iconMap } from '../data/modules'
import { modulesConfig } from '../data/modules.config'

export function LandingPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const { t } = useTranslation()
  
  // Filter modules based on category
  const filteredModules = activeCategory === 'all' 
    ? modulesConfig 
    : modulesConfig.filter(module => module.category?.toLowerCase() === activeCategory.toLowerCase())

  // Sort modules alphabetically within each group
  const sortedModules = [...filteredModules].sort((a, b) => {
    // First sort by tag (Core, Personal, Advanced)
    const tagOrder = { 'Core': 1, 'Personal': 2, 'Advanced': 3 };
    const aTagOrder = a.category ? tagOrder[a.category as keyof typeof tagOrder] || 4 : 4;
    const bTagOrder = b.category ? tagOrder[b.category as keyof typeof tagOrder] || 4 : 4;
    
    if (aTagOrder !== bTagOrder) {
      return aTagOrder - bTagOrder;
    }
    
    // Then sort alphabetically by name
    return a.name.localeCompare(b.name);
  });

  // Get tag color based on category
  const getTagColor = (category: string | undefined) => {
    if (!category) return "bg-slate-700 text-slate-300";
    
    switch (category.toLowerCase()) {
      case 'core':
        return "bg-blue-600/20 text-blue-400";
      case 'personal':
        return "bg-emerald-600/20 text-emerald-400";
      case 'advanced':
        return "bg-purple-600/20 text-purple-400";
      default:
        return "bg-slate-700 text-slate-300";
    }
  };

  // Get translated category name
  const getCategoryName = (category: string) => {
    const categoryMap = {
      'all': t('landing.features', 'All'),
      'core': t('modules.core', 'Core'),
      'personal': t('modules.personal', 'Personal'),
      'advanced': t('modules.advanced', 'Advanced')
    }
    return categoryMap[category as keyof typeof categoryMap] || category
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        <HeroSection />

        {/* Modules Showcase Section (formerly ModulesShowcase component) */}
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-slate-950 opacity-90"></div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
            
            {/* Grid pattern */}
            <div className="absolute inset-0">
              <div className="h-full w-full bg-[radial-gradient(#3b82f6_1px,transparent_1px),linear-gradient(to_right,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:16px_16px] opacity-[0.15]"></div>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  {t('landing.modulesTitle')}
                </span>
              </motion.h2>
              <motion.p 
                className="text-xl text-slate-300 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {t('landing.modulesSubtitle')}
              </motion.p>
              
              {/* Category filters */}
              <motion.div 
                className="flex flex-wrap justify-center gap-3 mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {['all', 'core', 'personal', 'advanced'].map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {getCategoryName(category)} {category !== 'all' && t('modules.title', 'Modules')}
                  </button>
                ))}
              </motion.div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {sortedModules.map((module, index) => {
                
                const ModuleIcon = iconMap[module.icon as keyof typeof iconMap];
                
                return (
                  <Link to={`/modules/${module.slug}`} className="block" key={module.slug}>
                    <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    whileHover={{
                      y: -5,
                      scale: 1.01,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
                    }}
                    className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all duration-300"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${module.color}`}>
                        {ModuleIcon && <ModuleIcon className="w-6 h-6 text-white" />}
                      </div>
                      <div>
                        <div className="flex items-center mb-2">
                          <h3 className="text-xl font-semibold text-white">
                            {t(`modules.${module.name.toLowerCase().replace(/\s+/g, '')}`, module.name)}
                          </h3>
                          {module.category && (
                            <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${getTagColor(module.category)}`}>
                              {module.category}
                            </span>
                          )}
                        </div>
                        {/* The description text will now be visible */}
                        <p className="text-slate-300 text-sm">{module.description}</p>
                      </div>
                    </div>
                  </motion.div>
                  </Link>
                );
              })}
            </div>
            
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Link
                to="/register"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg shadow-blue-600/20"
              >
                <span>{t('landing.exploreModules')}</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>
        <AISection />
        <PricingPlans />
        <TestimonialSlider />
        <InspirationSection />
        <FinalCTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

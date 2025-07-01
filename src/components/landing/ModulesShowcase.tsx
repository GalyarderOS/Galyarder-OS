import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { iconMap } from '../../data/modules'
import { modulesConfig, ModuleConfig } from '../../data/modules.config' // Ensure ModuleConfig is exported
import { cn } from '../../lib/utils'

const TABS = ['All', 'Core', 'Personal', 'Advanced']

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring' },
  },
}

const badgeColors: Record<string, string> = {
  Core: 'bg-blue-900/50 text-blue-300 border border-blue-500/30',
  Personal: 'bg-green-900/50 text-green-300 border border-green-500/30',
  Advanced: 'bg-violet-900/50 text-violet-300 border border-violet-500/30',
}

export function ModulesShowcase() {
  const [activeTab, setActiveTab] = useState(TABS[0])

  const filteredModules = useMemo(() => {
    if (activeTab === 'All') return modulesConfig
    return modulesConfig.filter((m) => m.category === activeTab)
  }, [activeTab])

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-white mb-6"
        >
          Everything You Need to <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">Build Your Personal Civilization</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xl text-slate-300 max-w-3xl mx-auto"
        >
          27+ integrated life modules to master productivity, finance, health, relationships, and legacy.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mt-8"
        >
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              )}
            >
              {tab} Modules
            </button>
          ))}
        </motion.div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      >
        {filteredModules.map((module) => {
          const ModuleIcon = iconMap[module.icon as keyof typeof iconMap]
          return (
            <motion.div key={module.slug} variants={itemVariants}>
              <Link
                to={`/modules/${module.slug}`}
                className="group flex h-full w-full flex-col rounded-xl border border-slate-800 bg-slate-900/50 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] p-6 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50 hover:bg-slate-900 hover:shadow-2xl hover:shadow-blue-600/10"
              >
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${module.color}`}>
                    {ModuleIcon && <ModuleIcon className="h-6 w-6 text-white transition-transform duration-300 group-hover:scale-110" />}
                  </div>
                  <span className={cn('text-xs px-2 py-1 rounded-full', badgeColors[module.category])}>
                    {module.category}
                  </span>
                </div>
                <div className="mt-4 flex flex-grow flex-col justify-start">
                  <h3 className="text-lg font-semibold text-slate-100">{module.name}</h3>
                  <p className="mt-2 text-sm text-slate-400">{module.description}</p>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}

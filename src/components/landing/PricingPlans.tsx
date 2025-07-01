import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

// Pricing plans
const pricingPlans = [
  {
    name: 'Free',
    price: '$0',
    yearlyPrice: '$0',
    period: 'forever',
    description: 'Perfect for getting started with personal optimization',
    features: [
      'Core Dashboard',
      'Limited AI Assistant (10 queries/month)',
      'Basic Time Tracking',
      'Simple Goal Setting',
      'Community Support'
    ],
    cta: 'Get Started Free',
    popular: false
  },
  {
    name: 'Pro',
    price: '$19',
    yearlyPrice: '$15',
    period: 'per month',
    description: 'Advanced features for serious life optimization',
    features: [
      'Full Dashboard with Advanced Analytics',
      'Unlimited AI Assistant',
      'Advanced Time Management',
      'Financial Hub with Investments',
      'Health & Wellness Tracking',
      'Career Development Tools',
      'Priority Support',
      'Data Export'
    ],
    cta: 'Start Pro Trial',
    popular: true
  },
  {
    name: 'Ultimate',
    price: '$49',
    yearlyPrice: '$39',
    period: 'per month',
    description: 'Complete personal civilization system',
    features: [
      'Everything in Pro',
      'Advanced AI Insights',
      'Custom Module Development',
      'API Access',
      'White-label Options',
      'Personal Success Coach',
      'Custom Integrations',
      'Priority Phone Support'
    ],
    cta: 'Go Ultimate',
    popular: false
  }
]

export function PricingPlans() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-slate-950 opacity-90"></div>
        
        {/* Pricing grid pattern */}
        <div className="absolute inset-0">
          <div className="h-full w-full bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(to_right,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:64px_64px] opacity-[0.15]"></div>
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
            Choose Your{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Optimization Level
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-slate-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Start free and upgrade as you grow. All plans include core features with increasing levels of AI intelligence and customization.
          </motion.p>
          
          {/* Billing toggle */}
          <motion.div 
            className="flex justify-center items-center space-x-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className={`text-sm font-medium ${billingPeriod === 'monthly' ? 'text-white' : 'text-slate-400'}`}>
              Monthly
            </span>
            
            <button 
              onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
              className={`w-14 h-7 rounded-full relative transition-colors ${
                billingPeriod === 'yearly' ? 'bg-blue-600' : 'bg-slate-700'
              }`}
            >
              <motion.div 
                className="w-5 h-5 bg-white rounded-full absolute top-1"
                animate={{ 
                  x: billingPeriod === 'yearly' ? 8 : 2
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            </button>
            
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-medium ${billingPeriod === 'yearly' ? 'text-white' : 'text-slate-400'}`}>
                Yearly
              </span>
              <span className="text-xs bg-green-600/20 text-green-400 px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => {
            // Adjust price for yearly billing
            const displayPrice = billingPeriod === 'yearly' && plan.price !== '$0' 
              ? plan.yearlyPrice
              : plan.price;
            
            const displayPeriod = billingPeriod === 'yearly' && plan.price !== '$0'
              ? 'per month, billed annually'
              : plan.period;
              
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative bg-slate-800/50 backdrop-blur-sm border rounded-xl p-8 ${
                  plan.popular 
                    ? 'border-blue-500 ring-2 ring-blue-500/20 transform md:scale-105 z-10' 
                    : 'border-slate-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-white">{displayPrice}</span>
                    <span className="text-slate-400">/{displayPeriod}</span>
                  </div>
                  <p className="text-slate-300">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li 
                      key={featureIndex} 
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + featureIndex * 0.1 }}
                    >
                      <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <span className="text-slate-300">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <Link
                  to="/register"
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 text-center block ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-600/20'
                      : 'bg-slate-700 hover:bg-slate-600 text-white'
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            );
          })}
        </div>
        
        {/* Enterprise option */}
        <motion.div 
          className="mt-12 p-6 bg-slate-800/30 border border-slate-700 rounded-xl max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Enterprise Solution</h3>
              <p className="text-slate-300">Custom deployment with dedicated support and advanced security features.</p>
            </div>
            <a 
              href="mailto:enterprise@galyarderos.com" 
              className="whitespace-nowrap px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              Contact Sales
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
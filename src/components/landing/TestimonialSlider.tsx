import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

// Testimonials
const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Product Manager',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    content: 'GalyarderOS transformed how I manage my life. The AI insights are incredibly accurate and actionable. I\'ve improved my productivity by 40% and finally have clarity on my long-term goals.'
  },
  {
    name: 'Marcus Johnson',
    role: 'Entrepreneur',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    content: 'Finally, a system that brings all aspects of personal development together. The integration between modules is seamless, and the AI assistant feels like having a personal coach. Game-changing!'
  },
  {
    name: 'Dr. Emily Rodriguez',
    role: 'Researcher',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    content: 'The data-driven approach to life optimization is exactly what I needed. I can track everything from sleep quality to financial goals in one place, with AI insights that actually make sense.'
  },
  {
    name: 'Alex Kim',
    role: 'Software Engineer',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    content: 'As someone who values digital sovereignty, I appreciate how GalyarderOS gives me complete control over my data while providing powerful AI insights. The system is both private and intelligent.'
  }
]

export function TestimonialSlider() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length)
    }, 8000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.1),transparent_50%)]"></div>
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
            Loved by{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Optimizers
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-slate-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Join thousands of people who have transformed their lives with GalyarderOS
          </motion.p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 shadow-xl"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img 
                      src={testimonials[currentTestimonial].avatar} 
                      alt={testimonials[currentTestimonial].name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-slate-600"
                    />
                    <motion.div 
                      className="absolute -inset-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 opacity-50 blur-sm"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="text-xl text-slate-300 mb-6 relative">
                    <span className="absolute -top-2 -left-2 text-4xl text-yellow-500/20">"</span>
                    {testimonials[currentTestimonial].content}
                    <span className="absolute -bottom-2 -right-2 text-4xl text-yellow-500/20">"</span>
                  </blockquote>
                  
                  <div>
                    <p className="text-white font-semibold">{testimonials[currentTestimonial].name}</p>
                    <p className="text-slate-400">{testimonials[currentTestimonial].role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation buttons */}
          <div className="flex justify-center mt-8 space-x-2">
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
              className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentTestimonial === index ? 'bg-yellow-400' : 'bg-slate-600 hover:bg-slate-500'
                }`}
              />
            ))}
            
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
              className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
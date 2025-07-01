import { motion } from 'framer-motion'

const quotes = [
  {
    text: "The people who are crazy enough to think they can change the world are the ones who do.",
    author: "Steve Jobs"
  },
  {
    text: "When something is important enough, you do it even if the odds are not in your favor.",
    author: "Elon Musk"
  },
  {
    text: "You don't get what you want in life. You get who you are.",
    author: "Naval Ravikant"
  },
  {
    text: "You do not rise to the level of your goals. You fall to the level of your systems.",
    author: "James Clear"
  },
  {
    text: "There's no limit to what you can design for your own life, if you make yourself the architect.",
    author: "Galyarder"
  }
]

export function InspirationSection() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-4xl mx-auto">
        {/* Top Divider */}
        <div className="border-t border-slate-700/30 mb-10"></div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl text-center italic text-slate-400 mb-10"
        >
          Inspiration for Your Journey
        </motion.h2>
        
        <div className="space-y-8">
          {quotes.map((quote, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center"
            >
              <p className="text-slate-300 italic mb-2">"{quote.text}"</p>
              <p className="text-slate-500 text-sm uppercase tracking-wider">— {quote.author}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Bottom Divider */}
        <div className="border-t border-slate-700/30 mt-10"></div>
      </div>
    </section>
  )
}
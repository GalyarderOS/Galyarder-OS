import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, RotateCcw } from 'lucide-react'

export function AnimatedElement() {
  const [isAnimating, setIsAnimating] = useState(true)
  const [animationProgress, setAnimationProgress] = useState(0)
  const animationRef = useRef<number>()
  const startTimeRef = useRef<number>()
  const pausedTimeRef = useRef<number>(0)

  // Animation duration in milliseconds
  const ANIMATION_DURATION = 4000

  // Update animation progress
  useEffect(() => {
    if (isAnimating) {
      const animate = (timestamp: number) => {
        if (!startTimeRef.current) {
          startTimeRef.current = timestamp - pausedTimeRef.current
        }

        const elapsed = timestamp - startTimeRef.current
        const progress = (elapsed % ANIMATION_DURATION) / ANIMATION_DURATION
        setAnimationProgress(progress)

        animationRef.current = requestAnimationFrame(animate)
      }

      animationRef.current = requestAnimationFrame(animate)
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      // Store the paused time to resume from the same position
      pausedTimeRef.current = animationProgress * ANIMATION_DURATION
      startTimeRef.current = undefined
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isAnimating, animationProgress])

  const handleClick = () => {
    setIsAnimating(!isAnimating)
  }

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation()
    setAnimationProgress(0)
    pausedTimeRef.current = 0
    startTimeRef.current = undefined
    setIsAnimating(true)
  }

  // Calculate rotation and scale based on progress
  const rotation = animationProgress * 360
  const scale = 1 + Math.sin(animationProgress * Math.PI * 2) * 0.3
  const opacity = 0.7 + Math.sin(animationProgress * Math.PI * 4) * 0.3

  return (
    <div className="flex flex-col items-center space-y-8 p-8">
      <h2 className="text-2xl font-bold text-white mb-4">
        Continuous Animation Demo
      </h2>
      
      {/* Main Animated Element */}
      <div 
        className="relative cursor-pointer group"
        onClick={handleClick}
      >
        {/* Animated Circle */}
        <motion.div
          className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 
                     flex items-center justify-center shadow-2xl relative overflow-hidden"
          style={{
            transform: `rotate(${rotation}deg) scale(${scale})`,
            opacity: opacity,
          }}
          transition={{
            type: "tween",
            duration: 0.1,
            ease: "linear"
          }}
        >
          {/* Inner rotating element */}
          <motion.div
            className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm"
            style={{
              transform: `rotate(${-rotation * 2}deg)`,
            }}
            transition={{
              type: "tween",
              duration: 0.1,
              ease: "linear"
            }}
          />
          
          {/* Pulsing dots */}
          {[0, 1, 2, 3].map((index) => (
            <motion.div
              key={index}
              className="absolute w-3 h-3 bg-white rounded-full"
              style={{
                top: '50%',
                left: '50%',
                transform: `
                  translate(-50%, -50%) 
                  rotate(${rotation + index * 90}deg) 
                  translateY(-${20 + Math.sin(animationProgress * Math.PI * 2 + index) * 10}px)
                `,
                opacity: 0.8 + Math.sin(animationProgress * Math.PI * 2 + index) * 0.2,
              }}
              transition={{
                type: "tween",
                duration: 0.1,
                ease: "linear"
              }}
            />
          ))}

          {/* Center play/pause indicator */}
          <AnimatePresence>
            {!isAnimating && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-full"
              >
                <Play className="w-8 h-8 text-white ml-1" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{
            transform: `scale(${1.1 + scale * 0.1})`,
          }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-4">
        <button
          onClick={handleClick}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 
                     rounded-lg text-white transition-colors duration-200"
        >
          {isAnimating ? (
            <>
              <Pause className="w-4 h-4" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span>Resume</span>
            </>
          )}
        </button>

        <button
          onClick={handleReset}
          className="flex items-center space-x-2 px-4 py-2 bg-slate-600 hover:bg-slate-700 
                     rounded-lg text-white transition-colors duration-200"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset</span>
        </button>
      </div>

      {/* Progress Indicator */}
      <div className="w-64 bg-slate-700 rounded-full h-2 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
          style={{
            width: `${animationProgress * 100}%`,
          }}
          transition={{
            type: "tween",
            duration: 0.1,
            ease: "linear"
          }}
        />
      </div>

      {/* Status */}
      <div className="text-center">
        <p className="text-slate-300 text-sm">
          Status: <span className={isAnimating ? "text-emerald-400" : "text-amber-400"}>
            {isAnimating ? "Animating" : "Paused"}
          </span>
        </p>
        <p className="text-slate-400 text-xs mt-1">
          Progress: {Math.round(animationProgress * 100)}%
        </p>
      </div>

      {/* Instructions */}
      <div className="text-center max-w-md">
        <p className="text-slate-400 text-sm">
          Click the animated circle to pause/resume the animation. 
          The animation will continue from where it was paused.
        </p>
      </div>
    </div>
  )
}
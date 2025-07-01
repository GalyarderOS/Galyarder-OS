import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';
export function AnimatedElement() {
    const [isAnimating, setIsAnimating] = useState(true);
    const [animationProgress, setAnimationProgress] = useState(0);
    const animationRef = useRef();
    const startTimeRef = useRef();
    const pausedTimeRef = useRef(0);
    // Animation duration in milliseconds
    const ANIMATION_DURATION = 4000;
    // Update animation progress
    useEffect(() => {
        if (isAnimating) {
            const animate = (timestamp) => {
                if (!startTimeRef.current) {
                    startTimeRef.current = timestamp - pausedTimeRef.current;
                }
                const elapsed = timestamp - startTimeRef.current;
                const progress = (elapsed % ANIMATION_DURATION) / ANIMATION_DURATION;
                setAnimationProgress(progress);
                animationRef.current = requestAnimationFrame(animate);
            };
            animationRef.current = requestAnimationFrame(animate);
        }
        else {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            // Store the paused time to resume from the same position
            pausedTimeRef.current = animationProgress * ANIMATION_DURATION;
            startTimeRef.current = undefined;
        }
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isAnimating, animationProgress]);
    const handleClick = () => {
        setIsAnimating(!isAnimating);
    };
    const handleReset = (e) => {
        e.stopPropagation();
        setAnimationProgress(0);
        pausedTimeRef.current = 0;
        startTimeRef.current = undefined;
        setIsAnimating(true);
    };
    // Calculate rotation and scale based on progress
    const rotation = animationProgress * 360;
    const scale = 1 + Math.sin(animationProgress * Math.PI * 2) * 0.3;
    const opacity = 0.7 + Math.sin(animationProgress * Math.PI * 4) * 0.3;
    return (_jsxs("div", { className: "flex flex-col items-center space-y-8 p-8", children: [_jsx("h2", { className: "text-2xl font-bold text-white mb-4", children: "Continuous Animation Demo" }), _jsxs("div", { className: "relative cursor-pointer group", onClick: handleClick, children: [_jsxs(motion.div, { className: "w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 \n                     flex items-center justify-center shadow-2xl relative overflow-hidden", style: {
                            transform: `rotate(${rotation}deg) scale(${scale})`,
                            opacity: opacity,
                        }, transition: {
                            type: "tween",
                            duration: 0.1,
                            ease: "linear"
                        }, children: [_jsx(motion.div, { className: "w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm", style: {
                                    transform: `rotate(${-rotation * 2}deg)`,
                                }, transition: {
                                    type: "tween",
                                    duration: 0.1,
                                    ease: "linear"
                                } }), [0, 1, 2, 3].map((index) => (_jsx(motion.div, { className: "absolute w-3 h-3 bg-white rounded-full", style: {
                                    top: '50%',
                                    left: '50%',
                                    transform: `
                  translate(-50%, -50%) 
                  rotate(${rotation + index * 90}deg) 
                  translateY(-${20 + Math.sin(animationProgress * Math.PI * 2 + index) * 10}px)
                `,
                                    opacity: 0.8 + Math.sin(animationProgress * Math.PI * 2 + index) * 0.2,
                                }, transition: {
                                    type: "tween",
                                    duration: 0.1,
                                    ease: "linear"
                                } }, index))), _jsx(AnimatePresence, { children: !isAnimating && (_jsx(motion.div, { initial: { opacity: 0, scale: 0 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0 }, className: "absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-full", children: _jsx(Play, { className: "w-8 h-8 text-white ml-1" }) })) })] }), _jsx(motion.div, { className: "absolute inset-0 rounded-full border-2 border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200", style: {
                            transform: `scale(${1.1 + scale * 0.1})`,
                        } })] }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("button", { onClick: handleClick, className: "flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 \n                     rounded-lg text-white transition-colors duration-200", children: isAnimating ? (_jsxs(_Fragment, { children: [_jsx(Pause, { className: "w-4 h-4" }), _jsx("span", { children: "Pause" })] })) : (_jsxs(_Fragment, { children: [_jsx(Play, { className: "w-4 h-4" }), _jsx("span", { children: "Resume" })] })) }), _jsxs("button", { onClick: handleReset, className: "flex items-center space-x-2 px-4 py-2 bg-slate-600 hover:bg-slate-700 \n                     rounded-lg text-white transition-colors duration-200", children: [_jsx(RotateCcw, { className: "w-4 h-4" }), _jsx("span", { children: "Reset" })] })] }), _jsx("div", { className: "w-64 bg-slate-700 rounded-full h-2 overflow-hidden", children: _jsx(motion.div, { className: "h-full bg-gradient-to-r from-blue-500 to-purple-500", style: {
                        width: `${animationProgress * 100}%`,
                    }, transition: {
                        type: "tween",
                        duration: 0.1,
                        ease: "linear"
                    } }) }), _jsxs("div", { className: "text-center", children: [_jsxs("p", { className: "text-slate-300 text-sm", children: ["Status: ", _jsx("span", { className: isAnimating ? "text-emerald-400" : "text-amber-400", children: isAnimating ? "Animating" : "Paused" })] }), _jsxs("p", { className: "text-slate-400 text-xs mt-1", children: ["Progress: ", Math.round(animationProgress * 100), "%"] })] }), _jsx("div", { className: "text-center max-w-md", children: _jsx("p", { className: "text-slate-400 text-sm", children: "Click the animated circle to pause/resume the animation. The animation will continue from where it was paused." }) })] }));
}

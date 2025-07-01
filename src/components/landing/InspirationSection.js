import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
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
];
export function InspirationSection() {
    return (_jsx("section", { className: "py-12 px-4 sm:px-6 lg:px-8 relative", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsx("div", { className: "border-t border-slate-700/30 mb-10" }), _jsx(motion.h2, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 }, className: "text-2xl text-center italic text-slate-400 mb-10", children: "Inspiration for Your Journey" }), _jsx("div", { className: "space-y-8", children: quotes.map((quote, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6, delay: index * 0.2 }, className: "text-center", children: [_jsxs("p", { className: "text-slate-300 italic mb-2", children: ["\"", quote.text, "\""] }), _jsxs("p", { className: "text-slate-500 text-sm uppercase tracking-wider", children: ["\u2014 ", quote.author] })] }, index))) }), _jsx("div", { className: "border-t border-slate-700/30 mt-10" })] }) }));
}

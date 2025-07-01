import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Activity } from 'lucide-react';
export function TDEECalculator() {
    const [formData, setFormData] = useState({
        age: 28,
        weight: 70,
        height: 175,
        gender: 'male',
        activity: 'moderate'
    });
    const calculateBMR = () => {
        if (formData.gender === 'male') {
            return 88.362 + (13.397 * formData.weight) + (4.799 * formData.height) - (5.677 * formData.age);
        }
        else {
            return 447.593 + (9.247 * formData.weight) + (3.098 * formData.height) - (4.330 * formData.age);
        }
    };
    const calculateTDEE = () => {
        const bmr = calculateBMR();
        const activityMultipliers = {
            sedentary: 1.2,
            light: 1.375,
            moderate: 1.55,
            active: 1.725,
            very_active: 1.9
        };
        return bmr * activityMultipliers[formData.activity];
    };
    const bmr = Math.round(calculateBMR());
    const tdee = Math.round(calculateTDEE());
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, className: "glass-card rounded-xl p-6", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-6", children: [_jsx(Calculator, { className: "w-5 h-5 text-blue-400" }), _jsx("h3", { className: "text-xl font-semibold text-white", children: "TDEE Calculator" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4 mb-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm text-slate-400 mb-2", children: "Age" }), _jsx("input", { type: "number", value: formData.age, onChange: (e) => setFormData({ ...formData, age: parseInt(e.target.value) }), className: "w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm text-slate-400 mb-2", children: "Weight (kg)" }), _jsx("input", { type: "number", value: formData.weight, onChange: (e) => setFormData({ ...formData, weight: parseInt(e.target.value) }), className: "w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm text-slate-400 mb-2", children: "Height (cm)" }), _jsx("input", { type: "number", value: formData.height, onChange: (e) => setFormData({ ...formData, height: parseInt(e.target.value) }), className: "w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm text-slate-400 mb-2", children: "Gender" }), _jsxs("select", { value: formData.gender, onChange: (e) => setFormData({ ...formData, gender: e.target.value }), className: "w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white", children: [_jsx("option", { value: "male", children: "Male" }), _jsx("option", { value: "female", children: "Female" })] })] })] }), _jsxs("div", { className: "mb-6", children: [_jsx("label", { className: "block text-sm text-slate-400 mb-2", children: "Activity Level" }), _jsxs("select", { value: formData.activity, onChange: (e) => setFormData({ ...formData, activity: e.target.value }), className: "w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white", children: [_jsx("option", { value: "sedentary", children: "Sedentary (little/no exercise)" }), _jsx("option", { value: "light", children: "Light (light exercise 1-3 days/week)" }), _jsx("option", { value: "moderate", children: "Moderate (moderate exercise 3-5 days/week)" }), _jsx("option", { value: "active", children: "Active (hard exercise 6-7 days/week)" }), _jsx("option", { value: "very_active", children: "Very Active (very hard exercise, physical job)" })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsx(Activity, { className: "w-5 h-5 text-purple-400 mx-auto mb-2" }), _jsx("p", { className: "text-lg font-bold text-white", children: bmr }), _jsx("p", { className: "text-xs text-slate-400", children: "BMR (calories/day)" })] }), _jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4 text-center", children: [_jsx("div", { className: "w-5 h-5 bg-emerald-400 rounded-full mx-auto mb-2" }), _jsx("p", { className: "text-lg font-bold text-emerald-400", children: tdee }), _jsx("p", { className: "text-xs text-slate-400", children: "TDEE (calories/day)" })] })] }), _jsx("div", { className: "mt-4 p-3 bg-blue-600/20 rounded-lg", children: _jsx("p", { className: "text-sm text-blue-300", children: "\uD83D\uDCA1 Your TDEE is the total calories you burn per day including exercise" }) })] }));
}

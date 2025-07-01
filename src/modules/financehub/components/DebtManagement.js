import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { CreditCard, AlertTriangle, CheckCircle } from 'lucide-react';
const debts = [
    {
        id: 1,
        name: 'Credit Card',
        balance: 3200,
        minPayment: 120,
        interestRate: 18.5,
        dueDate: '2024-02-15'
    },
    {
        id: 2,
        name: 'Student Loan',
        balance: 15000,
        minPayment: 250,
        interestRate: 4.2,
        dueDate: '2024-02-20'
    },
    {
        id: 3,
        name: 'Car Loan',
        balance: 8500,
        minPayment: 320,
        interestRate: 6.8,
        dueDate: '2024-02-10'
    }
];
export function DebtManagement() {
    const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0);
    const totalMinPayment = debts.reduce((sum, debt) => sum + debt.minPayment, 0);
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, className: "glass-card rounded-xl p-6", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-6", children: [_jsx(CreditCard, { className: "w-5 h-5 text-red-400" }), _jsx("h3", { className: "text-xl font-semibold text-white", children: "Debt Management" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6", children: [_jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4", children: [_jsx("p", { className: "text-sm text-slate-400 mb-1", children: "Total Debt" }), _jsxs("p", { className: "text-2xl font-bold text-red-400", children: ["$", totalDebt.toLocaleString()] })] }), _jsxs("div", { className: "bg-slate-800/50 rounded-lg p-4", children: [_jsx("p", { className: "text-sm text-slate-400 mb-1", children: "Monthly Payments" }), _jsxs("p", { className: "text-2xl font-bold text-white", children: ["$", totalMinPayment.toLocaleString()] })] })] }), _jsx("div", { className: "space-y-4", children: debts.map((debt, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.3 + index * 0.1 }, className: "flex items-center justify-between p-4 bg-slate-800/30 rounded-lg", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center space-x-2 mb-1", children: [_jsx("h4", { className: "text-sm font-medium text-white", children: debt.name }), debt.interestRate > 15 && (_jsx(AlertTriangle, { className: "w-4 h-4 text-amber-400" }))] }), _jsxs("p", { className: "text-xs text-slate-400", children: [debt.interestRate, "% APR \u2022 Due: ", debt.dueDate] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("p", { className: "text-sm font-medium text-white", children: ["$", debt.balance.toLocaleString()] }), _jsxs("p", { className: "text-xs text-slate-400", children: ["Min: $", debt.minPayment] })] }), _jsx("button", { className: "ml-4 p-2 hover:bg-slate-700 rounded-lg transition-colors", children: _jsx(CheckCircle, { className: "w-4 h-4 text-slate-400 hover:text-emerald-400" }) })] }, debt.id))) }), _jsx("div", { className: "mt-6 p-4 bg-blue-600/20 rounded-lg", children: _jsx("p", { className: "text-sm text-blue-300", children: "\uD83D\uDCA1 Consider paying extra on your credit card to save on interest charges" }) })] }));
}

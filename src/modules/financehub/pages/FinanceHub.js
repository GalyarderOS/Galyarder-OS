import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { CashflowTracker } from '../components/CashflowTracker';
import { InvestmentPortfolio } from '../components/InvestmentPortfolio';
import { DebtManagement } from '../components/DebtManagement';
export function FinanceHub() {
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent", children: "Finance Hub" }), _jsx("p", { className: "text-slate-400 mt-2", children: "Complete financial overview and wealth management" })] }), _jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-2 gap-8", children: [_jsx(CashflowTracker, {}), _jsx(InvestmentPortfolio, {})] }), _jsx(DebtManagement, {})] }));
}

import { allModules } from './modules';
// Transform existing metadata to simplified config shape expected by docs or other tooling
export const modulesConfig = allModules.map(m => ({
    name: m.name,
    slug: m.id,
    category: (m.tag ?? 'Core'),
    description: m.description && m.description.trim() !== '' ? m.description : 'One of 27+ integrated modules designed to build your personal civilization.',
    icon: m.icon,
    color: m.color ?? 'from-slate-500 to-slate-600',
}));
// Ensure System Kernel entry exists explicitly (satisfy requirements)
if (!modulesConfig.find(m => m.slug === 'system-kernel')) {
    modulesConfig.push({
        name: 'System Kernel',
        slug: 'system-kernel',
        category: 'Advanced',
        description: 'One of 27+ integrated modules designed to build your personal civilization.',
        icon: 'Cog',
        color: 'from-purple-600 to-indigo-600',
    });
}

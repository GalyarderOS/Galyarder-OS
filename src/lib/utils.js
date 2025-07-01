import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
export function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}
export function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(date);
}
export function formatTime(date) {
    return new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);
}
// Gmail integration utilities
export function extractGmailUsername(email) {
    if (email.includes('@gmail.com')) {
        return email.split('@')[0];
    }
    return email.split('@')[0];
}
export function generateAvatarUrl(name, options) {
    const { size = 150, background = '4285f4', color = 'fff' } = options || {};
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${background}&color=${color}&size=${size}`;
}
export function isGmailAddress(email) {
    return email.toLowerCase().includes('@gmail.com');
}
// Generate initials from name
export function getInitials(name) {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}
// Generate gradient colors based on name
export function getAvatarGradient(name) {
    const gradients = [
        'from-blue-500 to-blue-600',
        'from-purple-500 to-purple-600',
        'from-emerald-500 to-emerald-600',
        'from-amber-500 to-amber-600',
        'from-pink-500 to-pink-600',
        'from-indigo-500 to-indigo-600',
        'from-red-500 to-red-600',
        'from-cyan-500 to-cyan-600'
    ];
    const index = name.length % gradients.length;
    return gradients[index];
}

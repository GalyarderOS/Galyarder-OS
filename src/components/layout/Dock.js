import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import { DesktopDock } from './DesktopDock';
import { MobileDock } from '@/components/ui/MobileDock';
export function Dock() {
    const isMobile = useMediaQuery('(max-width: 768px)');
    return (_jsx(_Fragment, { children: isMobile ? _jsx(MobileDock, {}) : _jsx(DesktopDock, {}) }));
}

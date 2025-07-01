import { useMediaQuery } from '@/lib/hooks/useMediaQuery'
import { DesktopDock } from './DesktopDock'
import { MobileDock } from '@/components/ui/MobileDock'

export function Dock() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  
  return (
    <>
      {/* Render the appropriate dock based on screen size */}
      {isMobile ? <MobileDock /> : <DesktopDock />}
    </>
  )
}
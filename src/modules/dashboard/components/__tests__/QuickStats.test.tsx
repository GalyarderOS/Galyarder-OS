import { render, screen } from '@testing-library/react'
import { QuickStats } from '../QuickStats'

describe('QuickStats', () => {
  it('renders without crashing', () => {
    render(<QuickStats />)
    expect(screen.getByText('Quick Stats')).toBeInTheDocument()
  })

  it('displays productivity stats', () => {
    render(<QuickStats />)
    
    // Check if productivity metrics are displayed
    expect(screen.getByText('Tasks Today')).toBeInTheDocument()
    expect(screen.getByText('Focus Time')).toBeInTheDocument()
    expect(screen.getByText('Energy Level')).toBeInTheDocument()
  })

  it('shows progress indicators', () => {
    render(<QuickStats />)
    
    // Check for progress elements
    const progressBars = document.querySelectorAll('[role="progressbar"]')
    expect(progressBars.length).toBeGreaterThan(0)
  })
})
import { useState, useEffect, useRef } from 'react'
import { MobileView } from '@/components/MobileView'
import { DesktopView } from '@/components/DesktopView'

export default function App() {
  const [selectedOption, setSelectedOption] = useState('')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const [showMobileNav, setShowMobileNav] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleGoBack = () => {
    setSelectedOption('')
    setShowMobileNav(false)
  }

  const handleToggleMobileNav = () => {
    setShowMobileNav(!showMobileNav)
  }

  const handleSelectOption = (option: string) => {
    setSelectedOption(option)
  }

  const handleCloseMobileNav = () => {
    setShowMobileNav(false)
  }

  useEffect(() => {
    document.title = 'DEV1lmig'
    
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current && !isMobile) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
      }
    }
    
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        e.preventDefault()
      }
    }

    const container = containerRef.current
    if (container && !isMobile) {
      container.addEventListener('mousemove', handleMouseMove)
    }
    document.addEventListener('keydown', handleTabKey)

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove)
      }
      document.removeEventListener('keydown', handleTabKey)
      window.removeEventListener('resize', checkMobile)
    }
  }, [isMobile])

  // Render appropriate view based on device type
  if (isMobile) {
    return (
      <MobileView
        selectedOption={selectedOption}
        showMobileNav={showMobileNav}
        onGoBack={handleGoBack}
        onToggleMobileNav={handleToggleMobileNav}
        onSelectOption={handleSelectOption}
        onCloseMobileNav={handleCloseMobileNav}
      />
    )
  }

  return (
    <DesktopView
      selectedOption={selectedOption}
      mousePosition={mousePosition}
      containerRef={containerRef}
      onGoBack={handleGoBack}
      onSelectOption={handleSelectOption}
    />
  )
}

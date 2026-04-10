import { useState, useEffect, type ReactNode } from 'react'
import { InfoCircle } from 'iconsax-react'
import './Tooltip.css'

type TooltipPosition = 'Top' | 'Bottom' | 'Left' | 'Right'
type TooltipAlignment = 'Center' | 'Start' | 'End'

interface TooltipProps {
  text: string
  position?: TooltipPosition
  alignment?: TooltipAlignment
  icon?: boolean
  children?: ReactNode
  className?: string
}

function Tooltip({
  text,
  position = 'Top',
  alignment = 'Center',
  icon = true,
  children,
  className = '',
}: TooltipProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setVisible(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  const posClass = `tooltip__body--${position.toLowerCase()}-${alignment.toLowerCase()}`
  const caretBefore = position === 'Bottom' || position === 'Right'
  const caretAfter = position === 'Top' || position === 'Left'
  const isHorizontal = position === 'Left' || position === 'Right'

  const caretAlignClass = isHorizontal
    ? 'tooltip__caret--center'
    : alignment === 'Start'
    ? 'tooltip__caret--start'
    : alignment === 'End'
    ? 'tooltip__caret--end'
    : 'tooltip__caret--center'

  const caret = (
    <div className={`tooltip__caret ${caretAlignClass}${caretBefore ? ' tooltip__caret--flip' : ''}`}>
      <svg width="12" height="6" viewBox="0 0 12 6" fill="none">
        <path d="M6 6L0 0H12L6 6Z" fill="var(--tooltip-background, #0f1014)" />
      </svg>
    </div>
  )

  const trigger = icon ? (
    <button
      type="button"
      className="tooltip__trigger"
      aria-label="More information"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      <InfoCircle size={20} color="var(--text-secondary, #bfc2cc)" variant="Linear" />
    </button>
  ) : (
    <div
      className="tooltip__trigger"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
    </div>
  )

  return (
    <div className={`tooltip-wrapper ${className}`.trim()}>
      {trigger}
      {visible && (
        <div role="tooltip" className={`tooltip__body ${posClass}`}>
          {caretBefore && caret}
          <div className="tooltip__content">{text}</div>
          {caretAfter && caret}
        </div>
      )}
    </div>
  )
}

export default Tooltip

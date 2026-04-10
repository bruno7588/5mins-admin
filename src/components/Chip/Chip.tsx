import { ReactNode } from 'react'
import { User } from 'iconsax-react'
import './Chip.css'

interface ChipProps {
  label: string
  selected?: boolean
  disabled?: boolean
  iconLeft?: boolean
  customIconLeft?: ReactNode
  iconRight?: boolean
  variant?: 'default' | 'warning'
  onClick?: () => void
  onDismiss?: () => void
  className?: string
}

function Chip({
  label,
  selected = false,
  disabled = false,
  iconLeft = false,
  customIconLeft,
  iconRight = false,
  variant = 'default',
  onClick,
  onDismiss,
  className = '',
}: ChipProps) {
  const iconColor = disabled
    ? 'var(--text-disabled)'
    : selected
    ? 'var(--neutral-800)'
    : 'var(--text-secondary)'

  const classes = [
    'chip',
    selected && 'chip--selected',
    disabled && 'chip--disabled',
    (iconLeft || customIconLeft) && iconRight && 'chip--icon-both',
    (iconLeft || customIconLeft) && !iconRight && 'chip--icon-left',
    iconRight && !iconLeft && !customIconLeft && 'chip--icon-right',
    !iconLeft && !customIconLeft && !iconRight && 'chip--no-icons',
    variant === 'warning' && 'chip--warning',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <span
      className={classes}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
      aria-disabled={disabled || undefined}
      aria-pressed={onClick ? selected : undefined}
      onClick={disabled ? undefined : onClick}
    >
      {customIconLeft ? customIconLeft : iconLeft && <User size={16} color={iconColor} variant="Linear" />}
      <span className="chip__label">{label}</span>
      {iconRight && (
        <button
          type="button"
          className="chip__dismiss"
          onClick={(e) => {
            e.stopPropagation()
            if (!disabled) onDismiss?.()
          }}
          aria-label={`Remove ${label}`}
          disabled={disabled}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M11 5L5 11M5 5L11 11"
              stroke={iconColor}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </span>
  )
}

export default Chip

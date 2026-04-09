import { User } from 'iconsax-react'
import './Chip.css'

interface ChipProps {
  label: string
  selected?: boolean
  disabled?: boolean
  iconLeft?: boolean
  iconRight?: boolean
  onClick?: () => void
  onDismiss?: () => void
  className?: string
}

function Chip({
  label,
  selected = false,
  disabled = false,
  iconLeft = false,
  iconRight = false,
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
    iconLeft && iconRight && 'chip--icon-both',
    iconLeft && !iconRight && 'chip--icon-left',
    iconRight && !iconLeft && 'chip--icon-right',
    !iconLeft && !iconRight && 'chip--no-icons',
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
      {iconLeft && <User size={16} color={iconColor} variant="Linear" />}
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
              d="M12 4L4 12M4 4L12 12"
              stroke={iconColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </span>
  )
}

export default Chip

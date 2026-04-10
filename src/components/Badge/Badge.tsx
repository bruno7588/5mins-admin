import { type ReactNode } from 'react'
import { TickCircle, InfoCircle, Danger, TaskSquare } from 'iconsax-react'
import './Badge.css'

type BadgeType =
  | 'success'
  | 'warning'
  | 'error'
  | 'in-progress'
  | 'informative'
  | 'quiz'
  | 'new'

const DEFAULT_LABELS: Record<BadgeType, string> = {
  success: 'Success',
  warning: 'Warning',
  error: 'Error',
  'in-progress': 'In Progress',
  informative: 'Information',
  quiz: 'Quiz Required',
  new: 'New',
}

const ICON_MAP: Partial<Record<BadgeType, ReactNode>> = {
  success: <TickCircle size={16} variant="Linear" />,
  warning: <InfoCircle size={16} variant="Linear" />,
  error: <Danger size={16} variant="Linear" />,
  'in-progress': <TaskSquare size={16} variant="Linear" />,
  informative: <InfoCircle size={16} variant="Linear" />,
}

interface BadgeProps {
  type?: BadgeType
  icon?: boolean
  customIcon?: ReactNode
  label?: string
  onDismiss?: () => void
  className?: string
}

function Badge({ type = 'success', icon = false, customIcon, label, onDismiss, className = '' }: BadgeProps) {
  const showIcon = (icon || customIcon) && type !== 'new'

  return (
    <span
      className={`badge badge--${type}${showIcon ? ' badge--icon' : ''}${onDismiss ? ' badge--dismissible' : ''} ${className}`.trim()}
      role="status"
    >
      {showIcon && <span className="badge__icon">{customIcon ?? ICON_MAP[type]}</span>}
      {label ?? DEFAULT_LABELS[type]}
      {onDismiss && (
        <button
          type="button"
          className="badge__dismiss"
          onClick={onDismiss}
          aria-label={`Remove ${label ?? DEFAULT_LABELS[type]}`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M11 5L5 11M5 5L11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </span>
  )
}

export default Badge

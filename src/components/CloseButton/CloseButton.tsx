import './CloseButton.css'

interface CloseButtonProps {
  onClick?: () => void
  size?: number
  className?: string
  ariaLabel?: string
}

function CloseButton({ onClick, size = 24, className = '', ariaLabel = 'Close' }: CloseButtonProps) {
  return (
    <button
      className={`close-btn ${className}`.trim()}
      onClick={onClick}
      aria-label={ariaLabel}
      type="button"
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          d="M18 6L6 18M6 6l12 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

export default CloseButton

import { InfoCircle } from 'iconsax-react'
import './Alert.css'

export type AlertType = 'Callout' | 'Alert'

interface AlertProps {
  type?: AlertType
  icon?: boolean
  illustration?: boolean
  title?: string
  message?: string
  bullets?: string[]
  button?: boolean
  buttonLabel?: string
  onButtonClick?: () => void
  className?: string
}

function Alert({
  type = 'Callout',
  icon = false,
  illustration = false,
  title,
  message,
  bullets,
  button = false,
  buttonLabel,
  onButtonClick,
  className = '',
}: AlertProps) {
  const isAlert = type === 'Alert'
  const hasBody = !isAlert && (!!title || (bullets && bullets.length > 0))

  return (
    <div
      className={`alert alert--${type.toLowerCase()}${
        hasBody ? ' alert--with-body' : ''
      } ${className}`.trim()}
    >
      {icon && (
        <InfoCircle
          size={isAlert ? 24 : 20}
          variant="Outline"
          color="currentColor"
          className="alert__icon"
        />
      )}
      {!icon && illustration && isAlert && (
        <span className="alert__bell" aria-hidden="true">
          🔔
        </span>
      )}

      {hasBody ? (
        <div className="alert__body">
          {title && <p className="alert__title">{title}</p>}
          {bullets && bullets.length > 0 && (
            <ul className="alert__bullets">
              {bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          )}
          {button && (
            <button
              type="button"
              className="alert__btn alert__btn--outlined"
              onClick={onButtonClick}
            >
              {buttonLabel}
            </button>
          )}
        </div>
      ) : (
        message && <p className="alert__message">{message}</p>
      )}

      {button && !hasBody && (
        <button
          type="button"
          className={`alert__btn ${
            isAlert ? 'alert__btn--inline' : 'alert__btn--outlined'
          }`}
          onClick={onButtonClick}
        >
          {buttonLabel}
        </button>
      )}
    </div>
  )
}

export default Alert

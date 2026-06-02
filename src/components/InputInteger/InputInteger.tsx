import { useId } from 'react'
import { Add, Minus } from 'iconsax-react'
import './InputInteger.css'

interface InputIntegerProps {
  label?: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  helperText?: string
  validation?: 'none' | 'error' | 'success'
  disabled?: boolean
  className?: string
  ariaLabel?: string
}

/**
 * Integer stepper input — DS "Input field / Integer".
 * A bordered field with a minus control, centred value, and a plus control.
 */
function InputInteger({
  label,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  helperText,
  validation = 'none',
  disabled = false,
  className,
  ariaLabel,
}: InputIntegerProps) {
  const id = useId()
  const atMin = min != null && value <= min
  const atMax = max != null && value >= max

  function decrement() {
    if (disabled || atMin) return
    onChange(value - step)
  }

  function increment() {
    if (disabled || atMax) return
    onChange(value + step)
  }

  return (
    <div
      className={`input-integer${validation !== 'none' ? ` input-integer--${validation}` : ''}${
        disabled ? ' input-integer--disabled' : ''
      }${className ? ` ${className}` : ''}`}
    >
      {label && (
        <label className="input-integer__label" htmlFor={id}>
          {label}
        </label>
      )}
      <div className="input-integer__control">
        <button
          type="button"
          className="input-integer__step"
          onClick={decrement}
          disabled={disabled || atMin}
          aria-label="Decrease"
          tabIndex={-1}
        >
          <Minus size={20} color="currentColor" variant="Linear" />
        </button>
        <span
          className="input-integer__value"
          id={id}
          role="spinbutton"
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-label={ariaLabel ?? label}
        >
          {value}
        </span>
        <button
          type="button"
          className="input-integer__step"
          onClick={increment}
          disabled={disabled || atMax}
          aria-label="Increase"
          tabIndex={-1}
        >
          <Add size={20} color="currentColor" variant="Linear" />
        </button>
      </div>
      {helperText && (
        <span className={`input-integer__helper${validation === 'error' ? ' input-integer__helper--error' : ''}`}>
          {helperText}
        </span>
      )}
    </div>
  )
}

export default InputInteger

import { type ReactNode, useEffect, useRef, useState } from 'react'
import { ArrowDown2, TickCircle } from 'iconsax-react'
import './Dropdown.css'

export interface DropdownOption {
  value: string
  label: string
  disabled?: boolean
}

type Size = 'sm' | 'md' | 'lg'

export interface DropdownProps {
  options: DropdownOption[]
  value?: string
  placeholder?: string
  label?: string
  labelPlacement?: 'top' | 'start'
  helperText?: string
  error?: string
  iconLeft?: ReactNode
  readOnly?: boolean
  size?: Size
  onChange?: (value: string) => void
  className?: string
}

function Dropdown({
  options,
  value,
  placeholder = 'Select',
  label,
  labelPlacement = 'top',
  helperText,
  error,
  iconLeft,
  readOnly = false,
  size = 'md',
  onChange,
  className = '',
}: DropdownProps) {
  const [isActive, setIsActive] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsActive(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const selected = options.find((o) => o.value === value)

  return (
    <div
      ref={ref}
      className={[
        'dropdown-field',
        `dropdown-${size}`,
        labelPlacement === 'start' && 'label-start',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {label && <label className="dropdown-label">{label}</label>}

      <button
        type="button"
        className={['dropdown-trigger', isActive && 'is-active', error && 'has-error']
          .filter(Boolean)
          .join(' ')}
        aria-haspopup="listbox"
        aria-expanded={isActive}
        aria-disabled={readOnly}
        disabled={readOnly}
        onClick={() => !readOnly && setIsActive((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setIsActive(false)
        }}
      >
        {iconLeft && <span className="dropdown-trigger-leading">{iconLeft}</span>}
        <span className="dropdown-trigger-text">{selected?.label ?? placeholder}</span>
        <ArrowDown2
          size={size === 'sm' ? 16 : 20}
          color="currentColor"
          variant="Linear"
          className="dropdown-chevron"
        />
      </button>

      {isActive && (
        <ul className="dropdown-menu" role="listbox">
          {options.map((opt) => {
            const isSelected = opt.value === value
            return (
              <li key={opt.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  disabled={opt.disabled}
                  className={[
                    'dropdown-option',
                    isSelected && 'is-selected',
                    opt.disabled && 'is-disabled',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    if (opt.disabled) return
                    onChange?.(opt.value)
                    setIsActive(false)
                  }}
                >
                  <span>{opt.label}</span>
                  {isSelected && (
                    <TickCircle size={16} color="var(--secondary-500)" variant="Bold" />
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      )}

      {(error || helperText) && (
        <span className={`dropdown-helper${error ? ' is-error' : ''}`}>{error || helperText}</span>
      )}
    </div>
  )
}

export default Dropdown

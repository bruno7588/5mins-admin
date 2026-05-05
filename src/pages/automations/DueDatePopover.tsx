import { useEffect, useRef, useState } from 'react'
import { Add, Minus } from 'iconsax-react'
import Radio from '../../components/Radio/Radio'
import type { DueDateConfig } from './Automations'
import './EnrollmentPopover.css'

interface Props {
  value: DueDateConfig
  onChange: (next: DueDateConfig) => void
  onClose: () => void
  anchorRef: React.RefObject<HTMLElement | null>
}

function DueDatePopover({ value, onChange, onClose, anchorRef }: Props) {
  const popoverRef = useRef<HTMLDivElement>(null)
  const [days, setDays] = useState<number>(
    value.kind === 'relative' ? value.daysAfterStart : 0,
  )

  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      const target = e.target as Node
      if (popoverRef.current?.contains(target)) return
      if (anchorRef.current?.contains(target)) return
      onClose()
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('keydown', handleKey)
    }
  }, [anchorRef, onClose])

  const isNone = value.kind === 'none'

  function selectNone() {
    onChange({ kind: 'none' })
  }

  function selectRelative(nextDays = days) {
    const n = Math.max(0, nextDays)
    setDays(n)
    onChange({ kind: 'relative', daysAfterStart: n })
  }

  function changeDays(delta: number) {
    selectRelative(Math.max(0, days + delta))
  }

  return (
    <div ref={popoverRef} className="enrollment-popover" role="dialog">
      <span className="enrollment-popover__caret" aria-hidden="true" />

      <div className="enrollment-popover__group">
        <button
          type="button"
          className="enrollment-popover__option"
          onClick={selectNone}
        >
          <Radio checked={isNone} readOnly tabIndex={-1} />
          <span className="enrollment-popover__option-text">
            <span className="enrollment-popover__option-title">No due date</span>
            <span className="enrollment-popover__option-desc">
              No limit to complete the course
            </span>
          </span>
        </button>
      </div>

      <div className="enrollment-popover__group">
        <button
          type="button"
          className="enrollment-popover__option"
          onClick={() => selectRelative()}
        >
          <Radio checked={!isNone} readOnly tabIndex={-1} />
          <span className="enrollment-popover__option-text">
            <span className="enrollment-popover__option-title">Relative to start date</span>
            <span className="enrollment-popover__option-desc">
              x days after start date
            </span>
          </span>
        </button>

        {!isNone && (
          <div className="enrollment-popover__stepper-row">
            <div className="enrollment-popover__stepper">
              <button
                type="button"
                className="enrollment-popover__stepper-btn"
                onClick={() => changeDays(-1)}
                disabled={days === 0}
                aria-label="Decrease days"
              >
                <Minus size={20} color="currentColor" variant="Linear" />
              </button>
              <input
                type="number"
                className="enrollment-popover__stepper-value"
                value={days}
                onChange={(e) => {
                  const n = Math.max(0, parseInt(e.target.value, 10) || 0)
                  selectRelative(n)
                }}
                min={0}
                aria-label="Days"
              />
              <button
                type="button"
                className="enrollment-popover__stepper-btn"
                onClick={() => changeDays(1)}
                aria-label="Increase days"
              >
                <Add size={20} color="currentColor" variant="Linear" />
              </button>
            </div>
            <span className="enrollment-popover__unit">days</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default DueDatePopover

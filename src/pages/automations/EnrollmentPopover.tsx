import { useEffect, useRef, useState } from 'react'
import { Add, Minus } from 'iconsax-react'
import Radio from '../../components/Radio/Radio'
import type { EnrollmentType } from './Automations'
import './EnrollmentPopover.css'

interface Props {
  value: EnrollmentType
  onChange: (next: EnrollmentType) => void
  onClose: () => void
  anchorRef: React.RefObject<HTMLElement | null>
}

function EnrollmentPopover({ value, onChange, onClose, anchorRef }: Props) {
  const popoverRef = useRef<HTMLDivElement>(null)
  const [days, setDays] = useState<number>(
    value.kind === 'after-delay' ? value.days : 0,
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

  const isImmediate = value.kind === 'immediate'

  function selectImmediate() {
    onChange({ kind: 'immediate' })
  }

  function selectAfterDelay(nextDays = days) {
    const n = Math.max(0, nextDays)
    setDays(n)
    onChange({ kind: 'after-delay', days: n, relativeTo: 'previous-course' })
  }

  function changeDays(delta: number) {
    const next = Math.max(0, days + delta)
    selectAfterDelay(next)
  }

  return (
    <div ref={popoverRef} className="enrollment-popover" role="dialog">
      <span className="enrollment-popover__caret" aria-hidden="true" />

      <div className="enrollment-popover__group">
        <button
          type="button"
          className="enrollment-popover__option"
          onClick={selectImmediate}
        >
          <Radio checked={isImmediate} readOnly tabIndex={-1} />
          <span className="enrollment-popover__option-text">
            <span className="enrollment-popover__option-title">Immediate</span>
            <span className="enrollment-popover__option-desc">
              Enrol user as soon as automation is triggered
            </span>
          </span>
        </button>
      </div>

      <div className="enrollment-popover__group">
        <button
          type="button"
          className="enrollment-popover__option"
          onClick={() => selectAfterDelay()}
        >
          <Radio checked={!isImmediate} readOnly tabIndex={-1} />
          <span className="enrollment-popover__option-text">
            <span className="enrollment-popover__option-title">After delay</span>
            <span className="enrollment-popover__option-desc">
              x days after previous course enrolment
            </span>
          </span>
        </button>

        {!isImmediate && (
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
                  selectAfterDelay(n)
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

export default EnrollmentPopover

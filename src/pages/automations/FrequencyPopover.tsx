import { useEffect, useRef, useState } from 'react'
import { Add, Minus } from 'iconsax-react'
import Radio from '../../components/Radio/Radio'
import Dropdown from '../../components/Dropdown/Dropdown'
import type { RecurrenceConfig, RecurrenceUnit } from './Automations'
import './EnrollmentPopover.css'
import './FrequencyPopover.css'

interface Props {
  value: RecurrenceConfig
  onChange: (next: RecurrenceConfig) => void
  onClose: () => void
  anchorRef: React.RefObject<HTMLElement | null>
}

function FrequencyPopover({ value, onChange, onClose, anchorRef }: Props) {
  const popoverRef = useRef<HTMLDivElement>(null)
  const [interval, setInterval] = useState<number>(
    value.enabled ? value.interval : 0,
  )
  const [unit, setUnit] = useState<RecurrenceUnit>(
    value.enabled ? value.unit : 'months',
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

  const isOneTime = !value.enabled

  function selectOneTime() {
    onChange({ enabled: false })
  }

  function selectRecurring(nextInterval = interval, nextUnit: RecurrenceUnit = unit) {
    const n = Math.max(0, nextInterval)
    setInterval(n)
    setUnit(nextUnit)
    onChange({ enabled: true, interval: n, unit: nextUnit })
  }

  function changeInterval(delta: number) {
    selectRecurring(Math.max(0, interval + delta), unit)
  }

  return (
    <div ref={popoverRef} className="enrollment-popover frequency-popover" role="dialog">
      <span className="enrollment-popover__caret" aria-hidden="true" />

      <div className="enrollment-popover__group">
        <button
          type="button"
          className="enrollment-popover__option"
          onClick={selectOneTime}
        >
          <Radio checked={isOneTime} readOnly tabIndex={-1} />
          <span className="enrollment-popover__option-text">
            <span className="enrollment-popover__option-title">One time only</span>
            <span className="enrollment-popover__option-desc">
              Single enrolment with no repetition
            </span>
          </span>
        </button>
      </div>

      <div className="enrollment-popover__group">
        <button
          type="button"
          className="enrollment-popover__option"
          onClick={() => selectRecurring()}
        >
          <Radio checked={!isOneTime} readOnly tabIndex={-1} />
          <span className="enrollment-popover__option-text">
            <span className="enrollment-popover__option-title">Recurring</span>
            <span className="enrollment-popover__option-desc">
              Re-enrol every x months/weeks after previous enrolment
            </span>
          </span>
        </button>

        {!isOneTime && (
          <div className="enrollment-popover__stepper-row frequency-popover__row">
            <span className="frequency-popover__label">Repeat every</span>
            <div className="enrollment-popover__stepper">
              <button
                type="button"
                className="enrollment-popover__stepper-btn"
                onClick={() => changeInterval(-1)}
                disabled={interval === 0}
                aria-label="Decrease interval"
              >
                <Minus size={20} color="currentColor" variant="Linear" />
              </button>
              <input
                type="number"
                className="enrollment-popover__stepper-value"
                value={interval}
                onChange={(e) => {
                  const n = Math.max(0, parseInt(e.target.value, 10) || 0)
                  selectRecurring(n, unit)
                }}
                min={0}
                aria-label="Interval"
              />
              <button
                type="button"
                className="enrollment-popover__stepper-btn"
                onClick={() => changeInterval(1)}
                aria-label="Increase interval"
              >
                <Add size={20} color="currentColor" variant="Linear" />
              </button>
            </div>
            <Dropdown
              size="sm"
              className="frequency-popover__unit-dropdown"
              options={[
                { value: 'months', label: 'months' },
                { value: 'weeks', label: 'weeks' },
              ]}
              value={unit}
              onChange={(v) => selectRecurring(interval, v as RecurrenceUnit)}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default FrequencyPopover

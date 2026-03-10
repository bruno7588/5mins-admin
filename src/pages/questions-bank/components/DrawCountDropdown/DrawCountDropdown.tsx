import './DrawCountDropdown.css'

interface DrawCountDropdownProps {
  value: number
  max: number
  onChange: (value: number) => void
}

function DrawCountDropdown({ value, max, onChange }: DrawCountDropdownProps) {
  const handleDecrement = () => {
    if (value > 1) onChange(value - 1)
  }

  const handleIncrement = () => {
    if (value < max) onChange(value + 1)
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '')
    if (raw === '') return
    const num = Math.max(1, Math.min(parseInt(raw, 10), max))
    onChange(num)
  }

  return (
    <div className="draw-count-stepper">
      <button
        className="draw-count-stepper-btn"
        onClick={handleDecrement}
        disabled={value <= 1}
        aria-label="Decrease"
      >
        <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
          <line x1="5.25" y1="10.5" x2="15.75" y2="10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </button>
      <input
        className="draw-count-stepper-input"
        type="text"
        inputMode="numeric"
        value={value}
        onChange={handleInput}
        aria-label="Questions per quiz"
      />
      <button
        className="draw-count-stepper-btn"
        onClick={handleIncrement}
        disabled={value >= max}
        aria-label="Increase"
      >
        <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
          <line x1="5.25" y1="10.5" x2="15.75" y2="10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          <line x1="10.5" y1="5.25" x2="10.5" y2="15.75" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  )
}

export default DrawCountDropdown

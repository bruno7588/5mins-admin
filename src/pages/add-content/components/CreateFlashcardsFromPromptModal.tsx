import { useEffect, useRef, useState } from 'react'
import { Magicpen } from 'iconsax-react'
import ConfirmModal from '../../../components/ConfirmModal/ConfirmModal'
import CloseButton from '../../../components/CloseButton/CloseButton'
import Chip from '../../../components/Chip/Chip'
import Dropdown, { type DropdownOption } from '../../../components/Dropdown/Dropdown'
import './CreateFlashcardsFromPromptModal.css'

interface CreateFlashcardsFromPromptModalProps {
  open: boolean
  onClose: () => void
  onGenerate: (prompt: string, numCards: number) => void
}

const MIN_PROMPT_CHARS = 15

const suggestions: { label: string; prompt: string }[] = [
  { label: 'GDPR basics', prompt: 'A lesson on GDPR basics for all employees, covering core principles, data subject rights, and common workplace scenarios.' },
  { label: 'Anti-bribery', prompt: 'A lesson on anti-bribery and corruption compliance, covering red flags, gifts and hospitality, and how to report concerns.' },
  { label: 'Workplace harassment', prompt: 'A lesson on preventing workplace harassment, covering what counts as harassment, bystander intervention, and reporting channels.' },
]

const cardCountOptions: DropdownOption[] = Array.from({ length: 8 }, (_, i) => {
  const n = i + 3
  return { value: String(n), label: `${n} cards` }
})

function CreateFlashcardsFromPromptModal({ open, onClose, onGenerate }: CreateFlashcardsFromPromptModalProps) {
  const [prompt, setPrompt] = useState('')
  const [numCards, setNumCards] = useState(6)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (open) {
      setPrompt('')
      setNumCards(6)
      requestAnimationFrame(() => textareaRef.current?.focus())
    }
  }, [open])

  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 320)}px`
  }, [prompt, open])

  const canSubmit = prompt.trim().length >= MIN_PROMPT_CHARS

  const handleChipClick = (value: string) => {
    setPrompt(value)
    requestAnimationFrame(() => textareaRef.current?.focus())
  }

  const handleSubmit = () => {
    if (!canSubmit) return
    onGenerate(prompt.trim(), numCards)
  }

  return (
    <ConfirmModal open={open} onClose={onClose} className="cfpm-modal">
      <div className="cfpm-header">
        <h2 className="cfpm-title">What would you like to teach?</h2>
        <CloseButton onClick={onClose} />
      </div>

      <textarea
        ref={textareaRef}
        className="cfpm-textarea"
        placeholder="e.g., A 6-card lesson on giving constructive feedback for first-time managers"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={5}
      />

      <div className="cfpm-chips">
        <span className="cfpm-chips-label">Try one of these</span>
        <div className="cfpm-chips-row">
          {suggestions.map((s) => (
            <Chip key={s.label} label={s.label} onClick={() => handleChipClick(s.prompt)} />
          ))}
        </div>
      </div>

      <div className="cfpm-footer">
        <Dropdown
          label="Number of cards"
          labelPlacement="start"
          size="sm"
          options={cardCountOptions}
          value={String(numCards)}
          onChange={(v) => setNumCards(Number(v))}
        />
        <button
          type="button"
          className="btn-primary cfpm-generate"
          disabled={!canSubmit}
          onClick={handleSubmit}
        >
          <Magicpen size={18} color="currentColor" variant="Linear" />
          Generate
        </button>
      </div>
    </ConfirmModal>
  )
}

export default CreateFlashcardsFromPromptModal

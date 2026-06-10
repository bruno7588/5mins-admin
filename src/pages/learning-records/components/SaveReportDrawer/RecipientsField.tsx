import { useEffect, useMemo, useRef, useState } from 'react'
import { searchOrgUsers } from '../../../../utils/orgUsers'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const isValidEmail = (v: string) => EMAIL_RE.test(v.trim())

interface RecipientsFieldProps {
  /** Recipient emails already added (rendered as chips). */
  recipients: string[]
  onChange: (recipients: string[]) => void
  /** Form-level error (e.g. "add at least one recipient"), shown beneath. */
  error?: string
}

const MAX_SUGGESTIONS = 6

/**
 * Token/chip recipient input. Type to autocomplete from registered users, or
 * type any email and press Enter/comma to add it. Backspace on an empty input
 * removes the last chip.
 */
function RecipientsField({ recipients, onChange, error }: RecipientsFieldProps) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [invalid, setInvalid] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const suggestions = useMemo(
    () => searchOrgUsers(query, recipients).slice(0, MAX_SUGGESTIONS),
    [query, recipients],
  )

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  useEffect(() => {
    if (!open) return
    function onClickOutside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [open])

  function addEmail(email: string) {
    const e = email.trim().toLowerCase()
    if (!isValidEmail(e)) {
      setInvalid(true)
      return
    }
    if (!recipients.some((r) => r.toLowerCase() === e)) onChange([...recipients, e])
    setQuery('')
    setInvalid(false)
    setOpen(false)
  }

  function removeAt(i: number) {
    onChange(recipients.filter((_, idx) => idx !== i))
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if ((e.key === 'Enter' || e.key === ',') && (query.trim() || suggestions[activeIndex])) {
      e.preventDefault()
      if (open && suggestions[activeIndex]) addEmail(suggestions[activeIndex].email)
      else addEmail(query)
      return
    }
    if (e.key === 'Backspace' && !query && recipients.length) {
      removeAt(recipients.length - 1)
      return
    }
    if (e.key === 'ArrowDown' && suggestions.length) {
      e.preventDefault()
      setOpen(true)
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1))
      return
    }
    if (e.key === 'ArrowUp' && suggestions.length) {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
      return
    }
    if (e.key === 'Escape') setOpen(false)
  }

  const showError = error || (invalid ? 'Enter a valid email address.' : undefined)

  return (
    <div className="rcp-field" ref={wrapRef}>
      <div
        className={`rcp${showError ? ' rcp--error' : ''}`}
        onClick={() => inputRef.current?.focus()}
      >
        {recipients.map((email, i) => (
          <span className="rcp-chip" key={email}>
            <span className="rcp-chip-label">{email}</span>
            <button
              type="button"
              className="rcp-chip-remove"
              aria-label={`Remove ${email}`}
              onClick={(ev) => {
                ev.stopPropagation()
                removeAt(i)
              }}
            >
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M14 6L6 14M6 6L14 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          className="rcp-input"
          placeholder={recipients.length ? '' : 'Search people or type an email'}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
            setInvalid(false)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
        />
      </div>

      {open && suggestions.length > 0 && (
        <ul className="rcp-menu" role="listbox">
          {suggestions.map((u, i) => (
            <li key={u.email}>
              <button
                type="button"
                role="option"
                aria-selected={i === activeIndex}
                className={`rcp-option${i === activeIndex ? ' is-active' : ''}`}
                onMouseDown={(e) => e.preventDefault()}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => addEmail(u.email)}
              >
                <span className="rcp-option-email">{u.email}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {showError && <span className="rcp-helper">{showError}</span>}
    </div>
  )
}

export default RecipientsField

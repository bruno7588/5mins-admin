import { useEffect, useMemo, useRef, useState, type RefObject } from 'react'
import { Add, Bookmark, SearchNormal1, Star1 } from 'iconsax-react'
import type { FilterPreset } from '../../../../utils/lrSavedFilters'
import { DEFAULT_PRESETS } from '../../../../utils/lrSavedFilters'
import './PresetsMenu.css'

interface PresetsMenuProps {
  open: boolean
  onClose: () => void
  anchorRef: RefObject<HTMLElement | null>
  /** User-saved presets (defaults are added internally). */
  presets: FilterPreset[]
  /** True when there are active filters that can be saved. */
  canSave: boolean
  onApply: (preset: FilterPreset) => void
  onSave: (name: string) => void
  onDelete: (id: string) => void
}

function filterCountLabel(n: number): string {
  return `${n} filter${n === 1 ? '' : 's'}`
}

function PresetsMenu({ open, onClose, anchorRef, presets, canSave, onApply, onSave, onDelete }: PresetsMenuProps) {
  const [query, setQuery] = useState('')
  const [saving, setSaving] = useState(false)
  const [name, setName] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handleClickOutside(e: MouseEvent) {
      const anchor = anchorRef.current
      if (anchor && !anchor.contains(e.target as Node)) onClose()
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open, onClose, anchorRef])

  // Reset transient state each time it opens
  useEffect(() => {
    if (open) {
      setQuery('')
      setSaving(false)
      setName('')
    }
  }, [open])

  const q = query.trim().toLowerCase()
  const suggested = useMemo(
    () => DEFAULT_PRESETS.filter((p) => p.name.toLowerCase().includes(q)),
    [q],
  )
  const mine = useMemo(
    () => presets.filter((p) => p.name.toLowerCase().includes(q)),
    [presets, q],
  )

  if (!open) return null

  const isEmpty = suggested.length === 0 && mine.length === 0

  function commitSave() {
    const trimmed = name.trim()
    if (!trimmed) return
    onSave(trimmed)
    setSaving(false)
    setName('')
  }

  return (
    <div className="pm" ref={ref} role="dialog" aria-label="Filter presets">
      <div className="pm-search">
        <SearchNormal1 size={20} color="var(--text-tertiary)" variant="Linear" />
        <input
          type="text"
          className="pm-search-input"
          placeholder="Search presets"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
      </div>

      <div className="pm-list">
        {suggested.length > 0 && (
          <div className="pm-group">
            <div className="pm-section">Suggested</div>
            {suggested.map((p) => (
              <button type="button" className="pm-item" key={p.id} onClick={() => onApply(p)}>
                <span className="pm-item-icon">
                  <Star1 size={20} color="var(--text-secondary)" variant="Linear" />
                </span>
                <span className="pm-item-text">
                  <span className="pm-item-title">{p.name}</span>
                  <span className="pm-item-desc">{filterCountLabel(p.filters.length)}</span>
                </span>
              </button>
            ))}
          </div>
        )}

        {mine.length > 0 && (
          <div className="pm-group">
            {suggested.length > 0 && <div className="pm-divider" />}
            <div className="pm-section">Your presets</div>
            {mine.map((p) => (
              <div className="pm-item pm-item--row" key={p.id}>
                <button type="button" className="pm-item-main" onClick={() => onApply(p)}>
                  <span className="pm-item-icon">
                    <Bookmark size={20} color="var(--text-secondary)" variant="Linear" />
                  </span>
                  <span className="pm-item-text">
                    <span className="pm-item-title">{p.name}</span>
                    <span className="pm-item-desc">{filterCountLabel(p.filters.length)}</span>
                  </span>
                </button>
                <button
                  type="button"
                  className="pm-item-remove"
                  aria-label={`Delete ${p.name} preset`}
                  onClick={() => onDelete(p.id)}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M11 5L5 11M5 5L11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {isEmpty && <div className="pm-empty">No presets match “{query}”.</div>}
      </div>

      {/* Save current filters */}
      <div className="pm-footer">
        {saving ? (
          <div className="pm-save-row">
            <input
              type="text"
              className="pm-save-input"
              placeholder="Preset name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') commitSave()
                if (e.key === 'Escape') setSaving(false)
              }}
              autoFocus
            />
            <button type="button" className="pm-save-confirm" disabled={!name.trim()} onClick={commitSave}>
              Save
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="pm-save-trigger"
            disabled={!canSave}
            onClick={() => setSaving(true)}
          >
            <Add size={20} color={canSave ? 'var(--primary-600)' : 'var(--text-disabled)'} variant="Linear" />
            Save Current Filters As Preset
          </button>
        )}
      </div>
    </div>
  )
}

export default PresetsMenu

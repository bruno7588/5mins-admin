import { useEffect, useMemo, useRef, useState, type RefObject } from 'react'
import { Add, SearchNormal1 } from 'iconsax-react'
import { frequencyLabel, type SavedReport } from '../../../../utils/lrSavedFilters'
import './ReportsMenu.css'

interface ReportsMenuProps {
  open: boolean
  onClose: () => void
  anchorRef: RefObject<HTMLElement | null>
  reports: SavedReport[]
  onCreate: () => void
  onEdit: (report: SavedReport) => void
  onDelete: (id: string) => void
}

function summary(r: SavedReport): string {
  const cadence = r.automate ? frequencyLabel(r.frequency) : 'Not automated'
  const n = r.recipients.length
  return `${cadence} · ${n} recipient${n === 1 ? '' : 's'}`
}

function ReportsMenu({ open, onClose, anchorRef, reports, onCreate, onEdit, onDelete }: ReportsMenuProps) {
  const [query, setQuery] = useState('')
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

  useEffect(() => {
    if (open) setQuery('')
  }, [open])

  const q = query.trim().toLowerCase()
  const filtered = useMemo(
    () => reports.filter((r) => r.name.toLowerCase().includes(q)),
    [reports, q],
  )

  if (!open) return null

  return (
    <div className="rm" ref={ref} role="dialog" aria-label="Saved reports">
      <div className="rm-search">
        <SearchNormal1 size={20} color="var(--text-tertiary)" variant="Linear" />
        <input
          type="text"
          className="rm-search-input"
          placeholder="Search reports"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
      </div>

      <div className="rm-list">
        {filtered.map((r) => (
          <div className="rm-item" key={r.id}>
            <button type="button" className="rm-item-main" onClick={() => onEdit(r)}>
              <span className={`rm-dot${r.automate ? ' rm-dot--on' : ''}`} aria-hidden="true" />
              <span className="rm-item-text">
                <span className="rm-item-title">{r.name}</span>
                <span className="rm-item-desc">{summary(r)}</span>
              </span>
            </button>
            <button
              type="button"
              className="rm-item-remove"
              aria-label={`Delete ${r.name}`}
              onClick={() => onDelete(r.id)}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M11 5L5 11M5 5L11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="rm-empty">
            {reports.length === 0 ? 'No saved reports yet.' : `No reports match “${query}”.`}
          </div>
        )}
      </div>

      <div className="rm-footer">
        <button type="button" className="rm-create" onClick={onCreate}>
          <Add size={20} color="var(--primary-600)" variant="Linear" />
          Create Report
        </button>
      </div>
    </div>
  )
}

export default ReportsMenu

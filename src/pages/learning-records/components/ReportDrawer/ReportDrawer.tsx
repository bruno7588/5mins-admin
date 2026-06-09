import { useEffect, useState } from 'react'
import { Add, Notification } from 'iconsax-react'
import CloseButton from '../../../../components/CloseButton/CloseButton'
import InputField from '../../../../components/InputField/InputField'
import Dropdown from '../../../../components/Dropdown/Dropdown'
import Toggle from '../../../../components/Toggle/Toggle'
import {
  REPORT_FREQUENCIES,
  nextReportLabel,
  type FilterEntry,
  type SavedReport,
} from '../../../../utils/lrSavedFilters'
import './ReportDrawer.css'

interface ReportDrawerProps {
  open: boolean
  onClose: () => void
  onSave: (report: SavedReport) => void
  /** Existing report when editing; null/undefined when creating. */
  initial?: SavedReport | null
  /** Snapshot of the page's active filters, used when creating a new report. */
  currentFilters: FilterEntry[]
  /** Renders a human label for a filter entry (id + value). */
  filterLabel: (entry: FilterEntry) => string
}

const FREQ_OPTIONS = REPORT_FREQUENCIES.map((f) => ({ value: f.value, label: f.label }))

function ReportDrawer({ open, onClose, onSave, initial, currentFilters, filterLabel }: ReportDrawerProps) {
  const isEditing = !!initial
  const [closing, setClosing] = useState(false)

  const [name, setName] = useState('')
  const [frequency, setFrequency] = useState('monthly')
  const [automate, setAutomate] = useState(true)
  const [recipients, setRecipients] = useState<string[]>([''])
  const [filters, setFilters] = useState<FilterEntry[]>([])

  useEffect(() => {
    if (!open) return
    if (initial) {
      setName(initial.name)
      setFrequency(initial.frequency)
      setAutomate(initial.automate)
      setRecipients(initial.recipients.length ? initial.recipients : [''])
      setFilters(initial.filters)
    } else {
      setName('')
      setFrequency('monthly')
      setAutomate(true)
      setRecipients([''])
      setFilters(currentFilters)
    }
  }, [open, initial, currentFilters])

  const handleClose = () => {
    setClosing(true)
    setTimeout(() => {
      setClosing(false)
      onClose()
    }, 300)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  if (!open) return null

  const canSave = name.trim().length > 0

  function updateRecipient(i: number, value: string) {
    setRecipients((prev) => prev.map((r, idx) => (idx === i ? value : r)))
  }
  function removeRecipient(i: number) {
    setRecipients((prev) => (prev.length === 1 ? [''] : prev.filter((_, idx) => idx !== i)))
  }
  function addRecipient() {
    setRecipients((prev) => [...prev, ''])
  }

  function handleSave() {
    if (!canSave) return
    const report: SavedReport = {
      id: initial?.id ?? `report-${Date.now()}`,
      name: name.trim(),
      filters,
      recipients: recipients.map((r) => r.trim()).filter(Boolean),
      frequency,
      automate,
      createdAt: initial?.createdAt ?? new Date().toISOString(),
    }
    onSave(report)
  }

  return (
    <>
      <div
        className={`overlay-backdrop${closing ? ' overlay-backdrop--closing' : ''}`}
        onClick={handleClose}
        aria-hidden="true"
      />
      <aside
        className={`side-drawer${closing ? ' side-drawer--closing' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-drawer-title"
      >
        <div className="side-drawer__header">
          <div className="side-drawer__headline">
            <div className="rd-header-text">
              <h2 id="report-drawer-title" className="rd-title">
                {isEditing ? 'Edit report automation' : 'Automate report'}
              </h2>
              <p className="rd-subtitle">Receive scheduled email reports for this filter view.</p>
            </div>
            <CloseButton onClick={handleClose} />
          </div>
          <div className="modal__divider" />
        </div>

        <div className="side-drawer__content">
          <div className="rd-form">
            {/* Status banner */}
            <div className="rd-banner">
              <span className="rd-banner-icon">
                <Notification size={24} color="var(--text-warning)" variant="Bold" />
              </span>
              <span className="rd-banner-text">
                <span className="rd-banner-label">Next report</span>
                <span className="rd-banner-value">
                  {automate ? nextReportLabel(frequency) : 'Not scheduled'}
                </span>
              </span>
              <span className="rd-banner-toggle">
                <span className={`rd-banner-status${automate ? ' rd-banner-status--on' : ''}`}>
                  Automate Reports: {automate ? 'ON' : 'OFF'}
                </span>
                <Toggle checked={automate} onChange={(e) => setAutomate(e.target.checked)} />
              </span>
            </div>

            {/* Name */}
            <InputField
              label="Report name"
              placeholder="e.g. Weekly overdue learners"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* Filter basis */}
            <div className="rd-field">
              <label className="rd-label">Based on filters</label>
              {filters.length > 0 ? (
                <div className="rd-filter-chips">
                  {filters.map((f) => (
                    <span className="rd-filter-chip" key={f.id}>
                      {filterLabel(f)}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="rd-hint">All learning records (no filters applied).</p>
              )}
            </div>

            {/* Frequency */}
            <Dropdown
              label="How often should we email the report?"
              options={FREQ_OPTIONS}
              value={frequency}
              onChange={setFrequency}
            />

            {/* Recipients */}
            <div className="rd-field">
              <label className="rd-label">Send reports to</label>
              <div className="rd-recipients">
                {recipients.map((email, i) => (
                  <div className="rd-recipient-row" key={i}>
                    <input
                      type="email"
                      className="rd-recipient-input"
                      placeholder="name@email.com"
                      value={email}
                      onChange={(e) => updateRecipient(i, e.target.value)}
                    />
                    <button
                      type="button"
                      className="rd-recipient-remove"
                      aria-label="Remove recipient"
                      onClick={() => removeRecipient(i)}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M11 5L5 11M5 5L11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              <button type="button" className="rd-add-email" onClick={addRecipient}>
                Add Email
                <Add size={20} color="var(--primary-600)" variant="Linear" />
              </button>
            </div>
          </div>
        </div>

        <div className="side-drawer__footer">
          <div className="side-drawer__footer-divider" />
          <div className="side-drawer__buttons">
            <button type="button" className="side-drawer__btn-primary" disabled={!canSave} onClick={handleSave}>
              {isEditing ? 'Update Report' : 'Create Report'}
            </button>
            <button type="button" className="side-drawer__btn-secondary" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

export default ReportDrawer

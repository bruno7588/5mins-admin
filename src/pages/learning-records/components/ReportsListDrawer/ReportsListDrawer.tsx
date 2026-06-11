import { useEffect, useRef, useState } from 'react'
import { DocumentDownload, Edit2, Eye, Danger, Trash } from 'iconsax-react'
import CloseButton from '../../../../components/CloseButton/CloseButton'
import Toggle from '../../../../components/Toggle/Toggle'
import ConfirmModal from '../../../../components/ConfirmModal/ConfirmModal'
import MoreIcon from '../../../../components/icons/MoreIcon'
import { cadenceSummary, type SavedReport } from '../../../../utils/lrSavedFilters'
import './ReportsListDrawer.css'

interface ReportsListDrawerProps {
  open: boolean
  onClose: () => void
  reports: SavedReport[]
  /** Open the Save Report drawer in edit mode. */
  onEdit: (r: SavedReport) => void
  /** Apply the report's filters to the table (and close the drawer). */
  onApply: (r: SavedReport) => void
  onDelete: (id: string) => void
  /** Open the drawer with scheduling engaged (for an unscheduled report). */
  onSchedule: (r: SavedReport) => void
  /** Pause/resume a scheduled report. */
  onToggle: (r: SavedReport, enabled: boolean) => void
  /** Download the report now. */
  onDownload: (r: SavedReport) => void
}

function ReportsListDrawer({
  open,
  onClose,
  reports,
  onEdit,
  onApply,
  onDelete,
  onSchedule,
  onToggle,
  onDownload,
}: ReportsListDrawerProps) {
  const [closing, setClosing] = useState(false)
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<SavedReport | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

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

  // Close the kebab menu on outside click.
  useEffect(() => {
    if (menuOpenId === null) return
    const onClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpenId(null)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [menuOpenId])

  if (!open) return null

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
        aria-labelledby="reports-list-title"
      >
        <div className="side-drawer__header">
          <div className="side-drawer__headline">
            <div className="rl-header-text">
              <h2 id="reports-list-title" className="rl-title">Reports</h2>
              <p className="rl-subtitle">Reports are saved from the current filtered table view.</p>
            </div>
            <CloseButton onClick={handleClose} />
          </div>
          <div className="modal__divider" />
        </div>

        <div className="side-drawer__content">
          {reports.length === 0 ? (
            <p className="rl-empty">No saved reports yet. Build a filter view and choose “Save Report”.</p>
          ) : (
            <div className="rl-list">
              {reports.map((r) => {
                const enabled = r.enabled !== false
                return (
                  <div className={`rl-item${r.scheduled && !enabled ? ' rl-item--off' : ''}`} key={r.id}>
                    <div className="rl-item-main">
                      <button
                        type="button"
                        className="rl-item-title"
                        onClick={() => onEdit(r)}
                      >
                        {r.name}
                      </button>
                      <span className={`rl-item-desc${r.scheduled ? '' : ' rl-item-desc--muted'}`}>
                        {cadenceSummary(r)}
                      </span>
                    </div>

                    <div className="rl-item-actions">
                      {r.scheduled ? (
                        <Toggle
                          className="rl-toggle"
                          checked={enabled}
                          size="sm"
                          label={enabled ? 'Scheduled' : 'Paused'}
                          labelPosition="left"
                          aria-label={`${enabled ? 'Pause' : 'Resume'} ${r.name}`}
                          onChange={(e) => onToggle(r, e.target.checked)}
                        />
                      ) : (
                        <button
                          type="button"
                          className="rl-schedule-btn"
                          onClick={() => onSchedule(r)}
                        >
                          Schedule
                        </button>
                      )}

                      <button
                        type="button"
                        className="rl-icon-btn"
                        aria-label={`Download ${r.name}`}
                        onClick={() => onDownload(r)}
                      >
                        <DocumentDownload size={18} color="var(--text-secondary)" variant="Linear" />
                      </button>

                      <div
                        className="rl-more-wrapper"
                        ref={menuOpenId === r.id ? menuRef : undefined}
                      >
                        <button
                          type="button"
                          className="rl-icon-btn"
                          aria-label={`More options for ${r.name}`}
                          aria-haspopup="menu"
                          aria-expanded={menuOpenId === r.id}
                          onClick={() => setMenuOpenId(menuOpenId === r.id ? null : r.id)}
                        >
                          <MoreIcon size={20} color="var(--text-secondary)" />
                        </button>
                        {menuOpenId === r.id && (
                          <div className="rl-menu" role="menu">
                            <button
                              type="button"
                              role="menuitem"
                              className="rl-menu-item"
                              onClick={() => {
                                setMenuOpenId(null)
                                onEdit(r)
                              }}
                            >
                              <Edit2 size={18} color="var(--text-secondary)" variant="Linear" />
                              Edit Report
                            </button>
                            <button
                              type="button"
                              role="menuitem"
                              className="rl-menu-item"
                              onClick={() => {
                                setMenuOpenId(null)
                                onApply(r)
                                handleClose()
                              }}
                            >
                              <Eye size={18} color="var(--text-secondary)" variant="Linear" />
                              View in Table
                            </button>
                            <button
                              type="button"
                              role="menuitem"
                              className="rl-menu-item rl-menu-item--danger"
                              onClick={() => {
                                setMenuOpenId(null)
                                setConfirmDelete(r)
                              }}
                            >
                              <Trash size={18} color="var(--danger-500)" variant="Linear" />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </aside>

      <ConfirmModal open={!!confirmDelete} onClose={() => setConfirmDelete(null)}>
        {confirmDelete && (
          <>
            <div className="confirm-modal-header confirm-modal-header--center">
              <div className="confirm-modal-icon">
                <Danger size={72} color="var(--danger-500)" variant="Linear" />
              </div>
              <h2 className="confirm-modal-title">Delete report</h2>
              <p className="confirm-modal-body">
                “{confirmDelete.name}” will be removed{confirmDelete.scheduled ? ', and its scheduled emails will stop' : ''}. This can’t be undone.
              </p>
            </div>
            <div className="confirm-modal-actions">
              <button
                className="confirm-modal-btn confirm-modal-btn--outlined"
                onClick={() => setConfirmDelete(null)}
              >
                Cancel
              </button>
              <button
                className="confirm-modal-btn confirm-modal-btn--danger"
                onClick={() => {
                  onDelete(confirmDelete.id)
                  setConfirmDelete(null)
                }}
              >
                Delete Report
              </button>
            </div>
          </>
        )}
      </ConfirmModal>
    </>
  )
}

export default ReportsListDrawer

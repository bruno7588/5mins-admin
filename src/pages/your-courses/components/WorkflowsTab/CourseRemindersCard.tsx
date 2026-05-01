import { useMemo, useState } from 'react'
import { Add, Danger, Edit2, InfoCircle, Trash } from 'iconsax-react'
import Toggle from '../../../../components/Toggle/Toggle'
import Badge from '../../../../components/Badge/Badge'
import Tooltip from '../../../../components/Tooltip/Tooltip'
import ConfirmModal from '../../../../components/ConfirmModal/ConfirmModal'
import ToastContainer, { useToast } from '../../../../components/Toast/Toast'
import EditReminderModal, { type ReminderDraft } from './EditReminderModal'

export interface Reminder {
  id: string
  days: number
  subject: string
  body: string
}

interface Props {
  enabled: boolean
  reminders: Reminder[]
  lastSent?: string
  onToggle: () => void
  onChange: (reminders: Reminder[]) => void
}

const DEFAULT_COPY = {
  subject: 'Reminder: your course is due soon',
  body: "Hi there,\nA quick reminder that your assigned course is coming up. Just 5 minutes now and you're done.\nThanks!",
}

let nextId = 0
const newId = () => `r_${Date.now()}_${nextId++}`

type ModalState = { mode: 'add' } | { mode: 'edit'; id: string } | null

function CourseRemindersCard({ enabled, reminders, lastSent, onToggle, onChange }: Props) {
  const [modal, setModal] = useState<ModalState>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const { toasts, show: showToast } = useToast()

  const sorted = useMemo(
    () => [...reminders].sort((a, b) => b.days - a.days),
    [reminders],
  )
  const deleting = sorted.find((r) => r.id === deletingId) ?? null
  const editing = modal?.mode === 'edit' ? reminders.find((r) => r.id === modal.id) ?? null : null

  const initial: ReminderDraft | undefined = useMemo(() => {
    if (!modal) return undefined
    if (modal.mode === 'edit' && editing) {
      return { days: editing.days, subject: editing.subject, body: editing.body }
    }
    // Add mode — pick first available default day, prefill with default copy
    const used = new Set(reminders.map((r) => r.days))
    const fallback = [3, 5, 14, 2, 10, 21, 30].find((d) => !used.has(d)) ?? 3
    return { days: fallback, ...DEFAULT_COPY }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal])

  const takenDays = useMemo(() => {
    const ids = new Set(reminders.map((r) => r.id))
    if (modal?.mode === 'edit') ids.delete(modal.id)
    return new Set(reminders.filter((r) => ids.has(r.id)).map((r) => r.days))
  }, [reminders, modal])

  const handleSave = (data: ReminderDraft) => {
    if (modal?.mode === 'edit') {
      onChange(reminders.map((r) => (r.id === modal.id ? { ...r, ...data } : r)))
      showToast('success', 'Reminder updated')
    } else {
      onChange([...reminders, { id: newId(), ...data }])
      showToast('success', 'Reminder added')
    }
    setModal(null)
  }

  const handleRemove = (id: string) => {
    onChange(reminders.filter((r) => r.id !== id))
  }

  const rulesClass = `workflow-card__rules${enabled ? '' : ' workflow-card__rules--disabled'}`

  return (
    <article className="workflow-card">
      <header className="workflow-card__header">
        <div className="workflow-card__headline">
          <h3 className="workflow-card__title">Course reminders</h3>
          <p className="workflow-card__desc">
            Send automatic reminders to learners before a course's due date. These defaults apply to every course.
          </p>
        </div>
        <Toggle checked={enabled} onChange={onToggle} />
      </header>

      <ul className={rulesClass}>
        {sorted.map((r) => (
          <li key={r.id} className="course-reminders-row-wrapper">
            <div className="course-reminders-row">
              <span className="course-reminders-row__text">Send email</span>
              <span className="course-reminders-row__badge">
                {r.days} {r.days === 1 ? 'day' : 'days'}
              </span>
              <span className="course-reminders-row__text course-reminders-row__text--grow">
                before due date
              </span>
              <span className="course-reminders-row__actions">
                <Tooltip text="Edit reminder" icon={false} disabled={!enabled}>
                  <button
                    type="button"
                    className="course-reminders-row__icon-btn"
                    onClick={() => setModal({ mode: 'edit', id: r.id })}
                    disabled={!enabled}
                    aria-label="Edit reminder"
                  >
                    <Edit2 size={16} color="currentColor" variant="Linear" />
                  </button>
                </Tooltip>
                <Tooltip text="Delete reminder" icon={false} disabled={!enabled}>
                  <button
                    type="button"
                    className="course-reminders-row__icon-btn course-reminders-row__icon-btn--danger"
                    onClick={() => setDeletingId(r.id)}
                    disabled={!enabled}
                    aria-label="Delete reminder"
                  >
                    <Trash size={16} color="currentColor" variant="Linear" />
                  </button>
                </Tooltip>
              </span>
            </div>
          </li>
        ))}

        {enabled && (
          <li className="course-reminders-add">
            <button
              type="button"
              className="course-reminders-add__btn"
              onClick={() => setModal({ mode: 'add' })}
            >
              <Add size={20} color="currentColor" variant="Linear" />
              Add Reminder
            </button>
          </li>
        )}
      </ul>

      <div
        className={`workflow-card__collapsible${enabled ? ' workflow-card__collapsible--open' : ''}`}
        aria-hidden={!enabled}
      >
        <div className="workflow-card__collapsible-inner">
          <footer className="workflow-card__footer">
            <p className="workflow-card__info">
              <InfoCircle size={16} color="currentColor" variant="Linear" />
              <span>
                Reminders are sent by email at 9:00 AM UTC on the scheduled day. Applies to every course.
              </span>
            </p>
            {lastSent && (
              <Badge
                type="informative"
                label={lastSent}
                className="workflow-card__last-sent-badge"
              />
            )}
          </footer>
        </div>
      </div>

      <EditReminderModal
        open={modal !== null}
        mode={modal?.mode === 'edit' ? 'edit' : 'add'}
        initial={initial}
        takenDays={takenDays}
        onClose={() => setModal(null)}
        onSave={handleSave}
      />

      <ConfirmModal open={deleting !== null} onClose={() => setDeletingId(null)}>
        {deleting && (
          <>
            <div className="confirm-modal-header confirm-modal-header--center">
              <div className="confirm-modal-icon">
                <Danger size={72} color="var(--danger-500)" variant="Linear" />
              </div>
              <h2 className="confirm-modal-title">Delete reminder</h2>
              <p className="confirm-modal-body">
                This reminder will be removed.
              </p>
            </div>
            <div className="confirm-modal-actions confirm-modal-actions--center">
              <button
                className="confirm-modal-btn confirm-modal-btn--outlined-neutral"
                onClick={() => setDeletingId(null)}
              >
                Cancel
              </button>
              <button
                className="confirm-modal-btn confirm-modal-btn--danger"
                onClick={() => {
                  handleRemove(deleting.id)
                  setDeletingId(null)
                  showToast('success', 'Reminder deleted')
                }}
              >
                Delete
              </button>
            </div>
          </>
        )}
      </ConfirmModal>

      <ToastContainer toasts={toasts} />
    </article>
  )
}

export default CourseRemindersCard

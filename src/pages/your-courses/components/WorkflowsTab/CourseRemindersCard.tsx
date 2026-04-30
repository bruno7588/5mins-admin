import { useMemo, useState } from 'react'
import { Add, Danger, Edit2, InfoCircle, Minus, Trash } from 'iconsax-react'
import Toggle from '../../../../components/Toggle/Toggle'
import Badge from '../../../../components/Badge/Badge'
import Tooltip from '../../../../components/Tooltip/Tooltip'
import ConfirmModal from '../../../../components/ConfirmModal/ConfirmModal'
import ToastContainer, { useToast } from '../../../../components/Toast/Toast'
import EditReminderModal from './EditReminderModal'

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

const MIN_DAYS = 1
const MAX_DAYS = 30

function defaultCopy(days: number): { subject: string; body: string } {
  if (days === 1) {
    return {
      subject: 'Last call — your course is due tomorrow',
      body: 'Hi there,\nYour assigned course is due tomorrow. Please take 5 minutes today to wrap it up.\nThanks!',
    }
  }
  if (days === 7) {
    return {
      subject: 'Heads up — your course is due in a week',
      body: "Hi there,\nA quick reminder that your assigned course is due in 7 days. Just 5 minutes now and you're done.\nThanks!",
    }
  }
  return {
    subject: `Reminder: your course is due in ${days} days`,
    body: `Hi there,\nA quick reminder that your assigned course is due in ${days} days. Just 5 minutes now and you're done.\nThanks!`,
  }
}

let nextId = 0
const newId = () => `r_${Date.now()}_${nextId++}`

function CourseRemindersCard({ enabled, reminders, lastSent, onToggle, onChange }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const { toasts, show: showToast } = useToast()

  const sorted = useMemo(
    () => [...reminders].sort((a, b) => b.days - a.days),
    [reminders],
  )
  const duplicateDays = useMemo(() => {
    const counts = new Map<number, number>()
    for (const r of reminders) counts.set(r.days, (counts.get(r.days) ?? 0) + 1)
    return new Set(
      Array.from(counts.entries())
        .filter(([, n]) => n > 1)
        .map(([d]) => d),
    )
  }, [reminders])
  const editing = sorted.find((r) => r.id === editingId) ?? null
  const deleting = sorted.find((r) => r.id === deletingId) ?? null

  const setDays = (id: string, days: number) => {
    const clamped = Math.min(MAX_DAYS, Math.max(MIN_DAYS, days))
    onChange(reminders.map((r) => (r.id === id ? { ...r, days: clamped } : r)))
  }

  const handleDaysInput = (id: string, raw: string) => {
    const digitsOnly = raw.replace(/\D/g, '')
    if (digitsOnly === '') return
    setDays(id, parseInt(digitsOnly, 10))
  }

  const handleRemove = (id: string) => {
    onChange(reminders.filter((r) => r.id !== id))
  }

  const handleAdd = () => {
    const used = new Set(reminders.map((r) => r.days))
    const fallback = [3, 5, 14, 2, 10, 21, 30].find((d) => !used.has(d)) ?? 3
    const copy = defaultCopy(fallback)
    onChange([...reminders, { id: newId(), days: fallback, ...copy }])
  }

  const handleSaveCopy = (id: string, subject: string, body: string) => {
    onChange(reminders.map((r) => (r.id === id ? { ...r, subject, body } : r)))
    setEditingId(null)
    showToast('success', 'Reminder updated')
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
        {sorted.map((r) => {
          const hasError = enabled && duplicateDays.has(r.days)
          const stepperClass = `course-reminders-row__stepper${hasError ? ' course-reminders-row__stepper--error' : ''}`
          return (
            <li key={r.id} className="course-reminders-row-wrapper">
              <div className="workflow-card__rule course-reminders-row">
                <span>Send</span>
                <div className={stepperClass}>
                  <button
                    type="button"
                    className="course-reminders-row__step-btn"
                    onClick={() => setDays(r.id, r.days - 1)}
                    disabled={!enabled || r.days <= MIN_DAYS}
                    aria-label="Decrease days"
                  >
                    <Minus size={16} color="currentColor" variant="Linear" />
                  </button>
                  <input
                    type="text"
                    inputMode="numeric"
                    className="course-reminders-row__step-input"
                    value={String(r.days)}
                    onChange={(e) => handleDaysInput(r.id, e.target.value)}
                    disabled={!enabled}
                    aria-label="Days before due date"
                    aria-invalid={hasError || undefined}
                  />
                  <button
                    type="button"
                    className="course-reminders-row__step-btn"
                    onClick={() => setDays(r.id, r.days + 1)}
                    disabled={!enabled || r.days >= MAX_DAYS}
                    aria-label="Increase days"
                  >
                    <Add size={16} color="currentColor" variant="Linear" />
                  </button>
                </div>
                <span>{r.days === 1 ? 'day' : 'days'} before due date</span>
                <span className="course-reminders-row__actions">
                  <Tooltip text="Edit reminder" icon={false} disabled={!enabled}>
                    <button
                      type="button"
                      className="course-reminders-row__icon-btn"
                      onClick={() => setEditingId(r.id)}
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
              {hasError && (
                <p className="course-reminders-row__error" role="alert">
                  This day is already used by another reminder
                </p>
              )}
            </li>
          )
        })}

        {enabled && (
          <li className="course-reminders-add">
            <button
              type="button"
              className="course-reminders-add__btn"
              onClick={handleAdd}
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
        open={editing !== null}
        days={editing?.days ?? 0}
        subject={editing?.subject ?? ''}
        body={editing?.body ?? ''}
        onClose={() => setEditingId(null)}
        onSave={(subject, body) => editing && handleSaveCopy(editing.id, subject, body)}
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

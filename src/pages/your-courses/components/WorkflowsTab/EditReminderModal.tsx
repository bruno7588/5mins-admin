import { useEffect, useState } from 'react'
import CloseButton from '../../../../components/CloseButton/CloseButton'
import InputField from '../../../../components/InputField/InputField'
import '../../../../components/ConfirmModal/ConfirmModal.css'
import './EditReminderModal.css'

interface Props {
  open: boolean
  days: number
  subject: string
  body: string
  onClose: () => void
  onSave: (subject: string, body: string) => void
}

function EditReminderModal({ open, days, subject, body, onClose, onSave }: Props) {
  const [draftSubject, setDraftSubject] = useState(subject)
  const [draftBody, setDraftBody] = useState(body)

  useEffect(() => {
    if (open) {
      setDraftSubject(subject)
      setDraftBody(body)
    }
  }, [open, subject, body])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const dayLabel = days === 1 ? 'day' : 'days'

  return (
    <div className="confirm-modal-overlay" onClick={onClose}>
      <div
        className="confirm-modal edit-reminder-modal"
        role="dialog"
        aria-label="Edit reminder"
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton className="edit-reminder-modal__close" onClick={onClose} />

        <div className="edit-reminder-modal__header">
          <h2 className="edit-reminder-modal__heading">Edit reminder</h2>
          <p className="edit-reminder-modal__sub">
            This message will be sent to learners {days} {dayLabel} before the course due date.
          </p>
        </div>
        <div className="edit-reminder-modal__divider" />

        <div className="edit-reminder-modal__form">
          <InputField
            label="Subject"
            value={draftSubject}
            onChange={(e) => setDraftSubject(e.target.value)}
          />

          <div className="edit-reminder-modal__field">
            <label className="edit-reminder-modal__label" htmlFor="edit-reminder-body">
              Message
            </label>
            <textarea
              id="edit-reminder-body"
              className="edit-reminder-modal__textarea"
              value={draftBody}
              onChange={(e) => setDraftBody(e.target.value)}
              rows={5}
            />
          </div>
        </div>

        <div className="edit-reminder-modal__actions">
          <button
            type="button"
            className="btn-primary"
            onClick={() => onSave(draftSubject, draftBody)}
          >
            Save reminder
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditReminderModal

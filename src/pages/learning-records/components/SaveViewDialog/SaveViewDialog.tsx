import { useEffect, useState, type ComponentType } from 'react'
import CloseButton from '../../../../components/CloseButton/CloseButton'
import InputField from '../../../../components/InputField/InputField'
import './SaveViewDialog.css'

type IconType = ComponentType<{ size?: number; color?: string; variant?: 'Linear' | 'Bold' | 'Outline' }>

export interface SaveViewChip {
  key: string
  label: string
  Icon?: IconType
}

interface SaveViewDialogProps {
  open: boolean
  onClose: () => void
  onSave: (name: string) => void
  filters: SaveViewChip[]
}

/** DS Modal (overlays.md): centered panel, section header + divider, close top-right,
 *  centered primary CTA. Uses the app's (light) tokens per the project overlay convention. */
function SaveViewDialog({ open, onClose, onSave, filters }: SaveViewDialogProps) {
  const [name, setName] = useState('')

  useEffect(() => {
    if (open) setName('')
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  function handleSave() {
    const trimmed = name.trim()
    if (!trimmed) return
    onSave(trimmed)
  }

  return (
    <>
      <div className="overlay-backdrop" onMouseDown={onClose} aria-hidden="true" />
      <div className="svd-modal" role="dialog" aria-modal="true" aria-labelledby="svd-title">
        <CloseButton className="svd-close" onClick={onClose} />

        <div className="svd-header">
          <div className="svd-headline">
            <h2 id="svd-title" className="svd-title">Save view</h2>
          </div>
          <div className="svd-divider" />
        </div>

        <form
          className="svd-form"
          onSubmit={(e) => {
            e.preventDefault()
            handleSave()
          }}
        >
          <div className="svd-content">
            <InputField
              label="Name"
              placeholder="e.g, Learners overdue"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />

            {filters.length > 0 && (
              <div className="svd-field">
                <label className="svd-label">Filters</label>
                <div className="svd-chips">
                  {filters.map((f) => (
                    <span className="svd-chip" key={f.key}>
                      {f.Icon && <f.Icon size={16} color="var(--text-secondary)" variant="Linear" />}
                      {f.label}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button type="submit" className="svd-cta" disabled={!name.trim()}>
            Save View
          </button>
        </form>
      </div>
    </>
  )
}

export default SaveViewDialog

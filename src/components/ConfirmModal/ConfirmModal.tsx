import { useEffect } from 'react'
import './ConfirmModal.css'

interface ConfirmModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

function ConfirmModal({ open, onClose, children }: ConfirmModalProps) {
  useEffect(() => {
    if (!open) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="confirm-modal-overlay" onMouseDown={onClose}>
      <div className="confirm-modal" onMouseDown={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default ConfirmModal

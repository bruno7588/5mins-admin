import { useEffect } from 'react'
import './ConfirmModal.css'

interface ConfirmModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
}

function ConfirmModal({ open, onClose, children, className }: ConfirmModalProps) {
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
      <div className={`confirm-modal${className ? ` ${className}` : ''}`} onMouseDown={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default ConfirmModal

import { useEffect, useRef } from 'react'
import Checkbox from '../../../../components/Checkbox/Checkbox'
import type { ColumnDef } from '../../hooks/useColumnPreferences'
import './EditColumnsPopover.css'

interface EditColumnsPopoverProps {
  columns: ColumnDef[]
  visibleKeys: string[]
  onToggle: (key: string) => void
  onReset: () => void
  onClose: () => void
}

function EditColumnsPopover({ columns, visibleKeys, onToggle, onReset, onClose }: EditColumnsPopoverProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  const defaultCols = columns.filter(c => !c.isCustomField)
  const customCols = columns.filter(c => c.isCustomField)

  return (
    <div className="edit-cols-popover" ref={ref}>
      <div className="edit-cols-header">
        <span className="edit-cols-title">Columns</span>
        <button className="edit-cols-reset" onClick={onReset}>
          Reset to default
        </button>
      </div>
      <div className="edit-cols-divider" />

      <div className="edit-cols-section">
        <span className="edit-cols-section-label">Default fields</span>
        {defaultCols.map(col => (
          <button
            key={col.key}
            className={`edit-cols-item${col.locked ? ' edit-cols-item--locked' : ''}`}
            onClick={() => !col.locked && onToggle(col.key)}
          >
            <Checkbox checked={visibleKeys.includes(col.key) || col.locked} />
            <span className="edit-cols-item-label">{col.label}</span>
          </button>
        ))}
      </div>

      {customCols.length > 0 && (
        <>
          <div className="edit-cols-divider" />
          <div className="edit-cols-section">
            <span className="edit-cols-section-label">Custom fields</span>
            {customCols.map(col => (
              <button
                key={col.key}
                className="edit-cols-item"
                onClick={() => onToggle(col.key)}
              >
                <Checkbox checked={visibleKeys.includes(col.key)} />
                <span className="edit-cols-item-label">{col.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default EditColumnsPopover

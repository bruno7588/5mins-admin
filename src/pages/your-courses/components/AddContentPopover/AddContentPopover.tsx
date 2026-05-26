import { useEffect, useRef } from 'react'
import {
  Book1,
  FolderOpen,
  Link1,
  DocumentCode,
  Calendar,
  Edit,
  DocumentText,
  MessageText,
  Text,
  ClipboardText,
  Chart,
} from 'iconsax-react'
import AddContentMenuItem from '../AddContentSidebar/AddContentMenuItem'
import type { AssessmentType } from '../AddContentSidebar/AddContentSidebar'
import './AddContentPopover.css'

const iconSize = 20
const iconColor = 'currentColor'

interface AddContentPopoverProps {
  open: boolean
  onClose: () => void
  onLibraryClick?: () => void
  onScormClick?: () => void
  onAssessmentClick?: (type: AssessmentType) => void
}

/* Popover replica of the right sidebar — used as an inline alternative for the
   section-level "Add Content" button so the admin gets the same content-type
   choices without leaving the section context. Clicking an item closes the
   popover and routes to the corresponding drawer/modal. */
function AddContentPopover({ open, onClose, onLibraryClick, onScormClick, onAssessmentClick }: AddContentPopoverProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  const route = (fn?: () => void) => () => {
    fn?.()
    onClose()
  }

  return (
    <div ref={ref} className="add-content-popover" role="menu">
      <AddContentMenuItem
        icon={<Book1 size={iconSize} color={iconColor} variant="Linear" />}
        label="5Mins Library"
        onClick={route(onLibraryClick)}
      />
      <AddContentMenuItem
        icon={<FolderOpen size={iconSize} color={iconColor} variant="Linear" />}
        label="Your Content"
      />
      <AddContentMenuItem
        icon={<Link1 size={iconSize} color={iconColor} variant="Linear" />}
        label="Embed Links"
      />
      <AddContentMenuItem
        icon={<DocumentCode size={iconSize} color={iconColor} variant="Linear" />}
        label="SCORM"
        onClick={route(onScormClick)}
      />
      <AddContentMenuItem
        icon={<Calendar size={iconSize} color={iconColor} variant="Linear" />}
        label="Events"
      />
      <AddContentMenuItem
        icon={<Edit size={iconSize} color={iconColor} variant="Linear" />}
        label="Assessments"
        hasDropdown
      >
        <AddContentMenuItem
          icon={<MessageText size={iconSize} color={iconColor} variant="Linear" />}
          label="Multiple Choice"
          onClick={route(() => onAssessmentClick?.('multiple-choice'))}
        />
        <AddContentMenuItem
          icon={<Text size={iconSize} color={iconColor} variant="Linear" />}
          label="Short Text"
          onClick={route(() => onAssessmentClick?.('short-text'))}
        />
        <AddContentMenuItem
          icon={<ClipboardText size={iconSize} color={iconColor} variant="Linear" />}
          label="Exercise"
          onClick={route(() => onAssessmentClick?.('exercise'))}
        />
        <AddContentMenuItem
          icon={<Chart size={iconSize} color={iconColor} variant="Linear" />}
          label="Poll"
          onClick={route(() => onAssessmentClick?.('poll'))}
        />
      </AddContentMenuItem>
      <AddContentMenuItem
        icon={<DocumentText size={iconSize} color={iconColor} variant="Linear" />}
        label="Resources"
      />
    </div>
  )
}

export default AddContentPopover

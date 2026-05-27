import {
  Book1,
  FolderOpen,
  Link1,
  DocumentCode,
  Calendar,
  DocumentText,
} from 'iconsax-react'
import AssessmentIcon from '../../../../components/icons/AssessmentIcon'
import type { AssessmentType } from '../AddContentSidebar/AddContentSidebar'
import './AddContentIconStrip.css'

export type StripActive = 'library' | 'scorm' | null

const iconSize = 20

interface AddContentIconStripProps {
  active?: StripActive
  onLibraryClick?: () => void
  onScormClick?: () => void
  onAssessmentClick?: (type: AssessmentType) => void
}

/* Right-edge icon strip per Figma 8646:16767. Rendered only while a secondary
   drawer (Library/SCORM/Assessment) is open — it sits beside the drawer as a
   collapsed nav. The active icon switches to the Bold variant. */
function AddContentIconStrip({
  active = null,
  onLibraryClick,
  onScormClick,
  onAssessmentClick,
}: AddContentIconStripProps) {
  return (
    <aside
      className="add-content-icon-strip"
      aria-label="Add content quick access"
    >
      <button
        type="button"
        className={`add-content-icon-strip__item${active === 'library' ? ' add-content-icon-strip__item--active' : ''}`}
        onClick={onLibraryClick}
        aria-label="5Mins Library"
        title="5Mins Library"
      >
        <Book1 size={iconSize} color="currentColor" variant={active === 'library' ? 'Bold' : 'Linear'} />
      </button>
      <button
        type="button"
        className="add-content-icon-strip__item"
        aria-label="Your Content"
        title="Your Content"
      >
        <FolderOpen size={iconSize} color="currentColor" variant="Linear" />
      </button>
      <button
        type="button"
        className={`add-content-icon-strip__item${active === 'scorm' ? ' add-content-icon-strip__item--active' : ''}`}
        onClick={onScormClick}
        aria-label="SCORM"
        title="SCORM"
      >
        <DocumentCode size={iconSize} color="currentColor" variant={active === 'scorm' ? 'Bold' : 'Linear'} />
      </button>
      <button
        type="button"
        className="add-content-icon-strip__item"
        aria-label="Embed Links"
        title="Embed Links"
      >
        <Link1 size={iconSize} color="currentColor" variant="Linear" />
      </button>
      <button
        type="button"
        className="add-content-icon-strip__item"
        aria-label="Events"
        title="Events"
      >
        <Calendar size={iconSize} color="currentColor" variant="Linear" />
      </button>
      <button
        type="button"
        className="add-content-icon-strip__item"
        onClick={() => onAssessmentClick?.('multiple-choice')}
        aria-label="Assessments"
        title="Assessments"
      >
        <AssessmentIcon size={iconSize} color="currentColor" />
      </button>
      <button
        type="button"
        className="add-content-icon-strip__item"
        aria-label="Resources"
        title="Resources"
      >
        <DocumentText size={iconSize} color="currentColor" variant="Linear" />
      </button>
    </aside>
  )
}

export default AddContentIconStrip

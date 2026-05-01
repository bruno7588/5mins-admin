import { useEffect, useState } from 'react'
import { Edit2, Trash } from 'iconsax-react'
import CloseButton from '../../components/CloseButton/CloseButton'
import Search from '../../components/Search/Search'
import Dropdown from '../../components/Dropdown/Dropdown'
import type { AutomationCourse, AutomationRow } from './Automations'
import './AutomationDetailsModal.css'

function formatEnrollment(c: AutomationCourse): string {
  if (c.enrollmentType.kind === 'immediate') return 'Immediate'
  const unit = c.enrollmentType.days === 1 ? 'day' : 'days'
  return `${c.enrollmentType.days} ${unit} after previous course`
}

function formatDueDate(c: AutomationCourse): string {
  if (c.dueDate.kind === 'none') return 'No due date'
  const unit = c.dueDate.daysAfterStart === 1 ? 'day' : 'days'
  return `${c.dueDate.daysAfterStart} ${unit} after start`
}

function formatFrequency(c: AutomationCourse): string {
  if (!c.recurrence.enabled) return 'Never repeats'
  const unit = c.recurrence.intervalMonths === 1 ? 'month' : 'months'
  return `Every ${c.recurrence.intervalMonths} ${unit}`
}

interface AutomationDetailsModalProps {
  automation: AutomationRow | null
  onClose: () => void
}

function AutomationDetailsModal({ automation, onClose }: AutomationDetailsModalProps) {
  const [closing, setClosing] = useState(false)
  const [courseQuery, setCourseQuery] = useState('')

  useEffect(() => {
    if (automation) {
      setClosing(false)
      setCourseQuery('')
    }
  }, [automation])

  useEffect(() => {
    if (!automation) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [automation])

  function handleClose() {
    setClosing(true)
    setTimeout(onClose, 200)
  }

  if (!automation) return null

  return (
    <div
      className={`automation-details-modal${closing ? ' automation-details-modal--closing' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="automation-details-title"
    >
      <CloseButton onClick={handleClose} className="automation-details-close" />

      <div className="automation-details-content">
        <header className="automation-details-header">
          <div className="automation-details-headline">
            <h2 id="automation-details-title" className="automation-details-title">
              {automation.name}
            </h2>
            <button type="button" className="automation-details-edit-name" aria-label="Edit name">
              <Edit2 size={20} color="currentColor" variant="Linear" />
            </button>
          </div>
          <div className="automation-details-divider" />
        </header>

        <section className="automation-details-section">
          <div className="automation-details-section-header">
            <h3 className="automation-details-section-title">Trigger</h3>
            <p className="automation-details-section-desc">
              Set conditions for automatic course enrolment
            </p>
          </div>
          <div className="automation-details-card">
            <p className="automation-details-card-lead">When a user registers on 5Mins.ai</p>
            <div className="automation-details-condition">
              <span className="automation-details-condition-label">With</span>
              <Dropdown
                size="md"
                options={[{ value: 'all', label: 'All roles' }]}
                value="all"
                className="automation-details-condition-dropdown"
              />
            </div>
            <div className="automation-details-condition">
              <span className="automation-details-condition-label">And with</span>
              <Dropdown
                size="md"
                options={[{ value: 'all', label: 'All cohorts' }]}
                value="all"
                className="automation-details-condition-dropdown"
              />
            </div>
            <div className="automation-details-condition">
              <span className="automation-details-condition-label">And from</span>
              <Dropdown
                size="md"
                options={[{ value: 'all', label: 'All regions' }]}
                value="all"
                className="automation-details-condition-dropdown"
              />
            </div>
            <div className="automation-details-condition">
              <span className="automation-details-condition-label">And join date is</span>
              <Dropdown
                size="md"
                options={[{ value: 'none', label: 'not required' }]}
                value="none"
                className="automation-details-condition-dropdown"
              />
            </div>
          </div>
        </section>

        <section className="automation-details-section">
          <div className="automation-details-section-header">
            <h3 className="automation-details-section-title">Actions</h3>
            <p className="automation-details-section-desc">
              Select which courses to assign when conditions in the trigger are met
            </p>
          </div>
          <div className="automation-details-card">
            <div className="automation-details-actions-toolbar">
              <p className="automation-details-card-lead">Then enrol them in these courses</p>
              <div className="automation-details-search">
                <Search
                  size="M"
                  value={courseQuery}
                  placeholder="Search for courses"
                  onChange={setCourseQuery}
                />
              </div>
            </div>

            {automation.courses.length > 0 && (
            <div className="automation-details-table">
              <div className="automation-details-table-header">
                <div className="automation-details-th automation-details-th--course">Course</div>
                <div className="automation-details-th">Enrolment</div>
                <div className="automation-details-th">Due date</div>
                <div className="automation-details-th">Frequency</div>
              </div>

              {automation.courses.map((course, i) => (
                <div key={course.id} className="automation-details-row">
                  <button
                    type="button"
                    className="automation-details-row-drag"
                    aria-label="Drag to reorder"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="7" cy="5" r="1.5" fill="currentColor" />
                      <circle cx="13" cy="5" r="1.5" fill="currentColor" />
                      <circle cx="7" cy="10" r="1.5" fill="currentColor" />
                      <circle cx="13" cy="10" r="1.5" fill="currentColor" />
                      <circle cx="7" cy="15" r="1.5" fill="currentColor" />
                      <circle cx="13" cy="15" r="1.5" fill="currentColor" />
                    </svg>
                  </button>
                  <div className="automation-details-row-card">
                    <div className="automation-details-td automation-details-td--course">
                      <span className="automation-details-row-counter">{i + 1}</span>
                      <div className="automation-details-row-thumb" aria-hidden="true" />
                      <span className="automation-details-row-name">{course.name}</span>
                    </div>
                    <div className="automation-details-td">{formatEnrollment(course)}</div>
                    <div className="automation-details-td">{formatDueDate(course)}</div>
                    <div className="automation-details-td">{formatFrequency(course)}</div>
                  </div>
                  <button
                    type="button"
                    className="automation-details-row-remove"
                    aria-label="Remove course"
                  >
                    <Trash size={20} color="currentColor" variant="Linear" />
                  </button>
                </div>
              ))}
            </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default AutomationDetailsModal

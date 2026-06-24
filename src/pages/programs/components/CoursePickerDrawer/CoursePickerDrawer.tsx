import { useState } from 'react'
import CloseButton from '../../../../components/CloseButton/CloseButton'
import Search from '../../../../components/Search/Search'
import Dropdown from '../../../../components/Dropdown/Dropdown'
import {
  FUNCTION_OPTIONS,
  SKILL_OPTIONS,
  fiveMinsCourses,
  yourCourses,
  type CatalogCourse,
} from '../../coursesCatalog'
import './CoursePickerDrawer.css'

interface Props {
  /** Course ids already in the program — those rows show "Remove". */
  existingCourseIds: string[]
  onAdd: (course: CatalogCourse) => void
  onRemove: (courseId: string) => void
  onClose: () => void
}

type Tab = 'yours' | '5mins'

function CoursePickerDrawer({ existingCourseIds, onAdd, onRemove, onClose }: Props) {
  const [closing, setClosing] = useState(false)
  const [tab, setTab] = useState<Tab>('yours')
  const [query, setQuery] = useState('')
  const [functionFilter, setFunctionFilter] = useState('all')
  const [skillFilter, setSkillFilter] = useState('all')

  const existing = new Set(existingCourseIds)

  const handleClose = () => {
    setClosing(true)
    setTimeout(onClose, 300)
  }

  const switchTab = (next: Tab) => {
    setTab(next)
    setQuery('')
    setFunctionFilter('all')
    setSkillFilter('all')
  }

  const q = query.trim().toLowerCase()
  const results = (tab === 'yours' ? yourCourses() : fiveMinsCourses()).filter((c) => {
    if (q && !c.title.toLowerCase().includes(q)) return false
    if (tab === '5mins') {
      if (functionFilter !== 'all' && !c.functionIds?.includes(functionFilter)) return false
      if (skillFilter !== 'all' && c.skillId !== skillFilter) return false
    }
    return true
  })

  return (
    <div className={`cpd-overlay${closing ? ' cpd-overlay--closing' : ''}`} onMouseDown={handleClose}>
      <aside
        className={`cpd-panel${closing ? ' cpd-panel--closing' : ''}`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <header className="cpd-header">
          <h2 className="cpd-header__title">Add courses to program</h2>
          <CloseButton onClick={handleClose} />
        </header>

        <div className="cpd-divider" />

        <div className="cpd-tabs" role="tablist">
          <button
            role="tab"
            aria-selected={tab === 'yours'}
            className={`cpd-tab${tab === 'yours' ? ' cpd-tab--active' : ''}`}
            onClick={() => switchTab('yours')}
          >
            Your Courses
          </button>
          <button
            role="tab"
            aria-selected={tab === '5mins'}
            className={`cpd-tab${tab === '5mins' ? ' cpd-tab--active' : ''}`}
            onClick={() => switchTab('5mins')}
          >
            5Mins Courses
          </button>
        </div>

        <div className="cpd-filters">
          <Search
            size="M"
            value={query}
            placeholder="Search for courses"
            onChange={setQuery}
            className="cpd-filters__search"
          />
          {tab === '5mins' && (
            <>
              <Dropdown
                className="cpd-filters__fn"
                options={FUNCTION_OPTIONS}
                value={functionFilter}
                onChange={setFunctionFilter}
              />
              <Dropdown
                className="cpd-filters__skill"
                options={SKILL_OPTIONS}
                value={skillFilter}
                onChange={setSkillFilter}
              />
            </>
          )}
        </div>

        <div className="cpd-body">
          {results.length === 0 ? (
            <div className="cpd-empty">
              <p>{q ? `No courses match “${query.trim()}”.` : 'No courses here yet.'}</p>
            </div>
          ) : (
            <>
              <p className="cpd-col-head">Course name</p>
              <div className="cpd-list">
                {results.map((course) => {
                  const added = existing.has(course.courseId)
                  return (
                    <div key={course.courseId} className="cpd-row">
                      <span className="cpd-row__thumb" style={{ backgroundImage: `url(${course.thumb})` }} />
                      <span className="cpd-row__title">{course.title}</span>
                      {added ? (
                        <button
                          className="cpd-row__btn cpd-row__btn--remove"
                          onClick={() => onRemove(course.courseId)}
                        >
                          Remove
                        </button>
                      ) : (
                        <button
                          className="cpd-row__btn cpd-row__btn--add"
                          onClick={() => onAdd(course)}
                        >
                          Add
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </aside>
    </div>
  )
}

export default CoursePickerDrawer

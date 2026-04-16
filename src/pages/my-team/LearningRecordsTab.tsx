import { useCallback, useRef, useState } from 'react'
import { ArrowLeft2, ArrowRight2, Add, ArrowDown2 } from 'iconsax-react'
import './LearningRecordsTab.css'

type ChipType = '5mins' | 'external'
type EnrollmentHistory = 'Current' | 'Archived'
type Status = 'Completed' | 'Failed'

interface LearningRecord {
  id: string
  name: string
  email: string
  team: string
  region: string
  course: string
  category: string
  enrollmentHistory: EnrollmentHistory
  startDate: string
  dueDate: string
  completionDate: string | null
  duration: string
  progress: number
  status: Status
}

const mockData: LearningRecord[] = [
  {
    id: '1',
    name: 'Michael Thompson',
    email: 'michael.t@company.com',
    team: 'Operations',
    region: 'North America',
    course: 'Compliance & Ethics 101',
    category: 'Compliance',
    enrollmentHistory: 'Current',
    startDate: '2026-04-01',
    dueDate: '2026-05-01',
    completionDate: '2026-04-13',
    duration: '30 min',
    progress: 100,
    status: 'Completed',
  },
  {
    id: '2',
    name: 'Jessica Hart',
    email: 'jessica.h@company.com',
    team: 'Compliance',
    region: 'Europe',
    course: 'Food Safety Essentials',
    category: 'Safety',
    enrollmentHistory: 'Current',
    startDate: '2026-03-20',
    dueDate: '2026-04-20',
    completionDate: null,
    duration: '45 min',
    progress: 65,
    status: 'Failed',
  },
  {
    id: '3',
    name: 'David Johnson',
    email: 'david.j@company.com',
    team: 'Finance',
    region: 'Asia Pacific',
    course: 'Data Protection (GDPR)',
    category: 'Compliance',
    enrollmentHistory: 'Current',
    startDate: '2026-03-15',
    dueDate: '2026-04-10',
    completionDate: '2026-04-08',
    duration: '60 min',
    progress: 100,
    status: 'Completed',
  },
  {
    id: '4',
    name: 'Noah Williams',
    email: 'noah.w@company.com',
    team: 'Hospitality',
    region: 'North America',
    course: 'Customer Service Fundamentals',
    category: 'Soft Skills',
    enrollmentHistory: 'Archived',
    startDate: '2026-01-10',
    dueDate: '2026-02-10',
    completionDate: null,
    duration: '25 min',
    progress: 40,
    status: 'Failed',
  },
  {
    id: '5',
    name: 'Mei Tanaka',
    email: 'mei.t@company.com',
    team: 'Operations',
    region: 'Asia Pacific',
    course: 'Harassment Prevention',
    category: 'Compliance',
    enrollmentHistory: 'Current',
    startDate: '2026-04-05',
    dueDate: '2026-05-05',
    completionDate: null,
    duration: '35 min',
    progress: 20,
    status: 'Failed',
  },
  {
    id: '6',
    name: 'Ethan Brooks',
    email: 'ethan.b@company.com',
    team: 'Food & Beverage',
    region: 'Europe',
    course: 'Allergen Awareness',
    category: 'Safety',
    enrollmentHistory: 'Current',
    startDate: '2026-03-28',
    dueDate: '2026-04-28',
    completionDate: '2026-04-12',
    duration: '20 min',
    progress: 100,
    status: 'Completed',
  },
  {
    id: '7',
    name: 'Priya Shah',
    email: 'priya.s@company.com',
    team: 'Shift Operations',
    region: 'Middle East',
    course: 'Conflict Resolution',
    category: 'Soft Skills',
    enrollmentHistory: 'Archived',
    startDate: '2025-12-01',
    dueDate: '2026-01-15',
    completionDate: null,
    duration: '40 min',
    progress: 55,
    status: 'Failed',
  },
  {
    id: '8',
    name: 'Samantha Rivers',
    email: 'samantha.r@company.com',
    team: 'Finance',
    region: 'North America',
    course: 'Cash Handling',
    category: 'Operations',
    enrollmentHistory: 'Current',
    startDate: '2026-04-10',
    dueDate: '2026-05-10',
    completionDate: null,
    duration: '15 min',
    progress: 10,
    status: 'Completed',
  },
  {
    id: '9',
    name: 'Laura Chen',
    email: 'laura.c@company.com',
    team: 'Compliance',
    region: 'Asia Pacific',
    course: 'Fire Safety',
    category: 'Safety',
    enrollmentHistory: 'Current',
    startDate: '2026-03-01',
    dueDate: '2026-04-01',
    completionDate: '2026-03-28',
    duration: '30 min',
    progress: 100,
    status: 'Completed',
  },
  {
    id: '10',
    name: 'Marcus Reid',
    email: 'marcus.r@company.com',
    team: 'Compliance',
    region: 'Europe',
    course: 'POS System Training',
    category: 'Operations',
    enrollmentHistory: 'Archived',
    startDate: '2026-02-15',
    dueDate: '2026-03-15',
    completionDate: '2026-03-10',
    duration: '50 min',
    progress: 100,
    status: 'Completed',
  },
]

function formatDate(dateStr: string): { line1: string; line2: string } {
  const d = new Date(dateStr + 'T00:00:00')
  const month = d.toLocaleString('en-US', { month: 'short' })
  const day = d.getDate()
  const year = d.getFullYear()
  return { line1: `${month} ${day},`, line2: `${year}` }
}

function LearningRecordsTab() {
  const [activeChip, setActiveChip] = useState<ChipType>('5mins')
  const [isScrolled, setIsScrolled] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      setIsScrolled(scrollRef.current.scrollLeft > 0)
    }
  }, [])

  return (
    <section className="lr" aria-label="Learning Records">
      {/* Actions bar */}
      <div className="lr__actions">
        <div className="lr__chips">
          <button
            type="button"
            className={`lr__chip${activeChip === '5mins' ? ' lr__chip--active' : ''}`}
            onClick={() => setActiveChip('5mins')}
          >
            5Mins Courses
          </button>
          <button
            type="button"
            className={`lr__chip${activeChip === 'external' ? ' lr__chip--active' : ''}`}
            onClick={() => setActiveChip('external')}
          >
            External Training
          </button>
        </div>
        <button type="button" className="lr__download-btn">
          <span>Download Report</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M6.667 9.167L10 12.5l3.333-3.333M10 3.333V12.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3.333 14.167v1.666A1.667 1.667 0 005 17.5h10a1.667 1.667 0 001.667-1.667v-1.666" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Filters bar */}
      <div className="lr__filters">
        <span className="lr__filters-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
        <span className="lr__filters-label">Filters</span>
        <span className="lr__filters-badge">0</span>
        <button type="button" className="lr__filters-add">
          Add
          <Add size={20} color="var(--primary-600)" variant="Linear" />
        </button>
        <span className="lr__filters-spacer" />
        <span className="lr__filters-chevron">
          <ArrowDown2 size={16} color="var(--text-tertiary)" variant="Linear" />
        </span>
      </div>

      {/* Data table */}
      <div
        className={`lr__table-wrap${isScrolled ? ' lr__table-wrap--scrolled' : ''}`}
        ref={scrollRef}
        onScroll={handleScroll}
      >
        <div className="lr__table">
          {/* Header */}
          <div className="lr__header">
            <div className="lr__cell lr__cell--name">Name</div>
            <div className="lr__cell lr__cell--team">Team</div>
            <div className="lr__cell lr__cell--region">Region</div>
            <div className="lr__cell lr__cell--course">Course</div>
            <div className="lr__cell lr__cell--category">Category</div>
            <div className="lr__cell lr__cell--enrollment">Enrolment history</div>
            <div className="lr__cell lr__cell--start-date">Start date</div>
            <div className="lr__cell lr__cell--due-date">Due date</div>
            <div className="lr__cell lr__cell--completion-date">Completion date</div>
            <div className="lr__cell lr__cell--duration">Duration</div>
            <div className="lr__cell lr__cell--progress">Progress</div>
            <div className="lr__cell lr__cell--status">Status</div>
          </div>

          {/* Rows */}
          {mockData.map((row) => {
            const start = formatDate(row.startDate)
            const due = formatDate(row.dueDate)
            const completion = row.completionDate ? formatDate(row.completionDate) : null

            const enrollmentClass =
              row.enrollmentHistory === 'Current' ? 'lr__badge--current' : 'lr__badge--archived'

            const statusClass = row.status === 'Completed' ? 'lr__badge--completed' : 'lr__badge--failed'

            return (
              <div className="lr__row" key={row.id}>
                <div className="lr__cell lr__cell--name">
                  <span className="lr__name">{row.name}</span>
                  <span className="lr__email">{row.email}</span>
                </div>
                <div className="lr__cell lr__cell--team">{row.team}</div>
                <div className="lr__cell lr__cell--region">{row.region}</div>
                <div className="lr__cell lr__cell--course">{row.course}</div>
                <div className="lr__cell lr__cell--category">{row.category}</div>
                <div className="lr__cell lr__cell--enrollment">
                  <span className={`lr__badge ${enrollmentClass}`}>{row.enrollmentHistory}</span>
                </div>
                <div className="lr__cell lr__cell--start-date">
                  <div className="lr__date-cell">
                    <span className="lr__date-line1">{start.line1}</span>
                    <span className="lr__date-line2">{start.line2}</span>
                  </div>
                </div>
                <div className="lr__cell lr__cell--due-date">
                  <div className="lr__date-cell">
                    <span className="lr__date-line1">{due.line1}</span>
                    <span className="lr__date-line2">{due.line2}</span>
                  </div>
                </div>
                <div className="lr__cell lr__cell--completion-date">
                  {completion ? (
                    <div className="lr__date-cell">
                      <span className="lr__date-line1">{completion.line1}</span>
                      <span className="lr__date-line2">{completion.line2}</span>
                    </div>
                  ) : (
                    <span className="lr__date-dash">—</span>
                  )}
                </div>
                <div className="lr__cell lr__cell--duration">{row.duration}</div>
                <div className="lr__cell lr__cell--progress">{row.progress}%</div>
                <div className="lr__cell lr__cell--status">
                  <span className={`lr__badge ${statusClass}`}>{row.status}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Pagination */}
      <div className="lr__pagination">
        <span className="lr__pagination-label">1-10 of 28</span>
        <button type="button" className="lr__pagination-btn" aria-label="Previous page" disabled>
          <ArrowLeft2 size={16} color="var(--text-secondary)" variant="Linear" />
        </button>
        <button type="button" className="lr__pagination-btn" aria-label="Next page">
          <ArrowRight2 size={16} color="var(--text-secondary)" variant="Linear" />
        </button>
      </div>
    </section>
  )
}

export default LearningRecordsTab

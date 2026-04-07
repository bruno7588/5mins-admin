import { useState, useRef, useEffect, useMemo } from 'react'
import {
  UserCirlceAdd,
  Medal,
  More,
  UserTick,
  Calendar,
  Flash,
  SearchNormal1,
  ArrowDown,
  ArrowUp,
  ArrowDown2,
  ArrowUp2,
  ArrowLeft2,
  ArrowRight2,
  CloseCircle,
  Sort,
} from 'iconsax-react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import './Automations.css'

type Tab = 'manage' | 'activity'
type SortDirection = 'asc' | 'desc'

interface AutomationRow {
  id: string
  name: string
  lastUpdated: string
  active: boolean
}

interface User {
  id: string
  name: string
  email: string
}

interface TriggerRow {
  id: string
  user: User
  automationId: string
  // Snapshot of the automation name at trigger time. Required for deleted
  // automations (where the FK no longer resolves) so the admin can still see
  // what the user was originally enrolled in. Optional for live automations
  // since we resolve via automationId in that case.
  automationNameSnapshot?: string
  triggeredAt: string // ISO date
}

const mockAutomations: AutomationRow[] = [
  { id: '1', name: 'New Hire Compliance Onboarding', lastUpdated: 'Sep 30, 2024', active: true },
  { id: '2', name: 'Quarterly Refresher — Food Safety', lastUpdated: 'Sep 28, 2024', active: true },
  { id: '3', name: 'Annual Anti-Harassment Training', lastUpdated: 'Sep 24, 2024', active: true },
  { id: '4', name: 'GDPR Privacy Awareness', lastUpdated: 'Sep 22, 2024', active: true },
  { id: '5', name: 'Cybersecurity Essentials Q3', lastUpdated: 'Sep 18, 2024', active: true },
  { id: '6', name: 'Manager 30-Day Check-in', lastUpdated: 'Sep 12, 2024', active: true },
  { id: '7', name: 'Health & Safety Briefing', lastUpdated: 'Sep 5, 2024', active: true },
  { id: '8', name: 'Diversity & Inclusion 2024', lastUpdated: 'Aug 30, 2024', active: false },
  { id: '9', name: 'Remote Work Best Practices', lastUpdated: 'Aug 22, 2024', active: false },
  { id: '10', name: 'Code of Conduct Refresher', lastUpdated: 'Aug 14, 2024', active: false },
  { id: '11', name: 'Sales Onboarding Sprint', lastUpdated: 'Aug 8, 2024', active: false },
  { id: '12', name: 'Customer Service Standards', lastUpdated: 'Jul 30, 2024', active: false },
  { id: '13', name: 'Fire Safety Drill Series', lastUpdated: 'Jul 21, 2024', active: false },
  { id: '14', name: 'Product Knowledge Bootcamp', lastUpdated: 'Jul 12, 2024', active: false },
]

const TOTAL_TRIGGERS = 1247
const THIS_MONTH_TRIGGERS = 83
const PAGE_SIZE = 10
const DELETED_AUTOMATION_ID = 'deleted-1'

const mockUsers: User[] = [
  { id: 'u1', name: 'Sarah Johnson', email: 'sarah.johnson@acme.co' },
  { id: 'u2', name: 'Marcus Chen', email: 'marcus.chen@acme.co' },
  { id: 'u3', name: 'Aisha Patel', email: 'aisha.patel@acme.co' },
  { id: 'u4', name: 'Liam O’Connor', email: 'liam.oconnor@acme.co' },
  { id: 'u5', name: 'Sofia Rossi', email: 'sofia.rossi@acme.co' },
  { id: 'u6', name: 'Daniel Park', email: 'daniel.park@acme.co' },
  { id: 'u7', name: 'Emma Wright', email: 'emma.wright@acme.co' },
  { id: 'u8', name: 'Olufemi Adeyemi', email: 'olufemi.adeyemi@acme.co' },
  { id: 'u9', name: 'Hannah Mitchell', email: 'hannah.mitchell@acme.co' },
  { id: 'u10', name: 'Tomás García', email: 'tomas.garcia@acme.co' },
  { id: 'u11', name: 'Yuki Tanaka', email: 'yuki.tanaka@acme.co' },
  { id: 'u12', name: 'Priya Sharma', email: 'priya.sharma@acme.co' },
  { id: 'u13', name: 'Noah Williams', email: 'noah.williams@acme.co' },
  { id: 'u14', name: 'Zara Ahmed', email: 'zara.ahmed@acme.co' },
  { id: 'u15', name: 'Ethan Murphy', email: 'ethan.murphy@acme.co' },
  { id: 'u16', name: 'Mila Petrov', email: 'mila.petrov@acme.co' },
  { id: 'u17', name: 'Caleb Brooks', email: 'caleb.brooks@acme.co' },
  { id: 'u18', name: 'Isabella Costa', email: 'isabella.costa@acme.co' },
]

// 20 trigger rows mixed across automations + 2 deleted
const mockTriggers: TriggerRow[] = [
  { id: 't1', user: mockUsers[0], automationId: '1', triggeredAt: '2026-04-07' },
  { id: 't2', user: mockUsers[1], automationId: '3', triggeredAt: '2026-04-05' },
  { id: 't3', user: mockUsers[2], automationId: '1', triggeredAt: '2026-04-03' },
  { id: 't4', user: mockUsers[3], automationId: '4', triggeredAt: '2026-04-01' },
  { id: 't5', user: mockUsers[4], automationId: '5', triggeredAt: '2026-03-29' },
  { id: 't6', user: mockUsers[5], automationId: '1', triggeredAt: '2026-03-26' },
  { id: 't7', user: mockUsers[6], automationId: '3', triggeredAt: '2026-03-23' },
  { id: 't8', user: mockUsers[7], automationId: DELETED_AUTOMATION_ID, automationNameSnapshot: 'Legacy Onboarding 2023', triggeredAt: '2026-03-20' },
  { id: 't9', user: mockUsers[8], automationId: '7', triggeredAt: '2026-03-18' },
  { id: 't10', user: mockUsers[9], automationId: '1', triggeredAt: '2026-03-15' },
  { id: 't11', user: mockUsers[10], automationId: '4', triggeredAt: '2026-03-13' },
  { id: 't12', user: mockUsers[11], automationId: '3', triggeredAt: '2026-03-10' },
  { id: 't13', user: mockUsers[12], automationId: '6', triggeredAt: '2026-03-07' },
  { id: 't14', user: mockUsers[13], automationId: '5', triggeredAt: '2026-03-05' },
  { id: 't15', user: mockUsers[14], automationId: '1', triggeredAt: '2026-03-02' },
  { id: 't16', user: mockUsers[15], automationId: DELETED_AUTOMATION_ID, automationNameSnapshot: 'Pre-2024 Compliance Pack', triggeredAt: '2026-02-28' },
  { id: 't17', user: mockUsers[16], automationId: '7', triggeredAt: '2026-02-26' },
  { id: 't18', user: mockUsers[17], automationId: '3', triggeredAt: '2026-02-25' },
  { id: 't19', user: mockUsers[0], automationId: '4', triggeredAt: '2026-02-25' },
  { id: 't20', user: mockUsers[2], automationId: '2', triggeredAt: '2026-02-25' },
]

function formatTriggerDate(iso: string): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const d = new Date(iso)
  const day = String(d.getUTCDate()).padStart(2, '0')
  return `${day} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}

function Automations() {
  const [activeTab, setActiveTab] = useState<Tab>('manage')
  const [automations, setAutomations] = useState<AutomationRow[]>(mockAutomations)

  // Activity tab state
  const [searchQuery, setSearchQuery] = useState('')
  const [automationFilterId, setAutomationFilterId] = useState<string>('all')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [page, setPage] = useState(1)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const activeAutomationsCount = automations.filter((a) => a.active).length

  // Lookup helpers
  const automationsById = useMemo(() => {
    const map = new Map<string, AutomationRow>()
    automations.forEach((a) => map.set(a.id, a))
    return map
  }, [automations])

  // Filter + sort + paginate triggers
  const filteredTriggers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    let rows = mockTriggers
    if (q) {
      rows = rows.filter(
        (t) =>
          t.user.name.toLowerCase().includes(q) || t.user.email.toLowerCase().includes(q),
      )
    }
    if (automationFilterId !== 'all') {
      rows = rows.filter((t) => t.automationId === automationFilterId)
    }
    rows = [...rows].sort((a, b) => {
      const cmp = a.triggeredAt.localeCompare(b.triggeredAt)
      return sortDirection === 'asc' ? cmp : -cmp
    })
    return rows
  }, [searchQuery, automationFilterId, sortDirection])

  const totalRows = filteredTriggers.length
  const totalPages = Math.max(1, Math.ceil(totalRows / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const pageStart = (safePage - 1) * PAGE_SIZE
  const pageEnd = Math.min(pageStart + PAGE_SIZE, totalRows)
  const pageRows = filteredTriggers.slice(pageStart, pageEnd)

  // Reset page when filters change
  useEffect(() => {
    setPage(1)
  }, [searchQuery, automationFilterId, sortDirection])

  // Click-outside for dropdown
  useEffect(() => {
    if (!dropdownOpen) return
    function onMouseDown(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [dropdownOpen])

  function toggleActive(id: string) {
    setAutomations((rows) =>
      rows.map((r) => (r.id === id ? { ...r, active: !r.active } : r)),
    )
  }

  function toggleSort() {
    setSortDirection((d) => (d === 'desc' ? 'asc' : 'desc'))
  }

  const dropdownLabel =
    automationFilterId === 'all'
      ? 'All automations'
      : automationsById.get(automationFilterId)?.name ?? 'All automations'

  return (
    <div className="automations-layout">
      <LeftSidebar />
      <main className="automations-main">
        <div className="automations-header">
          <div className="automations-title-group">
            <h2 className="automations-title">Automations</h2>
            <p className="automations-description">
              Create and manage automation rules for course enrolments.{' '}
              <a className="automations-description-link" href="#">
                Here is how it works
              </a>
            </p>
          </div>
          <div className="page-header-divider" />
          <div className="automations-tabs">
            <button
              className={`automations-tab${activeTab === 'manage' ? ' automations-tab--active' : ''}`}
              onClick={() => setActiveTab('manage')}
            >
              Manage
            </button>
            <button
              className={`automations-tab${activeTab === 'activity' ? ' automations-tab--active' : ''}`}
              onClick={() => setActiveTab('activity')}
            >
              Activity
            </button>
          </div>
        </div>

        {activeTab === 'manage' && (
          <div className="automations-manage">
            <div className="automations-templates">
              <button className="automations-template automations-template--purple">
                <span className="automations-template-icon">
                  <UserCirlceAdd size={48} color="#8158EC" variant="Linear" />
                </span>
                <span className="automations-template-body">
                  <span className="automations-template-title">New Employee Automation</span>
                  <span className="automations-template-desc">
                    Enrol new employees in onboarding courses automatically.
                    <br />
                    Requires HRIS integration.
                  </span>
                </span>
              </button>

              <button className="automations-template automations-template--blue">
                <span className="automations-template-icon">
                  <Medal size={48} color="#2A90D8" variant="Linear" />
                </span>
                <span className="automations-template-body">
                  <span className="automations-template-title">Existing Employee Automation</span>
                  <span className="automations-template-desc">
                    Create and automate training programs for both new and existing users.
                    <br />
                    Perfect for compliance training.
                  </span>
                </span>
              </button>
            </div>

            <div className="automations-table">
              <div className="automations-table-header">
                <div className="automations-table-cell automations-table-cell--name">Automation</div>
                <div className="automations-table-cell automations-table-cell--date">Last updated</div>
                <div className="automations-table-cell automations-table-cell--toggle" />
                <div className="automations-table-cell automations-table-cell--actions" />
              </div>

              {automations.map((row) => (
                <div
                  key={row.id}
                  className={`automations-table-row${row.active ? '' : ' automations-table-row--inactive'}`}
                >
                  <div className="automations-table-cell automations-table-cell--name">{row.name}</div>
                  <div className="automations-table-cell automations-table-cell--date">{row.lastUpdated}</div>
                  <div className="automations-table-cell automations-table-cell--toggle">
                    <button
                      type="button"
                      role="switch"
                      aria-checked={row.active}
                      className={`automations-toggle${row.active ? ' automations-toggle--on' : ''}`}
                      onClick={() => toggleActive(row.id)}
                    >
                      <span className="automations-toggle-thumb" />
                    </button>
                    <span className="automations-toggle-label">{row.active ? 'Active' : 'Inactive'}</span>
                  </div>
                  <div className="automations-table-cell automations-table-cell--actions">
                    <button type="button" className="automations-row-action" aria-label="More actions">
                      <More size={20} color="var(--text-secondary)" variant="Linear" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="automations-activity">
            <div className="automations-stat-cards">
              <div className="automations-stat-card">
                <span className="automations-stat-icon">
                  <UserTick size={40} color="var(--button-background)" variant="Linear" />
                </span>
                <div className="automations-stat-info">
                  <p className="automations-stat-label">Total triggers</p>
                  <p className="automations-stat-value">{TOTAL_TRIGGERS.toLocaleString()}</p>
                </div>
              </div>

              <div className="automations-stat-card">
                <span className="automations-stat-icon">
                  <Calendar size={40} color="var(--lesson-quiz)" variant="Linear" />
                </span>
                <div className="automations-stat-info">
                  <p className="automations-stat-label">This month</p>
                  <p className="automations-stat-value">{THIS_MONTH_TRIGGERS}</p>
                </div>
              </div>

              <div className="automations-stat-card">
                <span className="automations-stat-icon">
                  <Flash size={40} color="var(--success-500)" variant="Linear" />
                </span>
                <div className="automations-stat-info">
                  <p className="automations-stat-label">Active automations</p>
                  <p className="automations-stat-value">{activeAutomationsCount}</p>
                </div>
              </div>
            </div>

            {/* Filter bar: search left, automation dropdown right */}
            <div className="automations-filter-bar">
              <div className="automations-search">
                <SearchNormal1 size={18} color="var(--text-tertiary)" variant="Linear" />
                <input
                  type="text"
                  className="automations-search-input"
                  placeholder="Search by user name or email"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="automations-search-clear"
                    aria-label="Clear search"
                    onClick={() => setSearchQuery('')}
                  >
                    <CloseCircle size={20} color="var(--text-tertiary)" variant="Linear" />
                  </button>
                )}
              </div>

              <div
                className={`automations-dropdown${dropdownOpen ? ' automations-dropdown--open' : ''}`}
                ref={dropdownRef}
              >
                <button
                  type="button"
                  className="automations-dropdown-trigger"
                  onClick={() => setDropdownOpen((o) => !o)}
                  aria-haspopup="listbox"
                  aria-expanded={dropdownOpen}
                >
                  <Sort size={20} color="var(--text-secondary)" variant="Linear" />
                  <span className="automations-dropdown-value">{dropdownLabel}</span>
                  {dropdownOpen ? (
                    <ArrowUp2 size={20} color="var(--text-secondary)" variant="Linear" />
                  ) : (
                    <ArrowDown2 size={20} color="var(--text-secondary)" variant="Linear" />
                  )}
                </button>
                {dropdownOpen && (
                  <div className="automations-listbox" role="listbox">
                    <button
                      type="button"
                      role="option"
                      aria-selected={automationFilterId === 'all'}
                      className={`automations-listbox-item${automationFilterId === 'all' ? ' automations-listbox-item--selected' : ''}`}
                      onClick={() => {
                        setAutomationFilterId('all')
                        setDropdownOpen(false)
                      }}
                    >
                      All automations
                    </button>
                    {automations.map((a) => (
                      <button
                        type="button"
                        role="option"
                        key={a.id}
                        aria-selected={automationFilterId === a.id}
                        className={`automations-listbox-item${automationFilterId === a.id ? ' automations-listbox-item--selected' : ''}`}
                        onClick={() => {
                          setAutomationFilterId(a.id)
                          setDropdownOpen(false)
                        }}
                      >
                        {a.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Activity table */}
            <div className="automations-table">
              <div className="automations-table-header">
                <div className="automations-table-cell automations-table-cell--user">User</div>
                <div className="automations-table-cell automations-table-cell--automation">Automation</div>
                <button
                  type="button"
                  className="automations-table-cell automations-table-cell--triggered automations-table-cell--sortable"
                  onClick={toggleSort}
                  aria-label={`Sort by triggered date, currently ${sortDirection === 'desc' ? 'descending' : 'ascending'}`}
                >
                  Triggered
                  {sortDirection === 'desc' ? (
                    <ArrowDown size={16} color="var(--text-secondary)" variant="Linear" />
                  ) : (
                    <ArrowUp size={16} color="var(--text-secondary)" variant="Linear" />
                  )}
                </button>
              </div>

              {pageRows.length === 0 ? (
                <div className="automations-table-empty">No results found.</div>
              ) : (
                pageRows.map((row) => {
                  const automation = automationsById.get(row.automationId)
                  const isDeleted = !automation
                  const isInactive = !isDeleted && !automation!.active
                  const automationCellClass =
                    'automations-table-cell automations-table-cell--automation' +
                    (isDeleted || isInactive ? ' automations-table-cell--automation-muted' : '')
                  return (
                    <div key={row.id} className="automations-table-row">
                      <div className="automations-table-cell automations-table-cell--user">
                        <span className="automations-user-name">{row.user.name}</span>
                        <span className="automations-user-email">{row.user.email}</span>
                      </div>
                      <div className={automationCellClass}>
                        {isDeleted ? (
                          <>
                            <span>{row.automationNameSnapshot ?? 'Deleted automation'}</span>
                            <span className="badge badge--informative" role="status">Deleted</span>
                          </>
                        ) : (
                          <>
                            <span
                              className={`automations-status-dot${
                                automation!.active
                                  ? ' automations-status-dot--active'
                                  : ' automations-status-dot--inactive'
                              }`}
                            />
                            <span>{automation!.name}</span>
                          </>
                        )}
                      </div>
                      <div className="automations-table-cell automations-table-cell--triggered">
                        {formatTriggerDate(row.triggeredAt)}
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            {/* Pagination */}
            {totalRows > 0 && (
              <div className="automations-pagination">
                <span className="automations-pagination-info">
                  {pageStart + 1}-{pageEnd} of {totalRows}
                </span>
                <button
                  type="button"
                  className="automations-pagination-btn"
                  aria-label="Previous page"
                  disabled={safePage === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  <ArrowLeft2 size={16} color="var(--text-secondary)" variant="Linear" />
                </button>
                <button
                  type="button"
                  className="automations-pagination-btn"
                  aria-label="Next page"
                  disabled={safePage === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  <ArrowRight2 size={16} color="var(--text-secondary)" variant="Linear" />
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default Automations

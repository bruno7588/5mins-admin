import { useState, useRef, useEffect, useMemo } from 'react'
import {
  UserCirlceAdd,
  Medal,
  More,
  Edit2,
  Trash,
  Danger,
  Activity,
  Calendar,
  Flash,
  SearchNormal1,
  ArrowDown,
  ArrowUp,
  ArrowDown2,
  ArrowUp2,
  ArrowLeft2,
  ArrowRight2,
} from 'iconsax-react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal'
import './Automations.css'

type Tab = 'manage' | 'activity'
type SortDirection = 'asc' | 'desc'
type StateFilter = 'all' | 'active' | 'inactive' | 'deleted'

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

function formatTriggerDate(iso: string): { day: string; year: string } {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const d = new Date(iso)
  const day = String(d.getUTCDate()).padStart(2, '0')
  return {
    day: `${months[d.getUTCMonth()]} ${day},`,
    year: String(d.getUTCFullYear()),
  }
}

function Automations() {
  const [activeTab, setActiveTab] = useState<Tab>('manage')
  const [automations, setAutomations] = useState<AutomationRow[]>(mockAutomations)

  // Activity tab state
  const [searchQuery, setSearchQuery] = useState('')
  const [stateFilter, setStateFilter] = useState<StateFilter>('all')
  const [automationFilterId, setAutomationFilterId] = useState<string>('all')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [page, setPage] = useState(1)
  const [openDropdown, setOpenDropdown] = useState<'state' | 'automation' | null>(null)
  const stateDropdownRef = useRef<HTMLDivElement>(null)
  const automationDropdownRef = useRef<HTMLDivElement>(null)

  // Manage tab row action menu
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Delete confirmation modal
  const [pendingDelete, setPendingDelete] = useState<AutomationRow | null>(null)
  const [confirmInput, setConfirmInput] = useState('')

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
    if (stateFilter !== 'all') {
      rows = rows.filter((t) => {
        const automation = automationsById.get(t.automationId)
        if (stateFilter === 'deleted') return !automation
        if (stateFilter === 'active') return !!automation && automation.active
        if (stateFilter === 'inactive') return !!automation && !automation.active
        return true
      })
    }
    rows = [...rows].sort((a, b) => {
      const cmp = a.triggeredAt.localeCompare(b.triggeredAt)
      return sortDirection === 'asc' ? cmp : -cmp
    })
    return rows
  }, [searchQuery, stateFilter, automationFilterId, sortDirection, automationsById])

  const totalRows = filteredTriggers.length
  const totalPages = Math.max(1, Math.ceil(totalRows / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const pageStart = (safePage - 1) * PAGE_SIZE
  const pageEnd = Math.min(pageStart + PAGE_SIZE, totalRows)
  const pageRows = filteredTriggers.slice(pageStart, pageEnd)

  // Reset page when filters change
  useEffect(() => {
    setPage(1)
  }, [searchQuery, stateFilter, automationFilterId, sortDirection])

  // Click-outside for filter dropdowns
  useEffect(() => {
    if (openDropdown === null) return
    function onMouseDown(e: MouseEvent) {
      const ref = openDropdown === 'state' ? stateDropdownRef : automationDropdownRef
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [openDropdown])

  // Click-outside for row action menu
  useEffect(() => {
    if (openMenuId === null) return
    function onMouseDown(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null)
      }
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [openMenuId])

  function requestDeleteAutomation(id: string) {
    const automation = automations.find((a) => a.id === id)
    if (!automation) return
    setPendingDelete(automation)
    setConfirmInput('')
  }

  function closeDeleteModal() {
    setPendingDelete(null)
    setConfirmInput('')
  }

  function confirmDeleteAutomation() {
    if (!pendingDelete) return
    setAutomations((rows) => rows.filter((r) => r.id !== pendingDelete.id))
    closeDeleteModal()
  }

  function editAutomation(id: string) {
    // TODO: open edit modal once the design exists
    const automation = automations.find((a) => a.id === id)
    window.alert(`Edit "${automation?.name ?? 'automation'}" — not yet implemented`)
  }

  function toggleActive(id: string) {
    setAutomations((rows) =>
      rows.map((r) => (r.id === id ? { ...r, active: !r.active } : r)),
    )
  }

  function toggleSort() {
    setSortDirection((d) => (d === 'desc' ? 'asc' : 'desc'))
  }

  function clearFilters() {
    setSearchQuery('')
    setStateFilter('all')
    setAutomationFilterId('all')
  }

  const hasAnyTriggers = mockTriggers.length > 0
  const hasActiveFilters =
    searchQuery.trim() !== '' || stateFilter !== 'all' || automationFilterId !== 'all'
  const currentMonthLabel = new Date().toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  const stateDropdownLabel =
    stateFilter === 'all'
      ? 'All states'
      : stateFilter === 'active'
      ? 'Active'
      : stateFilter === 'inactive'
      ? 'Inactive'
      : 'Deleted'

  const automationDropdownLabel =
    automationFilterId === 'all'
      ? 'All Automations'
      : automationsById.get(automationFilterId)?.name ?? 'All Automations'

  const stateOptions: { value: StateFilter; label: string }[] = [
    { value: 'all', label: 'All states' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'deleted', label: 'Deleted' },
  ]

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
                    <div
                      className="automations-more-wrapper"
                      ref={openMenuId === row.id ? menuRef : undefined}
                    >
                      <button
                        type="button"
                        className="automations-row-action"
                        aria-label="More actions"
                        aria-haspopup="menu"
                        aria-expanded={openMenuId === row.id}
                        onClick={() =>
                          setOpenMenuId(openMenuId === row.id ? null : row.id)
                        }
                      >
                        <More size={20} color="var(--text-secondary)" variant="Linear" />
                      </button>
                      {openMenuId === row.id && (
                        <div className="automations-action-menu" role="menu">
                          <div className="automations-action-menu-caret" />
                          <button
                            type="button"
                            className="automations-action-menu-item"
                            role="menuitem"
                            onClick={() => {
                              setOpenMenuId(null)
                              editAutomation(row.id)
                            }}
                          >
                            <Edit2 size={20} color="var(--text-secondary)" variant="Linear" />
                            Edit automation
                          </button>
                          <button
                            type="button"
                            className="automations-action-menu-item automations-action-menu-item--danger"
                            role="menuitem"
                            onClick={() => {
                              setOpenMenuId(null)
                              requestDeleteAutomation(row.id)
                            }}
                          >
                            <Trash size={20} color="var(--danger-500)" variant="Linear" />
                            Delete automation
                          </button>
                        </div>
                      )}
                    </div>
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
                  <Activity size={40} color="var(--button-background)" variant="Linear" />
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
                  <p className="automations-stat-label">
                    This month <span className="automations-stat-label-meta">({currentMonthLabel})</span>
                  </p>
                  <p className="automations-stat-value">{THIS_MONTH_TRIGGERS}</p>
                </div>
              </div>

              <div className="automations-stat-card">
                <span className="automations-stat-icon">
                  <Flash size={40} color="var(--success-500)" variant="Linear" />
                </span>
                <div className="automations-stat-info">
                  <p className="automations-stat-label">Active automations</p>
                  <p className="automations-stat-value">
                    {activeAutomationsCount}
                    <span className="automations-stat-value-suffix">/{automations.length}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Filter bar: search left, automation dropdown right */}
            {hasAnyTriggers && (
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
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M14.375 14.375L5.625 5.625M14.375 5.625L5.625 14.375"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                )}
              </div>

              <div className="automations-filter-dropdowns">
                <span className="automations-filter-label">Filter by</span>
                {/* State filter */}
                <div
                  className={`automations-dropdown automations-dropdown--state${openDropdown === 'state' ? ' automations-dropdown--open' : ''}`}
                  ref={stateDropdownRef}
                >
                  <button
                    type="button"
                    className="automations-dropdown-trigger"
                    onClick={() => setOpenDropdown((o) => (o === 'state' ? null : 'state'))}
                    aria-haspopup="listbox"
                    aria-expanded={openDropdown === 'state'}
                  >
                    <span className="automations-dropdown-value">{stateDropdownLabel}</span>
                    {openDropdown === 'state' ? (
                      <ArrowUp2 size={20} color="var(--text-secondary)" variant="Linear" />
                    ) : (
                      <ArrowDown2 size={20} color="var(--text-secondary)" variant="Linear" />
                    )}
                  </button>
                  {openDropdown === 'state' && (
                    <div className="automations-listbox" role="listbox">
                      {stateOptions.map((opt) => (
                        <button
                          type="button"
                          role="option"
                          key={opt.value}
                          aria-selected={stateFilter === opt.value}
                          className={`automations-listbox-item${stateFilter === opt.value ? ' automations-listbox-item--selected' : ''}`}
                          onClick={() => {
                            setStateFilter(opt.value)
                            setOpenDropdown(null)
                          }}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Automation filter */}
                <div
                  className={`automations-dropdown${openDropdown === 'automation' ? ' automations-dropdown--open' : ''}`}
                  ref={automationDropdownRef}
                >
                  <button
                    type="button"
                    className="automations-dropdown-trigger"
                    onClick={() => setOpenDropdown((o) => (o === 'automation' ? null : 'automation'))}
                    aria-haspopup="listbox"
                    aria-expanded={openDropdown === 'automation'}
                  >
                    <span className="automations-dropdown-value">{automationDropdownLabel}</span>
                    {openDropdown === 'automation' ? (
                      <ArrowUp2 size={20} color="var(--text-secondary)" variant="Linear" />
                    ) : (
                      <ArrowDown2 size={20} color="var(--text-secondary)" variant="Linear" />
                    )}
                  </button>
                  {openDropdown === 'automation' && (
                    <div className="automations-listbox" role="listbox">
                      <button
                        type="button"
                        role="option"
                        aria-selected={automationFilterId === 'all'}
                        className={`automations-listbox-item${automationFilterId === 'all' ? ' automations-listbox-item--selected' : ''}`}
                        onClick={() => {
                          setAutomationFilterId('all')
                          setOpenDropdown(null)
                        }}
                      >
                        All Automations
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
                            setOpenDropdown(null)
                          }}
                        >
                          {a.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            )}

            {/* Activity table */}
            <div className="automations-table">
              {pageRows.length > 0 && (
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
              )}

              {pageRows.length === 0 ? (
                !hasAnyTriggers ? (
                  <div className="automations-empty-state">
                    <Activity size={40} color="var(--text-tertiary)" variant="Linear" />
                    <p className="automations-empty-state-title">No activity yet</p>
                    <p className="automations-empty-state-body">
                      Triggers will appear here when your automations enrol users in courses.
                    </p>
                  </div>
                ) : (
                  <div className="automations-empty-state">
                    <SearchNormal1 size={40} color="var(--text-tertiary)" variant="Linear" />
                    <p className="automations-empty-state-title">No results match your filters</p>
                    <p className="automations-empty-state-body">
                      Try a different search or adjust your filters.
                    </p>
                    {hasActiveFilters && (
                      <button
                        type="button"
                        className="automations-empty-state-action"
                        onClick={clearFilters}
                      >
                        Clear filters
                      </button>
                    )}
                  </div>
                )
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
                            {isInactive && (
                              <span className="badge badge--informative" role="status">Inactive</span>
                            )}
                          </>
                        )}
                      </div>
                      <div className="automations-table-cell automations-table-cell--triggered">
                        {(() => {
                          const date = formatTriggerDate(row.triggeredAt)
                          return (
                            <div className="automations-trigger-date">
                              <span className="automations-trigger-date-day">{date.day}</span>
                              <span className="automations-trigger-date-year">{date.year}</span>
                            </div>
                          )
                        })()}
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

      {/* Delete automation confirmation */}
      <ConfirmModal open={!!pendingDelete} onClose={closeDeleteModal}>
        {pendingDelete && (
          <>
            <div className="confirm-modal-header confirm-modal-header--center">
              <Danger size={72} color="var(--danger-500)" variant="Linear" />
              <h3 className="confirm-modal-title">Delete automation</h3>
              <p className="confirm-modal-body">
                You're about to delete <strong>{pendingDelete.name}</strong>. Past
                trigger activity will be retained, but the automation will stop
                running. This cannot be undone.
              </p>
            </div>
            <div className="confirm-modal-input-group">
              <label className="confirm-modal-label">
                Type <span className="confirm-modal-label-danger">'Delete'</span> below, to confirm
              </label>
              <input
                className="confirm-modal-input"
                type="text"
                value={confirmInput}
                onChange={(e) => setConfirmInput(e.target.value)}
              />
            </div>
            <div className="confirm-modal-actions confirm-modal-actions--center">
              <button
                className="confirm-modal-btn confirm-modal-btn--outlined-neutral"
                onClick={closeDeleteModal}
              >
                Cancel
              </button>
              <button
                className="confirm-modal-btn confirm-modal-btn--danger"
                disabled={confirmInput !== 'Delete'}
                onClick={confirmDeleteAutomation}
              >
                Delete Automation
              </button>
            </div>
          </>
        )}
      </ConfirmModal>
    </div>
  )
}

export default Automations

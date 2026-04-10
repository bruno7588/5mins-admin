import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowUp2, Refresh } from 'iconsax-react'
import CloseButton from '../../components/CloseButton/CloseButton'
import Search from '../../components/Search/Search'
import Alert from '../../components/Alert/Alert'
import Chip from '../../components/Chip/Chip'
import type { AutomationRow, User } from './Automations'
import './ForceTriggerModal.css'

interface ForceTriggerModalProps {
  automation: AutomationRow | null
  users: User[]
  previouslyTriggeredUserIds: Set<string>
  onClose: () => void
  onTrigger: (automationId: string, userIds: string[]) => void
}

function ForceTriggerModal({
  automation,
  users,
  previouslyTriggeredUserIds,
  onClose,
  onTrigger,
}: ForceTriggerModalProps) {
  const [closing, setClosing] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([])
  const [searchFocused, setSearchFocused] = useState(false)
  const [coursesExpanded, setCoursesExpanded] = useState(false)
  const searchWrapperRef = useRef<HTMLDivElement>(null)

  // Reset state every time the drawer opens for a (new) automation.
  useEffect(() => {
    if (automation) {
      setClosing(false)
      setSearchQuery('')
      setSelectedUserIds([])
      setSearchFocused(false)
      setCoursesExpanded(false)
    }
  }, [automation])

  // Esc closes the drawer.
  useEffect(() => {
    if (!automation) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [automation])

  // Click-outside closes the search dropdown (but not the drawer).
  useEffect(() => {
    if (!searchFocused) return
    function onMouseDown(e: MouseEvent) {
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(e.target as Node)
      ) {
        setSearchFocused(false)
      }
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [searchFocused])

  function handleClose() {
    setClosing(true)
    setTimeout(onClose, 300)
  }

  const selectedUsers = useMemo(
    () => selectedUserIds.map((id) => users.find((u) => u.id === id)).filter(Boolean) as User[],
    [selectedUserIds, users],
  )

  const filteredResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return []
    const selectedSet = new Set(selectedUserIds)
    return users.filter(
      (u) =>
        !selectedSet.has(u.id) &&
        (u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)),
    )
  }, [searchQuery, selectedUserIds, users])

  function selectUser(userId: string) {
    setSelectedUserIds((prev) => (prev.includes(userId) ? prev : [...prev, userId]))
    setSearchQuery('')
  }

  function removeUser(userId: string) {
    setSelectedUserIds((prev) => prev.filter((id) => id !== userId))
  }

  if (!automation) return null

  const showResults = searchFocused && searchQuery.trim().length > 0
  const triggerLabel = `Run for ${selectedUsers.length} ${
    selectedUsers.length === 1 ? 'user' : 'users'
  }`
  const COURSE_PREVIEW_COUNT = 3
  const visibleCourses =
    coursesExpanded || automation.courses.length <= COURSE_PREVIEW_COUNT
      ? automation.courses
      : automation.courses.slice(0, COURSE_PREVIEW_COUNT)
  const retriggerCount = selectedUsers.filter((u) =>
    previouslyTriggeredUserIds.has(u.id),
  ).length

  function handleTrigger() {
    if (!automation || selectedUsers.length === 0) return
    onTrigger(automation.id, selectedUsers.map((u) => u.id))
  }

  return (
    <>
      <div
        className={`force-trigger-overlay${closing ? ' force-trigger-overlay--closing' : ''}`}
        onClick={handleClose}
      />
      <aside
        className={`force-trigger-drawer${closing ? ' force-trigger-drawer--closing' : ''}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="force-trigger-title"
      >
        {/* Header — Section Header pattern per spec */}
        <div className="force-trigger-header">
          <div className="force-trigger-headline">
            <h2 id="force-trigger-title" className="force-trigger-title">
              Run automation
            </h2>
            <p className="force-trigger-subtitle">
              {automation.name}
            </p>
            <CloseButton onClick={handleClose} className="force-trigger-close" />
          </div>
          <div className="force-trigger-divider" />
        </div>

        {/* Body */}
        <div className="force-trigger-body">
          {/* Course list */}
          <div className="force-trigger-courses">
            <p className="force-trigger-courses-label">
              Users will be enrolled in these courses
            </p>
            <div className="force-trigger-courses-card">
              {visibleCourses.map((c, i) => (
                <div key={i} className="force-trigger-course-row">
                  <span className="force-trigger-course-badge">{i + 1}</span>
                  <span className="force-trigger-course-name">{c.name}</span>
                </div>
              ))}
              {automation.courses.length > COURSE_PREVIEW_COUNT && (
                <button
                  type="button"
                  className="force-trigger-toggle-courses"
                  onClick={() => setCoursesExpanded((v) => !v)}
                >
                  {coursesExpanded ? 'View less' : `View all ${automation.courses.length} courses`}
                  <ArrowUp2
                    size={16}
                    color="currentColor"
                    variant="Linear"
                    className={`force-trigger-toggle-chevron${coursesExpanded ? '' : ' force-trigger-toggle-chevron--down'}`}
                  />
                </button>
              )}
            </div>
          </div>

          {/* User picker */}
          <div className="force-trigger-section">
            <p className="force-trigger-section-label">Select users</p>
            <div className="force-trigger-search-wrapper" ref={searchWrapperRef}>
              <Search
                size="M"
                value={searchQuery}
                placeholder="Search users by name or email"
                onChange={setSearchQuery}
                onFocus={() => setSearchFocused(true)}
              />
              {showResults && (
                <div className="force-trigger-results" role="listbox">
                  {filteredResults.length === 0 ? (
                    <div className="force-trigger-results-empty">
                      No users match "{searchQuery}"
                    </div>
                  ) : (
                    filteredResults.map((user) => {
                      const wasTriggered = previouslyTriggeredUserIds.has(user.id)
                      return (
                        <button
                          key={user.id}
                          type="button"
                          role="option"
                          aria-selected={false}
                          className="force-trigger-result"
                          onClick={() => selectUser(user.id)}
                        >
                          <div className="force-trigger-result-info">
                            <span className="force-trigger-result-name">{user.name}</span>
                            <span className="force-trigger-result-email">{user.email}</span>
                          </div>
                          {wasTriggered && (
                            <span
                              className="force-trigger-result-marker"
                              title="Already enrolled by this automation"
                            >
                              <Refresh
                                size={16}
                                color="var(--text-tertiary)"
                                variant="Linear"
                              />
                            </span>
                          )}
                        </button>
                      )
                    })
                  )}
                </div>
              )}
            </div>

            {selectedUsers.length > 0 && (
              <div className="force-trigger-chips">
                {selectedUsers.map((user) => (
                  <Chip
                    key={user.id}
                    label={user.name}
                    iconLeft
                    iconRight
                    onDismiss={() => removeUser(user.id)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Re-trigger warning — informational, non-blocking */}
          {retriggerCount > 0 && (
            <Alert
              type="Alert"
              icon
              message={`${retriggerCount} of the selected ${
                retriggerCount === 1 ? 'user has' : 'users have'
              } already been enrolled by this automation. Their progress will be reset and enrolment will restart from the beginning.`}
            />
          )}

          {/* Failure alert slot — wired up but unused in prototype.
              TODO: Replace with actual API call — handle partial failure (some
              users succeed, some fail). When the backend returns a list of
              failed user IDs, render an Alert here listing their names and
              keep the modal open so the admin can investigate. */}
        </div>

        {/* Footer — sticky per spec */}
        <div className="force-trigger-footer">
          <div className="force-trigger-footer-divider" />
          <div className="force-trigger-footer-buttons">
            <button
              type="button"
              className="force-trigger-btn-primary"
              disabled={selectedUsers.length === 0}
              onClick={handleTrigger}
            >
              {triggerLabel}
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

export default ForceTriggerModal

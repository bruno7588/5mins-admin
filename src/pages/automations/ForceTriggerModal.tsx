import { useEffect, useMemo, useRef, useState } from 'react'
import { Refresh } from 'iconsax-react'
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
  const searchWrapperRef = useRef<HTMLDivElement>(null)

  // Reset state every time the drawer opens for a (new) automation.
  useEffect(() => {
    if (automation) {
      setClosing(false)
      setSearchQuery('')
      setSelectedUserIds([])
      setSearchFocused(false)
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
  const triggerLabel = `Trigger for ${selectedUsers.length} ${
    selectedUsers.length === 1 ? 'user' : 'users'
  }`
  const courseBullets = automation.courses.map(
    (c) => `${c.name} — ${c.delay}`,
  )
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
        {/* Header */}
        <div className="force-trigger-header">
          <div className="force-trigger-header-row">
            <div className="force-trigger-header-text">
              <h3 id="force-trigger-title" className="force-trigger-title">
                Force trigger: {automation.name}
              </h3>
              <p className="force-trigger-subtitle">
                Manually enrol selected users. Automation rules will be skipped.
              </p>
            </div>
            <CloseButton onClick={handleClose} className="force-trigger-close" />
          </div>
          <div className="force-trigger-divider" />
        </div>

        {/* Body */}
        <div className="force-trigger-body">
          {/* Course summary as Callout */}
          <Alert
            type="Callout"
            title={`This will enrol users in ${automation.courses.length} ${
              automation.courses.length === 1 ? 'course' : 'courses'
            }`}
            bullets={courseBullets}
          />

          {/* User picker */}
          <div className="force-trigger-section">
            <p className="force-trigger-section-label">Select users to trigger</p>
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
                              title="Already triggered by this automation"
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
              } already been triggered by this automation. Their enrolments will be reset and the trigger time will be updated to now.`}
            />
          )}

          {/* Failure alert slot — wired up but unused in prototype.
              TODO: Replace with actual API call — handle partial failure (some
              users succeed, some fail). When the backend returns a list of
              failed user IDs, render an Alert here listing their names and
              keep the modal open so the admin can investigate. */}
        </div>

        {/* Footer */}
        <div className="force-trigger-footer">
          <button
            type="button"
            className="confirm-modal-btn confirm-modal-btn--primary"
            disabled={selectedUsers.length === 0}
            onClick={handleTrigger}
          >
            {triggerLabel}
          </button>
          <button
            type="button"
            className="confirm-modal-btn confirm-modal-btn--outlined-neutral"
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </aside>
    </>
  )
}

export default ForceTriggerModal

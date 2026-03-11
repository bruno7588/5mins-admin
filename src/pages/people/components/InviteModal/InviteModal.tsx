import { useState } from 'react'
import { Add, Notification, ArrowDown2, Calendar } from 'iconsax-react'
import CloseButton from '../../../../components/CloseButton/CloseButton'
import './InviteModal.css'

interface UserField {
  id: number
  name: string
  options: string[]
  required: boolean
}

interface InviteRow {
  email: string
  team: string
  role: string
  startDate: string
  region: string
  teamRights: string
  customFields: Record<number, string>
}

interface InviteModalProps {
  onClose: () => void
  onInvite: (count: number) => void
  userFields: UserField[]
}

const emptyRow = (userFields: UserField[]): InviteRow => ({
  email: '',
  team: '',
  role: '',
  startDate: '',
  region: '',
  teamRights: '',
  customFields: Object.fromEntries(userFields.map(f => [f.id, ''])),
})

const teamOptions = ['Customer Support Team', 'Financial Services', 'Product Engineering', 'Growth Team', 'Business Intelligence']
const regionOptions = ['Southeast Asia', 'Europe', 'North America', 'Latin America', 'East Asia']
const rightsOptions = ['Manager', 'Contributor', 'Viewer']

const automations = [
  { name: 'Auto-enrol Compliance 101', badges: ['Join date', 'Role'] },
  { name: 'New Hire Onboarding Program', badges: ['Join date', 'Region'] },
  { name: 'Q1 Safety Training', badges: ['Region'] },
]

function InviteModal({ onClose, onInvite, userFields }: InviteModalProps) {
  const [rows, setRows] = useState<InviteRow[]>([emptyRow(userFields)])
  const [showMoreAutomations, setShowMoreAutomations] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const updateRow = (index: number, patch: Partial<InviteRow>) => {
    setRows(prev => prev.map((r, i) => (i === index ? { ...r, ...patch } : r)))
  }

  const updateCustomField = (rowIndex: number, fieldId: number, value: string) => {
    setRows(prev => prev.map((r, i) =>
      i === rowIndex ? { ...r, customFields: { ...r.customFields, [fieldId]: value } } : r
    ))
  }

  const addRow = () => {
    setRows(prev => [...prev, emptyRow(userFields)])
  }

  const removeRow = (index: number) => {
    setRows(prev => prev.filter((_, i) => i !== index))
  }

  const canInvite = rows.some(r => r.email.trim().length > 0)

  const handleDropdownToggle = (key: string) => {
    setOpenDropdown(prev => (prev === key ? null : key))
  }

  const handleDropdownSelect = (_key: string, rowIndex: number, field: string, value: string) => {
    updateRow(rowIndex, { [field]: value })
    setOpenDropdown(null)
  }

  const handleCustomDropdownSelect = (_key: string, rowIndex: number, fieldId: number, value: string) => {
    updateCustomField(rowIndex, fieldId, value)
    setOpenDropdown(null)
  }

  return (
    <div className="invite-modal">
      {/* Header */}
      <div className="invite-modal-header">
        <h2 className="invite-modal-title">Invite people to 5Mins</h2>
        <CloseButton onClick={onClose} />
      </div>

      {/* Alert banner */}
      <div className="invite-modal-content">
        <div className="invite-modal-alert">
          <Notification size={21} color="var(--text-primary)" variant="Bold" />
          <div className="invite-modal-alert-info">
            <p className="invite-modal-alert-text">
              Join date, role, and region are required by your automations. All invited users will be evaluated against these automations.
            </p>
            {automations.map((a, i) => (
              <div className="invite-modal-alert-row" key={i}>
                <span className="invite-modal-alert-bullet">{a.name}</span>
                <div className="invite-modal-alert-badges">
                  {a.badges.map(b => (
                    <span className="invite-modal-alert-badge" key={b}>{b}</span>
                  ))}
                </div>
              </div>
            ))}
            <button
              className="invite-modal-alert-more"
              onClick={() => setShowMoreAutomations(!showMoreAutomations)}
            >
              {showMoreAutomations ? 'show less' : 'and 4 more automations'}
              <ArrowDown2
                size={14}
                color="var(--text-tertiary)"
                style={{ transform: showMoreAutomations ? 'rotate(180deg)' : undefined, transition: 'transform 200ms ease' }}
              />
            </button>
          </div>
        </div>

        {/* Form rows */}
        <div className="invite-modal-form">
          {rows.map((row, rowIndex) => (
            <div className="invite-modal-card" key={rowIndex}>
              {/* Remove button — top right of card */}
              {rows.length > 1 && (
                <button
                  className="invite-modal-card-remove"
                  onClick={() => removeRow(rowIndex)}
                  aria-label="Remove row"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M17.25 17.25L6.75 6.75M17.25 6.75L6.75 17.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="invite-modal-card-remove-tooltip">Remove</span>
                </button>
              )}

              {/* Fields grid */}
              <div className="invite-modal-grid">
                {/* Email */}
                <div className="invite-modal-field">
                  <label className="invite-modal-label">Email address</label>
                  <input
                    className="invite-modal-input"
                    type="email"
                    placeholder="Add a company email"
                    value={row.email}
                    onChange={e => updateRow(rowIndex, { email: e.target.value })}
                  />
                </div>

                {/* Team name */}
                <div className="invite-modal-field">
                  <label className="invite-modal-label">Team name</label>
                  <div className="invite-modal-dropdown-wrapper">
                    <button
                      className="invite-modal-dropdown"
                      onClick={() => handleDropdownToggle(`team-${rowIndex}`)}
                    >
                      <span className={row.team ? 'invite-modal-dropdown-value' : 'invite-modal-dropdown-placeholder'}>
                        {row.team || 'Select team'}
                      </span>
                      <ArrowDown2 size={20} color="var(--text-secondary)" />
                    </button>
                    {openDropdown === `team-${rowIndex}` && (
                      <div className="invite-modal-listbox">
                        {teamOptions.map(opt => (
                          <button
                            key={opt}
                            className={`invite-modal-listbox-item${row.team === opt ? ' invite-modal-listbox-item--selected' : ''}`}
                            onClick={() => handleDropdownSelect(`team-${rowIndex}`, rowIndex, 'team', opt)}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Role */}
                <div className="invite-modal-field">
                  <label className="invite-modal-label">Role <span className="invite-modal-required">*</span></label>
                  <input
                    className="invite-modal-input"
                    type="text"
                    placeholder="Search roles"
                    value={row.role}
                    onChange={e => updateRow(rowIndex, { role: e.target.value })}
                  />
                </div>

                {/* Start date */}
                <div className="invite-modal-field">
                  <label className="invite-modal-label">Start date <span className="invite-modal-required">*</span></label>
                  <div className="invite-modal-date-wrapper">
                    <input
                      className="invite-modal-input invite-modal-input--date"
                      type="date"
                      value={row.startDate}
                      onChange={e => updateRow(rowIndex, { startDate: e.target.value })}
                    />
                    <Calendar size={20} color="var(--text-secondary)" className="invite-modal-date-icon" />
                  </div>
                </div>

                {/* Region */}
                <div className="invite-modal-field">
                  <label className="invite-modal-label">Region <span className="invite-modal-required">*</span></label>
                  <div className="invite-modal-dropdown-wrapper">
                    <button
                      className="invite-modal-dropdown"
                      onClick={() => handleDropdownToggle(`region-${rowIndex}`)}
                    >
                      <span className={row.region ? 'invite-modal-dropdown-value' : 'invite-modal-dropdown-placeholder'}>
                        {row.region || 'Add a region'}
                      </span>
                      <ArrowDown2 size={20} color="var(--text-secondary)" />
                    </button>
                    {openDropdown === `region-${rowIndex}` && (
                      <div className="invite-modal-listbox">
                        {regionOptions.map(opt => (
                          <button
                            key={opt}
                            className={`invite-modal-listbox-item${row.region === opt ? ' invite-modal-listbox-item--selected' : ''}`}
                            onClick={() => handleDropdownSelect(`region-${rowIndex}`, rowIndex, 'region', opt)}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Team rights */}
                <div className="invite-modal-field">
                  <label className="invite-modal-label">Team rights</label>
                  <div className="invite-modal-dropdown-wrapper">
                    <button
                      className="invite-modal-dropdown"
                      onClick={() => handleDropdownToggle(`rights-${rowIndex}`)}
                    >
                      <span className={row.teamRights ? 'invite-modal-dropdown-value' : 'invite-modal-dropdown-placeholder'}>
                        {row.teamRights || 'Manager'}
                      </span>
                      <ArrowDown2 size={20} color="var(--text-secondary)" />
                    </button>
                    {openDropdown === `rights-${rowIndex}` && (
                      <div className="invite-modal-listbox">
                        {rightsOptions.map(opt => (
                          <button
                            key={opt}
                            className={`invite-modal-listbox-item${row.teamRights === opt ? ' invite-modal-listbox-item--selected' : ''}`}
                            onClick={() => handleDropdownSelect(`rights-${rowIndex}`, rowIndex, 'teamRights', opt)}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Custom user fields */}
                {userFields.map(field => (
                  <div className="invite-modal-field" key={field.id}>
                    <label className="invite-modal-label">
                      {field.name}
                      {field.required && <span className="invite-modal-required"> *</span>}
                    </label>
                    <div className="invite-modal-dropdown-wrapper">
                      <button
                        className="invite-modal-dropdown"
                        onClick={() => handleDropdownToggle(`custom-${field.id}-${rowIndex}`)}
                      >
                        <span className={row.customFields[field.id] ? 'invite-modal-dropdown-value' : 'invite-modal-dropdown-placeholder'}>
                          {row.customFields[field.id] || `Select ${field.name.toLowerCase()}`}
                        </span>
                        <ArrowDown2 size={20} color="var(--text-secondary)" />
                      </button>
                      {openDropdown === `custom-${field.id}-${rowIndex}` && (
                        <div className="invite-modal-listbox">
                          {field.options.map(opt => (
                            <button
                              key={opt}
                              className={`invite-modal-listbox-item${row.customFields[field.id] === opt ? ' invite-modal-listbox-item--selected' : ''}`}
                              onClick={() => handleCustomDropdownSelect(`custom-${field.id}-${rowIndex}`, rowIndex, field.id, opt)}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Add another user + required hint */}
          <div className="invite-modal-form-footer">
            <button className="invite-modal-add-user" onClick={addRow}>
              Invite Another User
              <Add size={20} color="currentColor" />
            </button>
            <span className="invite-modal-required-hint">
              <span className="invite-modal-required">*</span> Required fields
            </span>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="invite-modal-footer">
          <button className="invite-modal-btn invite-modal-btn--cancel" onClick={onClose}>
            Cancel
          </button>
          <div className="invite-modal-btn-wrapper">
            <button
              className={`invite-modal-btn invite-modal-btn--invite${!canInvite ? ' invite-modal-btn--disabled' : ''}`}
              disabled={!canInvite}
              onClick={() => {
                const filledCount = rows.filter(r => r.email.trim().length > 0).length
                onInvite(filledCount)
              }}
            >
              Invite
            </button>
            {!canInvite && (
              <span className="invite-modal-btn-tooltip">Fill all the required fields</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InviteModal

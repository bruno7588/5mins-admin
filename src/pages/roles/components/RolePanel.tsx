import { useState, useEffect, useRef } from 'react'
import { CloseCircle, SearchNormal1, ArrowDown2, ArrowUp2, Danger } from 'iconsax-react'
import Checkbox from '../../../components/Checkbox/Checkbox'
import InputField from '../../../components/InputField/InputField'
import { skillCatalogue, simulateAISuggestion, type Skill, type CompanyRole, type FiveMinsRole } from '../data/mockRoles'

/* ─── Panel mode types ─────────────────────────────────── */

export type PanelMode =
  | { type: 'create' }
  | { type: 'create-prefilled'; name: string; skills: Skill[]; leadership: boolean }
  | { type: 'copy'; source: FiveMinsRole }
  | { type: 'edit'; role: CompanyRole }

interface Props {
  mode: PanelMode
  onClose: () => void
  onSave: (name: string, skills: Skill[], leadership: boolean) => void
}

function RolePanel({ mode, onClose, onSave }: Props) {
  const isEdit = mode.type === 'edit'
  const isCopy = mode.type === 'copy'
  const isPrefilled = mode.type === 'create-prefilled'

  // Initial values based on mode
  const initName = () => {
    if (isEdit) return mode.role.name
    if (isCopy) return mode.source.name
    if (isPrefilled) return mode.name
    return ''
  }
  const initSkills = (): Skill[] => {
    if (isEdit) return [...mode.role.skills]
    if (isCopy) return [...mode.source.skills]
    if (isPrefilled) return [...mode.skills]
    return []
  }
  const initLeadership = () => {
    if (isEdit) return mode.role.leadership
    if (isCopy) return mode.source.leadership
    if (isPrefilled) return mode.leadership
    return false
  }

  const [step, setStep] = useState<1 | 2>(isEdit ? 2 : 1)
  const [name, setName] = useState(initName)
  const [leadership, setLeadership] = useState(initLeadership)
  const [description, setDescription] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>(initSkills)

  // AI state
  const [aiLoading, setAiLoading] = useState(false)
  const [aiUsed, setAiUsed] = useState(false)
  const [aiCount, setAiCount] = useState(0)

  // Skill search
  const [skillSearch, setSkillSearch] = useState('')
  const [skillDropdownOpen, setSkillDropdownOpen] = useState(false)
  const [addMoreOpen, setAddMoreOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setSkillDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Escape key to close panel
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  const handleAISuggest = async () => {
    setAiLoading(true)
    const results = await simulateAISuggestion(name, description, jobDescription, leadership)
    setSelectedSkills(results)
    setAiCount(results.length)
    setAiUsed(true)
    setAiLoading(false)
    setStep(2)
  }

  const handleResuggest = async () => {
    setAiLoading(true)
    const results = await simulateAISuggestion(name, description, jobDescription, leadership)
    setSelectedSkills(results)
    setAiCount(results.length)
    setAiLoading(false)
  }

  const handleSkipToManual = () => {
    setAiUsed(false)
    setStep(2)
  }

  const removeSkill = (id: number) => {
    setSelectedSkills(prev => prev.filter(sk => sk.id !== id))
  }

  const addSkill = (skill: Skill) => {
    if (!selectedSkills.find(sk => sk.id === skill.id)) {
      setSelectedSkills(prev => [...prev, skill])
    }
  }

  const filteredCatalogue = skillCatalogue.filter(sk => {
    if (selectedSkills.find(sel => sel.id === sk.id)) return false
    if (skillSearch && !sk.name.toLowerCase().includes(skillSearch.toLowerCase())) return false
    return true
  })

  const canSave = name.trim().length > 0 && selectedSkills.length > 0

  /* ─── Render helpers ──────────────────────────────────── */

  const renderSkillChips = () => (
    <div className="roles-panel-chips">
      {selectedSkills.map(sk => (
        <span key={sk.id} className="roles-skill-chip roles-skill-chip--cyan">
          {sk.name}
          <button className="roles-skill-chip-remove" onClick={() => removeSkill(sk.id)}>
            <CloseCircle size={14} color="var(--primary-700)" variant="Bold" />
          </button>
        </span>
      ))}
    </div>
  )

  const renderSkillSearchSection = () => (
    <div className={`roles-panel-add-more${addMoreOpen || (!aiUsed && !isCopy && !isEdit) ? ' roles-panel-add-more--open' : ''}`}>
      {(aiUsed || isCopy || isEdit) && (
        <button
          className="roles-panel-toggle"
          onClick={() => setAddMoreOpen(!addMoreOpen)}
        >
          {addMoreOpen ? <ArrowUp2 size={14} /> : <ArrowDown2 size={14} />}
          Search and add more skills
        </button>
      )}
      {(addMoreOpen || (!aiUsed && !isCopy && !isEdit)) && (
        <div className="roles-panel-skill-search" ref={dropdownRef}>
          <div className="roles-search" style={{ width: '100%' }}>
            <SearchNormal1 size={16} color="var(--text-tertiary)" />
            <input
              className="roles-search-input"
              placeholder="Search skills…"
              value={skillSearch}
              onChange={e => {
                setSkillSearch(e.target.value)
                setSkillDropdownOpen(true)
              }}
              onFocus={() => setSkillDropdownOpen(true)}
            />
          </div>
          {skillDropdownOpen && filteredCatalogue.length > 0 && (
            <div className="roles-panel-skill-dropdown">
              {filteredCatalogue.slice(0, 10).map(sk => (
                <button
                  key={sk.id}
                  className="roles-panel-skill-option"
                  onClick={() => {
                    addSkill(sk)
                    setSkillSearch('')
                  }}
                >
                  <Checkbox checked={false} />
                  <span className="roles-panel-skill-option-name">{sk.name}</span>
                  <span className="roles-panel-skill-option-cat">{sk.category}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )

  const renderSummary = () => (
    <div className="roles-panel-summary">
      <div className="roles-panel-summary-row">
        <span className="roles-panel-summary-label">Role</span>
        <span className="roles-panel-summary-value">{name || '—'}</span>
      </div>
      <div className="roles-panel-summary-row">
        <span className="roles-panel-summary-label">Skills</span>
        <span className="roles-panel-summary-value">{selectedSkills.length}</span>
      </div>
      {leadership && (
        <div className="roles-panel-summary-row">
          <span className="roles-panel-summary-label">Type</span>
          <span className="roles-leader-badge">Leadership</span>
        </div>
      )}
      {selectedSkills.length > 0 && (
        <div className="roles-panel-summary-chips">
          {selectedSkills.slice(0, 5).map(sk => (
            <span key={sk.id} className="roles-skill-chip roles-skill-chip--grey" style={{ fontSize: 12 }}>{sk.name}</span>
          ))}
          {selectedSkills.length > 5 && (
            <span className="roles-skill-chip roles-skill-chip--grey" style={{ fontSize: 12 }}>+{selectedSkills.length - 5} more</span>
          )}
        </div>
      )}
    </div>
  )

  /* ─── Panel content ───────────────────────────────────── */

  const renderTitle = () => {
    if (isEdit) return `Edit Role: ${mode.role.name}`
    if (isCopy) return 'Copy from 5Mins Library'
    return 'Create Role'
  }

  const renderSubtitle = () => {
    if (isEdit) return 'Skill changes will update recommendations for assigned employees.'
    if (isCopy) return `Based on: ${mode.source.name} — customise name and skills below`
    if (isPrefilled) return `Duplicating role — customise name and skills below`
    return null
  }

  return (
    <div className="roles-panel-overlay" onClick={onClose}>
      <div className="roles-panel" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="roles-panel-header">
          <div>
            <h2 className="roles-panel-title">{renderTitle()}</h2>
            {renderSubtitle() && (
              <p className="roles-panel-subtitle">{renderSubtitle()}</p>
            )}
          </div>
          <button className="roles-panel-close" onClick={onClose}>
            <CloseCircle size={20} color="var(--text-tertiary)" />
          </button>
        </div>

        {/* Body */}
        <div className="roles-panel-body">
          {/* ── Edit Mode (single view, no steps) ── */}
          {isEdit && (
            <>
              {mode.role.employeeCount > 0 && (
                <div className="roles-panel-warning">
                  <Danger size={16} color="var(--danger-500)" variant="Bold" />
                  <span>{mode.role.employeeCount} employee{mode.role.employeeCount !== 1 ? 's' : ''} have this role. Changing skills will update their recommendations.</span>
                </div>
              )}

              <InputField
                label="Role Name"
                value={name}
                onChange={e => setName(e.target.value)}
              />

              <div className="roles-panel-field">
                <label className="roles-panel-checkbox-row">
                  <Checkbox checked={leadership} onChange={() => setLeadership(!leadership)} />
                  <span>This is a leadership role</span>
                </label>
              </div>

              <div className="roles-panel-divider" />

              <div className="roles-panel-field">
                <div className="roles-panel-skills-header">
                  <label className="roles-panel-label">Skills</label>
                  <button className="roles-panel-ai-resuggest" onClick={handleResuggest} disabled={aiLoading}>
                    ✦ Re-suggest with AI
                  </button>
                </div>
                {aiLoading ? renderAILoading() : renderSkillChips()}
              </div>

              {renderSkillSearchSection()}
            </>
          )}

          {/* ── Step 1: Details (create & copy) ── */}
          {!isEdit && step === 1 && (
            <>
              <InputField
                label="Role Name *"
                placeholder="e.g. Sales Development Rep"
                value={name}
                onChange={e => setName(e.target.value)}
              />

              <div className="roles-panel-field">
                <label className="roles-panel-checkbox-row">
                  <Checkbox checked={leadership} onChange={() => setLeadership(!leadership)} />
                  <div>
                    <span>This is a leadership role</span>
                    <span className="roles-panel-helper">AI will suggest management and coaching skills</span>
                  </div>
                </label>
              </div>

              {/* Description & JD only in create modes, not copy */}
              {!isCopy && (
                <>
                  <div className="roles-panel-field">
                    <label className="roles-panel-label">Description</label>
                    <textarea
                      className="roles-panel-textarea"
                      rows={3}
                      placeholder="Mention key activities, tools, and focus areas"
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="roles-panel-field">
                    <label className="roles-panel-label">Job Description</label>
                    <textarea
                      className="roles-panel-textarea"
                      rows={5}
                      placeholder="Paste a job description for better AI suggestions"
                      value={jobDescription}
                      onChange={e => setJobDescription(e.target.value)}
                    />
                  </div>

                  <div className="roles-panel-divider" />

                  <div className="roles-panel-step1-actions">
                    <button className="roles-panel-skip" onClick={handleSkipToManual}>
                      Skip — pick skills manually
                    </button>
                    <button
                      className="roles-panel-ai-btn"
                      disabled={!name.trim() || aiLoading}
                      onClick={handleAISuggest}
                    >
                      ✦ Suggest Skills with AI
                    </button>
                  </div>
                </>
              )}
            </>
          )}

          {/* ── AI Loading State ── */}
          {!isEdit && step === 1 && aiLoading && renderAILoading()}

          {/* ── Step 2: Skills (create & copy) ── */}
          {!isEdit && step === 2 && (
            <>
              {aiUsed && !aiLoading && (
                <div className="roles-panel-ai-banner">
                  <span>✦ AI suggested {aiCount} skills based on your input</span>
                  <button className="roles-panel-ai-resuggest" onClick={handleResuggest} disabled={aiLoading}>
                    Re-suggest
                  </button>
                </div>
              )}

              {isCopy && (
                <p className="roles-panel-label" style={{ marginBottom: 4 }}>
                  Skills from 5Mins library — remove or add as needed:
                </p>
              )}

              {!aiUsed && !isCopy && (
                <p className="roles-panel-label" style={{ marginBottom: 4 }}>
                  Search and select skills:
                </p>
              )}

              {aiLoading ? renderAILoading() : renderSkillChips()}
              {!aiLoading && renderSkillSearchSection()}
              {!aiLoading && renderSummary()}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="roles-panel-footer">
          {!isEdit && step === 2 && (
            <button className="roles-panel-back" onClick={() => setStep(1)}>
              ← Back
            </button>
          )}
          <div className="roles-panel-footer-right">
            <button className="roles-btn-ghost" onClick={onClose}>
              Cancel
            </button>
            {!isEdit && step === 1 && isCopy && (
              <button className="roles-btn-primary" onClick={() => setStep(2)}>
                Continue →
              </button>
            )}
            {(isEdit || step === 2) && (
              <button
                className="roles-btn-primary"
                disabled={!canSave}
                onClick={() => onSave(name, selectedSkills, leadership)}
              >
                {isEdit ? 'Save Changes' : 'Create Role'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function renderAILoading() {
  return (
    <div className="roles-panel-ai-loading">
      <span className="roles-panel-ai-dot" />
      <span>Analysing role and matching skills...</span>
      <div className="roles-panel-skeletons">
        <div className="roles-panel-skeleton" style={{ width: '60%' }} />
        <div className="roles-panel-skeleton" style={{ width: '80%' }} />
        <div className="roles-panel-skeleton" style={{ width: '45%' }} />
      </div>
    </div>
  )
}

export default RolePanel

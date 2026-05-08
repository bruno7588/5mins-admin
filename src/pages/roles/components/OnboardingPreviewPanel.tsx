import { useState } from 'react'
import { TickCircle, ArrowRight2 } from 'iconsax-react'
import type { CompanyRole, FiveMinsRole } from '../data/mockRoles'
import { type HrisRoleMapping, resolveRoleName } from '../data/mockHrisMappings'

interface Props {
  mapping: HrisRoleMapping
  tenantRoles: CompanyRole[]
  publicRoles: FiveMinsRole[]
  onClose: () => void
}

const SAMPLE_PICKABLE_ROLES = [
  'Software Engineer',
  'Senior Software Engineer',
  'Customer Success Manager',
  'Account Executive',
  'Marketing Lead',
  'Data Analyst',
]

function OnboardingPreviewPanel({ mapping, tenantRoles, publicRoles, onClose }: Props) {
  const [closing, setClosing] = useState(false)
  const [pickedRole, setPickedRole] = useState<string | null>(null)

  const handleClose = () => {
    setClosing(true)
    setTimeout(() => onClose(), 300)
  }

  const isSkipped = mapping.status === 'mapped' && mapping.role !== null
  const resolvedRole = mapping.role
    ? resolveRoleName(mapping.role, tenantRoles, publicRoles)
    : null

  return (
    <div
      className={`roles-panel-overlay${closing ? ' roles-panel-overlay--closing' : ''}`}
      onClick={handleClose}
    >
      <div
        className={`roles-panel${closing ? ' roles-panel--closing' : ''}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="roles-panel-section-header">
          <div className="roles-panel-section-header__headline">
            <div className="roles-panel-section-header__title-group">
              <h2 className="roles-panel-section-header__title">Onboarding preview</h2>
              <p className="roles-panel-section-header__description">
                What a new employee with HRIS title "{mapping.hrisJobTitle}" sees during onboarding.
              </p>
            </div>
            <button className="roles-panel-close" onClick={handleClose}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.25 17.25L6.75 6.75M17.25 6.75L6.75 17.25" stroke="#454C5E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="roles-panel-section-header__divider" />
        </div>

        <div className="roles-panel-body">
          <div className="hris-preview-meta">
            <span className={`hris-preview-meta__pill hris-preview-meta__pill--${isSkipped ? 'skipped' : 'manual'}`}>
              {isSkipped ? 'Role pre-assigned — step skipped' : 'Role unmapped — user picks manually'}
            </span>
          </div>

          <div className="hris-preview-screen">
            {isSkipped ? (
              <div className="hris-preview-screen__skipped">
                <div className="hris-preview-screen__avatar">JD</div>
                <h3 className="hris-preview-screen__heading">Welcome, Jordan!</h3>
                <p className="hris-preview-screen__subhead">
                  We've set up your learning path based on your role.
                </p>
                <div className="hris-preview-screen__role-card">
                  <TickCircle size={20} variant="Bold" color="var(--text-success)" />
                  <div className="hris-preview-screen__role-card-text">
                    <span className="hris-preview-screen__role-card-label">Your role</span>
                    <span className="hris-preview-screen__role-card-name">{resolvedRole}</span>
                  </div>
                  <span className="hris-preview-screen__role-card-source">Set by your organization</span>
                </div>
                <button type="button" className="roles-btn-primary hris-preview-screen__cta" disabled>
                  Get started
                  <ArrowRight2 size={18} color="currentColor" />
                </button>
                <p className="hris-preview-screen__footnote">
                  The role-selection step is skipped — your role was assigned via HRIS sync.
                </p>
              </div>
            ) : (
              <div className="hris-preview-screen__manual">
                <div className="hris-preview-screen__avatar">JD</div>
                <h3 className="hris-preview-screen__heading">Welcome, Jordan!</h3>
                <p className="hris-preview-screen__subhead">
                  Pick a role to personalize your learning path.
                </p>
                <div className="hris-preview-screen__role-list">
                  {SAMPLE_PICKABLE_ROLES.map(name => (
                    <button
                      key={name}
                      type="button"
                      className={`hris-preview-screen__role-option${pickedRole === name ? ' hris-preview-screen__role-option--selected' : ''}`}
                      onClick={() => setPickedRole(name)}
                    >
                      <span>{name}</span>
                      {pickedRole === name && (
                        <TickCircle size={18} variant="Bold" color="var(--secondary-600)" />
                      )}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className="roles-btn-primary hris-preview-screen__cta"
                  disabled={!pickedRole}
                >
                  Continue
                  <ArrowRight2 size={18} color="currentColor" />
                </button>
                <p className="hris-preview-screen__footnote">
                  This title isn't mapped — the user has to pick a role manually.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="roles-panel-footer">
          <div className="roles-panel-footer-divider" />
          <div className="roles-panel-footer-row">
            <div className="roles-panel-footer-left">
              <button className="roles-btn-outlined-neutral800" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingPreviewPanel

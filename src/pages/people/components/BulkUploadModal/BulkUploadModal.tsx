import { useState } from 'react'
import { ArrowDown2, ImportCurve, UserAdd, UserEdit, UserRemove, MinusCirlce, ArrowRight2 } from 'iconsax-react'
import CloseButton from '../../../../components/CloseButton/CloseButton'
import { FileUploader } from '../../../../components/FileUploader/FileUploader'
import './BulkUploadModal.css'

interface BulkUploadModalProps {
  onClose: () => void
}

const automations = [
  { name: 'Auto-enrol Compliance 101', badges: ['Join date', 'Region'] },
  { name: 'New Hire Onboarding Program', badges: ['Join date', 'Region'] },
  { name: 'Q1 Safety Training', badges: ['Region'] },
]

type UploaderState = 'Enabled' | 'Uploading' | 'Filled'
type Step = 'upload' | 'preview'

// Mock preview data
const mockPreview = {
  invites: [
    { name: 'Sarah Connor', email: 'sarah@company.com', team: 'Engineering', role: 'Developer', region: 'North America' },
    { name: 'James Wilson', email: 'james@company.com', team: 'Sales', role: 'Account Exec', region: 'Europe' },
    { name: 'Ana Garcia', email: 'ana@company.com', team: 'Marketing', role: 'Designer', region: 'South America' },
  ],
  updates: [
    { name: 'John Smith', email: 'john@company.com', changes: 'Team: Sales → Marketing, Role: Rep → Manager' },
    { name: 'Emma Davis', email: 'emma@company.com', changes: 'Region: Europe → North America' },
  ],
  noChanges: [
    { name: 'Michael Brown', email: 'michael@company.com' },
    { name: 'Lisa Chen', email: 'lisa@company.com' },
    { name: 'David Kim', email: 'david@company.com' },
    { name: 'Rachel Torres', email: 'rachel@company.com' },
    { name: 'Tom Anderson', email: 'tom@company.com' },
  ],
  deactivations: [
    { name: 'Mark Johnson', email: 'mark@company.com', team: 'Support', reason: 'Status set to INACTIVE' },
  ],
}

function BulkUploadModal({ onClose }: BulkUploadModalProps) {
  const [showMoreAutomations, setShowMoreAutomations] = useState(false)
  const [openSection, setOpenSection] = useState<string | null>('template')
  const [uploaderState, setUploaderState] = useState<UploaderState>('Enabled')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedFileName, setUploadedFileName] = useState('')
  const [step, setStep] = useState<Step>('upload')
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({})

  const handleDownloadTemplate = () => {
    const headers = ['first_name', 'last_name', 'email', 'status', 'team_name', 'role', 'start_date', 'region', 'teamRights']
    const rows = [
      ['Neymar', 'Jr', 'divjot+1407@5mins.ai', 'ACTIVE', 'Content Team', 'HR Manager', '01/11/2025', 'Southeast Asia', 'Team Member'],
      ['Neymar', 'Sr', 'divjot+1408@5mins.ai', 'ACTIVE', 'Content Team', 'Finance Analyst', '22/10/2025', 'Europe', 'Team Manager'],
    ]
    const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'bulk-manage-people-template.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const toggleSection = (key: string) => {
    setOpenSection(prev => prev === key ? null : key)
  }

  const toggleCard = (key: string) => {
    setExpandedCards(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleFileSelect = async (file: File) => {
    setUploadedFileName(file.name)
    setUploaderState('Uploading')
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(r => setTimeout(r, 120))
      setUploadProgress(i)
    }
    setUploaderState('Filled')
  }

  const handleChangeFile = () => {
    setUploaderState('Enabled')
    setUploadedFileName('')
    setUploadProgress(0)
  }

  const handleContinueToPreview = () => {
    setStep('preview')
  }

  const handleBackToUpload = () => {
    setStep('upload')
  }

  return (
    <div className="bulk-upload-modal">
      <div className="bulk-upload-content">
        <div className="bulk-upload-form">
          {/* Header */}
          <div className="bulk-upload-header">
            <h2 className="bulk-upload-title">
              {step === 'upload' ? 'Bulk manage people' : 'Preview changes'}
            </h2>
            <CloseButton onClick={onClose} />
          </div>

          {step === 'upload' && (
            <>
              {/* Alert banner */}
              <div className="bulk-upload-alert">
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.63184 2.32567C8.63184 1.04348 9.64162 0 10.8824 0C12.1232 0 13.133 1.04348 13.133 2.32567C13.133 3.60787 12.1232 4.65134 10.8824 4.65134C9.64162 4.65134 8.63184 3.60967 8.63184 2.32567ZM9.94088 2.32567C9.94088 2.86278 10.3626 3.29862 10.8824 3.29862C11.4022 3.29862 11.8239 2.86278 11.8239 2.32567C11.8239 1.78856 11.4022 1.35272 10.8824 1.35272C10.3626 1.35272 9.94088 1.79037 9.94088 2.32567Z" fill="#E2A610"/>
                  <path d="M12.818 1.14844C12.818 1.14844 12.9177 1.55896 12.4575 1.7832C11.9972 2.00564 11.6927 1.84108 11.6927 1.84108C11.7749 1.98575 11.8239 2.15032 11.8239 2.32936C11.8239 2.86647 11.4022 3.30231 10.8824 3.30231C10.3626 3.30231 9.94088 2.86647 9.94088 2.32936C9.94088 2.2751 9.95313 2.07075 10.0371 1.90075C9.25661 2.28415 8.66334 1.95682 8.66334 1.95682C8.64409 2.07798 8.63184 2.20277 8.63184 2.32936C8.63184 3.61155 9.64162 4.65503 10.8824 4.65503C12.1232 4.65503 13.133 3.61155 13.133 2.32755C13.133 1.89714 13.0175 1.49385 12.818 1.14844Z" fill="#9E740B"/>
                  <path d="M1.13054 16.6149C2.31533 15.4123 3.05385 15.0072 3.35486 13.2638C3.65587 11.5205 3.41437 7.84753 4.74091 5.44228C5.95194 3.23959 8.17451 2.32812 10.3428 2.32812C10.3953 2.32812 10.4478 2.33174 10.5003 2.33174C10.5528 2.32993 10.6053 2.32812 10.6578 2.32812C12.8262 2.32812 15.0487 3.23959 16.2598 5.44047C17.5846 7.84753 17.3448 11.5205 17.6458 13.262C17.9468 15.0054 18.6853 15.4105 19.8701 16.6131C20.3811 17.1321 20.9989 17.9586 21.0007 18.4903C21.0024 19.022 20.7399 19.2155 20.1151 19.4867C18.3476 20.2553 15.985 21.0004 10.5003 21.0004C5.01567 21.0004 2.65309 20.2553 0.885536 19.4867C0.260767 19.2155 -0.00174137 19.0238 8.68877e-06 18.4903C0.00175874 17.9604 0.619528 17.1339 1.13054 16.6149Z" fill="#FFCA28"/>
                  <path d="M19.1983 18.5285C19.1983 17.7274 15.3044 17.0781 10.5005 17.0781C5.69661 17.0781 1.80273 17.7274 1.80273 18.5285C1.80273 19.3296 5.69661 20.2863 10.5005 20.2863C15.3044 20.2863 19.1983 19.3296 19.1983 18.5285Z" fill="#4E342E"/>
                  <path d="M15.7227 7.02376C15.7874 7.27875 15.8417 7.53374 15.8854 7.78331C16.1077 9.06008 16.0674 10.3694 16.1672 11.6624C16.3019 13.3931 16.5994 14.3046 17.2767 15.1184C17.366 15.2251 17.275 15.3897 17.1402 15.368C16.2354 15.2251 15.5092 15.0822 14.6814 14.518C13.4458 13.6771 13.1413 12.0947 13.1326 10.6732C13.1186 8.55733 13.1571 6.50835 12.9943 5.73072C12.7686 4.64745 12.5586 4.07055 12.2156 3.54429C11.6923 2.74134 13.7241 3.85535 14.0426 4.10311C14.9299 4.79575 15.4392 5.90975 15.7227 7.02376Z" fill="#E2A610"/>
                  <path d="M4.70553 9.84029C4.68453 8.46948 4.69503 7.05165 5.22355 5.79297C5.54031 5.04065 6.07757 4.36248 6.7636 3.94111C7.30261 3.61016 8.39815 3.24485 8.79191 3.99536C8.87066 4.14546 8.90216 4.32088 8.90741 4.49269C8.92141 5.09129 8.6204 5.64467 8.32814 6.16189C7.46362 7.69546 7.11886 9.3719 6.66209 11.0718C6.47484 11.7735 6.23683 12.4734 5.82907 13.0666C5.54906 13.4735 3.98976 14.9202 4.34677 13.6127C4.68978 12.3486 4.72478 11.1568 4.70553 9.84029Z" fill="#FFF59D"/>
                  <path d="M12.0905 18.2497C12.0888 17.9387 11.926 17.7597 11.5515 17.6258C10.7745 17.3491 9.80145 17.3998 9.23443 17.7144C8.63941 18.0436 9.05242 19.8683 10.4997 19.8683C11.947 19.8683 12.0923 18.4867 12.0905 18.2497Z" fill="#E2A610"/>
                  <path d="M5.11874 15.5269C3.5822 15.8054 2.46916 16.4076 1.9879 16.8959C1.60639 17.2811 1.60639 17.5849 2.27841 17.2684C2.78417 17.0297 4.40472 16.545 5.82402 16.3985C8.26184 16.1453 9.76689 16.1399 10.0171 16.1453C10.6034 16.158 10.6524 15.6914 9.46763 15.5269C8.28284 15.3641 6.65529 15.2502 5.11874 15.5269Z" fill="#FFF59D"/>
                  <path d="M9.88044 19.5106C10.0834 19.6553 10.353 19.7258 10.5805 19.6282C10.808 19.5305 10.955 19.2321 10.843 19.0061C10.7992 18.9175 10.724 18.8505 10.6487 18.7891C10.4405 18.6209 10.2094 18.4834 9.96444 18.3822C9.86819 18.3424 9.76668 18.3062 9.66168 18.3134C9.55843 18.3189 9.44992 18.3749 9.40967 18.4744C9.23642 18.8813 9.58293 19.3008 9.88044 19.5106Z" fill="#FFF59D"/>
                </svg>
                <div className="bulk-upload-alert-info">
                  <p className="bulk-upload-alert-text">
                    Join date, role, and region are required by your automations. All invited users will be evaluated against these automations.
                  </p>
                  {automations.map((a, i) => (
                    <div className="bulk-upload-alert-row" key={i}>
                      <span className="bulk-upload-alert-bullet">{a.name}</span>
                      <div className="bulk-upload-alert-badges">
                        {a.badges.map(b => (
                          <span className="bulk-upload-alert-badge" key={b}>{b}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button
                    className="bulk-upload-alert-more"
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

              {/* Accordion sections */}
              <div className="bulk-upload-accordions">
                {/* 1. Download our template */}
                <div className="bulk-upload-accordion-section">
                  <div
                    className="bulk-upload-accordion-header"
                    onClick={() => toggleSection('template')}
                  >
                    <span className={`bulk-upload-accordion-title${openSection === 'template' ? ' bulk-upload-accordion-title--active' : ''}`}>Download our template</span>
                    <div className={`bulk-upload-accordion-chevron${openSection === 'template' ? ' bulk-upload-accordion-chevron--open' : ''}`}>
                      <ArrowDown2 size={20} color="var(--text-secondary)" />
                    </div>
                  </div>
                  <div className={`bulk-upload-accordion-panel${openSection === 'template' ? ' bulk-upload-accordion-panel--open' : ''}`}>
                    <div className="bulk-upload-accordion-body">
                      <p className="bulk-upload-accordion-desc">Download our csv file and fill the information with the correct format and column headers.</p>
                      <div className="bulk-upload-ctas">
                        <button className="bulk-upload-btn-primary" onClick={handleDownloadTemplate}>
                          Download CSV template
                          <ImportCurve size={20} color="var(--neutral-25)" />
                        </button>
                        <button className="bulk-upload-btn-outlined">
                          Download Available Roles
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Fill in the information */}
                <div className="bulk-upload-accordion-section">
                  <div
                    className="bulk-upload-accordion-header"
                    onClick={() => toggleSection('fill')}
                  >
                    <span className={`bulk-upload-accordion-title${openSection === 'fill' ? ' bulk-upload-accordion-title--active' : ''}`}>Fill in the information</span>
                    <div className={`bulk-upload-accordion-chevron${openSection === 'fill' ? ' bulk-upload-accordion-chevron--open' : ''}`}>
                      <ArrowDown2 size={20} color="var(--text-secondary)" />
                    </div>
                  </div>
                  <div className={`bulk-upload-accordion-panel${openSection === 'fill' ? ' bulk-upload-accordion-panel--open' : ''}`}>
                    <div className="bulk-upload-accordion-body">
                      <p className="bulk-upload-accordion-desc">Fill in the CSV template with your people's details. The <strong>status</strong> column controls what happens to each user:</p>

                      {/* Annotated example CSV */}
                      <div className="csv-preview">
                        <table className="csv-preview-table">
                          <thead>
                            <tr>
                              <th>first_name</th>
                              <th>last_name</th>
                              <th>email</th>
                              <th className="csv-col-ellipsis">...</th>
                              <th>status</th>
                              <th className="csv-col-result" />
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="csv-preview-tr--success">
                              <td>Sarah</td>
                              <td>Connor</td>
                              <td>sarah@new.com</td>
                              <td className="csv-col-ellipsis">...</td>
                              <td className="csv-col-empty" />
                              <td className="csv-col-result">

                                <span className="csv-preview-badge csv-preview-badge--success">New email address</span>
                                <span className="csv-preview-arrow">→</span>
                                <span className="csv-preview-result-text">User will receive an invitation email</span>
                              </td>
                            </tr>
                            <tr className="csv-preview-tr--warning">
                              <td>John</td>
                              <td>Smith</td>
                              <td>john@company.com</td>
                              <td className="csv-col-ellipsis">...</td>
                              <td>ACTIVE</td>
                              <td className="csv-col-result">

                                <span className="csv-preview-badge csv-preview-badge--warning">Existing email + ACTIVE status</span>
                                <span className="csv-preview-arrow">→</span>
                                <span className="csv-preview-result-text">User information will be updated</span>
                              </td>
                            </tr>
                            <tr className="csv-preview-tr--danger">
                              <td>Mark</td>
                              <td>Johnson</td>
                              <td>mark@company.com</td>
                              <td className="csv-col-ellipsis">...</td>
                              <td>INACTIVE</td>
                              <td className="csv-col-result">

                                <span className="csv-preview-badge csv-preview-badge--danger">Existing email + INACTIVE status</span>
                                <span className="csv-preview-arrow">→</span>
                                <span className="csv-preview-result-text">User will lose access immediately</span>
                              </td>
                            </tr>
                            <tr className="csv-preview-tr--neutral">
                              <td>Lisa</td>
                              <td>Chen</td>
                              <td>lisa@company.com</td>
                              <td className="csv-col-ellipsis">...</td>
                              <td className="csv-col-empty" />
                              <td className="csv-col-result">

                                <span className="csv-preview-badge csv-preview-badge--neutral">No status specified</span>
                                <span className="csv-preview-arrow">→</span>
                                <span className="csv-preview-result-text">Defaults to ACTIVE</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Upload CSV file (always visible, not collapsible) */}
                <div className="bulk-upload-accordion-section">
                  <span className="bulk-upload-accordion-title">Upload CSV file</span>
                  <FileUploader
                    state={uploaderState}
                    fileName={uploadedFileName}
                    progress={uploadProgress}
                    accept=".csv"
                    onFileSelect={handleFileSelect}
                    onChangeFile={handleChangeFile}
                  />
                  {uploaderState === 'Filled' && (
                    <div className="bulk-upload-continue">
                      <button className="bulk-upload-btn-primary" onClick={handleContinueToPreview}>
                        Continue
                        <ArrowRight2 size={20} color="var(--neutral-25)" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* ─── PREVIEW STEP ─── */}
          {step === 'preview' && (
            <div className="bulk-preview">
              <p className="bulk-preview-subtitle">
                We compared <strong>{uploadedFileName}</strong> against your current people list. Here's what will happen:
              </p>

              {/* Summary cards */}
              <div className="bulk-preview-cards">
                {/* Invites */}
                <div
                  className={`bulk-preview-card bulk-preview-card--success ${expandedCards.invites ? 'bulk-preview-card--expanded' : ''}`}
                  onClick={() => toggleCard('invites')}
                >
                  <div className="bulk-preview-card-header">
                    <div className="bulk-preview-card-icon bulk-preview-card-icon--success">
                      <UserAdd size={20} color="var(--success-500)" />
                    </div>
                    <div className="bulk-preview-card-info">
                      <span className="bulk-preview-card-count">{mockPreview.invites.length}</span>
                      <span className="bulk-preview-card-label">New Invites</span>
                    </div>
                    <div className={`bulk-preview-card-chevron ${expandedCards.invites ? 'bulk-preview-card-chevron--open' : ''}`}>
                      <ArrowDown2 size={16} color="var(--text-tertiary)" />
                    </div>
                  </div>
                  {expandedCards.invites && (
                    <div className="bulk-preview-card-body">
                      {mockPreview.invites.map((p, i) => (
                        <div className="bulk-preview-row" key={i}>
                          <span className="bulk-preview-row-name">{p.name}</span>
                          <span className="bulk-preview-row-detail">{p.email}</span>
                          <span className="bulk-preview-row-detail">{p.team}</span>
                          <span className="bulk-preview-row-detail">{p.region}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Updates */}
                <div
                  className={`bulk-preview-card bulk-preview-card--warning ${expandedCards.updates ? 'bulk-preview-card--expanded' : ''}`}
                  onClick={() => toggleCard('updates')}
                >
                  <div className="bulk-preview-card-header">
                    <div className="bulk-preview-card-icon bulk-preview-card-icon--warning">
                      <UserEdit size={20} color="var(--secondary-500)" />
                    </div>
                    <div className="bulk-preview-card-info">
                      <span className="bulk-preview-card-count">{mockPreview.updates.length}</span>
                      <span className="bulk-preview-card-label">Updates</span>
                    </div>
                    <div className={`bulk-preview-card-chevron ${expandedCards.updates ? 'bulk-preview-card-chevron--open' : ''}`}>
                      <ArrowDown2 size={16} color="var(--text-tertiary)" />
                    </div>
                  </div>
                  {expandedCards.updates && (
                    <div className="bulk-preview-card-body">
                      {mockPreview.updates.map((p, i) => (
                        <div className="bulk-preview-row" key={i}>
                          <span className="bulk-preview-row-name">{p.name}</span>
                          <span className="bulk-preview-row-detail">{p.email}</span>
                          <span className="bulk-preview-row-changes">{p.changes}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* No Changes */}
                <div
                  className={`bulk-preview-card bulk-preview-card--neutral ${expandedCards.noChanges ? 'bulk-preview-card--expanded' : ''}`}
                  onClick={() => toggleCard('noChanges')}
                >
                  <div className="bulk-preview-card-header">
                    <div className="bulk-preview-card-icon bulk-preview-card-icon--neutral">
                      <MinusCirlce size={20} color="var(--text-tertiary)" />
                    </div>
                    <div className="bulk-preview-card-info">
                      <span className="bulk-preview-card-count">{mockPreview.noChanges.length}</span>
                      <span className="bulk-preview-card-label">No Changes</span>
                    </div>
                    <div className={`bulk-preview-card-chevron ${expandedCards.noChanges ? 'bulk-preview-card-chevron--open' : ''}`}>
                      <ArrowDown2 size={16} color="var(--text-tertiary)" />
                    </div>
                  </div>
                  {expandedCards.noChanges && (
                    <div className="bulk-preview-card-body">
                      {mockPreview.noChanges.map((p, i) => (
                        <div className="bulk-preview-row" key={i}>
                          <span className="bulk-preview-row-name">{p.name}</span>
                          <span className="bulk-preview-row-detail">{p.email}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Deactivations */}
                <div
                  className={`bulk-preview-card bulk-preview-card--danger ${expandedCards.deactivations ? 'bulk-preview-card--expanded' : ''}`}
                  onClick={() => toggleCard('deactivations')}
                >
                  <div className="bulk-preview-card-header">
                    <div className="bulk-preview-card-icon bulk-preview-card-icon--danger">
                      <UserRemove size={20} color="var(--danger-500)" />
                    </div>
                    <div className="bulk-preview-card-info">
                      <span className="bulk-preview-card-count">{mockPreview.deactivations.length}</span>
                      <span className="bulk-preview-card-label">Deactivations</span>
                    </div>
                    <div className={`bulk-preview-card-chevron ${expandedCards.deactivations ? 'bulk-preview-card-chevron--open' : ''}`}>
                      <ArrowDown2 size={16} color="var(--text-tertiary)" />
                    </div>
                  </div>
                  {expandedCards.deactivations && (
                    <div className="bulk-preview-card-body">
                      {mockPreview.deactivations.map((p, i) => (
                        <div className="bulk-preview-row" key={i}>
                          <span className="bulk-preview-row-name">{p.name}</span>
                          <span className="bulk-preview-row-detail">{p.email}</span>
                          <span className="bulk-preview-row-changes">{p.reason}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action bar */}
              <div className="bulk-preview-actions">
                <button className="bulk-upload-btn-outlined" onClick={handleBackToUpload}>
                  Back
                </button>
                <button className="bulk-upload-btn-primary" onClick={onClose}>
                  Confirm & Execute
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BulkUploadModal

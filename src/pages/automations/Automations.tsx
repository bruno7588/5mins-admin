import { useState } from 'react'
import { UserCirlceAdd, Medal, More, UserTick, Calendar, Flash } from 'iconsax-react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import './Automations.css'

type Tab = 'manage' | 'activity'

interface AutomationRow {
  id: string
  name: string
  lastUpdated: string
  active: boolean
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

function Automations() {
  const [activeTab, setActiveTab] = useState<Tab>('manage')
  const [automations, setAutomations] = useState<AutomationRow[]>(mockAutomations)

  const activeAutomationsCount = automations.filter((a) => a.active).length

  function toggleActive(id: string) {
    setAutomations((rows) =>
      rows.map((r) => (r.id === id ? { ...r, active: !r.active } : r)),
    )
  }

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
          </div>
        )}
      </main>
    </div>
  )
}

export default Automations

import { useState } from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import ToastContainer, { useToast } from '../../components/Toast/Toast'
import FiveMinsRolesTab from './components/FiveMinsRolesTab'
import CompanyRolesTab from './components/CompanyRolesTab'
import RolePanel, { type PanelMode } from './components/RolePanel'
import type { FiveMinsRole, CompanyRole, Skill } from './data/mockRoles'
import { initialCompanyRoles } from './data/mockRoles'
import '../people/People.css'
import './Roles.css'

type Tab = 'library' | 'company'

function Roles() {
  const [activeTab, setActiveTab] = useState<Tab>('library')
  const [companyRoles, setCompanyRoles] = useState<CompanyRole[]>(initialCompanyRoles)
  const [panelMode, setPanelMode] = useState<PanelMode | null>(null)
  const { toasts, show: showToast } = useToast()

  const nextId = () => Math.max(0, ...companyRoles.map(r => r.id)) + 1

  /* ─── Copy from library (quick copy via table button) ── */
  const handleCopyRole = (role: FiveMinsRole) => {
    setPanelMode({ type: 'copy', source: role })
  }

  /* ─── Panel save handler ───────────────────────────────── */
  const handlePanelSave = (name: string, skills: Skill[], leadership: boolean) => {
    if (!panelMode) return

    if (panelMode.type === 'edit') {
      // Update existing role
      setCompanyRoles(prev =>
        prev.map(r =>
          r.id === panelMode.role.id
            ? { ...r, name, skills, leadership }
            : r
        )
      )
      showToast('success', `"${name}" updated`)
    } else {
      // Create new role (create, copy, or duplicate)
      const newRole: CompanyRole = {
        id: nextId(),
        name,
        leadership,
        skills: [...skills],
        employeeCount: 0,
      }
      setCompanyRoles(prev => [...prev, newRole])

      if (panelMode.type === 'copy') {
        showToast('success', `"${name}" copied to your company roles`)
      } else if (panelMode.type === 'create-prefilled') {
        showToast('success', `"${name}" duplicated`)
      } else {
        showToast('success', `"${name}" created`)
      }
      setActiveTab('company')
    }

    setPanelMode(null)
  }

  return (
    <div className="roles-layout">
      <LeftSidebar />

      <main className="roles-main">
        <header className="roles-header">
          <div className="roles-header__title-group">
            <h1 className="roles-header__title">Roles &amp; Mapping</h1>
            <p className="roles-header__description">Browse pre-built roles from the 5Mins library and copy them to your company, or create and manage your own custom roles with tailored skill mappings.</p>
          </div>
          <div className="roles-header__divider" />
          <div className="roles-header__tabs" role="tablist">
            <button
              role="tab"
              aria-selected={activeTab === 'library'}
              className={`roles-header__tab${activeTab === 'library' ? ' roles-header__tab--active' : ''}`}
              onClick={() => setActiveTab('library')}
            >
              5Mins Roles
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'company'}
              className={`roles-header__tab${activeTab === 'company' ? ' roles-header__tab--active' : ''}`}
              onClick={() => setActiveTab('company')}
            >
              Company Roles
            </button>
          </div>
        </header>

        <div className="roles-content">
          {activeTab === 'library' ? (
            <FiveMinsRolesTab onCopy={handleCopyRole} />
          ) : (
            <CompanyRolesTab
              roles={companyRoles}
              onCreateRole={() => setPanelMode({ type: 'create' })}
              onEditRole={(role) => setPanelMode({ type: 'edit', role })}
              onDuplicateRole={(role) =>
                setPanelMode({
                  type: 'create-prefilled',
                  name: `${role.name} (copy)`,
                  skills: [...role.skills],
                  leadership: role.leadership,
                })
              }
              onBrowseLibrary={() => setActiveTab('library')}
            />
          )}
        </div>
      </main>

      {panelMode && (
        <RolePanel
          mode={panelMode}
          onClose={() => setPanelMode(null)}
          onSave={handlePanelSave}
        />
      )}

      <ToastContainer toasts={toasts} />
    </div>
  )
}

export default Roles

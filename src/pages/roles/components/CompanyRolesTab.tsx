import { SearchNormal1, ExportSquare, Edit2, Copy, ArrowLeft2, ArrowRight2 } from 'iconsax-react'
import { useState } from 'react'
import type { CompanyRole } from '../data/mockRoles'

interface Props {
  roles: CompanyRole[]
  onCreateRole: () => void
  onEditRole: (role: CompanyRole) => void
  onDuplicateRole: (role: CompanyRole) => void
  onBrowseLibrary: () => void
}

function CompanyRolesTab({ roles, onCreateRole, onEditRole, onDuplicateRole, onBrowseLibrary }: Props) {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const perPage = 10

  const filtered = roles.filter(r => {
    if (search && !r.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated = filtered.slice((page - 1) * perPage, page * perPage)
  const pageStart = (page - 1) * perPage + 1
  const pageEnd = Math.min(page * perPage, filtered.length)

  const totalEmployees = roles.reduce((sum, r) => sum + r.employeeCount, 0)

  const handleSearch = (val: string) => { setSearch(val); setPage(1) }

  if (roles.length === 0) {
    return (
      <div className="roles-empty">
        <p>No roles yet. Create your first role or copy one from the 5Mins library.</p>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button className="roles-empty-link" onClick={onBrowseLibrary}>
            Browse library →
          </button>
          <button className="roles-btn-primary" onClick={onCreateRole}>
            + Create Role
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Toolbar */}
      <div className="roles-filter-bar">
        <div className="roles-search" style={{ width: 300 }}>
          <SearchNormal1 size={16} color="var(--text-tertiary)" />
          <input
            className="roles-search-input"
            placeholder="Search roles…"
            value={search}
            onChange={e => handleSearch(e.target.value)}
          />
        </div>

        <div className="roles-filter-right">
          <button className="roles-btn-ghost">
            <ExportSquare size={16} color="var(--text-secondary)" />
            Export
          </button>
          <button className="roles-btn-primary" onClick={onCreateRole}>
            + Create Role
          </button>
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="roles-empty">No roles match your search</div>
      ) : (
        <div className="people-table">
          {/* Header */}
          <div className="people-table-header">
            <div className="people-table-cell roles-col--name-co">Role Name</div>
            <div className="people-table-cell roles-col--employees">Employees</div>
            <div className="people-table-cell roles-col--skills">Skills</div>
            <div className="people-table-cell roles-col--actions">Actions</div>
          </div>

          {/* Rows */}
          {paginated.map(role => (
            <div key={role.id} className="people-table-row">
              <div className="people-table-cell roles-col--name-co">
                <span className="roles-role-name">{role.name}</span>
                {role.leadership && <span className="roles-leader-badge">Leadership</span>}
              </div>
              <div className="people-table-cell roles-col--employees">
                {role.employeeCount}
              </div>
              <div className="people-table-cell roles-col--skills">
                {role.skills.length}
              </div>
              <div className="people-table-cell roles-col--actions">
                <button
                  className="roles-btn-ghost roles-btn-ghost--small"
                  onClick={() => onEditRole(role)}
                >
                  <Edit2 size={14} color="var(--text-secondary)" />
                  Edit
                </button>
                <button
                  className="roles-btn-ghost roles-btn-ghost--small"
                  onClick={() => onDuplicateRole(role)}
                >
                  <Copy size={14} color="var(--text-secondary)" />
                  Duplicate
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {filtered.length > perPage && (
        <div className="roles-pagination">
          <span className="roles-pagination-text">
            {pageStart}–{pageEnd} of {filtered.length}
          </span>
          <button
            className="roles-pagination-btn"
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
          >
            <ArrowLeft2 size={16} color="currentColor" />
          </button>
          <button
            className="roles-pagination-btn"
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
          >
            <ArrowRight2 size={16} color="currentColor" />
          </button>
        </div>
      )}

      {/* Footer */}
      <div className="roles-footer">
        {roles.length} role{roles.length !== 1 ? 's' : ''} · {totalEmployees} employee{totalEmployees !== 1 ? 's' : ''} assigned
      </div>
    </>
  )
}

export default CompanyRolesTab

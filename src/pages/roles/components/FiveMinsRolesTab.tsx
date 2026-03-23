import { useState, useEffect, useMemo, useCallback } from 'react'
import { SearchNormal1, ExportSquare, ArrowLeft2, ArrowRight2 } from 'iconsax-react'
import { fiveMinsRoles, roleCategories, type FiveMinsRole } from '../data/mockRoles'
import { getSkillIllustration } from '../../../assets/skill-icons'

interface Props {
  onCopy: (role: FiveMinsRole) => void
}

/* ─── Derive function list (excluding "All") with counts ── */
const functionList = roleCategories
  .filter(c => c !== 'All')
  .map(cat => ({
    name: cat,
    count: fiveMinsRoles.filter(r => r.category === cat).length,
  }))

function FiveMinsRolesTab({ onCopy }: Props) {
  const [selectedFunction, setSelectedFunction] = useState<string>('All')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [previewRole, setPreviewRole] = useState<FiveMinsRole | null>(null)
  const perPage = 10

  /* ─── Filtered roles ─────────────────────────────────── */
  const filtered = useMemo(() => {
    return fiveMinsRoles.filter(r => {
      if (selectedFunction !== 'All' && r.category !== selectedFunction) return false
      if (search && !r.name.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [selectedFunction, search])

  /* ─── Pagination ──────────────────────────────────────── */
  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated = filtered.slice((page - 1) * perPage, page * perPage)
  const pageStart = (page - 1) * perPage + 1
  const pageEnd = Math.min(page * perPage, filtered.length)

  /* ─── Reset page when filters change ─────────────────── */
  const handleFunctionSelect = (fn: string) => {
    setSelectedFunction(fn)
    setPage(1)
  }

  const handleSearch = (val: string) => {
    setSearch(val)
    setPage(1)
  }

  /* ─── Preview panel ──────────────────────────────────── */
  const openPreview = (role: FiveMinsRole) => {
    setPreviewRole(role)
  }

  const closePreview = useCallback(() => {
    setPreviewRole(null)
  }, [])

  const handleCopyFromPreview = (role: FiveMinsRole) => {
    setPreviewRole(null)
    onCopy(role)
  }

  /* ─── Escape key closes preview ──────────────────────── */
  useEffect(() => {
    if (!previewRole) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePreview()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [previewRole, closePreview])

  return (
    <div className="roles-two-panel">
      {/* ─── Left Panel: Functions ─────────────────────── */}
      <aside className="roles-functions-panel">
        <h3 className="roles-functions-title">Functions</h3>
        <ul className="roles-functions-list">
          <li>
            <button
              className={`roles-function-item${selectedFunction === 'All' ? ' roles-function-item--active' : ''}`}
              onClick={() => handleFunctionSelect('All')}
            >
              All ({fiveMinsRoles.length})
            </button>
          </li>
          {functionList.map(fn => (
            <li key={fn.name}>
              <button
                className={`roles-function-item${selectedFunction === fn.name ? ' roles-function-item--active' : ''}`}
                onClick={() => handleFunctionSelect(fn.name)}
              >
                {fn.name} ({fn.count})
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* ─── Right Panel: Table ────────────────────────── */}
      <div className="roles-table-panel">
        {/* Toolbar */}
        <div className="roles-table-toolbar">
          <div className="roles-search" style={{ width: 260 }}>
            <SearchNormal1 size={16} color="var(--text-tertiary)" />
            <input
              className="roles-search-input"
              placeholder="Search roles..."
              value={search}
              onChange={e => handleSearch(e.target.value)}
            />
          </div>
          <button className="roles-btn-ghost">
            <ExportSquare size={16} color="var(--text-secondary)" />
            Export
          </button>
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div className="roles-empty">No roles match your search</div>
        ) : (
          <div className="people-table">
            {/* Header */}
            <div className="people-table-header">
              <div className="people-table-cell roles-col--name">Role Name</div>
              <div className="people-table-cell roles-col--skills">Skills</div>
              <div className="people-table-cell roles-col--assigned">Assigned</div>
              <div className="people-table-cell roles-col--action">Action</div>
            </div>

            {/* Rows */}
            {paginated.map(role => (
              <div key={role.id} className="people-table-row">
                <div className="people-table-cell roles-col--name">
                  <button
                    className="roles-role-link"
                    onClick={() => openPreview(role)}
                  >
                    {role.name}
                  </button>
                </div>
                <div className="people-table-cell roles-col--skills">
                  {role.skills.length}
                </div>
                <div className="people-table-cell roles-col--assigned">
                  {role.assignedCount > 0 ? role.assignedCount : '\u2014'}
                </div>
                <div className="people-table-cell roles-col--action">
                  <button
                    className="roles-btn-outlined"
                    onClick={() => onCopy(role)}
                  >
                    Copy
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
              {pageStart}&ndash;{pageEnd} of {filtered.length}
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
      </div>

      {/* ─── Preview Panel Overlay ─────────────────────── */}
      {previewRole && (
        <div className="roles-panel-overlay" onClick={closePreview}>
          <div
            className="roles-preview-panel"
            onClick={e => e.stopPropagation()}
          >
            {/* Header — section-header per Figma */}
            <div className="roles-preview-header">
              <div className="roles-preview-header__headline">
                <div className="roles-preview-header__title-group">
                  <h2 className="roles-preview-header__title">{previewRole.name}</h2>
                  <p className="roles-preview-header__description">{previewRole.description}</p>
                </div>
                <button className="roles-panel-close" onClick={closePreview}>
                  <svg width="24" height="24" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25.875 25.875L10.125 10.125M25.875 10.125L10.125 25.875" stroke="#454C5E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              <div className="roles-preview-header__divider" />
            </div>

            {/* Body */}
            <div className="roles-panel-body">
              {/* Skills */}
              <div className="roles-expanded-section">
                <span className="roles-expanded-label">Skills ({previewRole.skills.length})</span>
                <div className="roles-skill-cards">
                  {previewRole.skills.map(sk => (
                    <div key={sk.id} className="roles-skill-card">
                      <img className="roles-skill-card__icon" src={getSkillIllustration(sk.id)} alt="" />
                      <span className="roles-skill-card__name">{sk.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="roles-panel-footer">
              <button
                className="roles-btn-primary"
                onClick={() => handleCopyFromPreview(previewRole)}
              >
                Copy to My Roles
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FiveMinsRolesTab

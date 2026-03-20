import { useState } from 'react'
import { SearchNormal1, Book1, ExportSquare, ArrowDown2, ArrowUp2 } from 'iconsax-react'
import { fiveMinsRoles, roleCategories, type FiveMinsRole, type RoleCategory } from '../data/mockRoles'

interface Props {
  onCopy: (role: FiveMinsRole) => void
}

function FiveMinsRolesTab({ onCopy }: Props) {
  const [category, setCategory] = useState<RoleCategory>('All')
  const [search, setSearch] = useState('')
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const filtered = fiveMinsRoles.filter(r => {
    if (category !== 'All' && r.category !== category) return false
    if (search && !r.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <>
      {/* Info Banner */}
      <div className="roles-info-banner">
        <Book1 size={20} color="var(--primary-600)" variant="Bold" />
        <div>
          <strong>5Mins Role Library</strong>
          <span> — Browse pre-built roles with curated skills. Copy any role to your company and customise it.</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="roles-filter-bar">
        <div className="roles-category-chips">
          {roleCategories.map(cat => (
            <button
              key={cat}
              className={`roles-chip${category === cat ? ' roles-chip--active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="roles-filter-right">
          <div className="roles-search" style={{ width: 220 }}>
            <SearchNormal1 size={16} color="var(--text-tertiary)" />
            <input
              className="roles-search-input"
              placeholder="Search roles…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button className="roles-btn-ghost">
            <ExportSquare size={16} color="var(--text-secondary)" />
            Export
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
            <div className="people-table-cell roles-col--name">Role Name</div>
            <div className="people-table-cell roles-col--category">Category</div>
            <div className="people-table-cell roles-col--skills">Skills</div>
            <div className="people-table-cell roles-col--assigned">Assigned</div>
            <div className="people-table-cell roles-col--action">Action</div>
          </div>

          {/* Rows */}
          {filtered.map(role => {
            const isExpanded = expandedId === role.id
            return (
              <div
                key={role.id}
                className={`people-table-row roles-row--expandable${isExpanded ? ' roles-row--expanded' : ''}`}
              >
                <div
                  className="roles-row-header"
                  onClick={() => setExpandedId(isExpanded ? null : role.id)}
                >
                  <div className="people-table-cell roles-col--name">
                    <span className="roles-expand-icon">
                      {isExpanded ? (
                        <ArrowUp2 size={14} color="var(--text-tertiary)" />
                      ) : (
                        <ArrowDown2 size={14} color="var(--text-tertiary)" />
                      )}
                    </span>
                    <span className="roles-role-name">{role.name}</span>
                  </div>
                  <div className="people-table-cell roles-col--category">
                    <span className="roles-neutral-badge">{role.category}</span>
                  </div>
                  <div className="people-table-cell roles-col--skills">{role.skills.length}</div>
                  <div className="people-table-cell roles-col--assigned">
                    {role.assignedCount > 0 ? role.assignedCount : '—'}
                  </div>
                  <div className="people-table-cell roles-col--action">
                    <button
                      className="roles-btn-outlined"
                      onClick={e => {
                        e.stopPropagation()
                        onCopy(role)
                      }}
                    >
                      Copy
                    </button>
                  </div>
                </div>

                {/* Expanded Panel */}
                {isExpanded && (
                  <div className="roles-expanded-panel">
                    <p className="roles-expanded-desc">{role.description}</p>

                    {role.industries.length > 0 && (
                      <div className="roles-expanded-section">
                        <span className="roles-expanded-label">Industry focus</span>
                        <div className="roles-expanded-tags">
                          {role.industries.map(ind => (
                            <span key={ind} className="roles-industry-tag">{ind}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="roles-expanded-section">
                      <span className="roles-expanded-label">Skills</span>
                      <div className="roles-expanded-tags">
                        {role.skills.map(sk => (
                          <span key={sk.id} className="roles-skill-chip roles-skill-chip--grey">{sk.name}</span>
                        ))}
                      </div>
                    </div>

                    <button
                      className="roles-btn-primary"
                      onClick={() => onCopy(role)}
                      style={{ alignSelf: 'flex-start' }}
                    >
                      Copy to Company Roles
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

export default FiveMinsRolesTab

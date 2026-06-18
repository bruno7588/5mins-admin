import { useEffect, useRef, useState } from 'react'
import Search from '../../components/Search/Search'
import './RoleSearch.css'

/** Roles defined by the learner's own company. */
const COMPANY_ROLES = ['Accelerate Cohort', 'Software Engineer']

/** Popular roles from the 5Mins catalogue. */
const POPULAR_ROLES = [
  'Account Executive',
  'Brand Manager',
  'Commercial Expert',
  'Software Developer',
  'Sales Specialist',
  'Account Manager',
  'Customer Success Manager',
  'Marketing Manager',
  'Product Manager',
  'HR Specialist',
  'Operations Manager',
]

interface Props {
  value: string
  /** Company name shown on the "your company" role tags. */
  company: string
  onChange: (role: string) => void
}

/**
 * Role picker: a search field that opens a grouped listbox (your company
 * roles + popular roles). Users can pick from the list or free-type a role.
 */
export default function RoleSearch({ value, company, onChange }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close on click outside.
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const q = value.trim().toLowerCase()
  const match = (roles: string[]) => roles.filter((r) => r.toLowerCase().includes(q))
  const companyRoles = match(COMPANY_ROLES)
  const popularRoles = match(POPULAR_ROLES)
  const hasResults = companyRoles.length + popularRoles.length > 0

  const select = (role: string) => {
    onChange(role)
    setOpen(false)
  }

  const renderItem = (role: string, tagIcon: string, tagLabel: string) => (
    <button
      key={role}
      type="button"
      role="option"
      aria-selected={value === role}
      className="role-search__item"
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => select(role)}
    >
      <span className="role-search__item-label">{role}</span>
      <span className="role-search__item-tag">
        <span className="role-search__item-emoji" aria-hidden>
          {tagIcon}
        </span>
        {tagLabel}
      </span>
    </button>
  )

  return (
    <div className="role-search" ref={ref}>
      <Search
        value={value}
        placeholder="Search for a role"
        ariaLabel="Search for a role"
        onChange={(v) => {
          onChange(v)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
      />
      {open && hasResults && (
        <div className="role-search__listbox" role="listbox">
          {companyRoles.length > 0 && (
            <>
              <div className="role-search__group">Your company roles</div>
              {companyRoles.map((r) => renderItem(r, '🏠', `${company} role`))}
            </>
          )}
          {companyRoles.length > 0 && popularRoles.length > 0 && (
            <div className="role-search__divider" />
          )}
          {popularRoles.length > 0 && (
            <>
              <div className="role-search__group">Popular roles</div>
              {popularRoles.map((r) => renderItem(r, '🌐', '5Mins role'))}
            </>
          )}
        </div>
      )}
    </div>
  )
}

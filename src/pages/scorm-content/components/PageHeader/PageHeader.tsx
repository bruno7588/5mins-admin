import CloseButton from '../../../../components/CloseButton/CloseButton'
import './PageHeader.css'

const tabs = [
  { label: 'Details', active: false },
  { label: 'Course Content', active: true },
  { label: 'Resources', active: false },
  { label: 'Settings', active: false },
]

function PageHeader() {
  return (
    <header className="page-header">
      <div className="page-header-top">
        <h2 className="page-header-title">Create course</h2>
        <div className="page-header-actions">
          <button className="page-header-btn-outline page-header-btn-disabled">
            Save Draft
          </button>
          <button className="page-header-btn-filled page-header-btn-disabled">
            Create Course
          </button>
          <CloseButton className="page-header-close" />
        </div>
      </div>
      <nav className="page-header-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`page-header-tab ${tab.active ? 'page-header-tab--active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </header>
  )
}

export default PageHeader

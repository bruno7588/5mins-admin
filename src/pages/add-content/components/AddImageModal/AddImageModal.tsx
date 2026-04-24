import { useEffect, useState } from 'react'
import { SearchNormal1 } from 'iconsax-react'
import ConfirmModal from '../../../../components/ConfirmModal/ConfirmModal'
import FileUploader from '../../../../components/FileUploader/FileUploader'
import './AddImageModal.css'

interface AddImageModalProps {
  open: boolean
  onClose: () => void
  onSelect: (imageDataUrl: string) => void
}

type Tab = 'upload' | 'freepik'

const ACCEPTED_IMAGE_EXTENSIONS = '.jpg,.jpeg,.png'

const FREEPIK_STUBS = [
  { id: 1, seed: 'compliance-team', title: 'Team meeting', premium: false },
  { id: 2, seed: 'classroom-students', title: 'Classroom', premium: true },
  { id: 3, seed: 'office-hallway', title: 'Office hallway', premium: false },
  { id: 4, seed: 'handshake-contract', title: 'Signing contract', premium: false },
  { id: 5, seed: 'laptop-coffee', title: 'Workspace', premium: true },
  { id: 6, seed: 'audit-documents', title: 'Audit documents', premium: false },
  { id: 7, seed: 'training-session', title: 'Training session', premium: false },
  { id: 8, seed: 'boardroom-glass', title: 'Boardroom', premium: true },
  { id: 9, seed: 'hospital-ward', title: 'Hospital ward', premium: false },
]

const freepikThumb = (seed: string) => `https://picsum.photos/seed/${seed}/600/400`

function AddImageModal({ open, onClose, onSelect }: AddImageModalProps) {
  const [tab, setTab] = useState<Tab>('upload')
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (open) {
      setTab('upload')
      setQuery('')
    }
  }, [open])

  const q = query.trim()
  const filteredFreepik = q
    ? Array.from({ length: 9 }, (_, i) => ({
        id: 100 + i,
        seed: `${q.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`,
        title: `${q} · ${i + 1}`,
        premium: i % 3 === 1,
      }))
    : FREEPIK_STUBS

  const handleFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onSelect(reader.result)
        onClose()
      }
    }
    reader.readAsDataURL(file)
  }

  const handleFreepikPick = (seed: string) => {
    onSelect(freepikThumb(seed))
    onClose()
  }

  return (
    <ConfirmModal open={open} onClose={onClose} className="aim-modal">
      <button type="button" className="aim-close" aria-label="Close" onClick={onClose}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path
            d="M17.25 17.25L6.75 6.75M17.25 6.75L6.75 17.25"
            stroke="#454C5E"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="aim-header">
        <h2 className="aim-title">Add image</h2>
        <div className="aim-divider" />
        <div className="aim-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'upload'}
            className={`aim-tab${tab === 'upload' ? ' aim-tab--active' : ''}`}
            onClick={() => setTab('upload')}
          >
            Upload image
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'freepik'}
            className={`aim-tab${tab === 'freepik' ? ' aim-tab--active' : ''}`}
            onClick={() => setTab('freepik')}
          >
            Freepik images
          </button>
        </div>
      </div>

      <div className="aim-body">
        {tab === 'upload' && (
          <FileUploader
            size="L"
            accept={ACCEPTED_IMAGE_EXTENSIONS}
            onFileSelect={handleFile}
            className="aim-uploader"
          />
        )}

        {tab === 'freepik' && (
          <div className="aim-freepik">
            <div className="aim-search">
              <SearchNormal1 size={20} color="var(--text-tertiary)" variant="Linear" />
              <input
                type="text"
                className="aim-search-input"
                placeholder="Search Freepik images"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button
                  type="button"
                  className="aim-search-clear"
                  aria-label="Clear search"
                  onClick={() => setQuery('')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path
                      d="M17.25 17.25L6.75 6.75M17.25 6.75L6.75 17.25"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
            </div>

            <div className="aim-freepik-grid">
              {filteredFreepik.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="aim-freepik-card"
                  onClick={() => handleFreepikPick(item.seed)}
                  aria-label={`Use ${item.title}`}
                >
                  <img src={freepikThumb(item.seed)} alt={item.title} loading="lazy" />
                  {item.premium && <span className="aim-freepik-badge">Premium</span>}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {tab === 'freepik' && (
        <p className="aim-freepik-attribution">
          Free images require attribution: "Designed by Freepik".
        </p>
      )}
    </ConfirmModal>
  )
}

export default AddImageModal

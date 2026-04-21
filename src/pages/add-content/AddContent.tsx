import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Notepad2,
  VideoSquare,
  VolumeHigh,
  DocumentText,
  Link2,
  ArrowRight2,
} from 'iconsax-react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import CreateFlashcardsModal from './components/CreateFlashcardsModal'
import './AddContent.css'

type CardKey = 'flashcards' | 'video' | 'audio' | 'document' | 'link'

interface CardDef {
  key: CardKey
  color: string
  iconColor: string
  icon: React.ReactNode
  title: string
  description: string
  caption?: string
  badge?: string
}

const iconSize = 32

const cards: CardDef[] = [
  {
    key: 'flashcards',
    color: '255, 187, 56',
    iconColor: '#FFBB38',
    icon: <Notepad2 size={iconSize} color="#E6A830" variant="Linear" />,
    title: 'Create Flashcards',
    description: 'Start from a blank template or transform existing content with AI',
    badge: 'New',
  },
  {
    key: 'video',
    color: '250, 113, 95',
    iconColor: '#FA715F',
    icon: <VideoSquare size={iconSize} color="#FA715F" variant="Linear" />,
    title: 'Add a new video',
    description: 'Great for short training or update videos',
  },
  {
    key: 'audio',
    color: '155, 85, 201',
    iconColor: '#9B55C9',
    icon: <VolumeHigh size={iconSize} color="#9B55C9" variant="Linear" />,
    title: 'Add a new audio',
    description: 'Upload audio files for on-the-go learning',
  },
  {
    key: 'document',
    color: '0, 206, 230',
    iconColor: '#00CEE6',
    icon: <DocumentText size={iconSize} color="#00AFC4" variant="Linear" />,
    title: 'Add a new document',
    description: 'Share PDFs, presentations, and spreadsheets directly with your team',
    caption: 'PDF, DOCX, PPTX, XLSX',
  },
  {
    key: 'link',
    color: '42, 144, 216',
    iconColor: '#2A90D8',
    icon: <Link2 size={iconSize} color="#2A90D8" variant="Linear" />,
    title: 'Add external link',
    description: 'Embed web content, Youtube videos, TikToks, and more into any lesson',
    caption: 'Youtube, TikTok & more',
  },
]

function AddContent() {
  const navigate = useNavigate()
  const [showFlashcardsModal, setShowFlashcardsModal] = useState(false)

  const handleCardClick = (key: CardKey) => {
    if (key === 'flashcards') {
      setShowFlashcardsModal(true)
    }
    // other card destinations wired in follow-up work
  }

  const handleCreateEmpty = () => {
    setShowFlashcardsModal(false)
    // TODO: open flashcard editor seeded with 3 empty cards (Phase 4)
  }

  const handleAiTransformer = () => {
    setShowFlashcardsModal(false)
    // TODO: open the existing Transform Your Content modal
  }

  return (
    <div className="add-content-layout">
      <LeftSidebar />
      <main className="add-content-main">
        <div className="add-content-page">
          <div className="add-content-header">
            <nav className="add-content-breadcrumb" aria-label="Breadcrumb">
              <button
                type="button"
                className="add-content-breadcrumb-link"
                onClick={() => navigate('/content-library')}
              >
                Your content
              </button>
              <ArrowRight2 size={16} color="var(--text-tertiary)" variant="Linear" />
              <span className="add-content-breadcrumb-current">Add Content</span>
            </nav>
            <h1 className="add-content-title">What do you want to upload?</h1>
          </div>

          <div className="add-content-grid">
            {cards.map((card) => (
              <button
                key={card.key}
                type="button"
                className="add-content-card"
                style={{ '--ql-color': card.color } as React.CSSProperties}
                onClick={() => handleCardClick(card.key)}
              >
                <div className="add-content-card-head">
                  <div className="add-content-card-icon">{card.icon}</div>
                  {card.badge && <span className="add-content-card-badge">{card.badge}</span>}
                </div>
                <div className="add-content-card-info">
                  <h3 className="add-content-card-title">{card.title}</h3>
                  <p className="add-content-card-desc">{card.description}</p>
                  {card.caption && <p className="add-content-card-caption">{card.caption}</p>}
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>

      <CreateFlashcardsModal
        open={showFlashcardsModal}
        onClose={() => setShowFlashcardsModal(false)}
        onCreateEmpty={handleCreateEmpty}
        onAiTransformer={handleAiTransformer}
      />
    </div>
  )
}

export default AddContent

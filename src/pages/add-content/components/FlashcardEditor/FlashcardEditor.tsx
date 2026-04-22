import { useEffect, useMemo, useState } from 'react'
import {
  Add,
  AddSquare,
  ArrowLeft,
  ArrowRight,
  Brush2,
  Copy,
  Edit2,
  Gallery,
  GalleryAdd,
  Trash,
  TextalignLeft,
  TextBold,
  TextItalic,
  TextUnderline,
  CloseCircle,
} from 'iconsax-react'
import CloseButton from '../../../../components/CloseButton/CloseButton'
import InputField from '../../../../components/InputField/InputField'
import Checkbox from '../../../../components/Checkbox/Checkbox'
import type { ContentRow } from '../../../your-courses/components/ContentTable/ContentTable'
import './FlashcardEditor.css'

interface Card {
  id: number
  title: string
  description: string
}

interface FlashcardEditorProps {
  open: boolean
  onClose: () => void
  onPublish: (lesson: ContentRow) => void
}

type EditorTab = 'quiz' | 'skills' | 'category'

const createEmptyCard = (): Card => ({
  id: Date.now() + Math.random(),
  title: '',
  description: '',
})

const seedCards = (): Card[] => [createEmptyCard(), createEmptyCard(), createEmptyCard()]

const placeholderFor = (index: number): { title: string; description: string } => {
  if (index === 0) return { title: 'Your card title goes here', description: 'Add the main content for this card' }
  if (index === 1) return { title: 'Give your next card a title', description: 'Describe the key idea in a sentence or two' }
  if (index === 2) return { title: 'Keep building your lesson', description: 'Add another idea, fact, or example' }
  return { title: 'Your card title goes here', description: 'Add the main content for this card' }
}

const AiSparkleIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.52 5.42c.33-1.37 2.28-1.37 2.61 0l1.14 4.71c.12.49.5.87.99.99l4.71 1.14c1.37.33 1.37 2.28 0 2.61l-4.71 1.14c-.49.12-.87.5-.99.99l-1.14 4.71c-.33 1.37-2.28 1.37-2.61 0l-1.14-4.71a1.45 1.45 0 0 0-.99-.99l-4.71-1.14c-1.37-.33-1.37-2.28 0-2.61l4.71-1.14c.49-.12.87-.5.99-.99l1.14-4.71Z"
      fill="url(#fce-sparkle-gradient)"
    />
    <path
      d="M17.88 2.58c.11-.45.75-.45.86 0l.3 1.23c.04.16.16.28.33.33l1.23.3c.45.11.45.75 0 .86l-1.23.3c-.16.04-.28.16-.33.33l-.3 1.23c-.11.45-.75.45-.86 0l-.3-1.23a.42.42 0 0 0-.33-.33l-1.23-.3c-.45-.11-.45-.75 0-.86l1.23-.3c.16-.04.28-.16.33-.33l.3-1.23Z"
      fill="url(#fce-sparkle-gradient)"
    />
    <defs>
      <linearGradient id="fce-sparkle-gradient" x1="3" y1="4" x2="20" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00AFC4" />
        <stop offset="1" stopColor="#8158EC" />
      </linearGradient>
    </defs>
  </svg>
)

const DragHandleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="5" cy="3" r="1.25" fill="var(--text-tertiary)" />
    <circle cx="11" cy="3" r="1.25" fill="var(--text-tertiary)" />
    <circle cx="5" cy="8" r="1.25" fill="var(--text-tertiary)" />
    <circle cx="11" cy="8" r="1.25" fill="var(--text-tertiary)" />
    <circle cx="5" cy="13" r="1.25" fill="var(--text-tertiary)" />
    <circle cx="11" cy="13" r="1.25" fill="var(--text-tertiary)" />
  </svg>
)

function FlashcardEditor({ open, onClose, onPublish }: FlashcardEditorProps) {
  const [lessonName, setLessonName] = useState('')
  const [cards, setCards] = useState<Card[]>(seedCards)
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<EditorTab>('quiz')
  const [aiQuizChecked, setAiQuizChecked] = useState(false)

  useEffect(() => {
    if (!open) {
      setLessonName('')
      setCards(seedCards())
      setActiveIndex(0)
      setActiveTab('quiz')
      setAiQuizChecked(false)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const activeCard = cards[activeIndex]
  const canPublish = lessonName.trim().length > 0

  const updateActive = (patch: Partial<Card>) => {
    setCards(prev => prev.map((c, i) => (i === activeIndex ? { ...c, ...patch } : c)))
  }

  const handleAddCard = () => {
    const next = createEmptyCard()
    setCards(prev => {
      const copy = [...prev]
      copy.splice(activeIndex + 1, 0, next)
      return copy
    })
    setActiveIndex(i => i + 1)
  }

  const handleDuplicate = () => {
    const clone: Card = { ...activeCard, id: Date.now() + Math.random() }
    setCards(prev => {
      const copy = [...prev]
      copy.splice(activeIndex + 1, 0, clone)
      return copy
    })
    setActiveIndex(i => i + 1)
  }

  const handleDelete = () => {
    if (cards.length === 1) {
      setCards([createEmptyCard()])
      setActiveIndex(0)
      return
    }
    setCards(prev => prev.filter((_, i) => i !== activeIndex))
    setActiveIndex(i => Math.max(0, i - (activeIndex === cards.length - 1 ? 1 : 0)))
  }

  const handlePrev = () => setActiveIndex(i => Math.max(0, i - 1))
  const handleNext = () => setActiveIndex(i => Math.min(cards.length - 1, i + 1))

  const handlePublish = () => {
    if (!canPublish) return
    const lesson: ContentRow = {
      id: Date.now(),
      fileName: lessonName.trim(),
      type: 'Flashcards',
      uploadedBy: 'You',
      updatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      thumbColor: 'linear-gradient(135deg, #4B3A99, #2B1F6B)',
    }
    onPublish(lesson)
  }

  const pagination = useMemo(() => cards.map((_, i) => i), [cards.length])

  if (!open) return null

  return (
    <div className="fce-overlay" role="dialog" aria-modal="true" aria-label="Create flashcard lesson">
      <CloseButton className="fce-close" onClick={onClose} ariaLabel="Close flashcard editor" />

      <div className="fce-content">
        {/* Header */}
        <div className="fce-header">
          <h1 className="fce-title">Create Flashcard</h1>
          <div className="fce-header-actions">
            <button type="button" className="fce-icon-btn" aria-label="AI actions">
              <AiSparkleIcon size={24} />
            </button>
            <button type="button" className="btn-outlined">
              Edit Theme
              <Brush2 size={20} color="currentColor" variant="Linear" />
            </button>
            <button
              type="button"
              className="btn-primary fce-publish"
              disabled={!canPublish}
              onClick={handlePublish}
            >
              Publish Lesson
            </button>
          </div>
        </div>

        {/* Lesson name */}
        <InputField
          label="Name of the lesson"
          placeholder="Untitled flashcard lesson"
          value={lessonName}
          onChange={(e) => setLessonName(e.target.value)}
        />

        {/* Flashcards carousel */}
        <div className="fce-cards">
          <div className="fce-cards-row">
            <button
              type="button"
              className="fce-chev fce-chev--left"
              onClick={handlePrev}
              disabled={activeIndex === 0}
              aria-label="Previous card"
            >
              <ArrowLeft size={16} color="var(--text-primary)" variant="Linear" />
            </button>

            <div className="fce-cards-track">
              <div
                className="fce-cards-strip"
                style={{ transform: `translateX(-${activeIndex * 336}px)` }}
              >
                {cards.map((card, i) => {
                  const isActive = i === activeIndex
                  const ph = placeholderFor(i)
                  return (
                    <div
                      key={card.id}
                      className={`fce-card-slot${isActive ? ' fce-card-slot--active' : ''}`}
                      onClick={() => !isActive && setActiveIndex(i)}
                    >
                      {isActive && (
                        <div className="fce-drag" aria-hidden="true">
                          <DragHandleIcon />
                        </div>
                      )}
                      <div className="fce-card">
                        {isActive && (
                          <div className="fce-toolbar" aria-hidden="true">
                            <button type="button" className="fce-toolbar-btn"><TextalignLeft size={16} color="var(--text-primary)" variant="Linear" /></button>
                            <button type="button" className="fce-toolbar-btn"><TextBold size={16} color="var(--text-primary)" variant="Linear" /></button>
                            <button type="button" className="fce-toolbar-btn"><TextItalic size={16} color="var(--text-primary)" variant="Linear" /></button>
                            <button type="button" className="fce-toolbar-btn"><TextUnderline size={16} color="var(--text-primary)" variant="Linear" /></button>
                            <span className="fce-toolbar-sep" />
                            <button type="button" className="fce-toolbar-btn" aria-label="Close toolbar"><CloseCircle size={16} color="var(--text-primary)" variant="Linear" /></button>
                          </div>
                        )}
                        <textarea
                          className="fce-card-title"
                          placeholder={ph.title}
                          value={card.title}
                          onChange={(e) => isActive && updateActive({ title: e.target.value })}
                          readOnly={!isActive}
                          rows={2}
                        />
                        <textarea
                          className="fce-card-desc"
                          placeholder={ph.description}
                          value={card.description}
                          onChange={(e) => isActive && updateActive({ description: e.target.value })}
                          readOnly={!isActive}
                        />
                      </div>
                      {isActive && (
                        <div className="fce-card-actions">
                          <button type="button" className="fce-card-action" aria-label="Edit text"><Edit2 size={20} color="var(--text-primary)" variant="Linear" /></button>
                          <button type="button" className="fce-card-action" aria-label="Add image"><Gallery size={20} color="var(--text-primary)" variant="Linear" /></button>
                          <button type="button" className="fce-card-action" aria-label="Add card" onClick={handleAddCard}><AddSquare size={20} color="var(--text-primary)" variant="Linear" /></button>
                          <button type="button" className="fce-card-action" aria-label="Duplicate card" onClick={handleDuplicate}><Copy size={20} color="var(--text-primary)" variant="Linear" /></button>
                          <button type="button" className="fce-card-action" aria-label="Delete card" onClick={handleDelete}><Trash size={20} color="var(--text-primary)" variant="Linear" /></button>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            <button
              type="button"
              className="fce-chev fce-chev--right"
              onClick={handleNext}
              disabled={activeIndex === cards.length - 1}
              aria-label="Next card"
            >
              <ArrowRight size={16} color="var(--text-primary)" variant="Linear" />
            </button>
          </div>

          {/* Pagination */}
          <div className="fce-pagination">
            {pagination.map(i => (
              <button
                key={i}
                type="button"
                className={`fce-page${i === activeIndex ? ' fce-page--active' : ''}`}
                onClick={() => setActiveIndex(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Select thumbnail */}
        <div className="fce-thumb">
          <p className="fce-thumb-label">Select thumbnail</p>
          <div className="fce-thumb-row">
            <div className="fce-thumb-preview" style={{ background: 'linear-gradient(135deg, #4B3A99, #2B1F6B)' }}>
              <span className="fce-thumb-gallery-btn" aria-hidden="true">
                <GalleryAdd size={14} color="#ffffff" variant="Linear" />
              </span>
            </div>
            <div className="fce-thumb-info">
              <p className="fce-thumb-desc">Upload a 256 x 256 px image, PNG or JPEG format. This image shows up in your lesson thumbnails.</p>
              <button type="button" className="fce-thumb-change">Change Image</button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="fce-tabs">
          {(['quiz', 'skills', 'category'] as EditorTab[]).map(t => (
            <button
              key={t}
              type="button"
              className={`fce-tab${activeTab === t ? ' fce-tab--active' : ''}`}
              onClick={() => setActiveTab(t)}
            >
              {t === 'quiz' && 'Quiz'}
              {t === 'skills' && 'Skills'}
              {t === 'category' && 'Add to Category'}
            </button>
          ))}
        </div>

        {activeTab === 'quiz' && (
          <div className="fce-quiz">
            <div className="fce-quiz-banner">
              <Checkbox checked={aiQuizChecked} onChange={() => setAiQuizChecked(v => !v)} />
              <div className="fce-quiz-banner-info">
                <div className="fce-quiz-banner-head">
                  <span className="fce-quiz-banner-title">Generate AI Quizzes</span>
                  <AiSparkleIcon size={20} />
                </div>
                <p className="fce-quiz-banner-desc">AI generated quizzes will be available for review after the lesson is published</p>
              </div>
            </div>
            <button type="button" className="fce-add-question">
              Add Question Manually
              <Add size={20} color="var(--text-primary)" variant="Linear" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default FlashcardEditor

import { useEffect, useState } from 'react'
import { Magicpen, TickCircle } from 'iconsax-react'
import CloseButton from '../../../components/CloseButton/CloseButton'
import Checkbox from '../../../components/Checkbox/Checkbox'
import FileUploader from '../../../components/FileUploader/FileUploader'
import './CreateFlashcardsFromFileModal.css'

interface CreateFlashcardsFromFileModalProps {
  open: boolean
  onClose: () => void
  onGenerate: (fileName: string, includeImages: boolean) => void
}

const STEP_DELAY = 750

const LOADING_STEPS = [
  'Analyzing your file',
  'Extracting key concepts',
  'Writing flashcards',
  'Finishing up',
]

const UPLOAD_DURATION_MS = 1500

const ACCEPTED_EXTENSIONS = '.pdf,.doc,.docx,.ppt,.pptx,.mp4,.mov,.webm,.mp3,.wav,.m4a'

function SparkleIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.6948 9.22578C13.0267 7.85703 14.9733 7.85703 15.3052 9.22578L16.2185 12.992C16.337 13.4807 16.7185 13.8622 17.2072 13.9807L20.9734 14.894C22.3422 15.2259 22.3422 17.1726 20.9734 17.5045L17.2072 18.4177C16.7185 18.5362 16.337 18.9178 16.2185 19.4064L15.3052 23.1727C14.9733 24.5414 13.0267 24.5414 12.6948 23.1727L11.7815 19.4064C11.663 18.9178 11.2815 18.5362 10.7928 18.4177L7.02656 17.5045C5.65781 17.1726 5.65781 15.2259 7.02656 14.894L10.7928 13.9807C11.2815 13.8622 11.663 13.4807 11.7815 12.992L12.6948 9.22578Z" fill="url(#cffm-sparkle)" />
      <path d="M22.3705 6.71184C22.4795 6.26272 23.1182 6.26272 23.2271 6.71184L23.5268 7.94763C23.5657 8.10798 23.6909 8.23318 23.8512 8.27206L25.087 8.57172C25.5361 8.68062 25.5361 9.31938 25.087 9.42828L23.8512 9.72794C23.6909 9.76682 23.5657 9.89202 23.5268 10.0524L23.2271 11.2882C23.1182 11.7373 22.4795 11.7373 22.3705 11.2882L22.0709 10.0524C22.032 9.89202 21.9068 9.76682 21.7465 9.72794L20.5107 9.42828C20.0615 9.31938 20.0615 8.68062 20.5107 8.57172L21.7465 8.27206C21.9068 8.23318 22.032 8.10798 22.0709 7.94763L22.3705 6.71184Z" fill="url(#cffm-sparkle)" />
      <defs>
        <linearGradient id="cffm-sparkle" x1="5" y1="6" x2="26" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00AFC4" />
          <stop offset="1" stopColor="#8158EC" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function CreateFlashcardsFromFileModal({ open, onClose, onGenerate }: CreateFlashcardsFromFileModalProps) {
  const [step, setStep] = useState<'upload' | 'uploading' | 'generating'>('upload')
  const [file, setFile] = useState<File | null>(null)
  const [includeImages, setIncludeImages] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (open) {
      setStep('upload')
      setFile(null)
      setIncludeImages(false)
      setUploadProgress(0)
      setCurrentStep(0)
      setProgress(0)
    }
  }, [open])

  useEffect(() => {
    if (!open || step !== 'uploading') return
    const tickMs = 50
    const ticks = UPLOAD_DURATION_MS / tickMs
    let t = 0
    const id = setInterval(() => {
      t += 1
      const pct = Math.min(100, Math.round((t / ticks) * 100))
      setUploadProgress(pct)
      if (pct >= 100) {
        clearInterval(id)
        setTimeout(() => setStep('generating'), 250)
      }
    }, tickMs)
    return () => clearInterval(id)
  }, [step, open])

  useEffect(() => {
    if (!open || step !== 'generating') return
    const timers: ReturnType<typeof setTimeout>[] = []

    LOADING_STEPS.forEach((_, i) => {
      timers.push(setTimeout(() => {
        setCurrentStep(i)
        setProgress(Math.round(((i + 1) / LOADING_STEPS.length) * 100))
      }, STEP_DELAY * (i + 1)))
    })

    timers.push(setTimeout(() => {
      onGenerate(file?.name ?? 'Uploaded content', includeImages)
    }, STEP_DELAY * (LOADING_STEPS.length + 1)))

    return () => timers.forEach(clearTimeout)
  }, [step, open, file, includeImages, onGenerate])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && step === 'upload') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose, step])

  if (!open) return null

  const handleStart = () => {
    if (!file) return
    setStep('uploading')
  }

  return (
    <div className="cffm-fullscreen">
      {step === 'upload' && (
        <div className="cffm-topbar">
          <CloseButton onClick={onClose} />
        </div>
      )}

      <div className="cffm-center">
        {step === 'upload' && (
          <div className="cffm-panel">
            <div className="cffm-heading">
              <h2 className="cffm-title">Upload your content</h2>
              <p className="cffm-subtitle">
                We'll transform it into flashcards. Supports PDF, Word, PowerPoint, video and audio files.
              </p>
            </div>

            <FileUploader
              size="L"
              accept={ACCEPTED_EXTENSIONS}
              state={file ? 'Filled' : undefined}
              fileName={file?.name}
              onFileSelect={(f) => setFile(f)}
              onChangeFile={() => setFile(null)}
            />

            <label className="cffm-include-images">
              <Checkbox checked={includeImages} onChange={() => setIncludeImages((v) => !v)} />
              <span>Include images from the file in the generated cards</span>
            </label>

            <div className="cffm-footer">
              <button
                type="button"
                className="btn-primary cffm-generate"
                disabled={!file}
                onClick={handleStart}
              >
                <Magicpen size={18} color="currentColor" variant="Linear" />
                Generate flashcards
              </button>
            </div>
          </div>
        )}

        {step === 'uploading' && (
          <div className="cffm-panel">
            <h2 className="cffm-title cffm-title--center">Uploading your file…</h2>
            <FileUploader
              size="L"
              state="Uploading"
              fileName={file?.name}
              progress={uploadProgress}
            />
          </div>
        )}

        {step === 'generating' && (
          <div className="cffm-loading-panel">
            <h2 className="cffm-title cffm-title--center">Creating your flashcards…</h2>

            <div className="cffm-steps">
              {LOADING_STEPS.map((label, i) => {
                let status: 'done' | 'active' | 'pending' = 'pending'
                if (i < currentStep) status = 'done'
                else if (i === currentStep) status = 'active'

                return (
                  <div key={i} className={`cffm-step cffm-step--${status}`}>
                    <span className="cffm-step-icon">
                      {status === 'done' ? (
                        <TickCircle size={24} color="var(--success-500)" variant="Bold" />
                      ) : status === 'active' ? (
                        <SparkleIcon size={24} />
                      ) : (
                        <span className="cffm-step-icon--pending" />
                      )}
                    </span>
                    <span>{label}</span>
                  </div>
                )
              })}
            </div>

            <div className="cffm-progress">
              <div className="cffm-progress-track">
                <div className="cffm-progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <span className="cffm-progress-label">{progress}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CreateFlashcardsFromFileModal

import { useEffect, useRef, useState } from 'react'
import { Trash, Edit2 } from 'iconsax-react'
import './ContentList.css'

export interface ContentItem {
  id: number
  type: 'Lesson' | 'Assessment' | 'SCORM'
  title: string
  metadata: string
  thumbnail: string
  thumbColor?: string
  showEditIcon?: boolean
}

const defaultItems: ContentItem[] = [
  {
    id: 1,
    type: 'Lesson',
    title: '50 free Tools and resources that everyone should know',
    metadata: 'Lesson · Instructor name · 4min',
    thumbnail: '',
  },
  {
    id: 2,
    type: 'Lesson',
    title: '50 free Tools and resources that everyone should know',
    metadata: 'Lesson · Instructor name · 4min',
    thumbnail: '',
  },
  {
    id: 3,
    type: 'Assessment',
    title: '50 free Tools and resources that everyone should know',
    metadata: 'Assessment · Type of assessment',
    thumbnail: '',
    showEditIcon: true,
  },
]

function DragHandle() {
  return (
    <div className="content-card-drag" aria-label="Drag to reorder">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="7" cy="5" r="1.5" fill="var(--neutral-300)" />
        <circle cx="13" cy="5" r="1.5" fill="var(--neutral-300)" />
        <circle cx="7" cy="10" r="1.5" fill="var(--neutral-300)" />
        <circle cx="13" cy="10" r="1.5" fill="var(--neutral-300)" />
        <circle cx="7" cy="15" r="1.5" fill="var(--neutral-300)" />
        <circle cx="13" cy="15" r="1.5" fill="var(--neutral-300)" />
      </svg>
    </div>
  )
}

interface ContentCardProps {
  item: ContentItem
  index: number
  onDelete?: () => void
  dragIndex: number | null
  dropIndex: number | null
  onDragStart: (i: number) => void
  onDragOver: (e: React.DragEvent, i: number) => void
  onDragEnd: () => void
  onDrop: () => void
}

function ContentCard({
  item, index, onDelete,
  dragIndex, dropIndex,
  onDragStart, onDragOver, onDragEnd, onDrop,
}: ContentCardProps) {
  const isAssessment = item.type === 'Assessment'
  const isScorm = item.type === 'SCORM'
  const isDragging = dragIndex === index

  return (
    <div
      className={`content-item-container${isDragging ? ' content-item-container--dragging' : ''}${dropIndex === index ? ' content-item-container--drop-above' : ''}${dropIndex === index + 1 && index === (dragIndex !== null ? dragIndex : -1) - 1 ? '' : dropIndex === index + 1 ? ' content-item-container--drop-below' : ''}`}
      draggable
      onDragStart={() => onDragStart(index)}
      onDragOver={(e) => onDragOver(e, index)}
      onDragEnd={onDragEnd}
      onDrop={onDrop}
    >
      <DragHandle />
      <div className="content-card">
        <div className={`content-card-thumb ${isAssessment ? 'content-card-thumb--assessment' : ''}`}>
          {isAssessment ? (
            <svg className="content-card-thumb-illustration" width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M28.3224 32.2734H28.3254C28.3254 32.2734 28.3018 32.2837 28.2665 32.294C28.0855 32.3723 27.9046 32.4446 27.7221 32.5125C25.9345 33.2489 20.2744 35.4389 17.8836 38.9896L10.8125 34.1978C13.0665 30.8507 13.0106 25.2694 12.9724 23.0291C12.9488 22.7 12.9356 22.3695 12.9385 22.0374C12.9385 22.0212 12.9385 22.0079 12.9385 22.0079H12.9415C12.968 19.93 13.5785 17.8359 14.8262 15.9838C18.2234 10.9337 25.0576 9.60699 30.0924 13.0175C32.2199 14.4593 33.6853 16.518 34.4106 18.7981C35.3993 21.9061 35.0109 25.4214 33.0497 28.3345C31.8344 30.1394 30.1762 31.4647 28.3224 32.2749V32.2734Z" fill="#FFB83D"/>
              <path d="M24.4262 29.8594C24.5439 29.4329 24.4924 29.0551 24.2732 28.7364C24.1996 28.6301 24.1275 28.5416 24.0554 28.4663C23.9951 28.1697 23.7671 27.6532 22.9225 27.4082C22.6665 27.3344 22.4193 27.3108 22.1884 27.33C22.0339 26.9448 21.7749 26.5965 21.3939 26.3663C21.1481 26.2172 20.8686 26.1449 20.5817 26.1331C20.4684 25.4395 20.0358 24.9613 19.3561 24.7813C18.4424 24.5407 17.9289 24.7311 17.6568 24.9422C17.2948 24.889 16.9123 25.0233 16.5665 25.3347C15.5145 26.2807 13.9756 31.6436 13.2782 34.238L12.8294 33.934L12.1982 34.8712L12.9736 35.3965C12.9412 35.5205 12.9206 35.6046 12.9133 35.6341L12.8942 35.7109L15.0084 37.1896L15.0673 37.163C15.1364 37.132 15.2394 37.0819 15.3659 37.0184L16.1163 37.5275L16.7475 36.5904L16.493 36.4178C19.0148 35.0173 23.8244 32.0347 24.4262 29.8594ZM23.8421 28.577C23.8906 28.9459 23.7244 29.2839 23.5272 29.4359C23.439 29.5038 23.3007 29.5687 23.1447 29.4934C22.8019 29.3267 22.7945 29.0256 22.8063 28.9046C22.8328 28.6434 23.0108 28.4117 23.2315 28.3541C23.3801 28.3158 23.539 28.3527 23.6964 28.4589C23.745 28.4914 23.7935 28.5312 23.8421 28.577ZM22.0324 27.5823C22.206 28.1402 22.1663 28.7585 21.9809 29.157C21.897 29.3385 21.7087 29.6277 21.4012 29.5215C20.9348 29.3621 20.7421 28.9917 20.8877 28.5327C21.0304 28.0826 21.463 27.69 22.0324 27.5823ZM19.4223 28.5519C19.2016 28.6759 18.9986 28.6626 18.8147 28.5165C18.2629 28.0723 18.491 27.5587 18.6764 27.2931C19.0206 26.7972 19.7136 26.4135 20.3772 26.3678C20.4346 27.2739 19.9314 28.2656 19.4208 28.5519H19.4223ZM17.72 25.1916C17.7862 25.2093 17.8436 25.2329 17.8892 25.2565C18.1938 25.4115 18.3571 25.7066 18.338 25.9029C18.3262 26.0209 18.2526 26.1006 18.1173 26.139C17.8936 26.2025 17.7097 26.1523 17.5994 25.9973C17.464 25.8084 17.4758 25.5207 17.6288 25.2993C17.6509 25.2683 17.6803 25.2299 17.72 25.1916ZM16.7195 25.5074C16.9917 25.2624 17.2404 25.1753 17.4449 25.1635C17.4449 25.165 17.4419 25.1679 17.4405 25.1694C17.2345 25.469 17.2227 25.8645 17.414 26.1302C17.5802 26.3633 17.8672 26.4489 18.1805 26.3589C18.4056 26.2954 18.5469 26.1361 18.566 25.9235C18.5969 25.6018 18.3556 25.2344 17.9937 25.0499C17.979 25.0425 17.9643 25.0351 17.9495 25.0278C18.2055 24.8994 18.6263 24.8256 19.2987 25.0027C20.0211 25.193 20.2727 25.7051 20.3522 26.1361C19.6224 26.1892 18.8765 26.6083 18.491 27.1602C18.104 27.7166 18.1717 28.2892 18.6734 28.6936C18.9265 28.9002 19.234 28.9194 19.5356 28.7511C20.1741 28.3925 20.6597 27.2886 20.6082 26.3648C20.8465 26.3781 21.0761 26.4401 21.2776 26.5611C21.5939 26.7529 21.8132 27.0392 21.9529 27.3624C21.3173 27.4967 20.8333 27.9468 20.67 28.4619C20.489 29.0374 20.748 29.5377 21.3276 29.7369C21.6705 29.855 21.9927 29.6735 22.1884 29.2514C22.3929 28.8116 22.4429 28.1549 22.2663 27.5528C22.4547 27.5439 22.6533 27.5661 22.8593 27.6266C23.2565 27.7417 23.5464 27.9395 23.7067 28.1977C23.4846 28.0856 23.2948 28.0988 23.1741 28.1298C22.8593 28.211 22.6136 28.5194 22.5782 28.8795C22.5429 29.2322 22.7165 29.5377 23.0446 29.6986C23.2447 29.796 23.4713 29.7665 23.6655 29.6174C23.8892 29.4462 24.0363 29.1555 24.0716 28.8471C24.076 28.853 24.0804 28.8603 24.0849 28.8662C24.2673 29.1289 24.3055 29.4344 24.2055 29.7974C23.6361 31.8532 18.8338 34.8712 16.284 36.2761L13.4783 34.3753C14.161 31.834 15.7102 26.412 16.7166 25.5059L16.7195 25.5074ZM15.032 36.9269L13.1546 35.6135C13.1605 35.5928 13.1678 35.5633 13.1752 35.5338L15.1497 36.8708C15.1085 36.89 15.0687 36.9107 15.032 36.9269Z" fill="#FFF187"/>
              <path d="M16.3221 40.4059L9.75195 35.9541L9.14909 36.8493L15.7193 41.3011L16.3221 40.4059Z" fill="#522A75"/>
              <path d="M14.4559 43.1769L7.88574 38.7251L7.58431 39.1727L14.1545 43.6245L14.4559 43.1769Z" fill="#522A75"/>
              <path d="M8.88958 44.6982L8.55266 44.4695C6.83124 43.3036 6.39868 40.9276 7.58601 39.1641L14.1568 43.6165C12.9695 45.38 10.611 45.8641 8.88958 44.6982Z" fill="#522A75"/>
              <path d="M28.319 32.2751H28.3219C28.3219 32.2751 28.2984 32.2854 28.2631 32.2958C28.0821 32.374 27.9011 32.4463 27.7187 32.5142C25.9311 33.2506 20.271 35.4406 17.8801 38.9913L15.9336 37.5451C17.8404 34.4519 22.475 32.7975 28.8884 29.511C35.3003 26.2259 34.4028 18.7983 34.4028 18.7983L34.4072 18.8013C35.3959 21.9093 35.0075 25.4246 33.0463 28.3377C31.831 30.1426 30.1728 31.4678 28.319 32.278V32.2751Z" fill="#E6D8B3"/>
              <path d="M21.168 12.9265C17.2794 14.1913 14.7958 17.2801 15.6197 19.8258C16.4437 22.3715 20.2617 23.409 24.1503 22.1442C28.0375 20.8795 30.5225 17.7892 29.6986 15.245C28.8747 12.6993 25.0566 11.6618 21.168 12.9265Z" fill="#A3A3A3"/>
              <path d="M16.3768 40.327L9.80176 35.8718L9.61316 36.1519L16.1882 40.607L16.3768 40.327Z" fill="#CCCCCC"/>
              <path d="M14.4559 43.1769L7.88574 38.7251L7.69714 39.0051L14.2673 43.457L14.4559 43.1769Z" fill="#CCCCCC"/>
              <path d="M16.2805 40.3759L9.77296 35.9663C9.25653 35.6165 9.12117 34.9126 9.46987 34.3946C9.81857 33.8766 10.5204 33.7408 11.0368 34.0906L17.5444 38.5002C18.0608 38.8499 18.1961 39.5539 17.8474 40.0719C17.4987 40.5899 16.7969 40.7256 16.2805 40.3759Z" fill="#7F55A3"/>
              <path d="M14.4153 43.1376L7.90772 38.728C7.3913 38.3782 7.25594 37.6743 7.60464 37.1563C7.95333 36.6383 8.65514 36.5025 9.17157 36.8523L15.6791 41.2619C16.1955 41.6117 16.3309 42.3156 15.9822 42.8336C15.6335 43.3516 14.9317 43.4874 14.4153 43.1376Z" fill="#7F55A3"/>
              <path d="M8.99692 37.1536C8.70266 37.1108 8.44518 37.2023 8.42164 37.3602C8.3981 37.5166 8.6188 37.679 8.91306 37.7232C9.20732 37.766 9.46479 37.6745 9.48833 37.5166C9.51187 37.3602 9.29118 37.1979 8.99692 37.1536Z" fill="#CCCCCC"/>
              <path d="M10.5204 34.2637C10.2261 34.2209 9.96862 34.3124 9.94508 34.4703C9.92154 34.6267 10.1422 34.7891 10.4365 34.8319C10.7308 34.8747 10.9882 34.7832 11.0118 34.6253C11.0353 34.4688 10.8146 34.3065 10.5204 34.2637Z" fill="#CCCCCC"/>
              <path d="M11.5204 34.6512C11.388 34.632 11.2718 34.6733 11.2615 34.7442C11.2512 34.815 11.3512 34.8888 11.4836 34.908C11.6161 34.9271 11.7323 34.8858 11.7426 34.815C11.7529 34.7442 11.6528 34.6704 11.5204 34.6512Z" fill="#CCCCCC"/>
              <path d="M8.18176 36.964C8.07582 36.9478 7.98313 36.9817 7.9743 37.0378C7.96547 37.0939 8.04492 37.1529 8.15233 37.1692C8.25826 37.1854 8.35095 37.1515 8.35978 37.0954C8.36861 37.0393 8.28916 36.9803 8.18176 36.964Z" fill="#CCCCCC"/>
              <g clipPath="url(#clip0_assessment)">
                <path d="M36.7079 35.1546L33.8369 32.2836C33.6632 32.1099 33.381 32.1099 33.2062 32.2836C33.0315 32.4583 33.0315 32.7405 33.2062 32.9142L36.0782 35.7852C36.2519 35.9589 36.5352 35.9589 36.7089 35.7852C36.8836 35.6105 36.8836 35.3282 36.7089 35.1546H36.7079Z" fill="#F8AB0F"/>
                <path d="M37.0791 27.1901C37.1329 27.2438 37.2011 27.2852 37.2797 27.3059L41.2072 28.3438C41.445 28.4069 41.689 28.2642 41.7531 28.0264C41.8162 27.7887 41.6745 27.5436 41.4367 27.4816L37.5092 26.4436C37.2714 26.3806 37.0264 26.5232 36.9633 26.761C36.9209 26.9202 36.9706 27.0825 37.0791 27.1911V27.1901Z" fill="#F8AB0F"/>
                <path d="M37.4212 18.9827C37.4419 19.0602 37.4822 19.1274 37.536 19.1801C37.6455 19.2897 37.8089 19.3393 37.9691 19.2949L41.8905 18.2238C42.1283 18.1587 42.2689 17.9137 42.2037 17.6759C42.1386 17.4381 41.8936 17.2985 41.6558 17.3637L37.7345 18.4347C37.4967 18.4998 37.3561 18.7449 37.4212 18.9827Z" fill="#F8AB0F"/>
                <path d="M18.9278 7.2954L17.8898 3.36784C17.8268 3.13005 17.5828 2.98738 17.345 3.05148C17.1072 3.11454 16.9646 3.35956 17.0276 3.59735L18.0656 7.52491C18.0863 7.60348 18.1276 7.67172 18.1814 7.72548C18.2899 7.83403 18.4523 7.88365 18.6115 7.84127C18.8492 7.7782 18.9919 7.53422 18.9289 7.2954H18.9278Z" fill="#F8AB0F"/>
                <path d="M29.5362 40.0156L28.4982 36.0881C28.4352 35.8503 28.1912 35.7076 27.9534 35.7717C27.7156 35.8348 27.573 36.0798 27.636 36.3176L28.674 40.2451C28.6947 40.3237 28.735 40.3919 28.7898 40.4457C28.8983 40.5542 29.0606 40.6039 29.2199 40.5615C29.4576 40.4984 29.6003 40.2544 29.5373 40.0156H29.5362Z" fill="#F8AB0F"/>
                <path d="M8.72191 16.8735L4.79434 15.8355C4.55656 15.7724 4.31154 15.9151 4.24848 16.1529C4.20609 16.3121 4.25571 16.4744 4.36427 16.5829C4.41803 16.6367 4.48626 16.677 4.56483 16.6987L8.49239 17.7367C8.73018 17.7998 8.9752 17.6571 9.03826 17.4193C9.10133 17.1815 8.95969 16.9376 8.72191 16.8745V16.8735Z" fill="#F8AB0F"/>
                <path d="M26.0637 6.82836C26.0202 6.98861 26.0688 7.15195 26.1784 7.26154C26.2311 7.31427 26.2983 7.35459 26.3759 7.3763C26.6137 7.44143 26.8587 7.30083 26.9238 7.06304L27.9949 3.14168C28.06 2.9039 27.9194 2.65888 27.6826 2.59478C27.4449 2.52965 27.1998 2.67025 27.1347 2.90804L26.0626 6.8294L26.0637 6.82836Z" fill="#F8AB0F"/>
                <path d="M33.2892 12.0222C33.4629 12.1958 33.7452 12.1958 33.9199 12.0222L36.795 9.14704C36.9687 8.97232 36.9697 8.69111 36.795 8.51639C36.6203 8.34167 36.338 8.34271 36.1644 8.51639L33.2892 11.3915C33.1145 11.5652 33.1145 11.8485 33.2892 12.0222Z" fill="#F8AB0F"/>
                <path d="M13.3892 12.4576C13.5639 12.2829 13.5639 12.0007 13.3892 11.827L10.5172 8.95497C10.3435 8.78129 10.0612 8.78129 9.88651 8.95497C9.71283 9.12969 9.71179 9.41193 9.88651 9.58561L12.7585 12.4576C12.9322 12.6313 13.2144 12.6313 13.3892 12.4576Z" fill="#F8AB0F"/>
              </g>
              <defs>
                <clipPath id="clip0_assessment">
                  <rect width="39.0182" height="39.0182" fill="white" transform="translate(3.71582 2.06665)"/>
                </clipPath>
              </defs>
            </svg>
          ) : isScorm && item.thumbColor ? (
            <div className="content-card-thumb-photo" style={{ background: item.thumbColor }} />
          ) : (
            <div className="content-card-thumb-photo">
              <div className="content-card-thumb-tag">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1.75C4.1 1.75 1.75 4.1 1.75 7C1.75 9.9 4.1 12.25 7 12.25C9.9 12.25 12.25 9.9 12.25 7C12.25 4.1 9.9 1.75 7 1.75ZM9.1 7.35L6.3 9.1C6.05 9.25 5.75 9.075 5.75 8.75V5.25C5.75 4.925 6.05 4.75 6.3 4.9L9.1 6.65C9.35 6.8 9.35 7.2 9.1 7.35Z" fill="var(--neutral-800)" />
                </svg>
              </div>
            </div>
          )}
        </div>
        <div className="content-card-info">
          <div className="content-card-title-row">
            <h4 className="content-card-title">{item.title}</h4>
            <span className="content-card-badge">{item.type}</span>
          </div>
          <div className="content-card-meta">
            <span>{item.metadata}</span>
            {item.showEditIcon && (
              <Edit2 size={16} color="var(--neutral-500)" variant="Linear" />
            )}
          </div>
        </div>
      </div>
      <button className="content-card-trash" aria-label="Delete" onClick={onDelete}>
        <Trash size={20} color="var(--neutral-400)" variant="Linear" />
      </button>
    </div>
  )
}

function itemKey(item: ContentItem) {
  return `${item.type}-${item.id}`
}

interface ContentListProps {
  extraItems?: ContentItem[]
  onDeleteExtra?: (id: number) => void
}

function ContentList({ extraItems = [], onDeleteExtra }: ContentListProps) {
  const [orderedItems, setOrderedItems] = useState<ContentItem[]>(defaultItems)
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [dropIndex, setDropIndex] = useState<number | null>(null)
  const prevExtraRef = useRef<string>('')

  // Sync extraItems into orderedItems when they change
  useEffect(() => {
    const extraKey = extraItems.map(itemKey).join(',')
    if (extraKey === prevExtraRef.current) return
    prevExtraRef.current = extraKey

    setOrderedItems(prev => {
      const extraKeys = new Set(extraItems.map(itemKey))
      // Remove SCORM items that are no longer in extraItems
      const filtered = prev.filter(
        item => item.type !== 'SCORM' || extraKeys.has(itemKey(item))
      )
      // Add new extra items not yet in the list
      const existingKeys = new Set(filtered.map(itemKey))
      const newItems = extraItems.filter(item => !existingKeys.has(itemKey(item)))
      return [...filtered, ...newItems]
    })
  }, [extraItems])

  const handleDragStart = (index: number) => {
    setDragIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (dragIndex === null || index === dragIndex) {
      setDropIndex(null)
      return
    }
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const midY = rect.top + rect.height / 2
    const target = e.clientY < midY ? index : index + 1
    setDropIndex(target === dragIndex || target === dragIndex + 1 ? null : target)
  }

  const handleDrop = () => {
    if (dragIndex === null || dropIndex === null) return
    setOrderedItems(prev => {
      const next = [...prev]
      const [dragged] = next.splice(dragIndex, 1)
      const insertAt = dropIndex > dragIndex ? dropIndex - 1 : dropIndex
      next.splice(insertAt, 0, dragged)
      return next
    })
    setDragIndex(null)
    setDropIndex(null)
  }

  const handleDragEnd = () => {
    setDragIndex(null)
    setDropIndex(null)
  }

  const isExtra = (item: ContentItem) =>
    extraItems.some(e => e.id === item.id && e.type === item.type)

  return (
    <section
      className="content-list"
      onDragOver={(e) => e.preventDefault()}
    >
      {orderedItems.map((item, index) => (
        <ContentCard
          key={itemKey(item)}
          item={item}
          index={index}
          onDelete={isExtra(item) ? () => onDeleteExtra?.(item.id) : undefined}
          dragIndex={dragIndex}
          dropIndex={dropIndex}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onDrop={handleDrop}
        />
      ))}
    </section>
  )
}

export default ContentList

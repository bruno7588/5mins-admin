import type { ContentRow } from '../pages/your-courses/components/ContentTable/ContentTable'

const KEY = '5mins.addedLessons'

export function readAddedLessons(): ContentRow[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as ContentRow[]) : []
  } catch {
    return []
  }
}

export function appendAddedLesson(lesson: ContentRow): void {
  const existing = readAddedLessons()
  localStorage.setItem(KEY, JSON.stringify([lesson, ...existing]))
}

export function updateAddedLesson(id: number, patch: Partial<ContentRow>): ContentRow[] {
  const existing = readAddedLessons()
  const next = existing.map(l => (l.id === id ? { ...l, ...patch } : l))
  localStorage.setItem(KEY, JSON.stringify(next))
  return next
}

export function removeAddedLesson(id: number): ContentRow[] {
  const existing = readAddedLessons()
  const next = existing.filter(l => l.id !== id)
  localStorage.setItem(KEY, JSON.stringify(next))
  return next
}

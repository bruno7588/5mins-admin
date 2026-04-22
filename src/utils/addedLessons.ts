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

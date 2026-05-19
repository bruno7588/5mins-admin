export interface WorkspaceCourse {
  id: string
  title: string
  thumbnailGradient: string
  /** 0..100 — used to fill the segmented progress bar */
  progress: number
  lessonCount: number
  durationMinutes: number
  /** e.g. "Due on Aug 20" — when present, renders the floating warning pill */
  dueLabel?: string
  /** Overhang "New" badge on top-left of the card */
  isNew?: boolean
}

export const workspaceCourses: WorkspaceCourse[] = [
  {
    id: 'c1',
    title: 'Leadership that Drives Innovation',
    thumbnailGradient: 'linear-gradient(135deg, #7c3aed, #a855f7)',
    progress: 100,
    lessonCount: 11,
    durationMinutes: 29,
  },
  {
    id: 'c2',
    title: 'My first playlist as a Manager',
    thumbnailGradient: 'linear-gradient(135deg, #0f172a, #1e293b)',
    progress: 40,
    lessonCount: 2,
    durationMinutes: 5,
    dueLabel: 'Due on Aug 20',
    isNew: true,
  },
  {
    id: 'c3',
    title: 'GDPR Essentials (Global)',
    thumbnailGradient: 'linear-gradient(135deg, #38bdf8, #6366f1)',
    progress: 25,
    lessonCount: 7,
    durationMinutes: 17,
    dueLabel: 'Due on Aug 20',
  },
  {
    id: 'c4',
    title: 'Personality-Driven Leadership: Leveraging Individual Strengths for Team Success',
    thumbnailGradient: 'linear-gradient(135deg, #f97316, #ef4444)',
    progress: 0,
    lessonCount: 8,
    durationMinutes: 33,
  },
  {
    id: 'c5',
    title: 'Customer Conversations: Building Stronger Relationships',
    thumbnailGradient: 'linear-gradient(135deg, #14b8a6, #06b6d4)',
    progress: 60,
    lessonCount: 9,
    durationMinutes: 38,
  },
]

export interface WorkspaceCategory {
  id: string
  name: string
  thumbnailGradient: string
  courseCount: number
  lessonCount: number
}

export const workspaceCategories: WorkspaceCategory[] = [
  {
    id: 'cat1',
    name: 'Leadership Training',
    thumbnailGradient: 'linear-gradient(135deg, #a855f7, #6366f1)',
    courseCount: 12,
    lessonCount: 84,
  },
  {
    id: 'cat2',
    name: 'New Joiner Collection',
    thumbnailGradient: 'linear-gradient(135deg, #f97316, #fbbf24)',
    courseCount: 8,
    lessonCount: 41,
  },
  {
    id: 'cat3',
    name: 'Compliance & Security',
    thumbnailGradient: 'linear-gradient(135deg, #14b8a6, #0ea5e9)',
    courseCount: 15,
    lessonCount: 67,
  },
  {
    id: 'cat4',
    name: 'Product Updates',
    thumbnailGradient: 'linear-gradient(135deg, #0f172a, #334155)',
    courseCount: 6,
    lessonCount: 22,
  },
]

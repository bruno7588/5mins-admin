/**
 * Mock 5Mins course catalogue for the Add-Courses drawer.
 *
 * Two browse axes mirror the live product: **Functions** (business academies) and
 * **Skills** (Soft / Life / Tools). The headline `count` on each category is the
 * catalogue size shown on the browse tile; the detail view renders the sample
 * courses we actually carry here (a prototype subset), filtered by tag.
 */

import thumb1 from '../../assets/programs/course-thumbs/course-thumb-1.jpg'
import thumb2 from '../../assets/programs/course-thumbs/course-thumb-2.jpg'
import thumb3 from '../../assets/programs/course-thumbs/course-thumb-3.jpg'
import thumb4 from '../../assets/programs/course-thumbs/course-thumb-4.jpg'
import thumb5 from '../../assets/programs/course-thumbs/course-thumb-5.jpg'
import thumb6 from '../../assets/programs/course-thumbs/course-thumb-6.jpg'
import thumb7 from '../../assets/programs/course-thumbs/course-thumb-7.jpg'
import thumb8 from '../../assets/programs/course-thumbs/course-thumb-8.jpg'
import thumb9 from '../../assets/programs/course-thumbs/course-thumb-9.jpg'

const THUMBS = [thumb1, thumb2, thumb3, thumb4, thumb5, thumb6, thumb7, thumb8, thumb9]

export interface CatalogCourse {
  courseId: string
  title: string
  durationMinutes: number
  lessonCount: number
  /** Photorealistic course thumbnail image URL. */
  thumb: string
  /** Which tab the course lives under. */
  source: 'yours' | '5mins'
  /** Function academies this course belongs to (a course can serve several). */
  functionIds?: string[]
  /** Skill bucket (soft / life / tools). */
  skillId?: string
  /** Sub-skill chips within a skill bucket. */
  subSkills?: string[]
}

/* ── Filter options (5Mins tab) ──────────────────────────────────────────── */

export interface FilterOption {
  value: string
  label: string
}

export const FUNCTION_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'All functions' },
  { value: 'compliance', label: 'Compliance' },
  { value: 'leadership', label: 'Leadership' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'dynamic', label: 'Dynamic' },
  { value: 'sales', label: 'Sales' },
  { value: 'product', label: 'Product' },
  { value: 'people', label: 'People' },
  { value: 'customer-success', label: 'Customer Success' },
  { value: 'customer-service', label: 'Customer Service' },
  { value: 'operations', label: 'Operations & Strategy' },
  { value: 'contact-centre', label: 'Contact Centre' },
  { value: 'partnerships', label: 'Partnerships' },
  { value: 'creative', label: 'Creative' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'finance', label: 'Finance' },
  { value: 'it-security', label: 'IT, Networking & Security' },
  { value: 'revops', label: 'RevOps' },
  { value: 'general-admin', label: 'General Admin' },
  { value: 'logistics', label: 'Logistics and Supply Chain' },
]

export const SKILL_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'All skills' },
  { value: 'soft', label: 'Soft skills' },
  { value: 'life', label: 'Life skills' },
  { value: 'tools', label: 'Tools' },
]

/* ── Course pool ─────────────────────────────────────────────────────────── */

const G = {
  pink: 'linear-gradient(135deg, #f472b6, #ec4899)',
  blue: 'linear-gradient(135deg, #4a90d9, #7b68ee)',
  teal: 'linear-gradient(135deg, #06b6d4, #22d3ee)',
  orange: 'linear-gradient(135deg, #f97316, #ef4444)',
  green: 'linear-gradient(135deg, #34d399, #10b981)',
  purple: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
  amber: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
  slate: 'linear-gradient(135deg, #64748b, #334155)',
}

const RAW_COURSES: CatalogCourse[] = [
  // ── Your Courses (the org's own content) ──
  { courseId: 'y1', title: 'Master Coaching Strategies for Optimal Performance', durationMinutes: 34, lessonCount: 12, thumb: G.blue, source: 'yours' },
  { courseId: 'y2', title: 'Mastering Feedback — Practical Models and Techniques', durationMinutes: 21, lessonCount: 9, thumb: G.green, source: 'yours' },
  { courseId: 'y3', title: 'Leadership That Drives Innovation', durationMinutes: 48, lessonCount: 17, thumb: G.purple, source: 'yours' },
  { courseId: 'y4', title: 'Listen to Lead: The Power of Listening', durationMinutes: 15, lessonCount: 6, thumb: G.teal, source: 'yours' },
  { courseId: 'y5', title: 'Onboarding Essentials for New Hires', durationMinutes: 18, lessonCount: 5, thumb: G.amber, source: 'yours' },

  // ── Soft skills ──
  { courseId: 's1', title: 'A Guide to Delivering Virtual Presentations', durationMinutes: 10, lessonCount: 4, thumb: G.pink, source: '5mins', skillId: 'soft', subSkills: ['Communication'] },
  { courseId: 's2', title: 'Developing EQ', durationMinutes: 16, lessonCount: 3, thumb: G.blue, source: '5mins', skillId: 'soft', subSkills: ['Emotional Intelligence'] },
  { courseId: 's3', title: 'Handling Difficult Customers with Confidence', durationMinutes: 29, lessonCount: 4, thumb: G.orange, source: '5mins', skillId: 'soft', subSkills: ['Communication', 'Emotional Intelligence'], functionIds: ['customer-service', 'contact-centre'] },
  { courseId: 's4', title: 'Making Your Message Land with Stakeholders & Clients', durationMinutes: 30, lessonCount: 5, thumb: G.teal, source: '5mins', skillId: 'soft', subSkills: ['Communication'] },
  { courseId: 's5', title: 'The Complete Communication Toolkit', durationMinutes: 34, lessonCount: 7, thumb: G.purple, source: '5mins', skillId: 'soft', subSkills: ['Communication'] },
  { courseId: 's6', title: 'Communication for Influence: How to Win Minds and Hearts', durationMinutes: 15, lessonCount: 5, thumb: G.pink, source: '5mins', skillId: 'soft', subSkills: ['Ability to Motivate', 'Communication'] },
  { courseId: 's7', title: 'Influence from the Bottom Up', durationMinutes: 30, lessonCount: 5, thumb: G.green, source: '5mins', skillId: 'soft', subSkills: ['Ability to Motivate'] },
  { courseId: 's8', title: 'How to Influence Without Authority', durationMinutes: 26, lessonCount: 6, thumb: G.slate, source: '5mins', skillId: 'soft', subSkills: ['Ability to Motivate'] },
  { courseId: 's9', title: 'Find Better Solutions with Problem-Solving', durationMinutes: 31, lessonCount: 6, thumb: G.amber, source: '5mins', skillId: 'soft', subSkills: ['Critical & Analytical Thinking', 'Decision Making'] },
  { courseId: 's10', title: 'Setting Team Direction: From Vision to Victory', durationMinutes: 46, lessonCount: 9, thumb: G.blue, source: '5mins', skillId: 'soft', subSkills: ['Strategic Thinking'], functionIds: ['leadership'] },
  { courseId: 's11', title: "Creating a Positive Working Environment: A Leader's Guide", durationMinutes: 43, lessonCount: 10, thumb: G.purple, source: '5mins', skillId: 'soft', subSkills: ['Teamwork & Collaboration'], functionIds: ['leadership', 'people'] },
  { courseId: 's12', title: 'Get Decision Buy-In from Stakeholders', durationMinutes: 22, lessonCount: 6, thumb: G.teal, source: '5mins', skillId: 'soft', subSkills: ['Decision Making'] },

  // ── Compliance ──
  { courseId: 'c1', title: 'Unfair, Deceptive, Or Abusive Acts Or Practices (UDAAP) (Global)', durationMinutes: 24, lessonCount: 5, thumb: G.slate, source: '5mins', functionIds: ['compliance'] },
  { courseId: 'c2', title: 'A Guide to Workplace Professionalism (Global)', durationMinutes: 10, lessonCount: 4, thumb: G.green, source: '5mins', functionIds: ['compliance', 'general-admin', 'people'] },
  { courseId: 'c3', title: 'Markets in Crypto-Assets Regulation (MiCA) (EU)', durationMinutes: 25, lessonCount: 6, thumb: G.blue, source: '5mins', functionIds: ['compliance', 'finance'] },
  { courseId: 'c4', title: 'FCA Appointed Representatives Responsibilities (UK)', durationMinutes: 23, lessonCount: 5, thumb: G.purple, source: '5mins', functionIds: ['compliance', 'finance'] },
  { courseId: 'c5', title: 'Operational Risk (UK)', durationMinutes: 23, lessonCount: 5, thumb: G.amber, source: '5mins', functionIds: ['compliance', 'operations'] },
  { courseId: 'c6', title: 'Risk Appetite (UK)', durationMinutes: 19, lessonCount: 5, thumb: G.orange, source: '5mins', functionIds: ['compliance'] },
  { courseId: 'c7', title: 'Alcohol Licensing (Scotland)', durationMinutes: 120, lessonCount: 21, thumb: G.pink, source: '5mins', functionIds: ['compliance'] },
  { courseId: 'c8', title: 'Anti-Tax Evasion (Global)', durationMinutes: 24, lessonCount: 5, thumb: G.teal, source: '5mins', functionIds: ['compliance', 'finance'] },
  { courseId: 'c9', title: 'Food Allergies (EU)', durationMinutes: 13, lessonCount: 6, thumb: G.green, source: '5mins', functionIds: ['compliance'] },
  { courseId: 'c10', title: 'Abrasive Wheels (UK)', durationMinutes: 26, lessonCount: 6, thumb: G.slate, source: '5mins', functionIds: ['compliance'] },

  // ── Sales / Marketing / RevOps ──
  { courseId: 'sa1', title: 'Consultative Selling Fundamentals', durationMinutes: 28, lessonCount: 6, thumb: G.orange, source: '5mins', functionIds: ['sales', 'revops'] },
  { courseId: 'sa2', title: 'Handling Objections with Confidence', durationMinutes: 21, lessonCount: 5, thumb: G.amber, source: '5mins', functionIds: ['sales'] },
  { courseId: 'sa3', title: 'Building a Repeatable Sales Pipeline', durationMinutes: 33, lessonCount: 7, thumb: G.blue, source: '5mins', functionIds: ['sales', 'revops'] },
  { courseId: 'm1', title: 'Positioning & Messaging That Converts', durationMinutes: 27, lessonCount: 6, thumb: G.pink, source: '5mins', functionIds: ['marketing'] },
  { courseId: 'm2', title: 'Demand Generation Essentials', durationMinutes: 24, lessonCount: 5, thumb: G.purple, source: '5mins', functionIds: ['marketing', 'revops'] },

  // ── Leadership / People / Product ──
  { courseId: 'l1', title: 'Coaching for Performance', durationMinutes: 30, lessonCount: 7, thumb: G.teal, source: '5mins', functionIds: ['leadership', 'people'] },
  { courseId: 'l2', title: 'Difficult Conversations for Managers', durationMinutes: 22, lessonCount: 5, thumb: G.green, source: '5mins', functionIds: ['leadership', 'people'] },
  { courseId: 'p1', title: 'Discovery & Customer Interviews', durationMinutes: 26, lessonCount: 6, thumb: G.blue, source: '5mins', functionIds: ['product'] },
  { courseId: 'p2', title: 'Prioritisation Frameworks for PMs', durationMinutes: 19, lessonCount: 4, thumb: G.amber, source: '5mins', functionIds: ['product'] },

  // ── Life skills / Tools ──
  { courseId: 'li1', title: 'Beating Procrastination', durationMinutes: 14, lessonCount: 4, thumb: G.pink, source: '5mins', skillId: 'life' },
  { courseId: 'li2', title: 'Managing Stress at Work', durationMinutes: 18, lessonCount: 5, thumb: G.green, source: '5mins', skillId: 'life' },
  { courseId: 'li3', title: 'Building Better Habits', durationMinutes: 16, lessonCount: 4, thumb: G.teal, source: '5mins', skillId: 'life' },
  { courseId: 't1', title: 'Getting Started with Excel', durationMinutes: 32, lessonCount: 8, thumb: G.slate, source: '5mins', skillId: 'tools' },
  { courseId: 't2', title: 'Productivity with Notion', durationMinutes: 21, lessonCount: 5, thumb: G.purple, source: '5mins', skillId: 'tools' },
  { courseId: 't3', title: 'Prompting AI Tools Effectively', durationMinutes: 17, lessonCount: 4, thumb: G.blue, source: '5mins', skillId: 'tools', functionIds: ['it-security'] },
]

/** Catalogue with photorealistic thumbnails assigned (cycled across the pool for variety). */
export const CATALOG_COURSES: CatalogCourse[] = RAW_COURSES.map((c, i) => ({
  ...c,
  thumb: THUMBS[i % THUMBS.length],
}))

/* ── Helpers ─────────────────────────────────────────────────────────────── */

export function getCatalogCourse(courseId: string): CatalogCourse | undefined {
  return CATALOG_COURSES.find((c) => c.courseId === courseId)
}

export const yourCourses = (): CatalogCourse[] => CATALOG_COURSES.filter((c) => c.source === 'yours')

export const fiveMinsCourses = (): CatalogCourse[] => CATALOG_COURSES.filter((c) => c.source === '5mins')

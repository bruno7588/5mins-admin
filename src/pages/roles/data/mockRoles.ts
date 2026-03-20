/* ─── Types ─────────────────────────────────────────────── */

export interface Skill {
  id: number
  name: string
  category: string
}

export interface FiveMinsRole {
  id: number
  name: string
  category: string
  description: string
  skills: Skill[]
  industries: string[]
  leadership: boolean
  assignedCount: number
}

export interface CompanyRole {
  id: number
  name: string
  leadership: boolean
  skills: Skill[]
  employeeCount: number
}

/* ─── Skill Catalogue (~40 skills) ─────────────────────── */

export const skillCatalogue: Skill[] = [
  // Sales
  { id: 1, name: 'Consultative Selling', category: 'Sales' },
  { id: 2, name: 'Pipeline Management', category: 'Sales' },
  { id: 3, name: 'Objection Handling', category: 'Sales' },
  { id: 4, name: 'Negotiation', category: 'Sales' },
  { id: 5, name: 'CRM Proficiency', category: 'Sales' },
  { id: 6, name: 'Account Management', category: 'Sales' },

  // Hospitality
  { id: 7, name: 'Guest Relations', category: 'Hospitality' },
  { id: 8, name: 'Conflict Resolution', category: 'Hospitality' },
  { id: 9, name: 'Service Excellence', category: 'Hospitality' },
  { id: 10, name: 'Front Desk Operations', category: 'Hospitality' },
  { id: 11, name: 'Food Safety & Hygiene', category: 'Hospitality' },

  // Finance
  { id: 12, name: 'Financial Analysis', category: 'Finance' },
  { id: 13, name: 'Budgeting & Forecasting', category: 'Finance' },
  { id: 14, name: 'Risk Assessment', category: 'Finance' },
  { id: 15, name: 'Regulatory Compliance', category: 'Finance' },
  { id: 16, name: 'Financial Reporting', category: 'Finance' },
  { id: 17, name: 'Tax Planning', category: 'Finance' },

  // Technology
  { id: 18, name: 'Agile Methodology', category: 'Technology' },
  { id: 19, name: 'System Architecture', category: 'Technology' },
  { id: 20, name: 'Code Review', category: 'Technology' },
  { id: 21, name: 'DevOps Practices', category: 'Technology' },
  { id: 22, name: 'Cloud Infrastructure', category: 'Technology' },
  { id: 23, name: 'Data Modelling', category: 'Technology' },

  // Marketing
  { id: 24, name: 'Content Strategy', category: 'Marketing' },
  { id: 25, name: 'SEO & SEM', category: 'Marketing' },
  { id: 26, name: 'Brand Management', category: 'Marketing' },
  { id: 27, name: 'Campaign Analytics', category: 'Marketing' },
  { id: 28, name: 'Social Media Management', category: 'Marketing' },
  { id: 29, name: 'Marketing Automation', category: 'Marketing' },

  // HR
  { id: 30, name: 'Talent Acquisition', category: 'HR' },
  { id: 31, name: 'Employee Engagement', category: 'HR' },
  { id: 32, name: 'Performance Management', category: 'HR' },
  { id: 33, name: 'Learning & Development', category: 'HR' },
  { id: 34, name: 'Compensation & Benefits', category: 'HR' },
  { id: 35, name: 'HR Compliance', category: 'HR' },

  // Analytics
  { id: 36, name: 'Data Visualisation', category: 'Analytics' },
  { id: 37, name: 'Statistical Analysis', category: 'Analytics' },
  { id: 38, name: 'SQL & Databases', category: 'Analytics' },
  { id: 39, name: 'Business Intelligence', category: 'Analytics' },
  { id: 40, name: 'Predictive Modelling', category: 'Analytics' },

  // Leadership (cross-cutting)
  { id: 41, name: 'Team Leadership', category: 'Leadership' },
  { id: 42, name: 'Coaching & Mentoring', category: 'Leadership' },
  { id: 43, name: 'Strategic Planning', category: 'Leadership' },
  { id: 44, name: 'Change Management', category: 'Leadership' },
  { id: 45, name: 'Stakeholder Management', category: 'Leadership' },
]

const s = (id: number) => skillCatalogue.find(sk => sk.id === id)!

/* ─── 5Mins Role Library (18 roles, 7 categories) ─────── */

export const fiveMinsRoles: FiveMinsRole[] = [
  // Sales
  {
    id: 1,
    name: 'Sales Development Rep',
    category: 'Sales',
    description: 'Responsible for outbound prospecting, qualifying leads, and booking meetings for account executives. Focuses on pipeline generation and early-stage discovery.',
    skills: [s(1), s(2), s(3), s(5)],
    industries: ['SaaS', 'B2B Services', 'FinTech'],
    leadership: false,
    assignedCount: 12,
  },
  {
    id: 2,
    name: 'Account Executive',
    category: 'Sales',
    description: 'Owns the full sales cycle from discovery to close. Manages complex deals, builds client relationships, and drives revenue targets.',
    skills: [s(1), s(2), s(3), s(4), s(5), s(6)],
    industries: ['SaaS', 'Enterprise Software', 'Professional Services'],
    leadership: false,
    assignedCount: 8,
  },
  {
    id: 3,
    name: 'Sales Manager',
    category: 'Sales',
    description: 'Leads a team of sales representatives, sets targets, coaches reps on deals, and drives team performance against quota.',
    skills: [s(1), s(4), s(6), s(41), s(42), s(43)],
    industries: ['SaaS', 'Retail', 'Financial Services'],
    leadership: true,
    assignedCount: 3,
  },

  // Hospitality
  {
    id: 4,
    name: 'Front Desk Agent',
    category: 'Hospitality',
    description: 'First point of contact for guests. Handles check-in/check-out, reservations, and guest inquiries with a focus on delivering exceptional service.',
    skills: [s(7), s(8), s(9), s(10)],
    industries: ['Hotels', 'Resorts', 'Serviced Apartments'],
    leadership: false,
    assignedCount: 0,
  },
  {
    id: 5,
    name: 'Restaurant Supervisor',
    category: 'Hospitality',
    description: 'Oversees daily restaurant operations, manages front-of-house staff, ensures food safety standards, and maintains guest satisfaction.',
    skills: [s(7), s(8), s(9), s(11), s(41), s(42)],
    industries: ['Restaurants', 'Hotels', 'Catering'],
    leadership: true,
    assignedCount: 5,
  },
  {
    id: 6,
    name: 'Hotel General Manager',
    category: 'Hospitality',
    description: 'Responsible for the overall operation of a hotel property including revenue, guest satisfaction, staff management, and strategic positioning.',
    skills: [s(7), s(9), s(41), s(42), s(43), s(44), s(45)],
    industries: ['Hotels', 'Resorts', 'Hospitality Groups'],
    leadership: true,
    assignedCount: 0,
  },

  // Finance
  {
    id: 7,
    name: 'Financial Analyst',
    category: 'Finance',
    description: 'Analyses financial data, builds models, and provides insights to support business decisions. Prepares reports and forecasts for stakeholders.',
    skills: [s(12), s(13), s(16)],
    industries: ['Banking', 'Insurance', 'Corporate Finance'],
    leadership: false,
    assignedCount: 6,
  },
  {
    id: 8,
    name: 'Compliance Officer',
    category: 'Finance',
    description: 'Ensures the organisation meets all regulatory requirements. Develops compliance frameworks, conducts audits, and manages risk.',
    skills: [s(14), s(15), s(16)],
    industries: ['Banking', 'Insurance', 'FinTech'],
    leadership: false,
    assignedCount: 0,
  },
  {
    id: 9,
    name: 'Finance Director',
    category: 'Finance',
    description: 'Leads the finance function, overseeing budgets, financial planning, regulatory reporting, and long-term financial strategy.',
    skills: [s(12), s(13), s(14), s(15), s(16), s(17), s(41), s(43), s(45)],
    industries: ['All Industries'],
    leadership: true,
    assignedCount: 2,
  },

  // Technology
  {
    id: 10,
    name: 'Software Engineer',
    category: 'Technology',
    description: 'Designs, builds, and maintains software applications. Participates in code reviews, writes tests, and collaborates with cross-functional teams.',
    skills: [s(18), s(20), s(21), s(23)],
    industries: ['SaaS', 'FinTech', 'E-commerce'],
    leadership: false,
    assignedCount: 15,
  },
  {
    id: 11,
    name: 'Engineering Manager',
    category: 'Technology',
    description: 'Manages a team of engineers, drives technical strategy, removes blockers, and balances delivery with engineering excellence.',
    skills: [s(18), s(19), s(20), s(21), s(41), s(42), s(43)],
    industries: ['SaaS', 'Technology', 'FinTech'],
    leadership: true,
    assignedCount: 4,
  },
  {
    id: 12,
    name: 'Cloud Solutions Architect',
    category: 'Technology',
    description: 'Designs cloud infrastructure, defines architecture patterns, and guides teams on best practices for scalable and resilient systems.',
    skills: [s(19), s(21), s(22), s(23)],
    industries: ['Cloud Services', 'Enterprise IT', 'SaaS'],
    leadership: false,
    assignedCount: 0,
  },

  // Marketing
  {
    id: 13,
    name: 'Content Marketing Manager',
    category: 'Marketing',
    description: 'Develops and executes content strategy across channels. Creates compelling narratives, manages editorial calendars, and measures content performance.',
    skills: [s(24), s(25), s(26), s(27), s(28)],
    industries: ['SaaS', 'E-commerce', 'Media'],
    leadership: false,
    assignedCount: 3,
  },
  {
    id: 14,
    name: 'Head of Marketing',
    category: 'Marketing',
    description: 'Leads the marketing department, sets strategy, manages budgets, and drives brand awareness and lead generation across all channels.',
    skills: [s(24), s(26), s(27), s(29), s(41), s(43), s(45)],
    industries: ['All Industries'],
    leadership: true,
    assignedCount: 1,
  },

  // HR
  {
    id: 15,
    name: 'Recruiter',
    category: 'HR',
    description: 'Sources, screens, and hires talent. Manages the candidate pipeline, conducts interviews, and partners with hiring managers on workforce planning.',
    skills: [s(30), s(31)],
    industries: ['All Industries'],
    leadership: false,
    assignedCount: 7,
  },
  {
    id: 16,
    name: 'HR Business Partner',
    category: 'HR',
    description: 'Partners with business leaders to align people strategy with organisational goals. Advises on performance, engagement, and organisational design.',
    skills: [s(30), s(31), s(32), s(33), s(34), s(35)],
    industries: ['All Industries'],
    leadership: false,
    assignedCount: 4,
  },
  {
    id: 17,
    name: 'L&D Manager',
    category: 'HR',
    description: 'Designs and delivers learning programmes, manages training budgets, and measures the impact of development initiatives on business outcomes.',
    skills: [s(31), s(32), s(33), s(41), s(42)],
    industries: ['All Industries'],
    leadership: true,
    assignedCount: 2,
  },

  // Analytics
  {
    id: 18,
    name: 'Data Analyst',
    category: 'Analytics',
    description: 'Collects, cleans, and interprets data to generate actionable insights. Builds dashboards, writes queries, and presents findings to stakeholders.',
    skills: [s(36), s(37), s(38), s(39)],
    industries: ['SaaS', 'Retail', 'Financial Services'],
    leadership: false,
    assignedCount: 9,
  },
]

/* ─── Company Roles (starts empty) ─────────────────────── */

export const initialCompanyRoles: CompanyRole[] = []

/* ─── Categories ───────────────────────────────────────── */

export const roleCategories = [
  'All',
  'Sales',
  'Hospitality',
  'Finance',
  'Technology',
  'Marketing',
  'HR',
  'Analytics',
] as const

export type RoleCategory = (typeof roleCategories)[number]

/* ─── AI Suggestion Simulator ──────────────────────────── */

export function simulateAISuggestion(
  roleName: string,
  _description: string,
  _jobDescription: string,
  isLeadership: boolean,
): Promise<Skill[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      // Pick skills loosely based on role name keywords
      const name = roleName.toLowerCase()
      let pool: Skill[] = []

      if (name.includes('sales') || name.includes('account') || name.includes('business dev'))
        pool = skillCatalogue.filter(sk => sk.category === 'Sales')
      else if (name.includes('hotel') || name.includes('hospitality') || name.includes('restaurant') || name.includes('guest'))
        pool = skillCatalogue.filter(sk => sk.category === 'Hospitality')
      else if (name.includes('financ') || name.includes('account') || name.includes('compliance') || name.includes('tax'))
        pool = skillCatalogue.filter(sk => sk.category === 'Finance')
      else if (name.includes('engineer') || name.includes('developer') || name.includes('architect') || name.includes('devops'))
        pool = skillCatalogue.filter(sk => sk.category === 'Technology')
      else if (name.includes('market') || name.includes('content') || name.includes('brand') || name.includes('seo'))
        pool = skillCatalogue.filter(sk => sk.category === 'Marketing')
      else if (name.includes('hr') || name.includes('recruit') || name.includes('people') || name.includes('talent'))
        pool = skillCatalogue.filter(sk => sk.category === 'HR')
      else if (name.includes('data') || name.includes('analyst') || name.includes('analytics') || name.includes('bi'))
        pool = skillCatalogue.filter(sk => sk.category === 'Analytics')
      else {
        // Grab a mixed bag
        pool = [...skillCatalogue].sort(() => Math.random() - 0.5).slice(0, 12)
      }

      // Add leadership skills if flagged
      if (isLeadership) {
        const leadershipSkills = skillCatalogue.filter(sk => sk.category === 'Leadership')
        pool = [...pool, ...leadershipSkills]
      }

      // Deduplicate and cap at 8–15
      const unique = [...new Map(pool.map(sk => [sk.id, sk])).values()]
      const count = Math.min(unique.length, 8 + Math.floor(Math.random() * 8))
      const shuffled = unique.sort(() => Math.random() - 0.5).slice(0, count)

      resolve(shuffled)
    }, 2000)
  })
}

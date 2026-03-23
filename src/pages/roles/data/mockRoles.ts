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

/* ─── 5Mins Role Library (19 functions) ────────────────── */

export const fiveMinsRoles: FiveMinsRole[] = [
  // ── Compliance ──────────────────────────────────────────
  { id: 1, name: 'Legal Counsel', category: 'Compliance', description: 'Provides legal advice across corporate matters, contracts, and regulatory issues.', skills: [s(15), s(14), s(4), s(45)], industries: ['Financial Services', 'Technology', 'Healthcare'], leadership: false, assignedCount: 4 },
  { id: 2, name: 'Compliance Manager', category: 'Compliance', description: 'Develops and manages compliance programmes to ensure adherence to regulations and internal policies.', skills: [s(15), s(14), s(41), s(42)], industries: ['Banking', 'Insurance', 'FinTech'], leadership: true, assignedCount: 7 },
  { id: 3, name: 'Legal Executive', category: 'Compliance', description: 'Handles day-to-day legal operations including contract review and dispute resolution.', skills: [s(15), s(4), s(45)], industries: ['Professional Services', 'Corporate'], leadership: false, assignedCount: 3 },
  { id: 4, name: 'Risk and Compliance Officer', category: 'Compliance', description: 'Identifies, assesses, and mitigates organisational risks while ensuring regulatory compliance.', skills: [s(14), s(15), s(12)], industries: ['Banking', 'Insurance', 'FinTech'], leadership: false, assignedCount: 5 },
  { id: 5, name: 'Credit Risk Manager', category: 'Compliance', description: 'Manages credit risk frameworks, assesses lending exposures, and drives risk mitigation strategies.', skills: [s(14), s(12), s(13), s(41)], industries: ['Banking', 'Financial Services'], leadership: true, assignedCount: 2 },
  { id: 6, name: 'Regulatory Compliance Specialist', category: 'Compliance', description: 'Monitors regulatory changes and ensures the organisation adapts policies and procedures accordingly.', skills: [s(15), s(14)], industries: ['Banking', 'Pharmaceuticals', 'Healthcare'], leadership: false, assignedCount: 6 },
  { id: 7, name: 'Lead Legal Counsel', category: 'Compliance', description: 'Leads legal strategy and oversees a team of legal professionals across the organisation.', skills: [s(15), s(14), s(4), s(41), s(43)], industries: ['Corporate', 'Technology'], leadership: true, assignedCount: 1 },
  { id: 8, name: 'Compliance and Risk Manager', category: 'Compliance', description: 'Oversees both compliance and enterprise risk management functions, reporting to senior leadership.', skills: [s(14), s(15), s(41), s(43), s(45)], industries: ['Financial Services', 'Insurance'], leadership: true, assignedCount: 3 },
  { id: 9, name: 'Chief Risk & Compliance Officer', category: 'Compliance', description: 'Sets enterprise-wide risk and compliance strategy at the executive level.', skills: [s(14), s(15), s(41), s(43), s(44), s(45)], industries: ['All Industries'], leadership: true, assignedCount: 1 },
  { id: 10, name: 'Senior Compliance Specialist', category: 'Compliance', description: 'Leads compliance reviews and audits, mentors junior team members, and advises on complex regulatory matters.', skills: [s(15), s(14), s(42)], industries: ['Banking', 'FinTech', 'Insurance'], leadership: false, assignedCount: 4 },

  // ── Contact Centre ──────────────────────────────────────
  { id: 11, name: 'Contact Centre Agent', category: 'Contact Centre', description: 'Handles inbound and outbound customer interactions across phone, chat, and email channels.', skills: [s(8), s(9), s(5)], industries: ['Telecoms', 'Retail', 'Financial Services'], leadership: false, assignedCount: 18 },
  { id: 12, name: 'Contact Centre Leadership', category: 'Contact Centre', description: 'Leads contact centre operations, sets KPIs, and drives team performance and customer satisfaction.', skills: [s(8), s(9), s(41), s(42), s(43)], industries: ['Telecoms', 'Insurance', 'Retail'], leadership: true, assignedCount: 3 },
  { id: 13, name: 'Contact Centre Manager', category: 'Contact Centre', description: 'Manages daily contact centre operations including staffing, quality assurance, and process improvements.', skills: [s(8), s(9), s(41), s(44)], industries: ['Telecoms', 'Utilities', 'Financial Services'], leadership: true, assignedCount: 5 },
  { id: 14, name: 'Contact Centre Sales Demo', category: 'Contact Centre', description: 'Conducts product demonstrations and drives sales conversions through inbound contact centre enquiries.', skills: [s(1), s(3), s(5), s(9)], industries: ['SaaS', 'Telecoms', 'Retail'], leadership: false, assignedCount: 8 },
  { id: 15, name: 'CC Customer Support', category: 'Contact Centre', description: 'Provides first-line customer support, resolves issues efficiently, and escalates complex cases.', skills: [s(8), s(9), s(5)], industries: ['Telecoms', 'E-commerce', 'Utilities'], leadership: false, assignedCount: 14 },

  // ── Creative ────────────────────────────────────────────
  { id: 16, name: 'Creative Design', category: 'Creative', description: 'Produces visual design work across digital and print, translating briefs into compelling creative output.', skills: [s(24), s(26)], industries: ['Media', 'Advertising', 'E-commerce'], leadership: false, assignedCount: 6 },
  { id: 17, name: 'Creative Strategy', category: 'Creative', description: 'Develops creative strategies that align brand messaging with business objectives across campaigns.', skills: [s(24), s(26), s(43)], industries: ['Advertising', 'Media', 'Retail'], leadership: false, assignedCount: 3 },
  { id: 18, name: 'Digital Technology Lead', category: 'Creative', description: 'Leads digital technology initiatives within creative teams, bridging design and development.', skills: [s(19), s(18), s(41)], industries: ['Media', 'Technology', 'Advertising'], leadership: true, assignedCount: 2 },
  { id: 19, name: 'Graphic Designer', category: 'Creative', description: 'Creates visual concepts for marketing materials, websites, and brand assets.', skills: [s(24), s(26)], industries: ['Media', 'Retail', 'SaaS'], leadership: false, assignedCount: 9 },
  { id: 20, name: 'Senior Graphic Designer', category: 'Creative', description: 'Leads design projects, mentors junior designers, and ensures brand consistency across all touchpoints.', skills: [s(24), s(26), s(42)], industries: ['Media', 'Advertising', 'E-commerce'], leadership: false, assignedCount: 4 },
  { id: 21, name: 'Graphic Design Manager', category: 'Creative', description: 'Manages the graphic design team, allocates resources, and drives creative quality standards.', skills: [s(24), s(26), s(41), s(42)], industries: ['Advertising', 'Media', 'Technology'], leadership: true, assignedCount: 2 },
  { id: 22, name: 'Head of Creative', category: 'Creative', description: 'Sets the overall creative vision and direction, leading all creative output across the organisation.', skills: [s(24), s(26), s(41), s(43), s(45)], industries: ['Advertising', 'Media', 'Retail'], leadership: true, assignedCount: 1 },
  { id: 23, name: 'Senior Content Writer', category: 'Creative', description: 'Produces high-quality written content for campaigns, websites, and thought leadership pieces.', skills: [s(24), s(25)], industries: ['Media', 'SaaS', 'Professional Services'], leadership: false, assignedCount: 5 },
  { id: 24, name: 'Creative Designer', category: 'Creative', description: 'Designs creative assets across multiple formats and channels, from social media to large-scale campaigns.', skills: [s(24), s(26), s(28)], industries: ['Advertising', 'E-commerce', 'Media'], leadership: false, assignedCount: 7 },

  // ── Customer Service ────────────────────────────────────
  { id: 25, name: 'Client Executive', category: 'Customer Service', description: 'Manages key client relationships, ensures satisfaction, and identifies opportunities for account growth.', skills: [s(6), s(9), s(4), s(45)], industries: ['Professional Services', 'SaaS', 'Financial Services'], leadership: false, assignedCount: 8 },
  { id: 26, name: 'Customer Experience Manager', category: 'Customer Service', description: 'Designs and optimises the end-to-end customer journey to drive satisfaction and loyalty.', skills: [s(9), s(8), s(41), s(44)], industries: ['Retail', 'E-commerce', 'Telecoms'], leadership: true, assignedCount: 3 },
  { id: 27, name: 'Customer Support Executive', category: 'Customer Service', description: 'Handles customer enquiries and resolves issues across multiple channels to maintain high satisfaction levels.', skills: [s(8), s(9), s(5)], industries: ['SaaS', 'E-commerce', 'Telecoms'], leadership: false, assignedCount: 12 },
  { id: 28, name: 'Head of Product Support', category: 'Customer Service', description: 'Leads the product support function, defining processes and quality standards for technical customer assistance.', skills: [s(9), s(8), s(41), s(43), s(18)], industries: ['SaaS', 'Technology'], leadership: true, assignedCount: 1 },
  { id: 29, name: 'Customer Experience Specialist', category: 'Customer Service', description: 'Analyses customer feedback and implements improvements to enhance the overall customer experience.', skills: [s(9), s(8), s(36)], industries: ['Retail', 'E-commerce', 'Hospitality'], leadership: false, assignedCount: 6 },
  { id: 30, name: 'Field Operations Manager', category: 'Customer Service', description: 'Manages field-based customer service teams, ensuring consistent service delivery across locations.', skills: [s(9), s(41), s(42), s(44)], industries: ['Utilities', 'Telecoms', 'Logistics'], leadership: true, assignedCount: 2 },
  { id: 31, name: 'Customer Support Specialist', category: 'Customer Service', description: 'Provides specialist-level support for complex customer issues, acting as an escalation point.', skills: [s(8), s(9), s(5)], industries: ['SaaS', 'Technology', 'Financial Services'], leadership: false, assignedCount: 10 },
  { id: 32, name: 'Customer Service Supervisor', category: 'Customer Service', description: 'Supervises a team of customer service agents, monitors quality, and handles escalated issues.', skills: [s(8), s(9), s(41), s(42)], industries: ['Retail', 'Telecoms', 'E-commerce'], leadership: true, assignedCount: 4 },
  { id: 33, name: 'Customer Service Agent', category: 'Customer Service', description: 'Delivers front-line customer service, responding to enquiries and resolving complaints efficiently.', skills: [s(8), s(9)], industries: ['Retail', 'Telecoms', 'Utilities'], leadership: false, assignedCount: 16 },
  { id: 34, name: 'Customer Service Representative', category: 'Customer Service', description: 'Represents the company in all customer interactions, ensuring a positive and professional experience.', skills: [s(8), s(9), s(5)], industries: ['Retail', 'E-commerce', 'Financial Services'], leadership: false, assignedCount: 13 },

  // ── Customer Success ────────────────────────────────────
  { id: 35, name: 'Launch Manager', category: 'Customer Success', description: 'Manages customer onboarding and product launches, ensuring smooth implementation and time-to-value.', skills: [s(9), s(45), s(18)], industries: ['SaaS', 'Technology'], leadership: false, assignedCount: 5 },
  { id: 36, name: 'Service Delivery', category: 'Customer Success', description: 'Ensures service delivery meets contractual SLAs and customer expectations across all accounts.', skills: [s(9), s(45), s(44)], industries: ['Professional Services', 'Technology', 'Outsourcing'], leadership: false, assignedCount: 7 },
  { id: 37, name: 'Customer Success Manager', category: 'Customer Success', description: 'Drives product adoption, retention, and expansion within assigned customer accounts.', skills: [s(6), s(9), s(5), s(45)], industries: ['SaaS', 'Technology', 'FinTech'], leadership: false, assignedCount: 11 },
  { id: 38, name: 'Customer Support Team Manager', category: 'Customer Success', description: 'Leads the customer support team, sets targets, and ensures efficient resolution of customer issues.', skills: [s(8), s(9), s(41), s(42)], industries: ['SaaS', 'E-commerce', 'Technology'], leadership: true, assignedCount: 3 },
  { id: 39, name: 'Head of Customer Success', category: 'Customer Success', description: 'Defines the customer success strategy and leads the team to maximise retention and net revenue retention.', skills: [s(6), s(9), s(41), s(43), s(45)], industries: ['SaaS', 'Technology'], leadership: true, assignedCount: 1 },
  { id: 40, name: 'Customer Success Specialist', category: 'Customer Success', description: 'Supports customer success managers with onboarding, health checks, and proactive outreach.', skills: [s(9), s(5), s(6)], industries: ['SaaS', 'Technology', 'FinTech'], leadership: false, assignedCount: 8 },
  { id: 41, name: 'Senior Customer Success Manager', category: 'Customer Success', description: 'Manages strategic accounts, drives executive-level relationships, and mentors junior CSMs.', skills: [s(6), s(9), s(45), s(42), s(43)], industries: ['SaaS', 'Enterprise Software'], leadership: false, assignedCount: 4 },
  { id: 42, name: 'Customer Research Manager', category: 'Customer Success', description: 'Leads customer research initiatives to uncover insights that improve products and customer experience.', skills: [s(37), s(36), s(9), s(41)], industries: ['SaaS', 'Retail', 'Media'], leadership: true, assignedCount: 2 },
  { id: 43, name: 'Client Success Manager', category: 'Customer Success', description: 'Manages client relationships to ensure satisfaction, retention, and growth of professional services accounts.', skills: [s(6), s(9), s(4), s(45)], industries: ['Professional Services', 'Consulting'], leadership: false, assignedCount: 6 },
  { id: 44, name: 'Strategic Research Partner', category: 'Customer Success', description: 'Conducts strategic research and provides data-driven insights to help customers achieve their business goals.', skills: [s(37), s(39), s(43), s(45)], industries: ['Consulting', 'Research', 'SaaS'], leadership: false, assignedCount: 3 },

  // ── Engineering ─────────────────────────────────────────
  { id: 45, name: 'Software Engineer', category: 'Engineering', description: 'Designs, builds, and maintains software applications. Participates in code reviews and collaborates across teams.', skills: [s(18), s(20), s(21), s(23)], industries: ['SaaS', 'FinTech', 'E-commerce'], leadership: false, assignedCount: 15 },
  { id: 46, name: 'Senior Software Engineer', category: 'Engineering', description: 'Leads technical initiatives, mentors engineers, and drives architecture decisions for complex systems.', skills: [s(18), s(19), s(20), s(21), s(42)], industries: ['SaaS', 'Technology', 'FinTech'], leadership: false, assignedCount: 10 },
  { id: 47, name: 'Data Engineer', category: 'Engineering', description: 'Builds and maintains data pipelines, warehouses, and infrastructure to enable analytics at scale.', skills: [s(23), s(38), s(21), s(22)], industries: ['Technology', 'FinTech', 'E-commerce'], leadership: false, assignedCount: 7 },
  { id: 48, name: 'Lead Engineer', category: 'Engineering', description: 'Provides technical leadership for a squad or team, driving quality and delivery of engineering output.', skills: [s(18), s(19), s(20), s(41), s(42)], industries: ['SaaS', 'Technology'], leadership: true, assignedCount: 4 },
  { id: 49, name: 'Engineering Manager', category: 'Engineering', description: 'Manages a team of engineers, drives technical strategy, and balances delivery with engineering excellence.', skills: [s(18), s(19), s(20), s(21), s(41), s(42), s(43)], industries: ['SaaS', 'Technology', 'FinTech'], leadership: true, assignedCount: 3 },
  { id: 50, name: 'Frontend Engineer', category: 'Engineering', description: 'Builds responsive user interfaces and ensures excellent user experience across web applications.', skills: [s(18), s(20)], industries: ['SaaS', 'E-commerce', 'Media'], leadership: false, assignedCount: 9 },
  { id: 51, name: 'Backend Engineer', category: 'Engineering', description: 'Develops server-side logic, APIs, and services that power product features and integrations.', skills: [s(18), s(20), s(23)], industries: ['SaaS', 'FinTech', 'Technology'], leadership: false, assignedCount: 8 },
  { id: 52, name: 'DevOps Engineer', category: 'Engineering', description: 'Automates infrastructure, manages CI/CD pipelines, and ensures system reliability and scalability.', skills: [s(21), s(22), s(19)], industries: ['SaaS', 'Cloud Services', 'FinTech'], leadership: false, assignedCount: 5 },
  { id: 53, name: 'QA Engineer', category: 'Engineering', description: 'Designs and executes test strategies to ensure software quality across releases.', skills: [s(18), s(20)], industries: ['SaaS', 'Technology', 'E-commerce'], leadership: false, assignedCount: 6 },
  { id: 54, name: 'Cloud Architect', category: 'Engineering', description: 'Designs cloud infrastructure, defines architecture patterns, and guides teams on scalable systems.', skills: [s(19), s(21), s(22), s(23)], industries: ['Cloud Services', 'Enterprise IT', 'SaaS'], leadership: false, assignedCount: 2 },
  { id: 55, name: 'Machine Learning Engineer', category: 'Engineering', description: 'Builds and deploys machine learning models, working at the intersection of data science and engineering.', skills: [s(23), s(40), s(37), s(38)], industries: ['Technology', 'FinTech', 'Healthcare'], leadership: false, assignedCount: 3 },
  { id: 56, name: 'Senior Data Engineer', category: 'Engineering', description: 'Leads data engineering initiatives, designs data architecture, and mentors junior data engineers.', skills: [s(23), s(38), s(21), s(22), s(42)], industries: ['Technology', 'FinTech', 'E-commerce'], leadership: false, assignedCount: 4 },
  { id: 57, name: 'Technical Lead', category: 'Engineering', description: 'Sets technical direction for a product area, makes architecture decisions, and leads cross-team technical initiatives.', skills: [s(18), s(19), s(20), s(41), s(43)], industries: ['SaaS', 'Technology'], leadership: true, assignedCount: 3 },
  { id: 58, name: 'Full Stack Developer', category: 'Engineering', description: 'Works across the entire technology stack, building features end-to-end from UI to database.', skills: [s(18), s(20), s(23)], industries: ['SaaS', 'E-commerce', 'Startups'], leadership: false, assignedCount: 11 },
  { id: 59, name: 'Site Reliability Engineer', category: 'Engineering', description: 'Ensures system uptime and performance through monitoring, incident response, and infrastructure automation.', skills: [s(21), s(22), s(19)], industries: ['SaaS', 'Cloud Services', 'Technology'], leadership: false, assignedCount: 2 },

  // ── Finance ─────────────────────────────────────────────
  { id: 60, name: 'Financial Analyst', category: 'Finance', description: 'Analyses financial data, builds models, and provides insights to support business decisions.', skills: [s(12), s(13), s(16)], industries: ['Banking', 'Insurance', 'Corporate Finance'], leadership: false, assignedCount: 6 },
  { id: 61, name: 'Finance Manager', category: 'Finance', description: 'Manages financial operations, oversees reporting, and ensures accuracy of financial records.', skills: [s(12), s(13), s(16), s(41)], industries: ['All Industries'], leadership: true, assignedCount: 4 },
  { id: 62, name: 'Financial Controller', category: 'Finance', description: 'Oversees all accounting operations, ensures compliance with reporting standards, and manages the finance team.', skills: [s(12), s(13), s(16), s(15), s(41)], industries: ['Corporate', 'Financial Services'], leadership: true, assignedCount: 2 },
  { id: 63, name: 'Accounts Receivable', category: 'Finance', description: 'Manages incoming payments, reconciles accounts, and follows up on outstanding invoices.', skills: [s(12), s(16)], industries: ['All Industries'], leadership: false, assignedCount: 8 },
  { id: 64, name: 'Payroll Administrator', category: 'Finance', description: 'Processes payroll, ensures compliance with tax regulations, and maintains employee compensation records.', skills: [s(16), s(15), s(34)], industries: ['All Industries'], leadership: false, assignedCount: 5 },
  { id: 65, name: 'Credit Controller', category: 'Finance', description: 'Manages credit risk, chases overdue payments, and maintains healthy cash flow for the business.', skills: [s(12), s(14), s(4)], industries: ['Retail', 'Financial Services', 'Manufacturing'], leadership: false, assignedCount: 7 },
  { id: 66, name: 'Finance Director', category: 'Finance', description: 'Leads the finance function, overseeing budgets, financial planning, and long-term financial strategy.', skills: [s(12), s(13), s(14), s(16), s(17), s(41), s(43)], industries: ['All Industries'], leadership: true, assignedCount: 2 },
  { id: 67, name: 'Head of Finance', category: 'Finance', description: 'Heads the finance department, driving financial performance and providing strategic guidance to the board.', skills: [s(12), s(13), s(16), s(41), s(43), s(45)], industries: ['All Industries'], leadership: true, assignedCount: 1 },
  { id: 68, name: 'Chief Financial Officer', category: 'Finance', description: 'Sets enterprise financial strategy, manages investor relations, and oversees all financial operations.', skills: [s(12), s(13), s(14), s(16), s(17), s(41), s(43), s(45)], industries: ['All Industries'], leadership: true, assignedCount: 1 },
  { id: 69, name: 'Management Accountant', category: 'Finance', description: 'Produces management accounts, variance analysis, and financial insights to support operational decisions.', skills: [s(12), s(13), s(16)], industries: ['Manufacturing', 'Retail', 'Corporate'], leadership: false, assignedCount: 5 },
  { id: 70, name: 'Finance Assistant', category: 'Finance', description: 'Supports the finance team with data entry, invoice processing, and basic reconciliation tasks.', skills: [s(12), s(16)], industries: ['All Industries'], leadership: false, assignedCount: 10 },
  { id: 71, name: 'Pricing Manager', category: 'Finance', description: 'Develops and manages pricing strategies, analyses market data, and optimises revenue through pricing models.', skills: [s(12), s(37), s(39), s(41)], industries: ['SaaS', 'Retail', 'E-commerce'], leadership: true, assignedCount: 2 },
  { id: 72, name: 'Bookkeeper', category: 'Finance', description: 'Maintains accurate financial records, processes transactions, and prepares basic financial reports.', skills: [s(12), s(16)], industries: ['SMB', 'Professional Services'], leadership: false, assignedCount: 6 },

  // ── General Admin ───────────────────────────────────────
  { id: 73, name: 'Chief of Staff', category: 'General Admin', description: 'Acts as a strategic partner to the CEO, coordinating cross-functional initiatives and executive communications.', skills: [s(43), s(45), s(41), s(44)], industries: ['All Industries'], leadership: true, assignedCount: 1 },
  { id: 74, name: 'Office Manager', category: 'General Admin', description: 'Manages office operations, facilities, and administrative processes to ensure a productive workplace.', skills: [s(41), s(44)], industries: ['All Industries'], leadership: true, assignedCount: 5 },
  { id: 75, name: 'Executive Assistant', category: 'General Admin', description: 'Provides high-level administrative support to senior executives, managing schedules, travel, and communications.', skills: [s(45), s(9)], industries: ['All Industries'], leadership: false, assignedCount: 8 },
  { id: 76, name: 'Personal Assistant', category: 'General Admin', description: 'Provides dedicated administrative and organisational support to an individual or small team.', skills: [s(45), s(9)], industries: ['All Industries'], leadership: false, assignedCount: 6 },
  { id: 77, name: 'Office Administrator', category: 'General Admin', description: 'Handles general office administration, including supplies, correspondence, and visitor management.', skills: [s(9)], industries: ['All Industries'], leadership: false, assignedCount: 12 },
  { id: 78, name: 'Admin Assistant', category: 'General Admin', description: 'Supports day-to-day administrative tasks including filing, data entry, and scheduling.', skills: [s(9)], industries: ['All Industries'], leadership: false, assignedCount: 14 },
  { id: 79, name: 'Business Support Coordinator', category: 'General Admin', description: 'Coordinates business support activities across departments, streamlining processes and communications.', skills: [s(9), s(45), s(44)], industries: ['All Industries'], leadership: false, assignedCount: 4 },
  { id: 80, name: 'Office & Administration Manager', category: 'General Admin', description: 'Oversees all administrative functions and office operations, managing a team of administrative staff.', skills: [s(41), s(44), s(45)], industries: ['All Industries'], leadership: true, assignedCount: 3 },
  { id: 81, name: 'Agency Administrator', category: 'General Admin', description: 'Manages administrative operations within an agency setting, coordinating resources and client logistics.', skills: [s(9), s(45)], industries: ['Advertising', 'Recruitment', 'Professional Services'], leadership: false, assignedCount: 5 },

  // ── IT, Networking & Security ───────────────────────────
  { id: 82, name: 'Network Engineer', category: 'IT, Networking & Security', description: 'Designs, implements, and maintains network infrastructure to ensure reliable connectivity and performance.', skills: [s(19), s(22)], industries: ['Technology', 'Telecoms', 'Enterprise IT'], leadership: false, assignedCount: 6 },
  { id: 83, name: 'CyberSecurity', category: 'IT, Networking & Security', description: 'Protects organisational systems and data from cyber threats through security monitoring and incident response.', skills: [s(14), s(22), s(19)], industries: ['Technology', 'Financial Services', 'Government'], leadership: false, assignedCount: 8 },
  { id: 84, name: 'IT Manager', category: 'IT, Networking & Security', description: 'Manages the IT department, oversees infrastructure, and ensures technology supports business objectives.', skills: [s(19), s(22), s(41), s(43)], industries: ['All Industries'], leadership: true, assignedCount: 4 },
  { id: 85, name: 'Support Manager', category: 'IT, Networking & Security', description: 'Leads the IT support team, manages service desk operations, and ensures timely resolution of technical issues.', skills: [s(9), s(41), s(42)], industries: ['Technology', 'SaaS', 'Enterprise IT'], leadership: true, assignedCount: 3 },
  { id: 86, name: 'Solution Architect', category: 'IT, Networking & Security', description: 'Designs end-to-end technology solutions that meet business requirements and integrate with existing systems.', skills: [s(19), s(22), s(23), s(45)], industries: ['Technology', 'Consulting', 'Enterprise IT'], leadership: false, assignedCount: 3 },
  { id: 87, name: 'Head of IT', category: 'IT, Networking & Security', description: 'Leads the entire IT function, setting technology strategy and managing infrastructure, security, and support.', skills: [s(19), s(22), s(41), s(43), s(45)], industries: ['All Industries'], leadership: true, assignedCount: 2 },
  { id: 88, name: 'CTO', category: 'IT, Networking & Security', description: 'Sets the technology vision and strategy at the executive level, driving innovation and digital transformation.', skills: [s(19), s(22), s(41), s(43), s(44), s(45)], industries: ['Technology', 'SaaS', 'FinTech'], leadership: true, assignedCount: 1 },
  { id: 89, name: 'Information Security Manager', category: 'IT, Networking & Security', description: 'Manages the information security programme, policies, and compliance across the organisation.', skills: [s(14), s(15), s(22), s(41)], industries: ['Financial Services', 'Technology', 'Healthcare'], leadership: true, assignedCount: 2 },
  { id: 90, name: 'Cloud Security Manager', category: 'IT, Networking & Security', description: 'Oversees cloud security posture, manages access controls, and ensures compliance in cloud environments.', skills: [s(22), s(14), s(15), s(41)], industries: ['Technology', 'Cloud Services', 'FinTech'], leadership: true, assignedCount: 1 },
  { id: 91, name: 'Data Solutions Administrator', category: 'IT, Networking & Security', description: 'Administers data platforms and solutions, ensuring data availability, integrity, and performance.', skills: [s(23), s(38), s(22)], industries: ['Technology', 'Enterprise IT'], leadership: false, assignedCount: 4 },
  { id: 92, name: 'IT Support Analyst', category: 'IT, Networking & Security', description: 'Provides technical support to end users, troubleshoots hardware and software issues, and maintains IT systems.', skills: [s(9), s(22)], industries: ['All Industries'], leadership: false, assignedCount: 11 },
  { id: 93, name: 'Head of CyberSecurity', category: 'IT, Networking & Security', description: 'Leads the cyber security function, setting security strategy and managing threat detection and response.', skills: [s(14), s(22), s(19), s(41), s(43)], industries: ['Financial Services', 'Technology', 'Government'], leadership: true, assignedCount: 1 },

  // ── Leadership ──────────────────────────────────────────
  { id: 94, name: 'Managing Director', category: 'Leadership', description: 'Leads the overall business operations and strategic direction of the company or a major division.', skills: [s(41), s(43), s(44), s(45)], industries: ['All Industries'], leadership: true, assignedCount: 2 },
  { id: 95, name: 'CEO', category: 'Leadership', description: 'Sets the vision and strategy for the entire organisation, accountable for overall performance and growth.', skills: [s(41), s(43), s(44), s(45)], industries: ['All Industries'], leadership: true, assignedCount: 1 },
  { id: 96, name: 'Founder', category: 'Leadership', description: 'Leads the company from inception, setting culture, vision, and strategic priorities.', skills: [s(41), s(43), s(44), s(45)], industries: ['Startups', 'Technology', 'All Industries'], leadership: true, assignedCount: 1 },
  { id: 97, name: 'Regional Director', category: 'Leadership', description: 'Oversees business operations across a geographic region, driving performance and growth targets.', skills: [s(41), s(43), s(45)], industries: ['Retail', 'Financial Services', 'Hospitality'], leadership: true, assignedCount: 3 },
  { id: 98, name: 'Senior Growth Manager', category: 'Leadership', description: 'Drives growth strategy and execution across product, marketing, and sales channels.', skills: [s(43), s(27), s(2), s(41)], industries: ['SaaS', 'Technology', 'E-commerce'], leadership: true, assignedCount: 2 },
  { id: 99, name: 'Experience Director', category: 'Leadership', description: 'Leads customer and employee experience strategy, ensuring brand promise is delivered consistently.', skills: [s(9), s(41), s(43), s(44)], industries: ['Retail', 'Hospitality', 'Media'], leadership: true, assignedCount: 1 },
  { id: 100, name: 'Head of Engagement', category: 'Leadership', description: 'Drives employee and customer engagement strategies, fostering loyalty and advocacy.', skills: [s(31), s(41), s(43), s(44)], industries: ['All Industries'], leadership: true, assignedCount: 2 },
  { id: 101, name: 'Marketing Executive', category: 'Leadership', description: 'Shapes marketing vision at the executive level, aligning marketing efforts with business strategy.', skills: [s(24), s(26), s(27), s(41), s(43)], industries: ['All Industries'], leadership: true, assignedCount: 1 },
  { id: 102, name: 'Operations Director', category: 'Leadership', description: 'Directs all operational functions, optimising processes and driving efficiency across the organisation.', skills: [s(41), s(43), s(44), s(45)], industries: ['All Industries'], leadership: true, assignedCount: 2 },
  { id: 103, name: 'Sales Director', category: 'Leadership', description: 'Leads the sales organisation, sets revenue targets, and drives the go-to-market strategy.', skills: [s(1), s(2), s(4), s(41), s(43)], industries: ['SaaS', 'Technology', 'Professional Services'], leadership: true, assignedCount: 2 },
  { id: 104, name: 'Chief Revenue Officer', category: 'Leadership', description: 'Oversees all revenue-generating functions including sales, marketing, and customer success.', skills: [s(1), s(2), s(41), s(43), s(45)], industries: ['SaaS', 'Technology'], leadership: true, assignedCount: 1 },

  // ── Logistics & Supply Chain ────────────────────────────
  { id: 105, name: 'Procurement Specialist', category: 'Logistics & Supply Chain', description: 'Sources suppliers, negotiates contracts, and manages purchasing processes to optimise costs and quality.', skills: [s(4), s(14), s(45)], industries: ['Manufacturing', 'Retail', 'Construction'], leadership: false, assignedCount: 7 },
  { id: 106, name: 'Sourcing Specialist', category: 'Logistics & Supply Chain', description: 'Identifies and evaluates potential suppliers, negotiates terms, and supports strategic sourcing initiatives.', skills: [s(4), s(14), s(37)], industries: ['Manufacturing', 'Retail', 'Technology'], leadership: false, assignedCount: 5 },
  { id: 107, name: 'Head of Procurement', category: 'Logistics & Supply Chain', description: 'Leads the procurement function, developing strategy and managing supplier relationships at scale.', skills: [s(4), s(14), s(41), s(43), s(45)], industries: ['Manufacturing', 'Retail', 'Construction'], leadership: true, assignedCount: 1 },
  { id: 108, name: 'Warehouse Operative', category: 'Logistics & Supply Chain', description: 'Manages warehouse operations including receiving, storing, picking, and dispatching goods.', skills: [s(9)], industries: ['Logistics', 'Retail', 'Manufacturing'], leadership: false, assignedCount: 15 },
  { id: 109, name: 'Program Manager', category: 'Logistics & Supply Chain', description: 'Manages complex programmes across the supply chain, coordinating multiple workstreams and stakeholders.', skills: [s(43), s(45), s(41), s(44)], industries: ['Logistics', 'Manufacturing', 'Technology'], leadership: true, assignedCount: 3 },
  { id: 110, name: 'Production Hub Manager', category: 'Logistics & Supply Chain', description: 'Oversees production hub operations, managing staff, output quality, and efficiency targets.', skills: [s(41), s(42), s(44)], industries: ['Manufacturing', 'Logistics'], leadership: true, assignedCount: 2 },
  { id: 111, name: 'Learning Operations Specialist', category: 'Logistics & Supply Chain', description: 'Manages operational aspects of learning and training programmes within supply chain functions.', skills: [s(33), s(44)], industries: ['Logistics', 'Manufacturing'], leadership: false, assignedCount: 4 },
  { id: 112, name: 'HRIS Director', category: 'Logistics & Supply Chain', description: 'Directs HR information systems strategy and operations across the supply chain organisation.', skills: [s(19), s(35), s(41), s(43)], industries: ['Logistics', 'Manufacturing', 'Retail'], leadership: true, assignedCount: 1 },

  // ── Marketing ───────────────────────────────────────────
  { id: 113, name: 'Brand Management', category: 'Marketing', description: 'Develops and maintains the brand identity, ensuring consistent messaging across all touchpoints.', skills: [s(26), s(24), s(28)], industries: ['FMCG', 'Retail', 'Media'], leadership: false, assignedCount: 5 },
  { id: 114, name: 'Content Manager', category: 'Marketing', description: 'Manages the content production pipeline, editorial calendar, and content performance metrics.', skills: [s(24), s(25), s(28)], industries: ['SaaS', 'Media', 'E-commerce'], leadership: false, assignedCount: 6 },
  { id: 115, name: 'SEO Manager', category: 'Marketing', description: 'Develops and executes SEO strategy to drive organic traffic, rankings, and visibility.', skills: [s(25), s(27), s(24)], industries: ['SaaS', 'E-commerce', 'Media'], leadership: true, assignedCount: 3 },
  { id: 116, name: 'Digital Marketing Manager', category: 'Marketing', description: 'Leads digital marketing efforts across paid, earned, and owned channels to drive leads and brand awareness.', skills: [s(25), s(27), s(28), s(29), s(41)], industries: ['SaaS', 'E-commerce', 'Retail'], leadership: true, assignedCount: 4 },
  { id: 117, name: 'Head of Marketing', category: 'Marketing', description: 'Leads the marketing department, sets strategy, manages budgets, and drives growth across all channels.', skills: [s(24), s(26), s(27), s(29), s(41), s(43), s(45)], industries: ['All Industries'], leadership: true, assignedCount: 1 },
  { id: 118, name: 'Campaign Manager', category: 'Marketing', description: 'Plans, executes, and measures marketing campaigns across multiple channels to achieve business objectives.', skills: [s(27), s(29), s(28)], industries: ['SaaS', 'Retail', 'FMCG'], leadership: false, assignedCount: 7 },
  { id: 119, name: 'Social Media Manager', category: 'Marketing', description: 'Manages social media presence, creates engaging content, and builds community across platforms.', skills: [s(28), s(24), s(26)], industries: ['Retail', 'Media', 'E-commerce'], leadership: false, assignedCount: 8 },
  { id: 120, name: 'Marketing Analyst', category: 'Marketing', description: 'Analyses marketing performance data, provides insights, and recommends optimisations for campaigns and channels.', skills: [s(27), s(36), s(37), s(39)], industries: ['SaaS', 'E-commerce', 'FMCG'], leadership: false, assignedCount: 4 },
  { id: 121, name: 'Marketing Executive', category: 'Marketing', description: 'Executes marketing activities across channels, supporting campaigns and content creation.', skills: [s(24), s(28), s(25)], industries: ['All Industries'], leadership: false, assignedCount: 11 },
  { id: 122, name: 'Senior Marketing Executive', category: 'Marketing', description: 'Leads marketing execution with greater autonomy, managing key campaigns and channel strategies.', skills: [s(24), s(27), s(28), s(29)], industries: ['SaaS', 'Retail', 'Professional Services'], leadership: false, assignedCount: 5 },
  { id: 123, name: 'Performance Manager', category: 'Marketing', description: 'Manages performance marketing channels, optimises spend, and drives ROI across paid media.', skills: [s(27), s(29), s(25), s(41)], industries: ['SaaS', 'E-commerce', 'FinTech'], leadership: true, assignedCount: 3 },
  { id: 124, name: 'Head of Research', category: 'Marketing', description: 'Leads market research and consumer insights, informing product and marketing strategies with data.', skills: [s(37), s(39), s(36), s(41), s(43)], industries: ['FMCG', 'Media', 'Consulting'], leadership: true, assignedCount: 1 },
  { id: 125, name: 'Email Marketing Specialist', category: 'Marketing', description: 'Creates and optimises email marketing campaigns, managing automation, segmentation, and performance.', skills: [s(29), s(24), s(27)], industries: ['SaaS', 'E-commerce', 'Retail'], leadership: false, assignedCount: 6 },

  // ── Operations & Strategy ───────────────────────────────
  { id: 126, name: 'Operations Manager', category: 'Operations & Strategy', description: 'Manages daily operations, streamlines processes, and ensures efficient delivery of services and products.', skills: [s(41), s(44), s(43)], industries: ['All Industries'], leadership: true, assignedCount: 7 },
  { id: 127, name: 'Business Strategy', category: 'Operations & Strategy', description: 'Develops and executes business strategies that drive growth, competitive advantage, and operational excellence.', skills: [s(43), s(39), s(45)], industries: ['Consulting', 'Technology', 'Financial Services'], leadership: false, assignedCount: 4 },
  { id: 128, name: 'Programme Manager', category: 'Operations & Strategy', description: 'Oversees a portfolio of related projects, ensuring alignment with strategic objectives and timely delivery.', skills: [s(43), s(45), s(41), s(44)], industries: ['Technology', 'Financial Services', 'Government'], leadership: true, assignedCount: 3 },
  { id: 129, name: 'Project Coordinator', category: 'Operations & Strategy', description: 'Coordinates project activities, tracks milestones, and supports project managers with administrative tasks.', skills: [s(45), s(18)], industries: ['All Industries'], leadership: false, assignedCount: 9 },
  { id: 130, name: 'Head of Operations', category: 'Operations & Strategy', description: 'Leads the operations function, driving efficiency, quality, and scalability across the organisation.', skills: [s(41), s(43), s(44), s(45)], industries: ['All Industries'], leadership: true, assignedCount: 2 },
  { id: 131, name: 'Operations Analyst', category: 'Operations & Strategy', description: 'Analyses operational data to identify inefficiencies and recommend process improvements.', skills: [s(36), s(37), s(39)], industries: ['Technology', 'Logistics', 'Financial Services'], leadership: false, assignedCount: 5 },
  { id: 132, name: 'Delivery Manager', category: 'Operations & Strategy', description: 'Manages the delivery of projects and programmes, ensuring quality, budget, and timeline adherence.', skills: [s(18), s(41), s(45)], industries: ['Technology', 'Consulting', 'SaaS'], leadership: true, assignedCount: 4 },
  { id: 133, name: 'Head of Business Operations', category: 'Operations & Strategy', description: 'Oversees all business operations, coordinating across departments to achieve strategic goals.', skills: [s(41), s(43), s(44), s(45)], industries: ['All Industries'], leadership: true, assignedCount: 1 },
  { id: 134, name: 'Procurement Analyst', category: 'Operations & Strategy', description: 'Analyses procurement data, supplier performance, and spend patterns to optimise purchasing decisions.', skills: [s(12), s(37), s(39)], industries: ['Manufacturing', 'Retail', 'Government'], leadership: false, assignedCount: 3 },
  { id: 135, name: 'Operations Director', category: 'Operations & Strategy', description: 'Directs operational strategy and execution at a senior level, reporting to the executive team.', skills: [s(41), s(43), s(44), s(45)], industries: ['All Industries'], leadership: true, assignedCount: 2 },

  // ── Partnerships ────────────────────────────────────────
  { id: 136, name: 'Partner Success Manager', category: 'Partnerships', description: 'Ensures partner satisfaction and success by managing relationships and driving mutual value creation.', skills: [s(6), s(9), s(45)], industries: ['SaaS', 'Technology', 'Professional Services'], leadership: false, assignedCount: 5 },
  { id: 137, name: 'Partnerships Manager', category: 'Partnerships', description: 'Develops and manages strategic partnerships, negotiating agreements and driving co-marketing and co-selling.', skills: [s(4), s(6), s(45), s(41)], industries: ['SaaS', 'Technology', 'Media'], leadership: true, assignedCount: 4 },
  { id: 138, name: 'Senior Relationship Manager', category: 'Partnerships', description: 'Manages high-value partner and client relationships, driving strategic alignment and revenue growth.', skills: [s(6), s(4), s(45), s(43)], industries: ['Financial Services', 'Professional Services'], leadership: false, assignedCount: 3 },
  { id: 139, name: 'Partnerships Director', category: 'Partnerships', description: 'Leads the partnerships function, setting strategy and driving growth through strategic alliances.', skills: [s(4), s(6), s(41), s(43), s(45)], industries: ['SaaS', 'Technology'], leadership: true, assignedCount: 1 },
  { id: 140, name: 'Head of Channel Partners', category: 'Partnerships', description: 'Builds and manages the channel partner programme, driving revenue through indirect sales motions.', skills: [s(1), s(4), s(6), s(41), s(43)], industries: ['SaaS', 'Technology', 'Telecoms'], leadership: true, assignedCount: 1 },
  { id: 141, name: 'Key Partnerships Manager', category: 'Partnerships', description: 'Manages key strategic partnerships, ensuring alignment of goals and maximising partnership value.', skills: [s(6), s(4), s(45), s(41)], industries: ['Technology', 'Media', 'Retail'], leadership: true, assignedCount: 2 },
  { id: 142, name: 'Strategic Account Partner', category: 'Partnerships', description: 'Acts as a strategic advisor to key partner accounts, driving long-term value and executive alignment.', skills: [s(6), s(43), s(45)], industries: ['Consulting', 'SaaS', 'Technology'], leadership: false, assignedCount: 3 },
  { id: 143, name: 'Relationship Executive', category: 'Partnerships', description: 'Builds and nurtures business relationships with partners and key accounts to drive mutual growth.', skills: [s(6), s(4), s(9)], industries: ['Financial Services', 'Professional Services'], leadership: false, assignedCount: 6 },

  // ── People ──────────────────────────────────────────────
  { id: 144, name: 'HR Manager', category: 'People', description: 'Manages HR operations including employee relations, policies, and compliance across the organisation.', skills: [s(30), s(31), s(32), s(35), s(41)], industries: ['All Industries'], leadership: true, assignedCount: 5 },
  { id: 145, name: 'Talent Acquisition', category: 'People', description: 'Sources, screens, and hires talent, managing the candidate pipeline and employer brand.', skills: [s(30), s(31)], industries: ['All Industries'], leadership: false, assignedCount: 9 },
  { id: 146, name: 'L&D Manager', category: 'People', description: 'Designs and delivers learning programmes, manages training budgets, and measures development impact.', skills: [s(31), s(32), s(33), s(41), s(42)], industries: ['All Industries'], leadership: true, assignedCount: 3 },
  { id: 147, name: 'Head of People', category: 'People', description: 'Leads the people function, setting people strategy and driving culture, engagement, and talent development.', skills: [s(30), s(31), s(32), s(33), s(41), s(43)], industries: ['All Industries'], leadership: true, assignedCount: 1 },
  { id: 148, name: 'HR Business Partner', category: 'People', description: 'Partners with business leaders to align people strategy with organisational goals and performance.', skills: [s(30), s(31), s(32), s(33), s(34), s(35)], industries: ['All Industries'], leadership: false, assignedCount: 6 },
  { id: 149, name: 'People Director', category: 'People', description: 'Directs the people function at a senior level, shaping the employee experience and organisational design.', skills: [s(30), s(31), s(32), s(41), s(43), s(45)], industries: ['All Industries'], leadership: true, assignedCount: 1 },
  { id: 150, name: 'HR Coordinator', category: 'People', description: 'Coordinates HR processes including onboarding, offboarding, and employee administration.', skills: [s(30), s(31), s(35)], industries: ['All Industries'], leadership: false, assignedCount: 8 },
  { id: 151, name: 'Senior Talent Acquisition Manager', category: 'People', description: 'Leads talent acquisition strategy, manages a team of recruiters, and drives employer branding initiatives.', skills: [s(30), s(31), s(41), s(42), s(43)], industries: ['All Industries'], leadership: true, assignedCount: 2 },
  { id: 152, name: 'HR Advisor', category: 'People', description: 'Advises managers and employees on HR policies, employment law, and best practices.', skills: [s(31), s(32), s(35)], industries: ['All Industries'], leadership: false, assignedCount: 7 },
  { id: 153, name: 'Performance Coach', category: 'People', description: 'Coaches individuals and teams to improve performance, developing skills and unlocking potential.', skills: [s(32), s(42), s(33)], industries: ['All Industries'], leadership: false, assignedCount: 4 },
  { id: 154, name: 'Head of L&D', category: 'People', description: 'Leads the learning and development function, driving skill-building strategy across the organisation.', skills: [s(33), s(42), s(41), s(43)], industries: ['All Industries'], leadership: true, assignedCount: 1 },
  { id: 155, name: 'HR Generalist', category: 'People', description: 'Handles a broad range of HR responsibilities including recruitment, employee relations, and administration.', skills: [s(30), s(31), s(32), s(35)], industries: ['All Industries'], leadership: false, assignedCount: 10 },

  // ── Product ─────────────────────────────────────────────
  { id: 156, name: 'Product Manager', category: 'Product', description: 'Defines product vision and roadmap, prioritises features, and works with engineering and design to deliver value.', skills: [s(18), s(43), s(45), s(39)], industries: ['SaaS', 'Technology', 'E-commerce'], leadership: false, assignedCount: 8 },
  { id: 157, name: 'Product Owner', category: 'Product', description: 'Manages the product backlog, defines user stories, and ensures the development team delivers maximum value.', skills: [s(18), s(45)], industries: ['SaaS', 'Technology', 'FinTech'], leadership: false, assignedCount: 7 },
  { id: 158, name: 'UX Designer', category: 'Product', description: 'Designs user experiences through research, wireframing, prototyping, and usability testing.', skills: [s(9), s(37)], industries: ['SaaS', 'E-commerce', 'Media'], leadership: false, assignedCount: 6 },
  { id: 159, name: 'Product Designer', category: 'Product', description: 'Combines UX and visual design to create intuitive product experiences from concept to delivery.', skills: [s(9), s(24)], industries: ['SaaS', 'Technology', 'E-commerce'], leadership: false, assignedCount: 5 },
  { id: 160, name: 'Head of Product', category: 'Product', description: 'Leads the product team, sets product strategy, and ensures alignment between product vision and business goals.', skills: [s(18), s(43), s(45), s(41)], industries: ['SaaS', 'Technology'], leadership: true, assignedCount: 1 },
  { id: 161, name: 'Senior Product Manager', category: 'Product', description: 'Manages complex product areas, drives strategy for key features, and mentors junior product managers.', skills: [s(18), s(43), s(45), s(39), s(42)], industries: ['SaaS', 'Technology', 'FinTech'], leadership: false, assignedCount: 4 },
  { id: 162, name: 'Data Product Analyst', category: 'Product', description: 'Analyses product usage data to generate insights that inform product decisions and improve user experience.', skills: [s(36), s(37), s(38), s(39)], industries: ['SaaS', 'Technology', 'E-commerce'], leadership: false, assignedCount: 3 },
  { id: 163, name: 'Chief Product Officer', category: 'Product', description: 'Sets the enterprise product strategy at the executive level, overseeing all product development.', skills: [s(18), s(41), s(43), s(44), s(45)], industries: ['SaaS', 'Technology'], leadership: true, assignedCount: 1 },
  { id: 164, name: 'Product Analyst', category: 'Product', description: 'Supports product teams with data analysis, A/B testing, and performance tracking.', skills: [s(36), s(37), s(39)], industries: ['SaaS', 'Technology', 'E-commerce'], leadership: false, assignedCount: 5 },
  { id: 165, name: 'UX/UI Designer', category: 'Product', description: 'Designs user interfaces and experiences, creating visually appealing and intuitive product designs.', skills: [s(9), s(24)], industries: ['SaaS', 'E-commerce', 'Media'], leadership: false, assignedCount: 7 },
  { id: 166, name: 'Lead Product Designer', category: 'Product', description: 'Leads product design for a product area, setting design direction and mentoring other designers.', skills: [s(9), s(24), s(41), s(42)], industries: ['SaaS', 'Technology'], leadership: true, assignedCount: 2 },

  // ── RevOps ──────────────────────────────────────────────
  { id: 167, name: 'Commercial Data Analyst', category: 'RevOps', description: 'Analyses commercial data to provide insights on revenue performance, pipeline health, and forecasting.', skills: [s(36), s(37), s(38), s(39)], industries: ['SaaS', 'Technology', 'E-commerce'], leadership: false, assignedCount: 4 },
  { id: 168, name: 'Sales Operations Manager', category: 'RevOps', description: 'Manages sales operations processes including forecasting, territory planning, and CRM administration.', skills: [s(2), s(5), s(39), s(41)], industries: ['SaaS', 'Technology'], leadership: true, assignedCount: 3 },
  { id: 169, name: 'Director of Revenue Operations', category: 'RevOps', description: 'Leads revenue operations strategy across sales, marketing, and customer success to optimise the revenue engine.', skills: [s(2), s(5), s(39), s(41), s(43), s(45)], industries: ['SaaS', 'Technology'], leadership: true, assignedCount: 1 },
  { id: 170, name: 'Sales Operations Executive', category: 'RevOps', description: 'Supports sales operations with data management, reporting, and process execution.', skills: [s(5), s(2), s(36)], industries: ['SaaS', 'Technology', 'Professional Services'], leadership: false, assignedCount: 6 },
  { id: 171, name: 'PMO', category: 'RevOps', description: 'Runs the project management office, standardising delivery processes and tracking portfolio performance.', skills: [s(43), s(45), s(41)], industries: ['Technology', 'Consulting', 'Financial Services'], leadership: true, assignedCount: 2 },
  { id: 172, name: 'Revops/Sales Enablement', category: 'RevOps', description: 'Bridges revenue operations and sales enablement, equipping sales teams with tools, content, and training.', skills: [s(5), s(33), s(42), s(29)], industries: ['SaaS', 'Technology'], leadership: false, assignedCount: 5 },
  { id: 173, name: 'Payroll and Benefits Coordinator', category: 'RevOps', description: 'Coordinates payroll processing and benefits administration, ensuring accuracy and compliance.', skills: [s(34), s(35), s(16)], industries: ['All Industries'], leadership: false, assignedCount: 4 },

  // ── Sales ───────────────────────────────────────────────
  { id: 174, name: 'Sales Dev Rep', category: 'Sales', description: 'Responsible for outbound prospecting, qualifying leads, and booking meetings for account executives.', skills: [s(1), s(2), s(3), s(5)], industries: ['SaaS', 'B2B Services', 'FinTech'], leadership: false, assignedCount: 12 },
  { id: 175, name: 'Account Executive', category: 'Sales', description: 'Owns the full sales cycle from discovery to close, manages complex deals, and drives revenue targets.', skills: [s(1), s(2), s(3), s(4), s(5), s(6)], industries: ['SaaS', 'Enterprise Software', 'Professional Services'], leadership: false, assignedCount: 8 },
  { id: 176, name: 'Sales Manager', category: 'Sales', description: 'Leads a team of sales representatives, sets targets, coaches reps, and drives team performance.', skills: [s(1), s(4), s(6), s(41), s(42), s(43)], industries: ['SaaS', 'Retail', 'Financial Services'], leadership: true, assignedCount: 5 },
  { id: 177, name: 'Head of Sales', category: 'Sales', description: 'Leads the sales function, setting strategy, managing budgets, and driving revenue growth.', skills: [s(1), s(2), s(4), s(41), s(43), s(45)], industries: ['SaaS', 'Technology'], leadership: true, assignedCount: 2 },
  { id: 178, name: 'Business Development Manager', category: 'Sales', description: 'Identifies and develops new business opportunities, building relationships and driving revenue growth.', skills: [s(1), s(4), s(6), s(45)], industries: ['SaaS', 'Professional Services', 'Technology'], leadership: false, assignedCount: 9 },
  { id: 179, name: 'Account Manager', category: 'Sales', description: 'Manages existing client accounts, drives renewals and upsells, and ensures customer satisfaction.', skills: [s(6), s(4), s(5), s(9)], industries: ['SaaS', 'Advertising', 'Professional Services'], leadership: false, assignedCount: 11 },
  { id: 180, name: 'Senior Account Executive', category: 'Sales', description: 'Manages enterprise-level deals, drives strategic account penetration, and mentors junior AEs.', skills: [s(1), s(2), s(3), s(4), s(5), s(6)], industries: ['Enterprise Software', 'SaaS'], leadership: false, assignedCount: 5 },
  { id: 181, name: 'National Sales Manager', category: 'Sales', description: 'Oversees national sales strategy and execution, managing regional sales teams and key accounts.', skills: [s(1), s(2), s(4), s(41), s(43)], industries: ['FMCG', 'Retail', 'Manufacturing'], leadership: true, assignedCount: 2 },
  { id: 182, name: 'VP of Sales', category: 'Sales', description: 'Sets the sales vision and strategy, manages the entire sales organisation, and reports to the C-suite.', skills: [s(1), s(2), s(4), s(41), s(43), s(45)], industries: ['SaaS', 'Technology'], leadership: true, assignedCount: 1 },
  { id: 183, name: 'Field Sales Representative', category: 'Sales', description: 'Conducts face-to-face sales meetings, manages a territory, and drives revenue through in-person relationships.', skills: [s(1), s(3), s(4), s(5)], industries: ['FMCG', 'Pharmaceuticals', 'Manufacturing'], leadership: false, assignedCount: 14 },
  { id: 184, name: 'Senior Business Development Executive', category: 'Sales', description: 'Leads business development for strategic markets, identifying partnerships and revenue opportunities.', skills: [s(1), s(4), s(6), s(43), s(45)], industries: ['SaaS', 'Professional Services'], leadership: false, assignedCount: 4 },
  { id: 185, name: 'Sales Analyst', category: 'Sales', description: 'Analyses sales data, pipeline metrics, and market trends to support sales strategy and forecasting.', skills: [s(2), s(5), s(36), s(37)], industries: ['SaaS', 'Technology', 'Retail'], leadership: false, assignedCount: 5 },
  { id: 186, name: 'Strategic Partnerships Manager', category: 'Sales', description: 'Develops and manages strategic partnerships that drive co-selling opportunities and revenue growth.', skills: [s(4), s(6), s(45), s(43)], industries: ['SaaS', 'Technology', 'Media'], leadership: true, assignedCount: 3 },

  // ── Dynamic ─────────────────────────────────────────────
  { id: 187, name: 'Category Manager', category: 'Dynamic', description: 'Manages product categories, develops assortment strategies, and drives category growth and profitability.', skills: [s(12), s(4), s(43)], industries: ['Retail', 'FMCG', 'E-commerce'], leadership: false, assignedCount: 5 },
  { id: 188, name: 'Technical Manager', category: 'Dynamic', description: 'Manages technical teams and projects, bridging the gap between technical execution and business requirements.', skills: [s(19), s(18), s(41), s(45)], industries: ['Technology', 'Engineering', 'Manufacturing'], leadership: true, assignedCount: 3 },
  { id: 189, name: 'Recruitment Consultant', category: 'Dynamic', description: 'Sources and places candidates for client organisations, managing the full recruitment lifecycle.', skills: [s(30), s(1), s(4)], industries: ['Recruitment', 'Professional Services'], leadership: false, assignedCount: 10 },
  { id: 190, name: 'HSE Coordinator', category: 'Dynamic', description: 'Coordinates health, safety, and environmental compliance activities across the organisation.', skills: [s(15), s(14)], industries: ['Construction', 'Manufacturing', 'Energy'], leadership: false, assignedCount: 4 },
  { id: 191, name: 'Solutions Advisor', category: 'Dynamic', description: 'Advises clients on tailored solutions, conducting needs analysis and presenting recommendations.', skills: [s(1), s(19), s(45)], industries: ['Technology', 'Consulting', 'SaaS'], leadership: false, assignedCount: 6 },
  { id: 192, name: 'Head of Cable Engineering', category: 'Dynamic', description: 'Leads cable engineering operations, managing technical teams and driving infrastructure projects.', skills: [s(19), s(41), s(43), s(45)], industries: ['Telecoms', 'Energy', 'Utilities'], leadership: true, assignedCount: 1 },
  { id: 193, name: 'Principal Consultant', category: 'Dynamic', description: 'Leads complex consulting engagements, provides strategic advice, and mentors junior consultants.', skills: [s(43), s(45), s(42)], industries: ['Consulting', 'Professional Services', 'Technology'], leadership: true, assignedCount: 2 },
  { id: 194, name: 'Senior Consultant', category: 'Dynamic', description: 'Delivers consulting projects, analyses client challenges, and develops actionable recommendations.', skills: [s(43), s(45), s(37)], industries: ['Consulting', 'Professional Services'], leadership: false, assignedCount: 7 },
]

/* ─── Company Roles (starts empty) ─────────────────────── */

export const initialCompanyRoles: CompanyRole[] = []

/* ─── Categories ───────────────────────────────────────── */

export const roleCategories = [
  'All',
  'Compliance',
  'Contact Centre',
  'Creative',
  'Customer Service',
  'Customer Success',
  'Engineering',
  'Finance',
  'General Admin',
  'IT, Networking & Security',
  'Leadership',
  'Logistics & Supply Chain',
  'Marketing',
  'Operations & Strategy',
  'Partnerships',
  'People',
  'Product',
  'RevOps',
  'Sales',
  'Dynamic',
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

      if (name.includes('sales') || name.includes('account') || name.includes('business dev') || name.includes('sdr'))
        pool = skillCatalogue.filter(sk => sk.category === 'Sales')
      else if (name.includes('compliance') || name.includes('legal') || name.includes('risk') || name.includes('regulatory'))
        pool = skillCatalogue.filter(sk => sk.category === 'Finance')
      else if (name.includes('contact centre') || name.includes('call centre') || name.includes('cc '))
        pool = [...skillCatalogue.filter(sk => sk.category === 'Hospitality'), ...skillCatalogue.filter(sk => sk.category === 'Sales')]
      else if (name.includes('creative') || name.includes('graphic') || name.includes('design') || name.includes('content writer'))
        pool = skillCatalogue.filter(sk => sk.category === 'Marketing')
      else if (name.includes('customer service') || name.includes('customer support') || name.includes('client exec'))
        pool = [...skillCatalogue.filter(sk => sk.category === 'Hospitality'), ...skillCatalogue.filter(sk => sk.category === 'Sales')]
      else if (name.includes('customer success') || name.includes('launch manager') || name.includes('service delivery'))
        pool = [...skillCatalogue.filter(sk => sk.category === 'Sales'), ...skillCatalogue.filter(sk => sk.category === 'Hospitality')]
      else if (name.includes('engineer') || name.includes('developer') || name.includes('architect') || name.includes('devops') || name.includes('sre') || name.includes('qa'))
        pool = skillCatalogue.filter(sk => sk.category === 'Technology')
      else if (name.includes('financ') || name.includes('account') || name.includes('payroll') || name.includes('bookkeep') || name.includes('credit') || name.includes('tax'))
        pool = skillCatalogue.filter(sk => sk.category === 'Finance')
      else if (name.includes('admin') || name.includes('assistant') || name.includes('office') || name.includes('chief of staff'))
        pool = skillCatalogue.filter(sk => sk.category === 'Leadership')
      else if (name.includes('network') || name.includes('cyber') || name.includes('security') || name.includes('it ') || name.includes('cto') || name.includes('support analyst'))
        pool = skillCatalogue.filter(sk => sk.category === 'Technology')
      else if (name.includes('director') || name.includes('ceo') || name.includes('founder') || name.includes('managing') || name.includes('chief'))
        pool = skillCatalogue.filter(sk => sk.category === 'Leadership')
      else if (name.includes('logistics') || name.includes('supply chain') || name.includes('warehouse') || name.includes('procurement') || name.includes('sourcing'))
        pool = [...skillCatalogue.filter(sk => sk.category === 'Finance'), ...skillCatalogue.filter(sk => sk.category === 'Leadership')]
      else if (name.includes('market') || name.includes('brand') || name.includes('seo') || name.includes('campaign') || name.includes('social media') || name.includes('email'))
        pool = skillCatalogue.filter(sk => sk.category === 'Marketing')
      else if (name.includes('operations') || name.includes('strategy') || name.includes('programme') || name.includes('project') || name.includes('delivery'))
        pool = [...skillCatalogue.filter(sk => sk.category === 'Leadership'), ...skillCatalogue.filter(sk => sk.category === 'Analytics')]
      else if (name.includes('partner') || name.includes('relationship') || name.includes('channel'))
        pool = [...skillCatalogue.filter(sk => sk.category === 'Sales'), ...skillCatalogue.filter(sk => sk.category === 'Leadership')]
      else if (name.includes('hr') || name.includes('recruit') || name.includes('people') || name.includes('talent') || name.includes('l&d') || name.includes('performance coach'))
        pool = skillCatalogue.filter(sk => sk.category === 'HR')
      else if (name.includes('product') || name.includes('ux') || name.includes('ui'))
        pool = [...skillCatalogue.filter(sk => sk.category === 'Technology'), ...skillCatalogue.filter(sk => sk.category === 'Analytics')]
      else if (name.includes('revops') || name.includes('revenue') || name.includes('enablement') || name.includes('pmo'))
        pool = [...skillCatalogue.filter(sk => sk.category === 'Sales'), ...skillCatalogue.filter(sk => sk.category === 'Analytics')]
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

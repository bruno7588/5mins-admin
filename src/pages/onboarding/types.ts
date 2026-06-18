/** All data collected across the onboarding flow. */
export interface OnboardingData {
  firstName: string
  lastName: string
  company: string
  role: string
  experience: 'entry' | 'intermediate' | 'senior' | ''
  region: string
  department: string
  office: string
  tools: string[]
  lifeSkills: string[]
}

export const EMPTY_ONBOARDING: OnboardingData = {
  firstName: '',
  lastName: '',
  company: '5Mins',
  role: '',
  experience: '',
  region: '',
  department: '',
  office: '',
  tools: [],
  lifeSkills: [],
}

/** Props every step body receives from the shell. */
export interface StepProps {
  data: OnboardingData
  update: (patch: Partial<OnboardingData>) => void
}

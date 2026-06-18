import RoleSearch from '../RoleSearch'
import Chip from '../../../components/Chip/Chip'
import type { OnboardingData, StepProps } from '../types'

const EXPERIENCE: { value: OnboardingData['experience']; label: string }[] = [
  { value: 'entry', label: 'Entry' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'senior', label: 'Senior' },
]

/** Screen 2 — role + experience level. */
export default function StepRole({ data, update }: StepProps) {
  return (
    <>
      <div className="onboarding__field">
        <RoleSearch
          value={data.role}
          company={data.company}
          onChange={(role) => update({ role })}
        />
      </div>
      <div className="onboarding__field onboarding__section">
        <span className="onboarding__section-label">How experienced are you?</span>
        <div className="onboarding__chips">
          {EXPERIENCE.map((e) => (
            <Chip
              key={e.value}
              label={e.label}
              selected={data.experience === e.value}
              onClick={() => update({ experience: e.value })}
            />
          ))}
        </div>
      </div>
    </>
  )
}

import CollapsibleChips from '../CollapsibleChips'
import type { StepProps } from '../types'

const TOOLS = [
  'Word',
  'Powerpoint',
  'Trello',
  'Google Drive',
  'Zoom',
  'Gmail',
  'Outlook',
  'Notion',
  'Slack',
  'Teams',
  'Meet',
  'Excel',
  'Power BI',
  'Tableau',
  'Sheets',
]

const LIFE_SKILLS = [
  'Growth Mindset',
  'Connecting With Others',
  'Mental Wellbeing',
  'Stress Management',
  'Managing money',
  'Influence & Persuasion',
  'Time Management',
  'Physical Wellbeing',
  'Gaining Perspective',
  'Parenting',
  'Sustainability',
]

const MAX_LIFE_SKILLS = 5

const toggle = (list: string[], value: string) =>
  list.includes(value) ? list.filter((v) => v !== value) : [...list, value]

/** Screen 5 — tools (multi-select) and life skills (multi-select, max 5).
 *  Each group clamps to 2 rows with a "+N" / "View less" chip. */
export default function StepTools({ data, update }: StepProps) {
  const lifeSkillsFull = data.lifeSkills.length >= MAX_LIFE_SKILLS

  return (
    <>
      <div className="onboarding__field onboarding__section onboarding__section--spaced">
        <span className="onboarding__section-label">
          Which tools help you do your job more effectively?
        </span>
        <CollapsibleChips
          items={TOOLS}
          selected={data.tools}
          onToggle={(tool) => update({ tools: toggle(data.tools, tool) })}
        />
      </div>

      <div className="onboarding__field onboarding__section onboarding__section--spaced">
        <span className="onboarding__section-label">
          What life skills would you like to develop?{' '}
          <span className="onboarding__section-hint">(max {MAX_LIFE_SKILLS})</span>
        </span>
        <CollapsibleChips
          items={LIFE_SKILLS}
          selected={data.lifeSkills}
          onToggle={(skill) => update({ lifeSkills: toggle(data.lifeSkills, skill) })}
          isDisabled={(skill) => lifeSkillsFull && !data.lifeSkills.includes(skill)}
        />
      </div>
    </>
  )
}

import InputField from '../../../components/InputField/InputField'
import type { StepProps } from '../types'

/** Screen 1 — collect the learner's name. Company is pre-filled. */
export default function StepWelcome({ data, update }: StepProps) {
  return (
    <>
      <div className="onboarding__field">
        <InputField
          label="First name"
          placeholder="What’s your first name?"
          value={data.firstName}
          onChange={(e) => update({ firstName: e.target.value })}
          autoFocus
        />
      </div>
      <div className="onboarding__field">
        <InputField
          label="Last name"
          placeholder="What’s your last name?"
          value={data.lastName}
          onChange={(e) => update({ lastName: e.target.value })}
        />
      </div>
      <div className="onboarding__field">
        <InputField
          label="Company"
          className="input-field--filled"
          value={data.company}
          disabled
        />
      </div>
    </>
  )
}

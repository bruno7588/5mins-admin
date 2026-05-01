import { useState } from 'react'
import { useCurrentUser } from '../../../../hooks/useCurrentUser'
import WorkflowCard from './WorkflowCard'
import EmailPreviewModal from './EmailPreviewModal'
import CourseRemindersCard, { type Reminder } from './CourseRemindersCard'
import './WorkflowsTab.css'

const SEED_BODY =
  "Hi there,\nA quick reminder that your assigned course is coming up. Just 5 minutes now and you're done.\nThanks!"

const SEED_REMINDERS: Reminder[] = [
  {
    id: 'r_seed_7',
    days: 7,
    subject: 'Reminder: your course is due soon',
    body: SEED_BODY,
    system: true,
  },
  {
    id: 'r_seed_1',
    days: 1,
    subject: 'Reminder: your course is due soon',
    body: SEED_BODY,
    system: true,
  },
]

function WorkflowsTab() {
  const user = useCurrentUser()
  const [enabled, setEnabled] = useState(false)
  const [frequency, setFrequency] = useState('week')
  const [scope, setScope] = useState('direct')
  const [previewOpen, setPreviewOpen] = useState(false)
  const [remindersEnabled, setRemindersEnabled] = useState(true)
  const [reminders, setReminders] = useState<Reminder[]>(SEED_REMINDERS)

  if (user.role !== 'admin') {
    return (
      <div className="workflows-tab">
        <div className="workflows-empty">
          <p className="workflows-empty__title">Workflows are admin-only</p>
          <p className="workflows-empty__sub">Ask an admin to enable workflows for your team.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="workflows-tab">
      <WorkflowCard
        enabled={enabled}
        frequency={frequency}
        scope={scope}
        lastSent="Apr 27 to 4 managers"
        onToggle={() => setEnabled((v) => !v)}
        onFrequencyChange={setFrequency}
        onScopeChange={setScope}
        onPreview={() => setPreviewOpen(true)}
      />
      <CourseRemindersCard
        enabled={remindersEnabled}
        reminders={reminders}
        lastSent="12 reminders sent this week"
        onToggle={() => setRemindersEnabled((v) => !v)}
        onChange={setReminders}
      />
      <EmailPreviewModal open={previewOpen} onClose={() => setPreviewOpen(false)} />
    </div>
  )
}

export default WorkflowsTab

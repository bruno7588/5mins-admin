import { useState } from 'react'
import { useCurrentUser } from '../../../../hooks/useCurrentUser'
import WorkflowCard from './WorkflowCard'
import EmailPreviewModal from './EmailPreviewModal'
import './WorkflowsTab.css'

function WorkflowsTab() {
  const user = useCurrentUser()
  const [enabled, setEnabled] = useState(false)
  const [frequency, setFrequency] = useState('week')
  const [scope, setScope] = useState('direct')
  const [previewOpen, setPreviewOpen] = useState(false)

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
        lastSent="Mon, Apr 27 — sent to 4 managers"
        onToggle={() => setEnabled((v) => !v)}
        onFrequencyChange={setFrequency}
        onScopeChange={setScope}
        onPreview={() => setPreviewOpen(true)}
      />
      <EmailPreviewModal open={previewOpen} onClose={() => setPreviewOpen(false)} />
    </div>
  )
}

export default WorkflowsTab

interface ProgressProps {
  /** 1-based index of the active dot. 0 hides all as inactive. */
  current: number
  total: number
}

/** Row of progress dots shown beside the logo in the onboarding header. */
export default function Progress({ current, total }: ProgressProps) {
  return (
    <div className="onboarding__progress" role="progressbar" aria-valuenow={current} aria-valuemin={1} aria-valuemax={total}>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`onboarding__dot${i + 1 === current ? ' onboarding__dot--active' : ''}`}
        />
      ))}
    </div>
  )
}

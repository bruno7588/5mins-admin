import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import devopsTools from '../illustrations/devops-tools.svg'
import automationTesting from '../illustrations/automation-testing.svg'
import coachingFeedback from '../illustrations/coaching-feedback.svg'
import closingObjection from '../illustrations/closing-objection.svg'
import programming from '../illustrations/programming.svg'
import learningDesign from '../illustrations/learning-design.svg'

interface Skill {
  label: string
  illustration: string
}

const HARD_SKILLS: Skill[] = [
  { label: 'DevOps Tools', illustration: devopsTools },
  { label: 'Automation Testing & Deployment', illustration: automationTesting },
  { label: 'Coaching & Feedback', illustration: coachingFeedback },
  { label: 'Closing and Objection Handling', illustration: closingObjection },
  { label: 'Programming', illustration: programming },
]

const SOFT_SKILLS: Skill[] = [
  { label: 'Closing and Objection Handling', illustration: closingObjection },
  { label: 'Programming', illustration: programming },
  { label: 'Learning Program Design & Delivery', illustration: learningDesign },
]

const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

function SkillCard({ label, illustration }: Skill) {
  return (
    <div className="onboarding__skill">
      <img className="onboarding__skill-icon" src={illustration} alt="" aria-hidden />
      <span className="onboarding__skill-label">{label}</span>
    </div>
  )
}

/** Screen 4 — read-only reveal of the personalised hard/soft skill plan, with a
 *  "handpicked" pop-in: the Hard Skills group reveals first, then the Soft
 *  Skills label appears only once all the hard cards have landed. */
export default function StepPlan() {
  useLayoutEffect(() => {
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>('.onboarding__section')
      const [hard, soft] = sections
      if (!hard || !soft) return

      const labelOf = (s: HTMLElement) => s.querySelector('.onboarding__section-label')
      const cardsOf = (s: HTMLElement) => s.querySelectorAll('.onboarding__skill')
      const iconsOf = (s: HTMLElement) => s.querySelectorAll('.onboarding__skill-icon')

      gsap.set([labelOf(hard), labelOf(soft)], { autoAlpha: 0, y: 8 })
      gsap.set('.onboarding__skill', { autoAlpha: 0, scale: 0.92, y: 10 })
      gsap.set('.onboarding__skill-icon', { scale: 0.6 })

      const cardVars: gsap.TweenVars = {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.06,
        ease: 'power3.out',
        clearProps: 'transform',
      }
      const iconVars: gsap.TweenVars = {
        scale: 1,
        duration: 0.4,
        stagger: 0.06,
        ease: 'power3.out',
        clearProps: 'transform',
      }

      const tl = gsap.timeline({ delay: 0.4 })
      // Hard skills: label, then cards fade/scale in with a beat-behind icon pop.
      tl.to(labelOf(hard), { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power3.out' })
        .to(cardsOf(hard), cardVars, '<0.05')
        .to(iconsOf(hard), iconVars, '<0.08')
        // Soft skills: label follows shortly after the hard cards land.
        .to(labelOf(soft), { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power3.out' }, '>-0.4')
        .to(cardsOf(soft), cardVars, '<0.05')
        .to(iconsOf(soft), iconVars, '<0.08')
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      <div className="onboarding__field onboarding__section">
        <span className="onboarding__section-label">Hard Skills</span>
        <div className="onboarding__skills">
          {HARD_SKILLS.map((s) => (
            <SkillCard key={s.label} {...s} />
          ))}
        </div>
      </div>
      <div className="onboarding__field onboarding__section">
        <span className="onboarding__section-label">Soft Skills</span>
        <div className="onboarding__skills">
          {SOFT_SKILLS.map((s) => (
            <SkillCard key={`soft-${s.label}`} {...s} />
          ))}
        </div>
      </div>
    </>
  )
}

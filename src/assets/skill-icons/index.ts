import accountPlanning from './account-planning.svg'
import agile from './agile.svg'
import brandDevelopment from './brand-development.svg'
import campaignManagement from './campaign-management.svg'
import cloudComputing from './cloud-computing.svg'
import complianceKnowledge from './compliance-knowledge.svg'
import customerHappiness from './customer-happiness.svg'
import dataAnalysis from './data-analysis.svg'
import digitalMarketing from './digital-marketing.svg'
import employeeEngagement from './employee-engagement.svg'
import financialAccounting from './financial-accounting.svg'
import negotiation from './negotiation.svg'
import operationsManagement from './operations-management.svg'
import peopleManagement from './people-management.svg'
import pricingStrategy from './pricing-strategy.svg'
import programming from './programming.svg'
import salesProcess from './sales-process.svg'
import softwareDesign from './software-design.svg'
import storytelling from './storytelling.svg'
import strategicCommunications from './strategic-communications.svg'

export const skillIllustrations = [
  accountPlanning,
  agile,
  brandDevelopment,
  campaignManagement,
  cloudComputing,
  complianceKnowledge,
  customerHappiness,
  dataAnalysis,
  digitalMarketing,
  employeeEngagement,
  financialAccounting,
  negotiation,
  operationsManagement,
  peopleManagement,
  pricingStrategy,
  programming,
  salesProcess,
  softwareDesign,
  storytelling,
  strategicCommunications,
]

export function getSkillIllustration(skillId: number): string {
  return skillIllustrations[skillId % skillIllustrations.length]
}

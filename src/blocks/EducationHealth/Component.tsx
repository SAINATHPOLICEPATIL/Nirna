import { EducationHealthCard } from '@/components/homepage/EducationHealthCard'
import type { EducationHealthBlock as EducationHealthBlockProps } from '@/payload-types'
import { getVillageProfile } from '@/utilities/queries'

import { type BlockContext, toCTA } from '../shared'

export async function EducationHealthBlockComponent({
  block,
  locale,
}: { block: EducationHealthBlockProps } & BlockContext) {
  const p = await getVillageProfile(locale)
  const approx = p.countsAreApproximate !== false
  const govt = block.governmentLabel ?? ''
  const pvt = block.privateLabel ?? ''

  const schoolLines: string[] = []
  if (p.governmentSchools != null || p.privateSchools != null) {
    const parts = [
      p.governmentSchools != null ? `${p.governmentSchools} ${govt}` : null,
      p.privateSchools != null ? `${p.privateSchools} ${pvt}` : null,
    ].filter(Boolean)
    schoolLines.push(`${approx ? '≈ ' : ''}${parts.join(' + ')}`)
  }
  if (p.colleges != null) schoolLines.push(`${block.collegeLabel ?? ''}: ${p.colleges}`)

  const hospitalLines: string[] = []
  if (p.governmentHospitals != null) hospitalLines.push(`${govt}: ${p.governmentHospitals}`)
  if (p.privateHospitalsAndClinics != null) {
    hospitalLines.push(`${pvt}: ${approx ? '> ' : ''}${p.privateHospitalsAndClinics}`)
  }

  return (
    <EducationHealthCard
      heading={block.heading}
      subheading={block.subheading}
      schools={{ label: block.schoolsLabel, lines: schoolLines }}
      hospitals={{ label: block.hospitalsLabel, lines: hospitalLines }}
      cta={toCTA(block.cta, locale)}
    />
  )
}

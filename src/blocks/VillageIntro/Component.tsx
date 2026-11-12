import { ButtonLink } from '@/components/shared/ButtonLink'
import { Container } from '@/components/shared/Container'
import { Icon, type IconName } from '@/components/shared/Icon'
import type { VillageIntroBlock as VillageIntroBlockProps } from '@/payload-types'
import { getVillageProfile } from '@/utilities/queries'

import { type BlockContext, numberFormat, toCTA } from '../shared'

export async function VillageIntroBlockComponent({
  block,
  locale,
}: { block: VillageIntroBlockProps } & BlockContext) {
  const p = await getVillageProfile(locale)
  const cta = toCTA(block.cta, locale)
  const text = block.text || p.shortDescription

  const stats: { icon: IconName; value: string; label: string }[] = [
    ['users', p.population, block.populationLabel] as const,
    ['user', p.malePopulation, block.maleLabel] as const,
    ['user', p.femalePopulation, block.femaleLabel] as const,
    ['home', p.households, block.householdsLabel] as const,
  ]
    .filter(([, v]) => v != null)
    .map(([icon, v, label]) => ({
      icon,
      value: numberFormat.format(v as number),
      label: label ?? '',
    }))
  if (p.district) stats.push({ icon: 'pin', value: p.district, label: p.state ?? '' })

  return (
    <section aria-labelledby="intro-title" className="py-10 sm:py-14">
      <Container className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.9fr)] lg:gap-10">
        <div>
          {block.heading && (
            <h2
              id="intro-title"
              className="font-heading text-3xl font-bold text-primary sm:text-4xl"
            >
              {block.heading}
            </h2>
          )}
          {text && <p className="mt-4 text-base leading-relaxed text-ink sm:text-lg">{text}</p>}
          {cta && (
            <div className="mt-6">
              <ButtonLink href={cta.href} newTab={cta.newTab}>
                {cta.label}
              </ButtonLink>
            </div>
          )}
        </div>

        {stats.length > 0 && (
          <section
            aria-labelledby="glance-title"
            className="rounded-2xl bg-primary-soft p-5 shadow-(--shadow-card) sm:p-7"
          >
            {block.glanceHeading && (
              <h3
                id="glance-title"
                className="flex items-center gap-3 font-heading text-2xl font-bold text-primary"
              >
                <Icon name="users" className="size-8" />
                {block.glanceHeading}
              </h3>
            )}
            <dl className="mt-5 grid grid-cols-2 gap-y-6 sm:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-primary/15">
              {stats.map((s) => (
                <div
                  key={s.label + s.value}
                  className="flex flex-col items-center px-2 text-center"
                >
                  <Icon name={s.icon} className="size-8 text-primary" />
                  <dd className="mt-3 text-xl leading-tight font-bold text-ink">{s.value}</dd>
                  <dt className="mt-0.5 text-sm text-ink-muted">{s.label}</dt>
                </div>
              ))}
            </dl>
          </section>
        )}
      </Container>
    </section>
  )
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useId, useRef, useState } from 'react'

import { Icon } from '@/components/shared/Icon'

import { isActive, type NavItem } from './navItems'

type Props = {
  items: NavItem[]
  homeHref: string
  label: string
  openLabel: string
  closeLabel: string
}

/**
 * Compact menu below the lg breakpoint.
 * Keyboard: Escape closes, Tab is kept inside the open panel, focus returns to the toggle.
 */
export function MobileNav({ items, homeHref, label, openLabel, closeLabel }: Props) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname() || ''
  const panelId = useId()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => {
    setOpen(false)
    toggleRef.current?.focus()
  }, [])

  // Close when the route changes (a link was followed).
  const [lastPath, setLastPath] = useState(pathname)
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    const panel = panelRef.current
    panel?.querySelector<HTMLElement>('a, button')?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        close()
        return
      }
      if (event.key !== 'Tab' || !panel) return
      // Focus trap across the toggle button + panel links.
      const focusables = [
        toggleRef.current,
        ...Array.from(panel.querySelectorAll<HTMLElement>('a, button')),
      ].filter((el): el is HTMLElement => !!el)
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, close])

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? closeLabel : openLabel}
        onClick={() => (open ? close() : setOpen(true))}
        className="inline-flex size-10 items-center justify-center rounded-full text-primary hover:bg-primary-soft"
      >
        <Icon name={open ? 'close' : 'menu'} className="size-6" />
      </button>

      <div
        ref={panelRef}
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full z-40 border-b border-border bg-surface shadow-lg"
      >
        <nav aria-label={label}>
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2 sm:px-6">
            {items.map((item) => {
              const active = isActive(item.href, pathname, homeHref)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    {...(item.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                    className={`block rounded-lg px-3 py-3 text-base ${
                      active
                        ? 'bg-primary-soft font-semibold text-primary'
                        : 'text-ink hover:bg-surface-muted'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </div>
  )
}

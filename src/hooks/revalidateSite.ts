import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

/**
 * Public pages are statically rendered and cached. When content changes in the admin,
 * purge the cache for the whole site so both languages pick up the change.
 *
 * Outside a Next.js request (seed script, CLI, tests) revalidatePath is unavailable;
 * that is harmless, so it is skipped. Pass `context: { disableRevalidate: true }` to opt out.
 */
async function revalidateAll(context: Record<string, unknown>) {
  if (context?.disableRevalidate) return
  try {
    const { revalidatePath } = await import('next/cache')
    revalidatePath('/', 'layout')
  } catch {
    // Not running inside Next.js — nothing to revalidate.
  }
}

export const revalidateCollectionAfterChange: CollectionAfterChangeHook = async ({ doc, req }) => {
  await revalidateAll(req.context)
  return doc
}

export const revalidateCollectionAfterDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  await revalidateAll(req.context)
  return doc
}

export const revalidateGlobalAfterChange: GlobalAfterChangeHook = async ({ doc, req }) => {
  await revalidateAll(req.context)
  return doc
}

/** Spread into a collection's `hooks`. */
export const revalidateHooks = {
  afterChange: [revalidateCollectionAfterChange],
  afterDelete: [revalidateCollectionAfterDelete],
}

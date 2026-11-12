import { getWeightByValue } from '@/fields/fontWeightFeature/weightMapping'
import { SerializedTypographyBlockNode } from '@/fields/typographyBlockFeature/types'
import { cn } from '@/utilities/ui'
import type {
  DefaultNodeTypes,
  DefaultTypedEditorState,
  SerializedHeadingNode,
  SerializedLinkNode,
  SerializedParagraphNode,
  SerializedTextNode,
} from '@payloadcms/richtext-lexical'
import {
  RichText as ConvertRichText,
  type JSXConverter,
  type JSXConvertersFunction,
} from '@payloadcms/richtext-lexical/react'
import Link from 'next/link'
import { Typography } from '../Typography'
import type { TypographyElement } from '../Typography/types'
import { defaultColors } from './utils/colorMappings'
import { parseInlineStyles } from './utils/parseInlineStyles'
import { getTransformByClass } from './utils/textTransforms'
import type { Locale } from '@/i18n/config'
import { docPath, isLinkableCollection } from '@/utilities/routes'

type NodeTypes = DefaultNodeTypes | SerializedTypographyBlockNode

/**
 * Detects Tailwind classes from inline CSS styles
 */
function detectInlineStyles(inlineStyle: string): {
  detectedColorClass: string | null
  detectedWeightClass: string | null
  detectedTransformClass: string | null
  styleMap: Record<string, string>
} {
  const styleMap = parseInlineStyles(inlineStyle)

  let detectedColorClass: string | null = null
  let detectedWeightClass: string | null = null
  let detectedTransformClass: string | null = null

  // Color detection
  if (styleMap.color) {
    const hexColor = styleMap.color.toLowerCase()
    const colorOption = defaultColors.find((c) => c.oklchValue.toLowerCase() === hexColor)

    if (colorOption) {
      detectedColorClass = colorOption.textClass
    } else {
      console.warn('[RichText] Unmapped text color:', styleMap.color)
    }
  }

  // Font weight detection
  if (styleMap['font-weight']) {
    const cssWeight = styleMap['font-weight']
    const weightOption = getWeightByValue(cssWeight)

    if (weightOption) {
      detectedWeightClass = weightOption.class
    } else {
      console.warn('[RichText] Unmapped font-weight:', cssWeight)
    }
  }

  // Text transform detection
  if (styleMap['text-transform']) {
    const cssTransform = styleMap['text-transform']
    const transformMap: Record<string, string> = {
      uppercase: 'uppercase',
      lowercase: 'lowercase',
      capitalize: 'capitalize',
      none: 'normal-case',
    }

    const tailwindTransform = transformMap[cssTransform]

    if (!tailwindTransform) {
      console.warn('[RichText] Unsupported text-transform:', cssTransform)
    } else {
      const transformOption = getTransformByClass(tailwindTransform)
      if (transformOption) {
        detectedTransformClass = transformOption.class
      } else {
        console.warn('[RichText] Unmapped transform class:', tailwindTransform)
      }
    }
  }

  return {
    detectedColorClass,
    detectedWeightClass,
    detectedTransformClass,
    styleMap,
  }
}

const internalDocToHref = ({
  linkNode,
  locale,
}: {
  linkNode: SerializedLinkNode
  locale: Locale
}): string => {
  try {
    const doc = linkNode.fields?.doc

    if (!doc || typeof doc !== 'object') {
      console.warn('[RichText] Missing or invalid doc field in link node', linkNode)
      return '#'
    }

    const { value, relationTo } = doc

    if (!value || typeof value !== 'object') {
      console.warn('[RichText] Invalid doc value in link node', doc)
      return '#'
    }

    const { slug } = value as { slug?: string }

    if (!slug || typeof slug !== 'string') {
      console.warn('[RichText] Missing slug for internal link', value)
      return '#'
    }

    if (isLinkableCollection(relationTo)) {
      return docPath(relationTo, slug, locale)
    }
    console.warn('[RichText] Unsupported relationTo value:', relationTo)
    return '#'
  } catch (error) {
    console.error('[RichText] Failed to generate internal link href', error, linkNode)
    return '#'
  }
}

export const typographyBlockConverter: JSXConverter<SerializedTypographyBlockNode> = ({
  node,
  nodesToJSX,
}) => {
  const children = nodesToJSX({ nodes: node.children })
  return (
    <Typography variant={node.variant} data-typography-variant={node.variant}>
      {children}
    </Typography>
  )
}

export const headingConverter: JSXConverter<SerializedHeadingNode> = ({ node, nodesToJSX }) => {
  const Tag = node.tag
  const children = nodesToJSX({ nodes: node.children })

  switch (Tag) {
    case 'h1':
      return <Typography variant="h1">{children}</Typography>
    case 'h2':
      return <Typography variant="h2">{children}</Typography>
    case 'h3':
      return <Typography variant="h3">{children}</Typography>
    case 'h4':
      return <Typography variant="h4">{children}</Typography>
    case 'h5':
      return <Typography variant="h5">{children}</Typography>
    default:
      return <Typography variant="h1">{children}</Typography>
  }
}

export const paragraphConverter: JSXConverter<SerializedParagraphNode> = ({ node, nodesToJSX }) => {
  const children = nodesToJSX({ nodes: node.children })
  return <Typography variant="p1">{children}</Typography>
}

/** Rich-text links; internal ones get the page's locale prefix. */
export const createLinkConverter = (locale: Locale): JSXConverter<SerializedLinkNode> =>
  function LinkConverter({ node, nodesToJSX }) {
    const children = nodesToJSX({ nodes: node.children })
    const linkNode = node as SerializedLinkNode

    const href =
      linkNode.fields.linkType === 'internal'
        ? internalDocToHref({ linkNode, locale })
        : linkNode.fields.url || '#'

    return (
      <Link
        href={href}
        className="text-primary underline-offset-4 transition-colors hover:text-primary-hover hover:underline"
        target={linkNode.fields.newTab ? '_blank' : undefined}
        rel={linkNode.fields.newTab ? 'noopener noreferrer' : undefined}
      >
        {children}
      </Link>
    )
  }

const createConverters =
  (locale: Locale): JSXConvertersFunction<NodeTypes> =>
  ({ defaultConverters }) => ({
    ...defaultConverters,
    heading: headingConverter,
    paragraph: paragraphConverter,
    typographyBlock: typographyBlockConverter,
    list: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children })
      const { listType } = node

      switch (listType) {
        case 'bullet':
          return <ul className="mt-0.5 list-disc pl-4 marker:text-primary">{children}</ul>
        case 'number':
          return <ol className="mt-0.5 list-decimal pl-4 marker:text-primary">{children}</ol>
        default:
          return <ul className="mt-0.5 list-disc pl-4">{children}</ul>
      }
    },
    listitem: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children })
      return (
        <li className="pb-1">
          <Typography variant="p1">{children}</Typography>
        </li>
      )
    },
    link: createLinkConverter(locale),
    text: ({ node }) => {
      const textNode = node as SerializedTextNode & {
        __textColorClass?: string
        __fontWeightClass?: string
        __textTransformClass?: string
      }

      const { text, format } = textNode
      const { __textColorClass, __fontWeightClass, __textTransformClass } = textNode

      let content: React.ReactNode = text

      if (format & (1 << 0)) {
        content = <strong>{content}</strong>
      }

      // Italic format (bit 1)
      if (format & (1 << 1)) {
        content = <em>{content}</em>
      }

      if (__fontWeightClass || __textColorClass || __textTransformClass) {
        return (
          <span className={cn(__fontWeightClass, __textColorClass, __textTransformClass)}>
            {content}
          </span>
        )
      }

      if (textNode.style) {
        const { detectedColorClass, detectedWeightClass, detectedTransformClass, styleMap } =
          detectInlineStyles(textNode.style)

        if (detectedColorClass || detectedWeightClass || detectedTransformClass) {
          return (
            <span className={cn(detectedWeightClass, detectedColorClass, detectedTransformClass)}>
              {content}
            </span>
          )
        }

        const inlineStyleObj: React.CSSProperties = {}
        if (styleMap.color) inlineStyleObj.color = styleMap.color
        if (styleMap['font-weight']) inlineStyleObj.fontWeight = styleMap['font-weight']
        if (styleMap['text-transform']) {
          inlineStyleObj.textTransform = styleMap[
            'text-transform'
          ] as React.CSSProperties['textTransform']
        }

        if (Object.keys(inlineStyleObj).length > 0) {
          return <span style={inlineStyleObj}>{content}</span>
        }
      }

      return <>{content}</>
    },
  })

/** Same converters, but display styles (d1–d5) render as `as` instead of their default h1. */
const withDisplayAs =
  (as: TypographyElement, locale: Locale): JSXConvertersFunction<NodeTypes> =>
  (args) => ({
    ...createConverters(locale)(args),
    typographyBlock: ({ node, nodesToJSX }) => (
      <Typography
        variant={node.variant}
        as={node.variant.startsWith('d') ? as : undefined}
        data-typography-variant={node.variant}
      >
        {nodesToJSX({ nodes: node.children })}
      </Typography>
    ),
  })

type Props = {
  data: DefaultTypedEditorState
  /** Language of the page: internal links get this prefix (`/kn/…`, `/en/…`). */
  locale: Locale
  /** Wraps the text in Tailwind's `container` (centred, max width per breakpoint). */
  enableGutter?: boolean
  /**
   * Adds `prose` classes. Off by default: Typography already styles every node, and the
   * `@tailwindcss/typography` plugin is only needed if you turn this on.
   */
  enableProse?: boolean
  /** Tag for display-style text. It defaults to h1, so set it on any heading that isn't the page title. */
  displayAs?: TypographyElement
} & React.HTMLAttributes<HTMLDivElement>

export function RichText(props: Props) {
  const { className, enableProse = false, enableGutter = true, displayAs, locale, ...rest } = props

  return (
    <ConvertRichText
      converters={displayAs ? withDisplayAs(displayAs, locale) : createConverters(locale)}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'prose md:prose-md dark:prose-invert mx-auto': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}

// utils/styleUtils.ts
/**
 * Parse inline styles into a key-value object
 */
export function parseInlineStyles(styleString: string): Record<string, string> {
  const styles: Record<string, string> = {}
  if (!styleString) return styles

  const declarations = styleString.split(';').filter(Boolean)
  declarations.forEach((decl) => {
    const [property, value] = decl.split(':').map((s) => s.trim())
    if (property && value) {
      styles[property] = value
    }
  })

  return styles
}

/**
 * Merge existing styles with new style properties
 */
export function mergeStyles(
  existingStyle: string,
  newStyles: Record<string, string | null>,
): string {
  const parsed = parseInlineStyles(existingStyle)

  // Apply new styles (null means remove that property)
  Object.entries(newStyles).forEach(([key, value]) => {
    if (value === null) {
      delete parsed[key]
    } else {
      parsed[key] = value
    }
  })

  // Convert back to string
  return Object.entries(parsed)
    .map(([key, value]) => `${key}: ${value}`)
    .join('; ')
}

/**
 * Get a specific style property value
 */
export function getStyleProperty(styleString: string, property: string): string | null {
  const styles = parseInlineStyles(styleString)
  return styles[property] || null
}

/**
 * Inline rich-text formatting utilities.
 *
 * Supports a minimal whitelist of inline formatting:
 * <b>, <strong>, <i>, <em>, <u>, <br>,
 * <span style="color: ...; font-size: ..."> (only these properties kept),
 * <font color="..." size="..."> (legacy, converted to span)
 *
 * All other HTML is stripped to plain text on blur to prevent XSS.
 */

const ALLOWED_TAGS = new Set(['B', 'STRONG', 'I', 'EM', 'U', 'BR'])

/** Map HTML <font size="N"> values to relative CSS em sizes */
const FONT_SIZE_MAP: Record<string, string> = {
  '1': '0.7em',
  '2': '0.85em',
  '3': '1em',
  '4': '1.15em',
  '5': '1.3em',
  '6': '1.5em',
  '7': '2em',
}

/**
 * Extract a validated CSS color value from a style string.
 */
function extractColorFromStyle(style: string | null): string | null {
  if (!style) return null
  const match = style.match(/(?:^|;)\s*color\s*:\s*([^;]+)/i)
  if (!match) return null
  const color = match[1].trim()
  if (/^(#[0-9a-f]{3,8}|rgba?\([^)]+\)|[a-z]+)$/i.test(color)) {
    return color
  }
  return null
}

/**
 * Extract a validated font-size value from a style string.
 */
function extractFontSize(style: string | null): string | null {
  if (!style) return null
  const match = style.match(/(?:^|;)\s*font-size\s*:\s*([^;]+)/i)
  if (!match) return null
  const size = match[1].trim()
  // Allow: em, rem, px, pt, %, or named sizes
  if (/^(\d*\.?\d+(em|rem|px|pt|%)|[a-z]+)$/i.test(size)) {
    return size
  }
  return null
}

/**
 * Build a clean style string from optional color and font-size.
 */
function buildStyle(color: string | null, fontSize: string | null): string {
  const parts: string[] = []
  if (color) parts.push(`color: ${color}`)
  if (fontSize) parts.push(`font-size: ${fontSize}`)
  return parts.join('; ')
}

/**
 * Sanitize an HTML string: keep only whitelisted inline tags,
 * strip everything else to its text content.
 * For <span> and <font>, only color and font-size are preserved.
 */
export function sanitizeHTML(html: string): string {
  if (!html) return ''
  if (!html.includes('<')) return html

  const doc = new DOMParser().parseFromString(html, 'text/html')
  const fragment = doc.body

  function walk(node: Node): Node[] {
    const result: Node[] = []
    node.childNodes.forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        result.push(child.cloneNode(true))
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        const el = child as Element
        const tag = el.tagName

        if (tag === 'SPAN') {
          const color = extractColorFromStyle(el.getAttribute('style'))
          const fontSize = extractFontSize(el.getAttribute('style'))
          const cleanChildren = walk(el)
          const style = buildStyle(color, fontSize)
          if (style) {
            const clean = doc.createElement('span')
            clean.setAttribute('style', style)
            cleanChildren.forEach((c) => clean.appendChild(c))
            result.push(clean)
          } else {
            cleanChildren.forEach((c) => result.push(c))
          }
        } else if (tag === 'FONT') {
          const colorAttr = el.getAttribute('color')
          const styleColor = extractColorFromStyle(el.getAttribute('style'))
          const color = colorAttr || styleColor
          const sizeAttr = el.getAttribute('size')
          const styleFontSize = extractFontSize(el.getAttribute('style'))
          const fontSize = sizeAttr ? (FONT_SIZE_MAP[sizeAttr] || null) : styleFontSize
          const cleanChildren = walk(el)
          const style = buildStyle(color, fontSize)
          if (style) {
            const clean = doc.createElement('span')
            clean.setAttribute('style', style)
            cleanChildren.forEach((c) => clean.appendChild(c))
            result.push(clean)
          } else {
            cleanChildren.forEach((c) => result.push(c))
          }
        } else if (ALLOWED_TAGS.has(tag)) {
          const cleanChildren = walk(el)
          const clean = doc.createElement(tag.toLowerCase())
          cleanChildren.forEach((c) => clean.appendChild(c))
          result.push(clean)
        } else {
          walk(el).forEach((c) => result.push(c))
        }
      }
    })
    return result
  }

  const cleaned = walk(fragment)
  const wrapper = doc.createElement('div')
  cleaned.forEach((node) => wrapper.appendChild(node))

  return wrapper.innerHTML
}

/**
 * Check the current selection's formatting state.
 */
export function getFormatState(): { bold: boolean; italic: boolean; underline: boolean } {
  try {
    return {
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
    }
  } catch {
    return { bold: false, italic: false, underline: false }
  }
}

/**
 * Get the current selection's text color (from queryCommandValue).
 * Returns a CSS color string or empty string.
 */
export function getCurrentColor(): string {
  try {
    return document.queryCommandValue('foreColor') || ''
  } catch {
    return ''
  }
}

/**
 * Apply a text color to the current selection in a contenteditable element.
 */
export function applyColor(color: string): void {
  document.execCommand('foreColor', false, color)
}

/**
 * Remove text color from the current selection by setting it to the
 * default on-surface color.
 */
export function removeColor(): void {
  const defaultColor = getComputedStyle(document.body).getPropertyValue('--md-on-surface').trim()
  document.execCommand('foreColor', false, defaultColor || 'inherit')
}

/**
 * Get a curated color palette derived from the current M3 theme.
 * Returns a small set of preset colors for the toolbar color picker.
 */
export function getColorPalette(): { name: string; value: string }[] {
  const styles = getComputedStyle(document.body)
  const get = (varName: string) => styles.getPropertyValue(varName).trim()
  return [
    { name: '主色', value: get('--md-primary') },
    { name: '辅色', value: get('--md-secondary') },
    { name: '第三色', value: get('--md-tertiary') },
    { name: '错误', value: get('--md-error') },
    { name: '弱化', value: get('--md-on-surface-variant') },
    { name: '黑色', value: '#000000' },
  ].filter((c) => c.value)
}

/**
 * Get font size presets for the toolbar.
 * Each preset maps to an HTML font size value (1-7) used by execCommand.
 */
export function getFontSizePresets(): { label: string; size: string; htmlSize: string }[] {
  return [
    { label: '小', size: '0.85em', htmlSize: '2' },
    { label: '默认', size: '1em', htmlSize: '3' },
    { label: '大', size: '1.3em', htmlSize: '5' },
    { label: '特大', size: '1.5em', htmlSize: '6' },
  ]
}

/**
 * Apply font size to the current selection using execCommand('fontSize').
 * The htmlSize parameter corresponds to HTML font size values 1-7.
 */
export function applyFontSize(htmlSize: string): void {
  document.execCommand('fontSize', false, htmlSize)
}

/**
 * Check whether a string contains any HTML formatting tags.
 * Used by EditorPanel to show a "formatted" badge.
 */
export function hasFormatting(text: string): boolean {
  if (!text) return false
  return /<\/?(b|strong|i|em|u)\b/i.test(text)
    || /<span\s+style=["'][^"']*color\s*:/i.test(text)
    || /<span\s+style=["'][^"']*font-size\s*:/i.test(text)
    || /<font\s+size=/i.test(text)
}

/**
 * Inline rich-text formatting utilities.
 *
 * Supports a minimal whitelist of inline formatting tags:
 * <b>, <strong>, <i>, <em>, <u>, <br>
 *
 * All other HTML is stripped to plain text on blur to prevent XSS.
 */

const ALLOWED_TAGS = new Set(['B', 'STRONG', 'I', 'EM', 'U', 'BR'])

/**
 * Sanitize an HTML string: keep only whitelisted inline tags,
 * strip everything else to its text content.
 */
export function sanitizeHTML(html: string): string {
  if (!html) return ''
  // Quick check — if no tags at all, nothing to sanitize
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
        if (ALLOWED_TAGS.has(tag)) {
          // Recurse into children, then rebuild the clean element
          const cleanChildren = walk(el)
          const clean = doc.createElement(tag.toLowerCase())
          cleanChildren.forEach((c) => clean.appendChild(c))
          result.push(clean)
        } else {
          // Strip tag, keep children (recurse)
          walk(el).forEach((c) => result.push(c))
        }
      }
      // Ignore comment nodes, processing instructions, etc.
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
 * Returns whether bold and/or italic are active at the cursor / selection.
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
 * Check whether a string contains any HTML formatting tags.
 * Used by EditorPanel to show a "formatted" badge.
 */
export function hasFormatting(text: string): boolean {
  if (!text) return false
  return /<\/?(b|strong|i|em|u)\b/i.test(text)
}

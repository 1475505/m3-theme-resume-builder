<script setup lang="ts">
const { data } = useResume()

async function handleExportPDF() {
  try {
    // Capture all rendered resume pages
    const pageEls = Array.from(document.querySelectorAll('.a4-page')).filter(el => !el.classList.contains('measure-page') && !el.classList.contains('placeholder-page'))
    const resumeHtml = pageEls.map(el => el.outerHTML).join('\n')
    if (!resumeHtml) return

    // Build full HTML document for Puppeteer
    const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map(el => el.outerHTML)
      .join('\n')

    const computedStyles = getComputedStyle(document.body)
    const cssVars = [
      '--md-primary', '--md-on-primary', '--md-primary-container', '--md-on-primary-container',
      '--md-secondary', '--md-on-secondary', '--md-secondary-container', '--md-on-secondary-container',
      '--md-tertiary', '--md-on-tertiary', '--md-tertiary-container', '--md-on-tertiary-container',
      '--md-error', '--md-on-error', '--md-error-container', '--md-on-error-container',
      '--md-surface', '--md-on-surface', '--md-on-surface-variant',
      '--md-surface-variant', '--md-surface-container-lowest', '--md-surface-container-low',
      '--md-surface-container', '--md-surface-container-high', '--md-surface-container-highest',
      '--md-surface-dim', '--md-surface-bright', '--md-outline', '--md-outline-variant',
      '--md-inverse-surface', '--md-inverse-on-surface', '--md-inverse-primary', '--md-scrim',
      '--md-shadow',
    ]
    const inlineVars = cssVars
      .map(v => `${v}:${computedStyles.getPropertyValue(v)}`)
      .join(';')

    const fullHTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..24,100..700,0..1,-50..200&display=swap" rel="stylesheet">
${styles}
<style>
body { ${inlineVars}; font-family: var(--md-font-body, 'Roboto', 'Noto Sans SC', sans-serif); background: white; color: var(--md-on-surface); line-height: 1.5; }
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
a { color: inherit; text-decoration: none; }
ul { list-style: none; }
@page { size: 210mm 297mm; margin: 0; }
.a4-page {
  width: 210mm;
  height: 297mm;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: none;
  border-radius: 0;
  page-break-after: always;
  break-after: page;
}
.a4-page + .a4-page { margin-top: 0; }
.a4-page:last-child { page-break-after: auto; break-after: auto; }
.job-card, .project-card, .skill-card, .section { break-inside: avoid; page-break-inside: avoid; }
</style>
</head>
<body>${resumeHtml}</body>
</html>`

    const response = await fetch('/api/export-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ html: fullHTML }),
    })

    if (!response.ok) {
      throw new Error(`Export failed: ${response.status}`)
    }

    const buffer = await response.arrayBuffer()
    const blob = new Blob([buffer], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${data.value.basics.name || 'resume'}.pdf`
    a.click()
    URL.revokeObjectURL(url)
  } catch (e) {
    console.error('PDF export failed:', e)
    // Fallback: use browser print
    window.print()
  }
}
</script>

<template>
  <div class="app-layout">
    <EditorPanel :data="data" />
    <ResumePage :data="data" />
    <Toolbar @export-pdf="handleExportPDF" />
  </div>
</template>

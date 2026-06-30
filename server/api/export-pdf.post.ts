import puppeteer from 'puppeteer'

/**
 * POST /api/export-pdf
 * Renders the resume page as A4 PDF using Puppeteer.
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const html = body?.html as string

  if (!html) {
    throw createError({
      statusCode: 400,
      message: 'Missing html content',
    })
  }

  let browser: puppeteer.Browser | null = null

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })

    const page = await browser.newPage()
    await page.setViewport({ width: 794, height: 1123 })

    await page.setContent(html, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    })

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      preferCSSPageSize: true,
    })

    await browser.close()

    // Return PDF as binary
    setResponseHeader(event, 'Content-Type', 'application/pdf')
    setResponseHeader(event, 'Content-Disposition', 'attachment; filename="resume.pdf"')
    return pdf
  } catch (error) {
    if (browser) await browser.close()
    throw createError({
      statusCode: 500,
      message: `PDF generation failed: ${error}`,
    })
  }
})
